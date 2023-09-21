import { Center, Text3D } from "@react-three/drei";
import { useLetters } from "./hooks/useLetters";

export function Letters() {
  const { letters } = useLetters();

  return (
    <group>
      {letters.map((letter) => {
        return (
          <Center
            key={letter.code}
            position={[letter.position.x, letter.position.y, 0]}
          >
            <Text3D
              font="/inter.json"
              curveSegments={32}
              bevelEnabled
              bevelSize={0.04}
              bevelThickness={0.1}
              height={0.1}
              lineHeight={0.5}
              letterSpacing={-0.06}
              size={0.8}
            >
              {letter.code}
              <meshStandardMaterial color="white" />
            </Text3D>
          </Center>
        );
      })}
    </group>
  );
}
