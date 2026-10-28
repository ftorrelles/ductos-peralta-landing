"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import * as THREE from "three";
import { cameraAt, REDUCED_MOTION_COORD } from "./timeline";

type CameraRigProps = {
  coordRef: RefObject<number>;
  reducedMotion: boolean;
};

/**
 * Eases the camera between per-chapter keyframes.
 * Desktop: the frustum is shifted so the subject sits right of the text column.
 * Portrait: the camera pulls back and the subject is lifted above the bottom card.
 */
export function CameraRig({ coordRef, reducedMotion }: CameraRigProps) {
  const pose = useRef({ pos: [0, 0, 0], target: [0, 0, 0] });
  const goalPos = useRef(new THREE.Vector3());
  const goalTarget = useRef(new THREE.Vector3());
  const lookAt = useRef(new THREE.Vector3());
  const viewKey = useRef("");
  const initialized = useRef(false);

  useFrame((state, delta) => {
    const { camera, size } = state;
    const portrait = size.width < size.height;
    const wide = size.width >= 768;

    const key = `${size.width}x${size.height}`;
    if (viewKey.current !== key && camera instanceof THREE.PerspectiveCamera) {
      viewKey.current = key;
      const offsetX = wide ? -size.width * 0.17 : 0;
      const offsetY = wide ? 0 : size.height * 0.12;
      camera.setViewOffset(size.width, size.height, offsetX, offsetY, size.width, size.height);
      camera.fov = portrait ? 46 : 36;
      camera.updateProjectionMatrix();
    }

    const c = reducedMotion ? REDUCED_MOTION_COORD : coordRef.current;
    cameraAt(c, pose.current);
    goalTarget.current.fromArray(pose.current.target);
    goalPos.current.fromArray(pose.current.pos);
    if (portrait) goalPos.current.sub(goalTarget.current).multiplyScalar(1.75).add(goalTarget.current);

    if (reducedMotion || !initialized.current) {
      initialized.current = true;
      camera.position.copy(goalPos.current);
      lookAt.current.copy(goalTarget.current);
    } else {
      const k = 1 - Math.exp(-delta * 4.5);
      camera.position.lerp(goalPos.current, k);
      lookAt.current.lerp(goalTarget.current, k);
    }
    camera.lookAt(lookAt.current);
  });

  return null;
}
