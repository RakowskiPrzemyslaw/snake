import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Snake } from "./Snake";
import { Letters } from "./Letters";
import { Background } from "./Background";

import { PostProcessing } from "./PostProcessing";
import { Timer } from "./Timer";

import { HtmlInterface } from "./HtmlInterface";
import { CanvasInterface } from "./CanvasInterface";

function App() {
  return (
    <>
      <HtmlInterface />

      <div className="w-full h-full">
        <Canvas shadows="basic">
          <PostProcessing />

          <CanvasInterface />

          <Float rotationIntensity={0.1} floatIntensity={0.1}>
            <Timer />
            <Background />
            <Snake />
            <Letters />
          </Float>
        </Canvas>
      </div>
    </>
  );
}

export default App;
