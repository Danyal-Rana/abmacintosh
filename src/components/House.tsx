"use client";

import { useMemo } from "react";
import * as THREE from "three";

// House local coordinate system:
// Origin at X=-50, Z=-35. Width 30, Depth 70.
// Local X goes 0 to 30 (East to West). Lawn is at Local X=30.
// Local Z goes 0 to 70 (South to North).
// House local coordinate system:
// Origin at X=-50, Z=-35. Width 30, Depth 70.
// Local X goes 0 to 30 (East to West). Lawn is at Local X=30.
// Local Z goes 0 to 70 (South to North).

const globalWallMaterial = new THREE.MeshStandardMaterial({ color: "#f0efe9", roughness: 0.9 });
const globalFloorMaterial = new THREE.MeshStandardMaterial({ color: "#d4c8b8", roughness: 0.8 });

export default function House() {
  const wallHeight = 8;
  
  // Helper for generating walls cleanly without mounting JSX vars
  const Wall = ({ x, z, w, d }: { x: number, z: number, w: number, d: number }) => (
    <mesh position={[x + w/2, wallHeight/2, z + d/2]} material={globalWallMaterial} castShadow receiveShadow>
      <boxGeometry args={[w, wallHeight, d]} />
    </mesh>
  );

  return (
    <group position={[-50, 0, -35]}>
      {/* Floor Base */}
      <mesh position={[15, 0.01, 35]} rotation={[-Math.PI/2, 0, 0]} material={globalFloorMaterial} receiveShadow>
        <planeGeometry args={[30, 70]} />
      </mesh>

      {/* Outer Perimeter Walls */}
      <Wall x={0} z={0} w={30} d={0.5} /> {/* South Wall (Top of map) */}
      <Wall x={0} z={69.5} w={30} d={0.5} /> {/* North Wall (Bottom of map) */}
      <Wall x={0} z={0} w={0.5} d={70} /> {/* East Wall (Left of map) */}
      
      {/* West Wall (Right of map, facing Lawn). Has two huge gaps! */}
      <Wall x={29.5} z={0} w={0.5} d={15} /> {/* Wall closing Open Passage/Gal on top right */}
      <Wall x={29.5} z={25} w={0.5} d={30} /> {/* Wall closing Middle Right Bed Room & Drawing Room */}
      {/* Gap 1 (Z=15 to 25): Entrance from Living Lounge */}
      {/* Gap 2 (Z=55 to 70): Stairs from Porch */}

      {/* Inner Walls Top Row (Z = 0 to 15) */}
      <Wall x={0} z={15} w={25} d={0.5} /> {/* Horizontal separating top bedrooms from below */}
      <Wall x={12.5} z={0} w={0.5} d={15} /> {/* Vertical separating Top-Left Bed Room and Top-Right Bed Room */}
      <Wall x={25} z={0} w={0.5} d={15} /> {/* Vertical separating Top-Right Bed Room from Open Passage/Gal */}

      {/* Inner Walls Middle Row (Z = 15 to 45) */}
      <Wall x={15} z={25} w={0.5} d={20} /> {/* Vertical separating Living Lounge from Middle-Right Bed Room */}
      <Wall x={15} z={25} w={15} d={0.5} /> {/* Horizontal separating Middle-Right Bed Room from the Passage gap */}
      <Wall x={0} z={44.5} w={30} d={0.5} /> {/* Horizontal below Living Lounge & Bed Room */}

      {/* Inner Walls Lower Row (Z = 45 to 55) */}
      <Wall x={15} z={45} w={0.5} d={10} /> {/* Vertical separating Kitchen from Drawing Room */}
      <Wall x={0} z={54.5} w={30} d={0.5} /> {/* Horizontal separating Kitchen/Drawing Room from Porch/Entrance */}

      {/* Porch / Entrance Area (Z = 55 to 70) */}
      <Wall x={15} z={55} w={0.5} d={15} /> {/* Vertical separating Porch from Entrance Door/Stairs area */}

      {/* Decorative Texts mapping out the rooms to verify! */}
      {/* Left Column */}
      <RoomLabel x={6} z={7.5} text="Bed Room" />
      <RoomLabel x={7.5} z={30} text="Living Lounge" />
      <RoomLabel x={7.5} z={50} text="Kitchen" />
      <RoomLabel x={7.5} z={62.5} text="Porch" />
      {/* Right Column */}
      <RoomLabel x={18} z={7.5} text="Bed Room" />
      <RoomLabel x={27.5} z={7.5} text="Gal" />
      <RoomLabel x={22.5} z={35} text="Bed Room" />
      <RoomLabel x={22.5} z={50} text="Drawing Rm" />

      {/* Lawn Entrances */}
      {/* 1. Passage between Bedrooms */}
      <group position={[22.5, 0, 20]}>
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
          <planeGeometry args={[15, 4]} />
          <meshStandardMaterial color="#A0B0C0" />
        </mesh>
      </group>

      {/* 2. Stairs from Porch */}
      <group position={[25, 0, 62.5]} rotation={[0, -Math.PI/2, 0]}>
        {[0, 1, 2].map((step) => (
          <mesh key={step} position={[-0.5 - step*0.5, 0.15 + step*0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.3, 8]} />
            <meshStandardMaterial color="#888" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

import { Text } from "@react-three/drei";
function RoomLabel({ x, z, text }: { x: number, z: number, text: string }) {
  return (
    <Text position={[x, 0.2, z]} rotation={[-Math.PI/2, 0, 0]} fontSize={1.5} color="#333">
      {text}
    </Text>
  );
}
