import { animated, useSpring } from "@react-spring/three";
import { Center, OrthographicCamera, Svg } from "@react-three/drei";
import { useAtom } from "jotai";
import { roundAtom } from "./context/game";
import { useEffect } from "react";

const AnimatedOrthographicCamera = animated(OrthographicCamera);

const bgAudio = new Audio("/music/background.mp3");
bgAudio.loop = true;
bgAudio.volume = 0.5;

export function CanvasInterface() {
  const [{ isGameOver }] = useAtom(roundAtom);

  const [springs, api] = useSpring(() => ({
    cameraPosition: [-50, 0, 20],
  }));

  const startGame = () => {
    if (bgAudio.paused) {
      bgAudio.play();
    }

    api.start({
      cameraPosition: [0, 0, 20],
    });
  };

  const gameOver = () => {
    api.start({
      cameraPosition: [50, 0, 20],
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
      <Center position={[-50, 0, 2]}>
        <Svg scale={0.2} src="/play.svg" onClick={startGame} />
      </Center>
      <Center position={[50, 0, 2]}>
        <Svg scale={0.4} src="/game-over.svg" />
      </Center>
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
