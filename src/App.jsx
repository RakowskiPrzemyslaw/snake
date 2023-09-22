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
  const [{ round, score, isGameOver }] = useAtom(roundAtom);

  useEffect(() => {}, [isGameOver]);

  return (
    <>
      <div className="fixed z-10 text-white w-full p-2">
        <Logo />
      </div>

      <div className="fixed z-10 flex justify-between w-full bottom-0 text-white p-2">
        <h2 className="text-3xl">{`Score: ${score}`}</h2>

        <h2 className="text-3xl">{`Round: ${round}`}</h2>
      </div>

      <div className="w-full h-full">
        <Canvas>
          <OrthographicCamera
            makeDefault
            zoom={35}
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
