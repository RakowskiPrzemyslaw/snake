import { Canvas } from "@react-three/fiber";
import { Float, Stats } from "@react-three/drei";
import { Snake } from "./Snake";
import { Letters } from "./Letters";
import { Background } from "./Background";

import { PostProcessing } from "./PostProcessing";
import { Timer } from "./Timer";

import { HtmlInterface } from "./HtmlInterface";
import { PCFSoftShadowMap } from "three";
import { CanvasInterface } from "./CanvasInterface";

const bgAudio = new Audio("/music/background.mp3");
bgAudio.loop = true;
bgAudio.volume = 0.4;

function App() {
  return (
    <>
      <HtmlInterface />

      <div className="w-full h-full" onClick={() => { if (bgAudio.paused) { bgAudio.play() } }}>
        <Canvas gl={{ shadowMap: { enabled: true, type: PCFSoftShadowMap } }}>
          <Stats />

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
