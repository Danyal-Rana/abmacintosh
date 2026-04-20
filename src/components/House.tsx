"use client";

import { useMemo } from "react";
import * as THREE from "three";

// House local coordinate system:
// Origin at X=-50, Z=-35. Total Bounds Width 30, Depth 70.
// Local X: 0 (East/Left) → 30 (West/Right/Lawn side).
// Local Z: 0 (South/Top) → 70 (North/Bottom, street side).

const globalWallMaterial = new THREE.MeshStandardMaterial({ color: "#f0efe9", roughness: 0.9 });
const globalFloorMaterial = new THREE.MeshStandardMaterial({ color: "#d4c8b8", roughness: 0.8 });
const plinthMaterial = new THREE.MeshStandardMaterial({ color: "#8a8176", roughness: 0.9 });
const woodMaterial = new THREE.MeshStandardMaterial({ color: "#5C4033", roughness: 0.7 });

export default function House() {
  const wallHeight = 8;
  const houseElevation = 1.6;

  const Wall = ({ x, z, w, d }: { x: number; z: number; w: number; d: number }) => (
    <mesh position={[x + w / 2, wallHeight / 2, z + d / 2]} material={globalWallMaterial} castShadow receiveShadow>
      <boxGeometry args={[w, wallHeight, d]} />
    </mesh>
  );

  const Staircase = ({ x, z, width, steps = 5, direction = "right" }: { x: number; z: number; width: number; steps?: number, direction?: "right" | "front" | "back" }) => {
    const stepHeight = houseElevation / steps;
    const stepDepth = 0.8;
    return (
      <group position={[x, 0, z]}>
        {Array.from({ length: steps }).map((_, i) => {
          const h = houseElevation - (i + 1) * stepHeight;
          if (h <= 0.01) return null; 
          
          let posX = 0; let posZ = 0;
          if (direction === "right") posX = stepDepth / 2 + i * stepDepth;
          if (direction === "front") posZ = stepDepth / 2 + i * stepDepth;
          if (direction === "back") posZ = -(stepDepth / 2 + i * stepDepth);

          return (
            <mesh key={i} position={[posX, h / 2, posZ]} castShadow receiveShadow>
              <boxGeometry args={[
                direction === "right" ? stepDepth : width, 
                h, 
                direction === "right" ? width : stepDepth
              ]} />
              <meshStandardMaterial color="#999" roughness={0.9} />
            </mesh>
          );
        })}
      </group>
    );
  };

  return (
    <group position={[-50, 0, -35]}>
      {/* Plinth / Foundation for the entire house */}
      <mesh position={[15, houseElevation / 2, 35]} material={plinthMaterial} receiveShadow castShadow>
        <boxGeometry args={[30.5, houseElevation, 70.5]} />
      </mesh>

      <group position={[0, houseElevation, 0]}>
        {/* Floor Base */}
        <mesh position={[12, 0.01, 38]} rotation={[-Math.PI / 2, 0, 0]} material={globalFloorMaterial} receiveShadow>
          <planeGeometry args={[24, 64]} />
        </mesh>
        
        {/* Porch / Entrance Floor Base */}
        <mesh position={[15, 0.01, 63]} rotation={[-Math.PI / 2, 0, 0]} material={globalFloorMaterial} receiveShadow>
          <planeGeometry args={[30, 14]} />
        </mesh>

        {/* --- CONTINUOUS L-SHAPED GALLERY WOOD FLOORING --- */}
        {/* Top/South Gallery (behind bedrooms) */}
        <mesh position={[12, 0.02, 3]} rotation={[-Math.PI / 2, 0, 0]} material={woodMaterial} receiveShadow>
          <planeGeometry args={[24, 6]} />
        </mesh>
        {/* Side/West Gallery (lawn side) */}
        <mesh position={[27, 0.02, 35]} rotation={[-Math.PI / 2, 0, 0]} material={woodMaterial} receiveShadow>
          <planeGeometry args={[6, 70]} />
        </mesh>


        {/* ===== OUTER PERIMETER BOUNDARY WALLS ===== */}
        {/* Top/South Wall (Behind Gallery) */}
        <Wall x={0} z={0} w={30} d={0.5} />
        {/* Left/East Wall */}
        <Wall x={0} z={0} w={0.5} d={70} />
        
        {/* North Wall (Street Side) at Z=69.5 */}
        <Wall x={0} z={69.5} w={5} d={0.5} />     {/* Left pillar of gate */}
        <Wall x={25} z={69.5} w={5} d={0.5} />    {/* Right pillar of gate */}
        {/* Main Gate Mesh (X=5 to 25) */}
        <mesh position={[15, wallHeight / 2, 69.5]} material={woodMaterial} castShadow>
          <boxGeometry args={[20, wallHeight - 1, 0.2]} />
        </mesh>

        {/* Right/West Wall (Lawn Boundary) at X=29.5 */}
        <Wall x={29.5} z={0} w={0.5} d={20} />    {/* Wall down to first stair gap */}
        {/* Gap 1: Z=20 to 26 (Corridor to Lawn) */}
        <Wall x={29.5} z={26} w={0.5} d={36} />   {/* Wall between stairs */}
        {/* Gap 2: Z=62 to 68 (Entrance to Lawn) */}
        <Wall x={29.5} z={68} w={0.5} d={2} />    {/* Final wall corner */}


        {/* ===== INNER HOUSE BOUNDARY (Separating Rooms from Gallery) ===== */}
        {/* Inner Top Wall (Separates Top Gallery from Row 1 Bedrooms) */}
        <Wall x={0} z={6} w={24} d={0.5} />
        
        {/* Inner Right Wall (Separates Rooms from Side Gallery) */}
        <Wall x={24} z={6} w={0.5} d={14} />      {/* Z=6 to 20 (Beside BedRm 2) */}
        {/* Gap at Z=20 to 26 allows Living Lounge -> Side Gallery -> Lawn Stairs! */}
        <Wall x={24} z={26} w={0.5} d={30} />     {/* Z=26 to 56 (Beside BedRm 3 & Drawing Rm) */}
        {/* After Z=56, Porch and Side Gallery are fully open and connected! */}


        {/* ===== INTERIOR WALLS & ROOMS ===== */}
        {/* ROW 1: TWO BEDROOMS (Z=6 to 20) */}
        <Wall x={12} z={6} w={0.5} d={14} />      {/* Center divider b/w Bed 1 and Bed 2 */}
        <Wall x={0} z={20} w={10} d={0.5} />      {/* Bottom wall Bed 1 */}
        <Wall x={14} z={20} w={10} d={0.5} />     {/* Bottom wall Bed 2 */}
        {/* Gap X=10 to 14 for internal doors connecting BedRms to Living Lounge */}

        {/* ROW 2: LIVING LOUNGE, CORRIDOR, BED ROOM (Z=20 to 40) */}
        {/* Corridor path to Lawn is at Z=20 to 26, spanning X=14 to 24 (Bed Rm 3 starts after it) */}
        <Wall x={14} z={26} w={10} d={0.5} />     {/* Wall seprating Corridor from BedRm 3 */}
        <Wall x={14} z={26} w={0.5} d={14} />     {/* Vertical wall separating Living Lounge (left) from BedRm 3 (right) */}
        {/* Living Lounge is giant open space X=0 to 14, spanning Z=20 to 40 */}
        <Wall x={0} z={40} w={9} d={0.5} />       {/* Bottom wall beneath Living Lounge */}
        <Wall x={15} z={40} w={9} d={0.5} />      {/* Bottom wall beneath BedRm 3 */}
        {/* GAP from X=9 to 15 at Z=40! This allows the Inner Gallery to flow directly into the Living Lounge! */}

        {/* ROW 3: KITCHEN, SMALL GALLERY/PASSAGE, DRAWING ROOM (Z=40 to 56) */}
        <Wall x={9} z={40} w={0.5} d={16} />      {/* Kitchen (left) right wall */}
        <Wall x={15} z={40} w={0.5} d={16} />     {/* Drawing Rm (right) left wall */}
        {/* Kitchen bottom wall Z=56 */}
        <Wall x={0} z={56} w={9} d={0.5} />       
        {/* Drawing Rm bottom wall Z=56 */}
        <Wall x={15} z={56} w={9} d={0.5} />      
        
        {/* Small Gallery/Passage is the gap at X=9 to 15! */}
        {/* Inner House Door in the Passage (separating Porch from Inner House) */}
        <mesh position={[12, wallHeight * 0.4, 56]} castShadow>
          <boxGeometry args={[4, wallHeight * 0.75, 0.2]} />
          <meshStandardMaterial color="#5C4033" roughness={0.6} />
        </mesh>

        {/* ROW 4: PORCH & ENTRANCE (Z=56 to 70) */}
        {/* User: "first tehre is no gate and wall b/w porch and entrance" -> Fully removed! This is an open area. */}

        {/* ===== ROOM LABELS ===== */}
        <RoomLabel x={6} z={13} text="Bed Room" />
        <RoomLabel x={18} z={13} text="Bed Room" />
        <RoomLabel x={7} z={30} text="Living Lounge" />
        <RoomLabel x={19} z={33} text="Bed Room" />
        <RoomLabel x={19} z={23} text="Path to Lawn" />
        <RoomLabel x={4.5} z={48} text="Kitchen" />
        <RoomLabel x={19.5} z={48} text="Drawing Rm" />
        <RoomLabel x={12} z={48} text="Inner Gallery" />
        <RoomLabel x={12} z={63} text="Large Open Porch / Entrance Area" />
        
        <RoomLabel x={27} z={36} text="Side Gallery" />
        <RoomLabel x={12} z={3} text="Back Gallery" />
      </group>

      {/* ===== LAWN & STREET STAIRS ===== */}
      
      {/* 1. Stairs from Living Lounge Corridor explicitly to the lawn */}
      {/* Gap is Z=20 to 26. Center is Z=23. */}
      <Staircase x={29.25} z={23} width={6} steps={5} direction="right" />

      {/* 2. Main Lawn Stairs from the Porch/Side Gallery corner */}
      {/* Gap is Z=62 to 68. Center is Z=65. */}
      <Staircase x={29.25} z={65} width={6} steps={5} direction="right" />

      {/* 3. Main Gate Street Stairs */}
      {/* Gate is X=5 to 25. Center is X=15. */}
      <Staircase x={15} z={70} width={20} steps={5} direction="front" />

      {/* Green stair-landing pad near the bottom lawn stairs */}
      <mesh position={[30 + (5 * 0.8) + 2.5, 0.03, 65]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 6]} />
        <meshStandardMaterial color="#A4C639" />
      </mesh>
    </group>
  );
}

import { Text } from "@react-three/drei";
function RoomLabel({ x, z, text }: { x: number; z: number; text: string }) {
  return (
    <Text position={[x, 0.2, z]} rotation={[-Math.PI / 2, 0, 0]} fontSize={1.3} color="#333">
      {text}
    </Text>
  );
}
