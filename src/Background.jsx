import game from "../game.json";

export function Background() {
  const width = game.size.x * 2 + 1;
  const height = game.size.y * 2 + 1;

  return (
    <group>
      <mesh position={[0, 0, -0.5]} receiveShadow>
        <planeGeometry args={[width, height, width, height]} />
        <meshStandardMaterial color="#5c5c5c" />
      </mesh>

      <points castShadow receiveShadow>
        <planeGeometry args={[width, height, width, height]} />
        <pointsMaterial wireframe color="orange" />
      </points>
    </group>
  );
}
