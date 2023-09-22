import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Snake } from "./Snake";
import { Letters } from "./Letters";
import { Background } from "./Background";

import { PostProcessing } from "./PostProcessing";
import { Timer } from "./Timer";

import { HtmlInterface } from "./HtmlInterface";

function App() {
  return (
    <>
      <HtmlInterface />

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
