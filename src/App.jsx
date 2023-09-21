import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Snake } from "./Snake";
import { Letters } from "./Letters";
import { useLetters } from "./hooks/useLetters";
import { Background } from "./Background";

function App() {
  const { eatenLetters } = useLetters();

  return (
    <>
      <h1 className="text-4xl">Snake Game</h1>
      <h2 className="text-3xl">Eaten letters: {eatenLetters} </h2>
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
