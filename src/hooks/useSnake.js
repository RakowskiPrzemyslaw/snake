import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { gameBoard } from "../game/Game";
import { collectiblesAtom, roundAtom, snakeAtom } from "../context/game";

const timeAtom = atom(0);
const directionAtom = atom({ x: 0, y: 0 });
let interval;

export function useSnake() {
  const [time, setTime] = useAtom(timeAtom);
  const [direction, setDirection] = useAtom(directionAtom);
  const [snake, setSnake] = useAtom(snakeAtom);
  const [, setCollectibles] = useAtom(collectiblesAtom);
  const [round, setRound] = useAtom(roundAtom);

  const onKeydown = (event) => {
    if (event.key === "Escape") {
      return reset();
    }
    if (!interval) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    if (event.key === "ArrowUp") {
      setDirection((prevDirection) => {
        if (prevDirection.y === -1) return prevDirection;
        return { x: 0, y: 1 };
      });
    }
    if (event.key === "ArrowDown") {
      setDirection((prevDirection) => {
        if (prevDirection.y === 1) return prevDirection;
        return { x: 0, y: -1 };
      });
    }
    if (event.key === "ArrowLeft") {
      setDirection((prevDirection) => {
        if (prevDirection.x === 1) return prevDirection;
        return { x: -1, y: 0 };
      });
    }
    if (event.key === "ArrowRight") {
      setDirection((prevDirection) => {
        if (prevDirection.x === -1) return prevDirection;
        return { x: 1, y: 0 };
      });
    }
  };

  const reset = () => {
    setTime(0);
    setDirection({ x: 0, y: 0 });
    gameBoard.reset();
    setSnake(gameBoard.snakeBody);
    setCollectibles(gameBoard.collectiblesOnBoard);
    clearInterval(interval);
    interval = null;
  };

  useEffect(() => {
    gameBoard.move(direction);

    setSnake([
        {
            position: gameBoard.snakeHead,
        },
        ...gameBoard.snakeBody,
    ]);
    setCollectibles(gameBoard.collectiblesOnBoard);
    setRound({
        round: gameBoard.roundNumber,
        score: gameBoard.score,
        word: gameBoard.wordProgress,
        isGameOver: gameBoard.isGameOver,
    });

  }, [time, direction]);

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);

    return () => {
      clearInterval(interval);
      interval = null;
      document.removeEventListener("keydown", onKeydown);
    };
  }, []);

  useEffect(() => {
    if (round.isGameOver) {
      clearInterval(interval);
      interval = null;
    }
  }, [round]);

  return {
    snake,
  };
}
