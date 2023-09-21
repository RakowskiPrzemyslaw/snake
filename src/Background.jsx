import { useThree } from "@react-three/fiber";
import game from "../game.json";

export function Background() {
  const { gl } = useThree();

  gl.shadowMap.enabled = true;

  const width = game.size.x * 2 + 1;
  const height = game.size.y * 2 + 1;

  return (
    <group>
      <mesh position={[0, 0, -0.5]} receiveShadow castShadow>
        <planeGeometry args={[width, height, width, height]} />
        <meshStandardMaterial color="#5c5c5c" />
      </mesh>

      <points>
        <planeGeometry args={[width, height, width, height]} />
        <pointsMaterial wireframe color="orange" />
      </points>
    </group>
  );
}
