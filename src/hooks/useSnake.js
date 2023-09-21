import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useLetters } from "./useLetters";
import game from "../../game.json";

const timeAtom = atom(0);
const directionAtom = atom({ x: 0, y: 0 });
const snakeAtom = atom([{ position: { x: 0, y: 0 } }]);
let interval;

export function useSnake() {
  const [time, setTime] = useAtom(timeAtom);
  const [direction, setDirection] = useAtom(directionAtom);
  const [snake, setSnake] = useAtom(snakeAtom);
  const { eatLetter, letters, resetLetters } = useLetters();

  const updatePosition = () => {
    setSnake((prevSnake) => {
      const newPosition = {
        x: prevSnake[0].position.x + direction.x,
        y: prevSnake[0].position.y + direction.y,
      };

      const letterCollision = checkLetterCollision(newPosition);

      return [
        {
          position: newPosition,
        },
        ...(letterCollision ? prevSnake : prevSnake.slice(0, -1)),
      ];
    });
  };

  const checkLetterCollision = (newPosition) => {
    const letterCollision = letters.find((letter) => {
      return (
        letter.position.x === newPosition.x &&
        letter.position.y === newPosition.y
      );
    });

    if (letterCollision) {
      eatLetter(letterCollision.letter);
    }

    return letterCollision;
  };

  const checkCollision = () => {
    const snakeHead = snake[0].position;

    const outOfBounds =
      Math.abs(snakeHead.x) > game.size.x ||
      Math.abs(snakeHead.y) > game.size.y;

    if (snake.length <= 2) return outOfBounds;

    const snakeBody = snake.slice(1);
    const hitBody = snakeBody.some((segment) => {
      return (
        segment.position.x === snakeHead.x && segment.position.y === snakeHead.y
      );
    });

    return outOfBounds || hitBody;
  };

  const onKeydown = (event) => {
    if (event.key === "Escape") {
      return reset();
    }
    if (!interval) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 300);
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
    setSnake([{ position: { x: 0, y: 0 } }]);
    resetLetters();
    clearInterval(interval);
    interval = null;
  };

  useEffect(() => {
    updatePosition();
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
    if (checkCollision()) {
      reset();
    }
  }, [snake]);

  return {
    snake,
  };
}
