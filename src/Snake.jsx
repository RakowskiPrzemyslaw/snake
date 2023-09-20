import { useSnake } from "./hooks/useSnake";

export function Snake() {
  const { snake } = useSnake();

  return (
    <group>
      {snake.map((segment, index) => {
        return (
          <mesh
            key={index}
            position={[segment.position.x, segment.position.y, 0]}
          >
            <boxGeometry args={[1, 1, 0.5]} />
            <meshStandardMaterial color="green" />
          </mesh>
        );
      })}
    </group>
  );
}
