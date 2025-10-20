const COLS = 10;
const ROW = 10;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
    "red",
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'White'
];
const BRICK_LAYOUT = [
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ],
];

const KEYS_CODE = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    UP: 'ArrowUp'
}

const WHITE_COLOR_ID = 7;
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROW * BLOCK_SIZE;

class board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
    };
    generateWhiteBoard() {
        return Array.from({ length: ROW }, () => Array(COLS).fill(WHITE_COLOR_ID));
    };
    drawCell(xAxis, yAxis, colorId) {
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
        this.ctx.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillStyle = 'black'
        this.ctx.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    };
    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, WHITE_COLOR_ID);
            }
        };
    };
};

class brick {
    constructor(id) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id];
        this.activeIndex = 2;
        this.colPos = 3;
        this.rowPos = 3;
    };

    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for( let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if(this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id);
                };
            };
        };
    };

    clear() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for( let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if(this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
                };
            };
        };
    };
    moveLeft() {
        this.clear();
        this.colPos--;
        this.draw();
    };
    moveRight() {
        this.clear();
        this.colPos++;
        this.draw();
    };
    moveDown() {
        this.clear();
        this.rowPos++;
        this.draw();
    };
    rotage() {
        this.clear();
        this.activeIndex = (this.activeIndex + 1) % 4;
        this.draw();
    };
};

board = new board(ctx); 
board.drawBoard();
brick = new brick(0);
brick.draw();

document.addEventListener('keydown' , (e) => {
    console.log(e);
    switch (e.code) {
        case KEYS_CODE.LEFT:
        brick.moveLeft();
        break;
        case KEYS_CODE.DOWN:
        brick.moveDown();
        break;
        case KEYS_CODE.RIGHT:
        brick.moveRight();
        break;
        case KEYS_CODE.UP:
        brick.rotage();
        break;
        default:
            break;
    }
})

// brick.rotage();
// brick.moveLeft();
// brick.moveRight();
// brick.moveDown()
// console.log(this.layout[this.activeIndex]);
