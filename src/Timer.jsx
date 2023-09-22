import { useAtom } from "jotai";
import { roundAtom, roundTimeAtom } from "./context/game";
import { Text } from "@react-three/drei";

export function Timer() {
  const [roundTime] = useAtom(roundTimeAtom);
  const [{ word }] = useAtom(roundAtom);

  const maxTime = 30;

  const timeLeft = maxTime - roundTime;

  const timeLeftPercentage = timeLeft / maxTime;

  return (
    <mesh position={[-3, -11.5, 0]}>
      <circleGeometry
        args={[0.4, 32, Math.PI / 2, 2 * Math.PI * timeLeftPercentage]}
      >
        <meshBasicMaterial
          attach="material"
          color="#ffffff"
          fillOpacity={100}
        />
      </circleGeometry>
      {word.map((char, index) => (
        <Text
          font="/noto.json"
          key={index}
          fillOpacity={char.isCollected ? 100 : 0.5}
          color={0xffffff}
          fontSize={1}
          position={[1.2 + index, 0, 1]}
        >
          {char.code}
        </Text>
      ))}
    </mesh>
  );
}
