import { Canvas } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  OrthographicCamera,
  Stats,
} from "@react-three/drei";
import { Snake } from "./Snake";
import { Letters } from "./Letters";
import { Background } from "./Background";

import { PostProcessing } from "./PostProcessing";
import { Timer } from "./Timer";

import { HtmlInterface } from "./HtmlInterface";
import { PCFSoftShadowMap } from "three";

function App() {
  return (
    <>
      <audio autoPlay loop>
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>
      <HtmlInterface />

      <div className="w-full h-full">
        <Canvas gl={{ shadowMap: { enabled: true, type: PCFSoftShadowMap } }}>
          <Stats />
          <OrthographicCamera
            makeDefault
            zoom={35}
            near={1}
            far={2000}
            position={[0, 0, 20]}
          />

          <OrbitControls />
          <PostProcessing />

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
