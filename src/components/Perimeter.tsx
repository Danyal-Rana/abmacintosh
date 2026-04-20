"use client";

import { useMemo } from "react";
import * as THREE from "three";

// Pre-create geometry and material to reuse across all 129 bushes
// This saves massive amounts of GPU memory and stops WebGL crashes
const bushGeometry = new THREE.SphereGeometry(0.6, 8, 8);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#3A5F20", roughness: 1 });

function Bush({ position }: { position: [number, number, number] }) {
  // Randomize size slightly for realistic bushes
  const scale = useMemo(() => 0.8 + Math.random() * 0.4, []);
  return (
    <mesh position={position} scale={[scale, scale, scale]} geometry={bushGeometry} material={bushMaterial} />
  );
}

export default function Perimeter() {
  const bushes: [number, number, number][] = [];
  
  // Generating border bushes along the walls
  // North Wall (Top wall, behind planters and BBQ)
  for (let x = -19; x <= 19; x += 1.5) bushes.push([x, 0.5, -34]);
  
  // West Wall (Left wall, continuous hedge BUT with structural gaps for house entrances)
  for (let z = -33; z <= 34; z += 1.5) {
    if (z > -20 && z < -10) continue; // Gap for House Open Passage (Z=-15)
    if (z > 22 && z < 32) continue; // Gap for House Stairs (Z=27.5)
    bushes.push([-19, 0.5, z]);
  }
  
  // South Wall (Bottom Wall, with 7FT opening at X=0)
  for (let x = -19; x <= -4; x += 1.5) bushes.push([x, 0.5, 34]);
  for (let x = 4; x <= 19; x += 1.5) bushes.push([x, 0.5, 34]);

  // Stepping Stones (Running along the West wall from the Planters down)
  const steppingStones: [number, number, number][] = [];
  
  // Horizontal part near Planters
  for (let x = -16; x <= -10; x += 2.5) steppingStones.push([x, 0.02, -20]);
  // Vertical part down left side
  for (let z = -18; z <= 10; z += 3) steppingStones.push([-16.5, 0.02, z]);

  return (
    <group>
      {/* Bushes */}
      {bushes.map((pos, idx) => (
        <Bush key={`bush-${idx}`} position={pos} />
      ))}
      
      {/* Stepping Stones */}
      {steppingStones.map((pos, idx) => (
        <mesh key={`stone-${idx}`} position={pos} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial color="#b0b0b0" />
        </mesh>
      ))}

      {/* Decorative Garden Lights along edges */}
      {[-18, 18].map(x => (
        <group key={`lights-${x}`}>
          {[-30, -15, 0, 15, 30].map((z, idx) => (
             <group key={`light-${idx}`} position={[x, 0, z]}>
                <mesh position={[0, 0.5, 0]}>
                  <cylinderGeometry args={[0.05, 0.05, 1]} />
                  <meshStandardMaterial color="#222" />
                </mesh>
                <mesh position={[0, 1, 0]}>
                  <sphereGeometry args={[0.15]} />
                  <meshStandardMaterial color="#fff" emissive="#ffddaa" emissiveIntensity={1} />
                </mesh>
             </group>
          ))}
        </group>
      ))}
    </group>
  );
}
