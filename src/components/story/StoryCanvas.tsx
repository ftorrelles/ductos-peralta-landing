"use client";

import { Canvas } from "@react-three/fiber";
import type { RefObject } from "react";
import { DuctScene } from "./DuctScene";

type StoryCanvasProps = {
  coordRef: RefObject<number>;
  /** Whether the story section is near the viewport. Off-screen, the render loop stops. */
  active: boolean;
  reducedMotion: boolean;
};

/** Client-only WebGL canvas (loaded with `next/dynamic` + `ssr: false`). */
export default function StoryCanvas({ coordRef, active, reducedMotion }: StoryCanvasProps) {
  const frameloop = reducedMotion ? "demand" : active ? "always" : "never";

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 36, near: 0.1, far: 60, position: [-1.2, 1.9, 4.6] }}
      style={{ background: "transparent" }}
    >
      <DuctScene coordRef={coordRef} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
