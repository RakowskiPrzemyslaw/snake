import { useAtom } from "jotai";
import { roundAtom, roundTimeAtom } from "./context/game";
import { Text } from "@react-three/drei";
import game from '../game.json';

const COLOR = '#000000';

export function Timer() {
  const [roundTime] = useAtom(roundTimeAtom);
  const [{ word }] = useAtom(roundAtom);

  const timeLeft = game.rules.roundTime - roundTime;

  const timeLeftPercentage = timeLeft / game.rules.roundTime;

  return (
    <group>
      <mesh position={[0, 0, -0.5]} receiveShadow castShadow>
        <planeGeometry args={[width, height, width, height]} />
        <meshStandardMaterial color="#5c5c5c" />
      </mesh>
      
      <mesh position={[-3, -11.5, 0]}>
        <circleGeometry
          args={[0.4, 32, Math.PI / 2, 2 * Math.PI * timeLeftPercentage]}
        />
        <meshBasicMaterial color={COLOR} fillOpacity={100} />
        { word.map((char, index) => (
          <Text font="/noto.json" key={index} fillOpacity={char.isCollected ? 100 : 0.5} color={COLOR} fontSize={1} position={[1.2 + index, 0, 1]}>{char.code}</Text>))}
      </mesh>
    </group>
  );
}
