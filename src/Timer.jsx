import { useAtom } from "jotai";
import { roundTimeAtom } from "./context/game";

export function Timer() {
  const [roundTime] = useAtom(roundTimeAtom);

  const maxTime = 30;

  const timeLeft = maxTime - roundTime;

  const timeLeftPercentage = timeLeft / maxTime;

  return (
    <mesh position={[11, 11, 1]}>
      <circleGeometry
        args={[0.5, 32, Math.PI / 2, 2 * Math.PI * timeLeftPercentage]}
      />
      <meshNormalMaterial color="orange" />
    </mesh>
  );
}
