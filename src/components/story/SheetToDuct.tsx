"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { DUCT_RADIUS, SEGMENT_LENGTH, SHEET_CENTER } from "./ductLayout";
import { createBlueprintTexture } from "./textures";
import { into, REDUCED_MOTION_COORD, smooth } from "./timeline";

const SHEET_WIDTH = 2 * Math.PI * DUCT_RADIUS; // perimeter of the finished duct
const SEGMENTS_U = 80;
const SEGMENTS_V = 20;

/**
 * Rolls a flat sheet into a cylinder while preserving arc length.
 * Bend radius goes from infinity (t = 0, flat) to DUCT_RADIUS (t = 1, closed tube).
 * The tube axis is local Y and its center ends at the local origin.
 */
function bend(u: number, v: number, t: number, out: THREE.Vector3): THREE.Vector3 {
  if (t < 1e-4) return out.set(u, v, 0);
  const r = DUCT_RADIUS / t;
  const theta = u / r;
  return out.set(r * Math.sin(theta), v, r * Math.cos(theta) - r + DUCT_RADIUS * t);
}

type SheetToDuctProps = {
  coordRef: RefObject<number>;
  material: THREE.Material;
  reducedMotion: boolean;
};

/** Chapter 1–2: the galvanized sheet that becomes segment S1 of the duct run. */
export function SheetToDuct({ coordRef, material, reducedMotion }: SheetToDuctProps) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const seamRef = useRef<THREE.Mesh>(null);
  const overlayRef = useRef<THREE.MeshBasicMaterial>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);
  const overlayMeshRef = useRef<THREE.Mesh>(null);
  /** Flat vertex positions, captured once from the plane geometry. */
  const baseRef = useRef<Float32Array | null>(null);
  const lastT = useRef(-1);

  const blueprint = useMemo(() => createBlueprintTexture(), []);
  useEffect(() => () => blueprint.dispose(), [blueprint]);

  useFrame((state) => {
    const c = reducedMotion ? REDUCED_MOTION_COORD : coordRef.current;
    const outer = outerRef.current;
    const inner = innerRef.current;
    const geometry = geometryRef.current;
    if (!outer || !inner || !geometry) return;

    // The blueprint overlay shares the morphing geometry.
    const overlayMesh = overlayMeshRef.current;
    if (overlayMesh && overlayMesh.geometry !== geometry) overlayMesh.geometry = geometry;
    if (!baseRef.current) baseRef.current = Float32Array.from(geometry.attributes.position.array);
    const base = baseRef.current;

    // Rolling happens in the transition into chapter 1 (skipped for reduced motion).
    const roll = reducedMotion ? 1 : into(c, 1);
    const t = roll * roll * (3 - 2 * roll);

    if (Math.abs(t - lastT.current) > 1e-4) {
      lastT.current = t;
      const position = geometry.attributes.position as THREE.BufferAttribute;
      const tmp = new THREE.Vector3();
      for (let i = 0; i < position.count; i++) {
        bend(base[i * 3], base[i * 3 + 1], t, tmp);
        position.setXYZ(i, tmp.x, tmp.y, tmp.z);
      }
      position.needsUpdate = true;
      geometry.computeVertexNormals();
      geometry.computeBoundingSphere();

      if (seamRef.current) bend(SHEET_WIDTH / 2, 0, t, seamRef.current.position);
    }

    // Lay the tube down along the run (chapter 2) with the lock seam on top.
    const layDown = reducedMotion ? 1 : into(c, 2);
    const showcase = 1 - smooth(0.6, 1.6, c);
    const time = reducedMotion ? 0 : state.clock.elapsedTime;

    outer.position.copy(SHEET_CENTER);
    outer.position.y += showcase * Math.sin(time * 0.9) * 0.06;
    outer.rotation.set(-0.28 * showcase, Math.sin(time * 0.35) * 0.45 * showcase, (-Math.PI / 2) * layDown);
    inner.rotation.y = (Math.PI / 2) * layDown;

    if (overlayRef.current) overlayRef.current.opacity = 1 - smooth(0.05, 0.55, c);
  });

  return (
    <group ref={outerRef}>
      <group ref={innerRef}>
        <mesh material={material}>
          <planeGeometry ref={geometryRef} args={[SHEET_WIDTH, SEGMENT_LENGTH, SEGMENTS_U, SEGMENTS_V]} />
        </mesh>
        <mesh ref={overlayMeshRef} renderOrder={2}>
          <meshBasicMaterial
            ref={overlayRef}
            map={blueprint}
            transparent
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
            toneMapped={false}
          />
        </mesh>
        <mesh ref={seamRef}>
          <boxGeometry args={[0.035, SEGMENT_LENGTH, 0.035]} />
          <meshStandardMaterial color="#6B7884" metalness={0.7} roughness={0.45} />
        </mesh>
      </group>
    </group>
  );
}
