"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { AirFlow } from "./AirFlow";
import { CameraRig } from "./CameraRig";
import { DuctNetwork } from "./DuctNetwork";
import { OUTLET } from "./ductLayout";
import { SheetToDuct } from "./SheetToDuct";
import { createBrushedSteelTexture } from "./textures";
import { into, REDUCED_MOTION_COORD } from "./timeline";

type DuctSceneProps = {
  coordRef: RefObject<number>;
  reducedMotion: boolean;
};

const WARM_LIGHT = new THREE.Color("#fff4e8");
const COOL_LIGHT = new THREE.Color("#cfe8ff");

/** Composes the story scene and drives the shared galvanized material + lighting mood. */
export function DuctScene({ coordRef, reducedMotion }: DuctSceneProps) {
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const coolLight = useRef<THREE.PointLight>(null);
  const smallScreen = useThree((s) => s.size.width < 768);

  const steelMap = useMemo(() => createBrushedSteelTexture(), []);
  const galvanized = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d5dce2",
        map: steelMap,
        metalness: 0.82,
        roughness: 0.36,
        envMapIntensity: 1.1,
        side: THREE.DoubleSide,
        transparent: true,
      }),
    [steelMap],
  );

  // Per-frame mutations go through a ref (render-time values stay immutable).
  const galvanizedRef = useRef<THREE.MeshStandardMaterial | null>(null);
  useEffect(() => {
    galvanizedRef.current = galvanized;
    return () => {
      galvanizedRef.current = null;
      galvanized.dispose();
      steelMap.dispose();
    };
  }, [galvanized, steelMap]);

  useFrame(() => {
    const c = reducedMotion ? REDUCED_MOTION_COORD : coordRef.current;

    // Ducts turn see-through while the air flows so the particles read clearly.
    const flow = into(c, 3);
    const material = galvanizedRef.current;
    if (material) {
      material.opacity = 1 - flow * 0.68;
      material.depthWrite = material.opacity > 0.95;
    }

    const cool = into(c, 4);
    if (keyLight.current) keyLight.current.color.copy(WARM_LIGHT).lerp(COOL_LIGHT, cool);
    if (coolLight.current) coolLight.current.intensity = cool * 6;
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight ref={keyLight} position={[4, 6, 5]} intensity={1.6} />
      <pointLight ref={coolLight} position={[OUTLET.x, OUTLET.y - 0.6, 0.8]} color="#3FA9F5" intensity={0} distance={6} />

      {/* Studio reflections built only from Lightformers: no HDR download, works offline. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 6, -1]} rotation-x={Math.PI / 2} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[-7, 1.5, 1]} rotation-y={Math.PI / 2} scale={[4, 6, 1]} />
        <Lightformer
          form="rect"
          intensity={1.6}
          color="#3FA9F5"
          position={[7, 1, -1]}
          rotation-y={-Math.PI / 2}
          scale={[3, 6, 1]}
        />
        <Lightformer form="ring" intensity={1.8} position={[0, 2, 7]} scale={4} />
        <Lightformer form="rect" intensity={0.6} position={[0, -5, 0]} rotation-x={-Math.PI / 2} scale={[10, 10, 1]} />
      </Environment>

      <CameraRig coordRef={coordRef} reducedMotion={reducedMotion} />
      <SheetToDuct coordRef={coordRef} material={galvanized} reducedMotion={reducedMotion} />
      <DuctNetwork coordRef={coordRef} material={galvanized} reducedMotion={reducedMotion} />
      <AirFlow coordRef={coordRef} reducedMotion={reducedMotion} count={smallScreen ? 520 : 1100} />
    </>
  );
}
