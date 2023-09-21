import game from "../game.json";

export function Background() {
  const width = game.size.x * 2 + 1;
  const height = game.size.y * 2 + 1;

  return (
    <group>
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[width, height, width, height]} />
        <meshBasicMaterial color="#251D0D" />
      </mesh>

      <mesh>
        <planeGeometry args={[width, height, width, height]} />
        <meshStandardMaterial
          wireframe
          color="white"
          wireframeLinewidth={1}
          wireframeLinejoin="round"
        />
      </mesh>
    </group>
  );
}
