import { atom } from 'jotai';
import { gameBoard } from '../game/Game';

export const snakeAtom = atom(gameBoard.snakeBody);
export const collectiblesAtom = atom(gameBoard.collectiblesOnBoard);
