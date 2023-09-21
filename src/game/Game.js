import { generateAllCollectibles } from "../functions/generateAllCollectibles";
import { shuffle } from "../functions/shuffle";
import game from '../../game.json';

const randElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const FIELDS = {
    EMPTY: 0,
    SNAKE: 1,
    COLLECTIBLE: 2,
};

const WIDTH = game.size.x * 2 + 1;
const HEIGHT = game.size.y * 2 + 1;
const BOARD_SIZE = WIDTH * HEIGHT;
const START_NB_OF_COLLECTIBLES = 4;

const randCoord = () => ({
    x: Math.floor(Math.random() * game.size.x),
    y: Math.floor(Math.random() * game.size.y),
});

const transX = (x) => x - game.size.x;
const transY = (y) => y - game.size.y;

class Game {
    constructor(availableCollectibles) {
        this.collectiblesPool = shuffle(generateAllCollectibles(availableCollectibles));
        
        this.reset();
    }
    
    addCollectible() {
        const collectibleToAdd = randElement(this.collectiblesPool);

        let coord;

        do {
            coord = randCoord();
        } while (this.isOccupied(coord.x, coord.y));
        console.log('Rand coord: ', coord);

        this.board[coord.x][coord.y] = FIELDS.COLLECTIBLE;
        
        const collectible = {
            code: collectibleToAdd.code,
            position: {
                x: transX(coord.x),
                y: transY(coord.y),
            },
        };

        this.collectiblesOnBoard.push(collectible);

        return collectible;
    }

    isOccupied(x, y) {
        console.log('isOccupied: ', x, y);
        console.log('board', this.board);
        return this.board[x][y] !== FIELDS.EMPTY;
    }

    reset() {
        this.snakeHead = { x: 0, y: 0 };
        this.snakeBody = [{ x: 0, y: 0 }];
        this.collectiblesOnBoard = [];
        this.eatenCollectibles = [];
        this.score = 0;

        this.board = new Array(WIDTH).fill([]).map(() => new Array(HEIGHT).fill(FIELDS.EMPTY));
        console.log(this.board);

        for (var i=0; i<START_NB_OF_COLLECTIBLES; i++) {
            this.addCollectible();
        }
    }
}

export const gameBoard = new Game(game.collectibles);
