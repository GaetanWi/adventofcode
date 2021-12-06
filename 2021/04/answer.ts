const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath, 'utf8').split('\r\n\r\n');

const BOARD_LENGTH = 5;

const calledNumbers = input[0].split(",");
const boards = input.slice(1);

const formattedBoards = boards.map(board => board.split("\r\n"))
    .map(board => board.map(l => l.trimStart().split(" ")
        .map(val => {
            if (!!val) {
                return { value: val, found: false }
            }
        })
        .filter(l => !!l)));

function findWinningBoard() {
    for (const number of calledNumbers) {
        for (const board of formattedBoards) {
            for (let line = 0; line < BOARD_LENGTH; line++) {
                for (let column = 0; column < BOARD_LENGTH; column++) {
                    const val = board[line][column];

                    if (val.value === number) {
                        val.found = true;

                        let completedColumn = true;
                        let completedLine = true;

                        for (let i = 0; i < BOARD_LENGTH; i++) {
                            completedColumn = completedColumn && board[line][i].found;
                            completedLine = completedLine && board[i][column].found;
                            
                        }

                        if (completedColumn || completedLine) {
                            return {winningBoard: board, lastNumber: number}
                        }
                    }
                }
            }
        }
    }
}

const {winningBoard, lastNumber} = findWinningBoard();
console.log(winningBoard);

const unmarkedNumbers = [];
for (let i = 0; i < BOARD_LENGTH; i++) {
    for (let j = 0; j < BOARD_LENGTH; j++) {
        if (!winningBoard[i][j].found) {
            unmarkedNumbers.push(winningBoard[i][j].value);
        }
    }
}

const unmarkedSum = unmarkedNumbers.reduce((acc, curr) => acc += parseInt(curr), 0);
console.log(unmarkedSum * lastNumber);