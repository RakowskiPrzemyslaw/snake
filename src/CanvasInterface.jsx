import { animated, useSpring } from "@react-spring/three";
import { OrthographicCamera, Svg } from "@react-three/drei";
import { useAtom } from "jotai";
import { roundAtom } from "./context/game";
import { useEffect } from "react";

const AnimatedOrthographicCamera = animated(OrthographicCamera);

export function CanvasInterface() {
  const [{ isGameOver }] = useAtom(roundAtom);

  const [springs, api] = useSpring(() => ({
    cameraPosition: [-45, 0, 20],
  }));

  const startGame = () => {
    api.start({
      cameraPosition: [0, 0, 20],
    });
  };

  const gameOver = () => {
    api.start({
      cameraPosition: [55, 0, 20],
    });
  };

  useEffect(() => {
    if (isGameOver) {
      gameOver();
    }
  }, [isGameOver]);

  useEffect(() => {
    const onKeydown = (event) => {
      if (event.key === "Enter") {
        startGame();
      }
    };

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return (
    <>
      <Svg
        position={[-50, 0, 2]}
        scale={0.2}
        src="/play.svg"
        onClick={startGame}
      />
      <Svg position={[50, 0, 2]} scale={0.2} src="/game-over.svg" />
      <AnimatedOrthographicCamera
        makeDefault
        zoom={35}
        near={1}
        far={2000}
        position={springs.cameraPosition}
      />
    </>
  );
}
