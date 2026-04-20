"use client";

import { useMemo } from "react";

export default function Pergola() {
  const slatY = 9;
  return (
    <group position={[12, 0, -26]}>
      {/* Wood Base/Deck under pergola (12x16 offset slightly) */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 17]} />
        <meshStandardMaterial color="#8B5A2B" roughness={0.7} /> {/* Richer wood color */}
      </mesh>

      {/* Pergola Wooden Pillars */}
      {[
        [-7.5, 0, -8],
        [7.5, 0, -8],
        [-7.5, 0, 8],
        [7.5, 0, 8],
      ].map((pos, idx) => (
        <mesh key={idx} position={[pos[0], slatY / 2, pos[2]]} castShadow receiveShadow>
          <boxGeometry args={[0.5, slatY, 0.5]} />
          <meshStandardMaterial color="#3E2723" />
        </mesh>
      ))}

      {/* Pergola Roof Frame Outer */}
      <mesh position={[0, slatY, -8]} castShadow>
        <boxGeometry args={[15.5, 0.6, 0.5]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>
      <mesh position={[0, slatY, 8]} castShadow>
        <boxGeometry args={[15.5, 0.6, 0.5]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>
      <mesh position={[-7.5, slatY, 0]} castShadow>
        <boxGeometry args={[0.5, 0.6, 16.5]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>
      <mesh position={[7.5, slatY, 0]} castShadow>
        <boxGeometry args={[0.5, 0.6, 16.5]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>

      {/* Pergola Roof Slats (Grid) */}
      {Array.from({ length: 8 }).map((_, idx) => (
        <mesh key={`h-${idx}`} position={[0, slatY + 0.3, -7 + idx * 2]} castShadow>
          <boxGeometry args={[15.5, 0.2, 0.2]} />
          <meshStandardMaterial color="#4E342E" />
        </mesh>
      ))}
      
      {/* Glass Roof Panel */}
      <mesh position={[0, slatY + 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[15, 0.1, 16]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} roughness={0.1} metalness={0.5} />
      </mesh>

      {/* L-Shaped Sofa (Light grey/white) */}
      <group position={[1, 0, -5]}>
        {/* Back piece 1 (Horizontal) */}
        <mesh position={[2, 1.2, -1]} castShadow receiveShadow>
          <boxGeometry args={[10, 2.4, 1.5]} />
          <meshStandardMaterial color="#E8E8E8" />
        </mesh>
        {/* Back piece 2 (Vertical right) */}
        <mesh position={[6.25, 1.2, 4]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 2.4, 9]} />
          <meshStandardMaterial color="#E8E8E8" />
        </mesh>
        
        {/* Seat Cushions */}
        <mesh position={[2, 0.6, 0.75]} receiveShadow>
           <boxGeometry args={[8.5, 1.2, 2.5]} />
           <meshStandardMaterial color="#F5F5F5" />
        </mesh>
        <mesh position={[4.5, 0.6, 4]} receiveShadow>
           <boxGeometry args={[2.5, 1.2, 6]} />
           <meshStandardMaterial color="#F5F5F5" />
        </mesh>
      </group>

      {/* Coffee Table Wood */}
      <mesh position={[1, 0.8, 4]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 1.6, 3.5]} />
        <meshStandardMaterial color="#5C4033" />
      </mesh>
    </group>
  );
}
