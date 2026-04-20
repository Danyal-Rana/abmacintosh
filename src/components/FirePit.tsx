"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FirePit() {
  const fireLightRef = useRef<THREE.PointLight>(null);

  // Simple flicker effect for the fire
  useFrame(({ clock }) => {
    if (fireLightRef.current) {
      fireLightRef.current.intensity = 2 + Math.sin(clock.elapsedTime * 10) * 0.5;
    }
  });

  return (
    <group position={[10, 0, 22]}>
      {/* Stone Circular Paver Area underneath */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5, 32]} />
        <meshStandardMaterial color="#909090" />
      </mesh>

      {/* Fire Pit Outer Stone */}
      <mesh position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1.5, 0.4, 16, 32]} />
        <meshStandardMaterial color="#606060" />
      </mesh>

      {/* Coals / Fire */}
      <mesh position={[0, 0.4, 0]} receiveShadow>
        <cylinderGeometry args={[1.3, 1.3, 0.2]} />
        <meshStandardMaterial color="#200500" />
      </mesh>
      
      {/* Fake Flames */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.8]} />
        <meshStandardMaterial color="#ff5500" emissive="#ff2200" emissiveIntensity={2} />
      </mesh>
      <pointLight ref={fireLightRef} position={[0, 1.5, 0]} color="#ff6600" distance={15} decay={2} />

      {/* Potted Tree nearby */}
      <group position={[4, 0, 3]}>
        {/* Pot */}
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.6, 2, 16]} />
          <meshStandardMaterial color="#d4c9bd" />
        </mesh>
        {/* Trunk */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 2, 8]} />
          <meshStandardMaterial color="#4A3B2C" />
        </mesh>
        {/* Leaves */}
        <mesh position={[0, 4, 0]} castShadow>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshStandardMaterial color="#4f7942" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
