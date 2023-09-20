import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { Snake } from "./Snake";

function App() {
  return (
    <>
      <h1>Snake Game</h1>
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 20] }}>
          <Center>
            <OrbitControls />
            <ambientLight intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <Snake />
            <Center>
              <mesh>
                <planeGeometry args={[21, 21, 21, 21]} />
                <meshStandardMaterial wireframe color="black" />
              </mesh>
            </Center>
          </Center>
        </Canvas>
      </div>
    </>
  );
}

export default App;
