import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Snake } from "./Snake";
import { Letters } from "./Letters";
import { useLetters } from "./hooks/useLetters";

function App() {
  const { eatenLetters } = useLetters();
  return (
    <>
      <h1 className="text-4xl">Snake Game</h1>
      <h2 className="text-3xl">Eaten letters: {eatenLetters} </h2>
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 20] }}>
          <OrbitControls />
          <ambientLight intensity={1} />
          <Snake />
          <Letters />

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
