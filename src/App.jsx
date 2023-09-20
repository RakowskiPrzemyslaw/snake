import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Snake } from "./Snake";

function App() {
  return (
    <>
      <h1>Snake Game</h1>
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 20] }}>
          <OrbitControls />
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <Snake />

          <mesh>
            <planeGeometry args={[21, 21, 21, 21]} />
            <meshStandardMaterial wireframe color="black" />
          </mesh>
        </Canvas>
      </div>
    </>
  );
}

export default App;
