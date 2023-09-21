import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Snake } from "./Snake";
import { Letters } from "./Letters";
import { Background } from "./Background";
import { useAtom } from "jotai";
import { roundAtom } from "./context/game";

function App() {
  const [{ round, score, word, isGameOver }] = useAtom(roundAtom);

  return (
    <>
      <h1 className="text-4xl">Snake Game</h1>
      <h2 className="text-4xl">{`Score: ${score}`}</h2>
      <h2 className="text-4xl">{`Round: ${round}`}</h2>
      <h2 className="text-4xl">{`Word to find: ${word.map((char) => char.code).join('')}`}</h2>
      <h2 className="text-4xl">{`Word collected: ${word.map((char) => char.isCollected ? char.code : '_').join('')}`}</h2>
      {isGameOver && <h2 className="text-4xl">Game Over</h2>}
      <div className="w-full h-full">
        <Canvas>
          <OrthographicCamera
            makeDefault
            zoom={40}
            near={1}
            far={2000}
            position={[0, 0, 20]}
          />
          <OrbitControls />

          <Background />
          <Snake />
          <Letters />
        </Canvas>
      </div>
    </>
  );
}

export default App;
