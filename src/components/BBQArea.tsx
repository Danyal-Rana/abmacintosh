"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function BBQArea() {
  const counterGeo = useMemo(() => new THREE.BoxGeometry(13, 3.6, 3), []);
  const counterMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#e8ede4", roughness: 1.0 }), []); // Light stone base
  const topGeo = useMemo(() => new THREE.BoxGeometry(13.5, 0.2, 3.5), []);
  const topMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f5f5f5", roughness: 0.1, metalness: 0.1 }), []); // Polished marble top

  return (
    <group position={[-2.5, 0, -33.5]}>
      {/* Main Counter Base */}
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow geometry={counterGeo} material={counterMat} />
      
      {/* Counter Top */}
      <mesh position={[0, 3.7, 0]} castShadow receiveShadow geometry={topGeo} material={topMat} />

      {/* Grill Insert */}
      <mesh position={[2, 3.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.4, 2.5]} />
        <meshStandardMaterial color="#303030" metalness={0.9} roughness={0.2} /> {/* Steel/Black Grill base */}
      </mesh>
      <mesh position={[2, 4.25, -1]} castShadow receiveShadow>
        <boxGeometry args={[4, 1.5, 0.2]} />
        <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.2} /> {/* Grill Lid Open */}
      </mesh>

      {/* Sink */}
      <mesh position={[-4, 3.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.05, 1.8]} />
        <meshStandardMaterial color="#505050" metalness={0.7} />
      </mesh>
      {/* Faucet */}
      <mesh position={[-4, 4.15, -0.6]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.8]} />
        <meshStandardMaterial color="#c0c0c0" metalness={1.0} roughness={0.1} />
      </mesh>

      {/* Front Cabinets (Decorative inset rectangles on the front of counter) */}
      {[-5, -1, 3, 5].map((x, i) => (
        <mesh key={`cab-${i}`} position={[x, 1.8, 1.51]} receiveShadow>
          <boxGeometry args={[1.5, 2.5, 0.05]} />
          <meshStandardMaterial color="#3E2723" roughness={0.8} /> {/* Dark wood cabinets */}
        </mesh>
      ))}

      {/* Bar Stools positioned neatly in front */}
      {[-5, 0, 5].map((x, i) => (
        <group key={`stool-${i}`} position={[x, 0, 3]}>
          <mesh position={[0, 1.4, 0]} castShadow>
             <cylinderGeometry args={[0.7, 0.7, 0.15, 16]} />
             <meshStandardMaterial color="#2E2E2E" roughness={0.6} /> {/* Black cushion */}
          </mesh>
          <mesh position={[0, 0.7, 0]} castShadow>
             <cylinderGeometry args={[0.1, 0.4, 1.4, 8]} />
             <meshStandardMaterial color="#A0A0A0" metalness={0.8} /> {/* Metal leg */}
          </mesh>
        </group>
      ))}
    </group>
  );
}
