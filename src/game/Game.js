import { generateAllCollectibles } from "../functions/generateAllCollectibles";
import { shuffle } from "../functions/shuffle";
import game from "../../game.json";
import words from "../../words.json";

const randElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const sameCord = (a, b) => a.x === b.x && a.y === b.y;

const FIELDS = {
    EMPTY: 0,
    SNAKE: 1,
    COLLECTIBLE: 2,
};

const WIDTH = game.size.x * 2 + 1;
const HEIGHT = game.size.y * 2 + 1;
const NB_OF_RAND_COLLECTIBLES = 4;

const WORD_BONUS = 10;
const CHAR_BONUS = 1;
const CHAR_PENALTY = -1;
const ORDER_BONUS = 10;

const randCoord = () => ({
    x: Math.floor(Math.random() * game.size.x),
    y: Math.floor(Math.random() * game.size.y),
});

const transX = (x) => x - game.size.x;
const transY = (y) => y - game.size.y;

const reverseTransX = (x) => x + game.size.x;
const reverseTransY = (y) => y + game.size.y;

class Game {
    constructor(availableCollectibles, category = null) {
        this.collectiblesPool = shuffle(
            generateAllCollectibles(availableCollectibles)
        );

        this.category = category ? category : randElement(Object.keys(words));
        this.wordsPool = shuffle(words[this.category]).map((word) =>
            word.toUpperCase()
        );

        this.reset();
    }

    reset() {
        this.isGameOver = false;
        this.snakeHead = { x: 0, y: 0 };
        this.snakeBody = [{ position: { x: 0, y: 0 } }];
        this.snakeSize = 1;
        this.collectiblesOnBoard = [];
        this.eatenCollectibles = [];
        this.score = 0;
        this.alreadySelectedWords = [];
        this.roundNumber = 0;
        this.wordProgress = [];
        this.strikeCounter = 0;

        this.board = new Array(WIDTH)
            .fill([])
            .map(() => new Array(HEIGHT).fill(FIELDS.EMPTY));

        this.nextRound();
    }

    removeCollectibles() {
        this.collectiblesOnBoard = [];

        this.board = this.board.map((row) =>
            row.map((field) => {
                if (field === FIELDS.COLLECTIBLE) {
                    return FIELDS.EMPTY;
                }
                return field;
            })
        );
    }

    nextRound() {
        this.removeCollectibles();
        this.selectWord();
        this.wordProgress = [];

        for (let i = 0; i < this.selectedWord.length; i++) {
            this.addCollectible(this.selectedWord[i]);
            this.wordProgress.push({
                code: this.selectedWord[i],
                isCollected: this.selectedWord[i] === " " ? true : false,
            });
        }

        for (let i = 0; i < NB_OF_RAND_COLLECTIBLES; i++) {
            this.addCollectible();
        }

        this.roundNumber++;
    }

    move(direction) {
        const newPosition = {
            x: this.snakeHead.x + direction.x,
            y: this.snakeHead.y + direction.y,
        };

        // check if a new position is the same as previous
        if (sameCord(newPosition, this.snakeHead)) {
            return;
        }

        // check if a new position is out of the box
        if (
            reverseTransX(newPosition.x) < 0 ||
            reverseTransX(newPosition.x) > WIDTH - 1 ||
            reverseTransY(newPosition.y) < 0 ||
            reverseTransY(newPosition.y) > HEIGHT - 1
        ) {
            return;
        }

        this.snakeHead = newPosition;
        this.snakeBody.push({ position: this.snakeHead });

        const collected = this.collectiblesOnBoard.find(
            (collectible) =>
                collectible.position.x === this.snakeHead.x &&
                collectible.position.y === this.snakeHead.y
        );

        if (collected) {
            // add to score
            this.eatenCollectibles.push(collected);
            this.collectiblesOnBoard = this.collectiblesOnBoard.filter(
                (collectible) => collectible.id !== collected.id
            );

            const wordChar = this.wordProgress.find(
                (char) => char.code === collected.code && !char.isCollected
            );

            if (wordChar) {
                wordChar.isCollected = true;
                this.score += CHAR_BONUS;
            } else {
                this.score += CHAR_PENALTY;
            }

            this.snakeSize++;
        } else {
            this.snakeBody.shift();
        }

        this.board[reverseTransX(this.snakeHead.x)][
            reverseTransY(this.snakeHead.y)
        ] = FIELDS.EMPTY;

        this.snakeBody.forEach((segment) => {
            this.board[reverseTransX(segment.position.x)][
                reverseTransY(segment.position.y)
            ] = FIELDS.SNAKE;
        });

        if (this.isWordCollected()) {
            this.score += WORD_BONUS;
            this.nextRound();
        }
    }

    isWordCollected() {
        return this.wordProgress.every((char) => char.isCollected);
    }

    addCollectible(code = null) {
        const collectibleCodeToAdd =
            code || randElement(this.collectiblesPool).code;

        let coord;

        do {
            coord = randCoord();
        } while (this.isOccupied(coord.x, coord.y));
        // console.log('Rand coord: ', coord);

        this.board[coord.x][coord.y] = FIELDS.COLLECTIBLE;

        const collectible = {
            code: collectibleCodeToAdd,
            position: {
                x: transX(coord.x),
                y: transY(coord.y),
            },
            color: randElement(game.colors.lights),
            id: Math.random().toString(36).substring(2, 9),
        };

        this.collectiblesOnBoard.push(collectible);

        return collectible;
    }

    isOccupied(x, y) {
        return this.board[x][y] !== FIELDS.EMPTY;
    }

    selectWord() {
        let word;

        do {
            word = randElement(this.wordsPool);
        } while (this.alreadySelectedWords.includes(word));

        this.selectedWord = word;
        this.alreadySelectedWords.push(word);
    }
}

export const gameBoard = new Game(game.collectibles);
