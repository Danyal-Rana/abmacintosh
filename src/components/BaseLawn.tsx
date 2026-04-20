"use client";

export default function BaseLawn() {
  return (
    <group>
      {/* High-quality Grass Ground Plane */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 70]} />
        <meshStandardMaterial color="#4A7030" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Paved BBQ Area Stone Tiles */}
      <mesh position={[-3, 0.01, -29.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 11]} />
        <meshStandardMaterial color="#999388" roughness={1.0} />
      </mesh>

      {/* Perimeter Walls (Elegant Grey Concrete) */}
      <group>
        {/* North Wall */}
        <mesh position={[0, 1.5, -35]} receiveShadow castShadow>
          <boxGeometry args={[40.5, 3, 0.5]} />
          <meshStandardMaterial color="#A0A0A0" roughness={0.9} />
        </mesh>
        
        {/* South Wall (with the 7 FT opening) */}
        <mesh position={[-14.25, 1.5, 35]} receiveShadow castShadow>
          <boxGeometry args={[12, 3, 0.5]} />
          <meshStandardMaterial color="#A0A0A0" roughness={0.9} />
        </mesh>
        <mesh position={[14.25, 1.5, 35]} receiveShadow castShadow>
          <boxGeometry args={[12, 3, 0.5]} />
          <meshStandardMaterial color="#A0A0A0" roughness={0.9} />
        </mesh>
        
        {/* Wooden path at the 7FT opening on South Wall */}
        <mesh position={[0, 0.02, 35]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[7, 4]} />
          <meshStandardMaterial color="#5C4033" roughness={0.8} />
        </mesh>

        {/* West Boundary is the House, so NO wall here (House connects at X=-20) */}
        
        {/* East Wall (Right Wall) */}
        <mesh position={[20, 1.5, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.5, 3, 70.5]} />
          <meshStandardMaterial color="#A0A0A0" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
