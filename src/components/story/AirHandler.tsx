"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { AIR_HANDLER } from "./ductLayout";
import { createBrushedSteelTexture } from "./textures";
import { into } from "./timeline";

const [WIDTH, HEIGHT, DEPTH] = AIR_HANDLER.size;
/** Front face (toward the viewer, +z) where the fan grille sits. */
const FRONT_Z = DEPTH / 2;
const FAN_RADIUS = 0.42;
const BLADES = [0, 1, 2, 3, 4].map((i) => (i / 5) * Math.PI * 2);

type AirHandlerProps = {
  coordRef: RefObject<number>;
  reducedMotion: boolean;
};

/**
 * A/C air handler (fan coil) feeding the duct run: an opaque galvanized cabinet with a front fan
 * that spins once the air starts flowing, and a sky-blue "cooling" status light.
 * Rendered in local space; DuctNetwork positions it and flies it in with the other pieces.
 */
export function AirHandler({ coordRef, reducedMotion }: AirHandlerProps) {
  const fanRef = useRef<THREE.Group>(null);

  const geometries = useMemo(
    () => ({
      cabinet: new RoundedBoxGeometry(WIDTH, HEIGHT, DEPTH, 4, 0.08),
      grille: new THREE.CircleGeometry(FAN_RADIUS, 48),
      rim: new THREE.TorusGeometry(FAN_RADIUS + 0.02, 0.035, 12, 64),
      guardInner: new THREE.TorusGeometry(0.17, 0.008, 6, 40),
      guardOuter: new THREE.TorusGeometry(0.31, 0.008, 6, 56),
      blade: new THREE.BoxGeometry(0.09, FAN_RADIUS * 0.78, 0.012),
      hub: new THREE.CylinderGeometry(0.075, 0.075, 0.05, 24),
      led: new THREE.SphereGeometry(0.032, 16, 12),
    }),
    [],
  );
  const steelMap = useMemo(() => createBrushedSteelTexture(), []);
  const materials = useMemo(
    () => ({
      cabinet: new THREE.MeshStandardMaterial({
        color: "#c9d1d8",
        map: steelMap,
        metalness: 0.72,
        roughness: 0.42,
        envMapIntensity: 1.05,
      }),
      grille: new THREE.MeshStandardMaterial({ color: "#1b232c", metalness: 0.4, roughness: 0.7 }),
      rim: new THREE.MeshStandardMaterial({ color: "#4d5964", metalness: 0.75, roughness: 0.4 }),
      blade: new THREE.MeshStandardMaterial({ color: "#8a96a2", metalness: 0.7, roughness: 0.38 }),
      led: new THREE.MeshBasicMaterial({ color: "#3FA9F5", toneMapped: false }),
    }),
    [steelMap],
  );

  useEffect(
    () => () => {
      Object.values(geometries).forEach((g) => g.dispose());
      Object.values(materials).forEach((m) => m.dispose());
      steelMap.dispose();
    },
    [geometries, materials, steelMap],
  );

  useFrame((_, delta) => {
    if (reducedMotion || !fanRef.current) return;
    const spin = into(coordRef.current, 3);
    fanRef.current.rotation.z -= Math.min(delta, 0.1) * spin * 9;
  });

  return (
    <group>
      <mesh geometry={geometries.cabinet} material={materials.cabinet} />

      {/* Front fan grille */}
      <group position={[0, 0, FRONT_Z]}>
        <mesh geometry={geometries.grille} material={materials.grille} position={[0, 0, 0.002]} />
        <mesh geometry={geometries.rim} material={materials.rim} position={[0, 0, 0.012]} />
        <group ref={fanRef} position={[0, 0, 0.02]}>
          {BLADES.map((angle) => (
            <group key={angle} rotation={[0, 0, angle]}>
              <mesh
                geometry={geometries.blade}
                material={materials.blade}
                position={[0, FAN_RADIUS * 0.45, 0]}
                rotation={[0, 0.45, 0]}
              />
            </group>
          ))}
          <mesh geometry={geometries.hub} material={materials.rim} rotation={[Math.PI / 2, 0, 0]} />
        </group>
        <mesh geometry={geometries.guardInner} material={materials.rim} position={[0, 0, 0.04]} />
        <mesh geometry={geometries.guardOuter} material={materials.rim} position={[0, 0, 0.04]} />
        <mesh geometry={geometries.led} material={materials.led} position={[WIDTH / 2 - 0.13, HEIGHT / 2 - 0.13, 0.01]} />
      </group>
    </group>
  );
}
