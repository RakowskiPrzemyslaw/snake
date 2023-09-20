import { Center } from "@react-three/drei";

export function Snake() {
  return (
    <Center back position={[-10, 10, 0.5]}>
      <mesh>
        <boxGeometry args={[1, 1, 0.5]} />
        <meshStandardMaterial />
      </mesh>
    </Center>
  );
}
