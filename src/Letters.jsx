import { Center, Text3D } from "@react-three/drei";
import { useLetters } from "./hooks/useLetters";

export function Letters() {
  const { letters } = useLetters();

  return (
    <group>
      {letters.map((letter) => {
        return <Letter key={letter.code} letter={letter} />;
      })}
    </group>
  );
}

function Letter({ letter }) {
  return (
    <group>
      <pointLight
        color="orange"
        castShadow
        intensity={6}
        position={[letter.position.x - 0.5, letter.position.y - 0.5, 2]}
      />
      <Center position={[letter.position.x, letter.position.y, 0]}>
        <Text3D
          castShadow
          receiveShadow
          font="/noto.json"
          curveSegments={32}
          bevelEnabled
          bevelSize={0.03}
          bevelThickness={0.05}
          height={0.1}
          size={0.6}
        >
          {letter.code}
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
    </group>
  );
}
