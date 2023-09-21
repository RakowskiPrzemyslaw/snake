import { atom } from 'jotai';
import { gameBoard } from '../game/Game';

export const snakeAtom = atom(gameBoard.snakeBody);
export const collectiblesAtom = atom(gameBoard.collectiblesOnBoard);
export const roundAtom = atom({
    round: gameBoard.roundNumber,
    score: gameBoard.score,
    word: gameBoard.wordProgress
});
