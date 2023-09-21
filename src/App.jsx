import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Snake } from "./Snake";
import { Letters } from "./Letters";
import { Background } from "./Background";
import { useAtom } from "jotai";
import { roundAtom } from "./context/game";
import { PostProcessing } from "./PostProcessing";
import { Timer } from "./Timer";
import { Logo } from "./Logo";
import { useEffect } from "react";

function App() {
  const [{ round, score, word, isGameOver }] = useAtom(roundAtom);

  useEffect(() => {}, [isGameOver]);

  return (
    <>
      <div className="fixed z-10 text-white w-full p-2">
        <div className="flex justify-between w-full">
          <div className="flex">
            <Logo />
            <h2 className="text-4xl">{`Score: ${score}`}</h2>
          </div>
          <h2 className="text-4xl">
            {word.map((char, index) => (
              <span
                key={char.code + index}
                className={char.isCollected ? "text-amber-500" : ""}
              >
                {char.code}
              </span>
            ))}
          </h2>
          <h2 className="text-4xl">{`Round: ${round}`}</h2>
        </div>
      </div>
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
          <Timer />

          <PostProcessing />
          <Background />
          <Snake />
          <Letters />
        </Canvas>
      </div>
    </>
  );
}

export default App;
