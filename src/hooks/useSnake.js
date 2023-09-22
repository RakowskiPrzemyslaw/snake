import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import debounce from 'lodash.debounce';
import { gameBoard } from "../game/Game";
import { collectiblesAtom, resetAtom, roundAtom, roundTimeAtom, snakeAtom } from "../context/game";
import game from "../../game.json";

const timeAtom = atom(0);
const directionAtom = atom({ x: 0, y: 0 });
let interval;
let timer;

export function useSnake() {
    const [time, setTime] = useAtom(timeAtom);
    const [direction, setDirection] = useAtom(directionAtom);
    const [snake, setSnake] = useAtom(snakeAtom);
    const [, setCollectibles] = useAtom(collectiblesAtom);
    const [round, setRound] = useAtom(roundAtom);
    const [roundTime, setRoundTime] = useAtom(roundTimeAtom);
    const [reset, setReset] = useAtom(resetAtom);

    

    const onKeydown = (event) => {
        if (event.key === "Escape") {
            return reset();
        }
        if (!interval && !gameBoard.isGameOver) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, game.rules.snakeSpeed);
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

    useEffect(() => {
        const hasRoundChanged = gameBoard.move(direction);

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

        if (hasRoundChanged) {
            setRoundTime(0);
        }
    }, [time]);

    useEffect(() => {
        document.addEventListener("keydown", onKeydown);
        timer = setInterval(() => {
            setRoundTime((prevRoundTime) => prevRoundTime + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
            timer = null;

            clearInterval(interval);
            interval = null;
            document.removeEventListener("keydown", debounce(onKeydown, game.rules.snakeSpeed));
        };
    }, []);

    useEffect(() => {
        if (round.isGameOver) {
            clearInterval(timer);
            timer = null;

            clearInterval(interval);
            interval = null;
        }
    }, [round]);

    useEffect(() => {
        if (roundTime >= game.rules.roundTime) {
            gameBoard.nextRound();

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
            setRoundTime(0);
        }
    }, [roundTime]);

    useEffect(() => {
        if (!reset) {
            return;
        }

        gameBoard.reset();

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
        setRoundTime(0);

        timer = setInterval(() => {
            setRoundTime((prevRoundTime) => prevRoundTime + 1);
        }, 1000);

        setReset(false);
    }, [reset]);

    return {
        snake,
        reset
    };
}
