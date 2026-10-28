"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { AirHandler } from "./AirHandler";
import {
  AIR_HANDLER,
  DIFFUSER,
  DROP_BOTTOM_Y,
  DROP_TOP_Y,
  DROP_X,
  DUCT_RADIUS,
  ELBOW_CENTER,
  ELBOW_RADIUS,
  RUN_END_X,
  RUN_START_X,
  RUN_Y,
  SEGMENT_LENGTH,
  SEGMENT_X,
} from "./ductLayout";
import { REDUCED_MOTION_COORD, smooth } from "./timeline";

type Vec3 = readonly [number, number, number];

type Piece = {
  key: string;
  kind: "unit" | "straight" | "drop" | "elbow" | "diffuser" | "flange";
  position: Vec3;
  rotation: Vec3;
  /** Offset the piece flies in from. */
  from: Vec3;
  /** Delay inside the assembly window (chapter coordinate units). */
  delay: number;
};

const DROP_LENGTH = DROP_TOP_Y - DROP_BOTTOM_Y;
const ALONG_X: Vec3 = [0, 0, -Math.PI / 2];
const RING_X: Vec3 = [0, Math.PI / 2, 0];
const RING_Y: Vec3 = [Math.PI / 2, 0, 0];

const PIECES: readonly Piece[] = [
  { key: "unit", kind: "unit", position: AIR_HANDLER.center.toArray(), rotation: [0, 0, 0], from: [-5, 3, -2.5], delay: 0.04 },
  { key: "s0", kind: "straight", position: [SEGMENT_X[0], RUN_Y, 0], rotation: ALONG_X, from: [-6, 3.5, -3], delay: 0 },
  { key: "s2", kind: "straight", position: [SEGMENT_X[2], RUN_Y, 0], rotation: ALONG_X, from: [5, 4, 2.5], delay: 0.08 },
  { key: "elbow", kind: "elbow", position: [ELBOW_CENTER.x, ELBOW_CENTER.y, 0], rotation: [0, 0, 0], from: [6, -1.5, 4], delay: 0.16 },
  {
    key: "drop",
    kind: "drop",
    position: [DROP_X, (DROP_TOP_Y + DROP_BOTTOM_Y) / 2, 0],
    rotation: [0, 0, 0],
    from: [4, -5, 2],
    delay: 0.24,
  },
  { key: "diffuser", kind: "diffuser", position: DIFFUSER.center.toArray(), rotation: [0, 0, 0], from: [0, -6, 1], delay: 0.3 },
  ...[RUN_START_X, SEGMENT_X[0] + SEGMENT_LENGTH / 2, SEGMENT_X[1] + SEGMENT_LENGTH / 2, RUN_END_X].map(
    (x, i): Piece => ({
      key: `flange-x${i}`,
      kind: "flange",
      position: [x, RUN_Y, 0],
      rotation: RING_X,
      from: [0, 2.5, 0],
      delay: 0.36 + i * 0.03,
    }),
  ),
  { key: "flange-top", kind: "flange", position: [DROP_X, DROP_TOP_Y, 0], rotation: RING_Y, from: [2.5, 0, 0], delay: 0.48 },
];

const ASSEMBLY_START = 1.12;
const ASSEMBLY_DURATION = 0.42;

type DuctNetworkProps = {
  coordRef: RefObject<number>;
  material: THREE.Material;
  reducedMotion: boolean;
};

/** Chapter 3: the A/C unit and the rest of the run fly in and snap around the rolled segment. */
export function DuctNetwork({ coordRef, material, reducedMotion }: DuctNetworkProps) {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  const geometries = useMemo(
    () => ({
      straight: new THREE.CylinderGeometry(DUCT_RADIUS, DUCT_RADIUS, SEGMENT_LENGTH, 64, 1, true),
      drop: new THREE.CylinderGeometry(DUCT_RADIUS, DUCT_RADIUS, DROP_LENGTH, 64, 1, true),
      elbow: new THREE.TorusGeometry(ELBOW_RADIUS, DUCT_RADIUS, 32, 48, Math.PI / 2),
      flange: new THREE.TorusGeometry(DUCT_RADIUS + 0.012, 0.035, 10, 64),
      plenum: new THREE.BoxGeometry(...DIFFUSER.size),
      slat: new THREE.BoxGeometry(DIFFUSER.size[0] - 0.12, 0.025, 0.05),
    }),
    [],
  );
  const darkSteel = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#6B7884", metalness: 0.75, roughness: 0.4 }),
    [],
  );

  useEffect(
    () => () => {
      Object.values(geometries).forEach((g) => g.dispose());
      darkSteel.dispose();
    },
    [geometries, darkSteel],
  );

  useFrame(() => {
    const c = reducedMotion ? REDUCED_MOTION_COORD : coordRef.current;

    PIECES.forEach((piece, i) => {
      const group = groupRefs.current[i];
      if (!group) return;
      const start = ASSEMBLY_START + piece.delay;
      const t = smooth(start, start + ASSEMBLY_DURATION, c);
      const away = 1 - t;

      group.visible = t > 0.001;
      group.position.set(
        piece.position[0] + piece.from[0] * away * away,
        piece.position[1] + piece.from[1] * away * away,
        piece.position[2] + piece.from[2] * away * away,
      );
      group.rotation.set(piece.rotation[0] + away * 1.4, piece.rotation[1] + away * 0.9, piece.rotation[2]);
      const s = piece.kind === "flange" ? Math.max(t, 0.001) : 1;
      group.scale.setScalar(s);
    });
  });

  const slats = [-0.5, -0.25, 0, 0.25, 0.5];

  return (
    <group>
      {PIECES.map((piece, i) => (
        <group
          key={piece.key}
          ref={(node) => {
            groupRefs.current[i] = node;
          }}
          visible={false}
        >
          {piece.kind === "unit" && <AirHandler coordRef={coordRef} reducedMotion={reducedMotion} />}
          {piece.kind === "straight" && <mesh geometry={geometries.straight} material={material} />}
          {piece.kind === "drop" && <mesh geometry={geometries.drop} material={material} />}
          {piece.kind === "elbow" && <mesh geometry={geometries.elbow} material={material} />}
          {piece.kind === "flange" && <mesh geometry={geometries.flange} material={darkSteel} />}
          {piece.kind === "diffuser" && (
            <>
              <mesh geometry={geometries.plenum} material={material} />
              {slats.map((z) => (
                <mesh
                  key={`a${z}`}
                  geometry={geometries.slat}
                  material={darkSteel}
                  position={[0, -DIFFUSER.size[1] / 2 - 0.015, z]}
                />
              ))}
              {slats.map((x) => (
                <mesh
                  key={`b${x}`}
                  geometry={geometries.slat}
                  material={darkSteel}
                  position={[x, -DIFFUSER.size[1] / 2 - 0.04, 0]}
                  rotation={[0, Math.PI / 2, 0]}
                />
              ))}
            </>
          )}
        </group>
      ))}
    </group>
  );
}
