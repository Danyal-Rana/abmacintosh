"use client";

import { useMemo } from "react";
import * as THREE from "three";

// Reuse geometries for performance
const boxGeo = new THREE.BoxGeometry(4, 2, 4);
const soilGeo = new THREE.PlaneGeometry(3.6, 3.6);
const plantGeo1 = new THREE.SphereGeometry(0.8, 16, 16);
const plantGeo2 = new THREE.SphereGeometry(0.6, 16, 16);

// High quality Corten Steel / Wood
const boxMat = new THREE.MeshStandardMaterial({ color: "#5c3a21", roughness: 0.9, metalness: 0.1 });
const soilMat = new THREE.MeshStandardMaterial({ color: "#1a120b", roughness: 1.0 });
const plantMat = new THREE.MeshStandardMaterial({ color: "#3a6020", roughness: 0.8 });
const plantMatLight = new THREE.MeshStandardMaterial({ color: "#4a7030", roughness: 0.8 });

function PlanterBox({ position }: { position: [number, number, number] }) {
  // Rotate plants randomly for variety
  const rot1 = useMemo(() => Math.random() * Math.PI, []);
  
  return (
    <group position={position}>
      {/* Box Outer */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow geometry={boxGeo} material={boxMat} />
      
      {/* Soil Inside */}
      <mesh position={[0, 1.95, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow geometry={soilGeo} material={soilMat} />
      
      {/* Plants Group */}
      <group position={[0, 2, 0]} rotation={[0, rot1, 0]}>
        <mesh position={[-0.8, 0.4, -0.8]} castShadow geometry={plantGeo1} material={plantMat} />
        <mesh position={[0.8, 0.3, 0.8]} castShadow geometry={plantGeo2} material={plantMatLight} />
        <mesh position={[0.5, 0.5, -0.6]} castShadow geometry={plantGeo2} material={plantMat} />
        <mesh position={[-0.5, 0.4, 0.8]} castShadow geometry={plantGeo1} material={plantMatLight} />
      </group>
    </group>
  );
}

export default function Planters() {
  // 2x3 Grid on the Top-Left (North-West)
  const positions: [number, number, number][] = [
    // Column 1 (Far left)
    [-17, 0, -32],
    [-17, 0, -27],
    [-17, 0, -22],
    // Column 2 (Left-center)
    [-12, 0, -32],
    [-12, 0, -27],
    [-12, 0, -22],
  ];

  return (
    <group>
      {positions.map((pos, idx) => (
        <PlanterBox key={idx} position={pos} />
      ))}
    </group>
  );
}
