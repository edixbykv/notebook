"use client";

import { Suspense, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Lightformer,
  Center,
  AdaptiveDpr,
} from "@react-three/drei";
import * as THREE from "three";

const MODEL = "/models/ferrari.glb";

/** Shared scroll progress (0→1) the parent updates without re-rendering. */
type ProgressRef = MutableRefObject<number>;

function Ferrari({ progress }: { progress: ProgressRef }) {
  // draco decoder served locally from /public/draco — small model (1.8 MB) and
  // no slow CDN round-trip, so it decodes fast and reliably.
  const { scene } = useGLTF(MODEL, "/draco/");
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    // drive left → right, locked directly to scroll progress = perfectly smooth,
    // no easing lag, no bobbing/shaking.
    g.position.x = THREE.MathUtils.lerp(-8, 8, progress.current);
  });

  return (
    <group ref={group}>
      {/* Center the model; long axis is X so the car drives along its length.
          Rotated to read as a clean top-down silhouette on the road. */}
      <Center>
        {/* nose points +X so the car faces its direction of travel (rightward) */}
        <primitive object={scene} rotation={[0, Math.PI, 0]} scale={0.2} />
      </Center>
    </group>
  );
}

/** Studio reflections built from light cards — no HDR download, stays fast. */
function StudioEnv() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer
        intensity={2.4}
        position={[0, 6, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[14, 14, 1]}
        color="#ffffff"
      />
      <Lightformer
        intensity={1.4}
        position={[-6, 4, 3]}
        scale={[8, 8, 1]}
        color="#cfe3ff"
      />
      <Lightformer
        intensity={1.2}
        position={[6, 4, -3]}
        scale={[8, 8, 1]}
        color="#ffd9c2"
      />
    </Environment>
  );
}

export function FerrariScene({ progress }: { progress: ProgressRef }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      // near top-down view so the car sits flat on the dashed road line
      camera={{ position: [0, 12, 2.4], fov: 28 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 10, 4]} intensity={2.4} />
      <directionalLight position={[-6, 8, -4]} intensity={0.9} color="#9ec5ff" />

      <Suspense fallback={null}>
        <Ferrari progress={progress} />
        <StudioEnv />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL, "/draco/");

export default FerrariScene;
