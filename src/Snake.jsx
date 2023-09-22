import {
  GradientTexture,
  GradientType,
  Mask,
  useMask,
} from "@react-three/drei";
import { useSnake } from "./hooks/useSnake";
import game from "../game.json";

export function Snake() {
  const { snake } = useSnake();
  const stencil = useMask(1);

  const width = game.size.x * 2 + 1;
  const height = game.size.y * 2 + 1;

  return (
    <group>
      <mesh position={[0, 0, 1]}>
        <planeGeometry args={[width, height, width, height]} />
        <meshBasicMaterial {...stencil}>
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={["aquamarine", "hotpink", "yellow"]}
            type={GradientType.Radial}
          />
        </meshBasicMaterial>
      </mesh>
      {snake.map((segment, index) => {
        return (
          <group key={index}>
            {index === 0 && (
              <pointLight
                intensity={6}
                position={[segment.position.x, segment.position.y, 1]}
                color="hotpink"
              />
            )}

            <Mask
              castShadow
              colorWrite
              id={1}
              position={[segment.position.x, segment.position.y, 0]}
            >
              <boxGeometry args={[1, 1, 0.5]} />
              <meshBasicMaterial />
            </Mask>
          </group>
        );
      })}
    </group>
  );
}
