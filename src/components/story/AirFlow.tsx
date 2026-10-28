"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { createDuctCurve, DIFFUSER, DUCT_RADIUS, mulberry32, OUTLET } from "./ductLayout";
import { into, REDUCED_MOTION_COORD, SKY, smooth } from "./timeline";

/** Fraction of each particle's life spent inside the duct; the rest is the room spread. */
const DUCT_FRACTION = 0.7;
const LUT_SIZE = 256;

const vertexShader = /* glsl */ `
  attribute vec3 aColor;
  attribute float aAlpha;
  uniform float uSize;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio / max(-mv.z, 0.1);
    vColor = aColor;
    vAlpha = aAlpha;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    if (a <= 0.001) discard;
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
  }
`;

type Particle = {
  phase: number;
  speed: number;
  /** Offset inside the duct cross-section (z axis, binormal). */
  a: number;
  b: number;
  /** Exit direction across the room (unit vector in XZ) and reach. */
  dirX: number;
  dirZ: number;
  reach: number;
  drop: number;
  /** Blend toward cool white (0 = pure sky blue). */
  tint: number;
};

type AirFlowProps = {
  coordRef: RefObject<number>;
  reducedMotion: boolean;
  count: number;
};

/**
 * Chapters 4–5: air already cooled by the A/C unit leaves it (the path starts hidden inside the
 * opaque cabinet), travels the duct centerline and spreads out of the diffuser.
 */
export function AirFlow({ coordRef, reducedMotion, count }: AirFlowProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const { buffers, particles, lut } = useMemo(() => {
    const rand = mulberry32(7);
    const list: Particle[] = Array.from({ length: count }, () => {
      const r = Math.sqrt(rand()) * DUCT_RADIUS * 0.72;
      const ang = rand() * Math.PI * 2;
      const exitAng = rand() * Math.PI * 2;
      return {
        phase: rand(),
        speed: 0.07 + rand() * 0.05,
        a: Math.cos(ang) * r,
        b: Math.sin(ang) * r,
        dirX: Math.cos(exitAng),
        dirZ: Math.sin(exitAng),
        reach: 0.6 + rand() * 2.4,
        drop: 1.2 + rand() * 1.6,
        tint: 0.04 + rand() * 0.32,
      };
    });

    // Arc-length lookup table of the centerline: positions + tangents.
    const curve = createDuctCurve();
    const points = new Float32Array(LUT_SIZE * 3);
    const tangents = new Float32Array(LUT_SIZE * 3);
    const p = new THREE.Vector3();
    const t = new THREE.Vector3();
    for (let i = 0; i < LUT_SIZE; i++) {
      const u = i / (LUT_SIZE - 1);
      curve.getPointAt(u, p);
      curve.getTangentAt(u, t);
      points.set([p.x, p.y, p.z], i * 3);
      tangents.set([t.x, t.y, t.z], i * 3);
    }

    const buffers = {
      position: new Float32Array(count * 3),
      color: new Float32Array(count * 3),
      alpha: new Float32Array(count),
    };

    return { buffers, particles: list, lut: { points, tangents } };
  }, [count]);

  const uniforms = useMemo(
    () => ({ uSize: { value: 70 }, uPixelRatio: { value: 1 }, uOpacity: { value: 0 } }),
    [],
  );

  useFrame((state) => {
    const c = reducedMotion ? REDUCED_MOTION_COORD : coordRef.current;
    const material = materialRef.current;
    const geometry = geometryRef.current;
    if (!material || !geometry) return;

    const flow = into(c, 3);
    material.uniforms.uOpacity.value = flow;
    material.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    if (flow <= 0.001) return;

    const exitVisible = into(c, 4);
    const time = reducedMotion ? 0 : state.clock.elapsedTime;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const col = geometry.attributes.aColor as THREE.BufferAttribute;
    const alpha = geometry.attributes.aAlpha as THREE.BufferAttribute;
    const { points, tangents } = lut;
    const halfX = DIFFUSER.size[0] * 0.42;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const life = (p.phase + time * p.speed) % 1;

      if (life < DUCT_FRACTION) {
        const k = life / DUCT_FRACTION;
        const f = k * (LUT_SIZE - 1);
        const i0 = Math.floor(f);
        const i1 = Math.min(i0 + 1, LUT_SIZE - 1);
        const w = f - i0;
        const px = points[i0 * 3] + (points[i1 * 3] - points[i0 * 3]) * w;
        const py = points[i0 * 3 + 1] + (points[i1 * 3 + 1] - points[i0 * 3 + 1]) * w;
        const pz = points[i0 * 3 + 2] + (points[i1 * 3 + 2] - points[i0 * 3 + 2]) * w;
        const tx = tangents[i0 * 3];
        const ty = tangents[i0 * 3 + 1];
        // The path lies in the XY plane, so Z is always a normal; binormal = T × Z = (ty, -tx, 0).
        pos.setXYZ(i, px + ty * p.b, py - tx * p.b, pz + p.a);

        // Already-cooled supply air: sky blue with a per-particle hint of cool white (no shift along the path).
        col.setXYZ(
          i,
          (SKY[0] + (255 - SKY[0]) * p.tint) / 255,
          (SKY[1] + (255 - SKY[1]) * p.tint) / 255,
          (SKY[2] + (255 - SKY[2]) * p.tint) / 255,
        );
        alpha.setX(i, smooth(0, 0.04, k) * (1 - smooth(0.97, 1, k) * (1 - exitVisible)));
      } else {
        // Out of the diffuser: fan out across the room and fall gently.
        const e = (life - DUCT_FRACTION) / (1 - DUCT_FRACTION);
        const spread = 1 - (1 - e) * (1 - e);
        pos.setXYZ(
          i,
          OUTLET.x + p.dirX * (halfX * 0.6 + p.reach * spread),
          OUTLET.y - p.drop * e * e - 0.15 * e,
          OUTLET.z + p.dirZ * (halfX * 0.6 + p.reach * spread),
        );
        col.setXYZ(i, SKY[0] / 255 + 0.25 * e, SKY[1] / 255 + 0.12 * e, SKY[2] / 255);
        alpha.setX(i, Math.pow(1 - e, 1.4) * exitVisible * 0.8);
      }
    }

    pos.needsUpdate = true;
    col.needsUpdate = true;
    alpha.needsUpdate = true;
  });

  return (
    <points frustumCulled={false} renderOrder={3}>
      <bufferGeometry key={count} ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[buffers.position, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[buffers.color, 3]} />
        <bufferAttribute attach="attributes-aAlpha" args={[buffers.alpha, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
