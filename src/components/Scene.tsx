"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import BaseLawn from "./BaseLawn";
import Planters from "./Planters";
import BBQArea from "./BBQArea";
import Pergola from "./Pergola";
import FirePit from "./FirePit";
import Perimeter from "./Perimeter";
import House from "./House";

import { Suspense } from "react";

export default function Scene() {
  return (
    <div className="w-full h-screen bg-neutral-900">
      <Canvas camera={{ position: [0, 45, 45], fov: 50 }} shadows>
        <color attach="background" args={["#f0f0f0"]} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 40, 20]} 
          intensity={1.5} 
          castShadow
          shadow-mapSize={[2048, 2048]}
        >
          <orthographicCamera attach="shadow-camera" args={[-40, 40, 40, -40, 1, 100]} />
        </directionalLight>
        <OrbitControls 
          target={[0, 0, 0]} 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2 - 0.1}
          maxDistance={100}
        />
        
        <Suspense fallback={null}>
          <group>
            <BaseLawn />
            <Planters />
            <BBQArea />
            <Pergola />
            <FirePit />
            <Perimeter />
            <House />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
