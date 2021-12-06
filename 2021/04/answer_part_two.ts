const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath, 'utf8').split('\r\n\r\n');

const BOARD_LENGTH = 5;

const calledNumbers = input[0].split(",");
const boards = input.slice(1);

let formattedBoards = boards.map(board => board.split("\r\n"))
    .map(board => board.map(l => l.trimStart().split(" ")
        .map(val => {
            if (!!val) {
                return { value: val, found: false }
            }
        })
        .filter(l => !!l)));


// PART ONE
function findWinningBoard(boardsToSearchFor) {
    for (const number of calledNumbers) {
        for (const board of boardsToSearchFor) {
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

const winningBoards = [];
let lastNumberCalled = '';
let boardsLeft = formattedBoards;
let shouldStop = false;

while (!shouldStop) {
    const {winningBoard, lastNumber} = findWinningBoard(boardsLeft);
    winningBoards.push(winningBoard);
    lastNumberCalled = lastNumber;

    boardsLeft = boardsLeft.filter(b => JSON.stringify(b) !== JSON.stringify(winningBoard));
    shouldStop = boardsLeft.length === 0 || calledNumbers.indexOf(lastNumber) === calledNumbers.length - 1;
}

const lastBoard = winningBoards[winningBoards.length - 1];

let unmarkedNumbersOfLastBoard = [];
for (let i = 0; i < BOARD_LENGTH; i++) {
    for (let j = 0; j < BOARD_LENGTH; j++) {
        if (!lastBoard[i][j].found) {
            unmarkedNumbersOfLastBoard.push(lastBoard[i][j].value);
        }
    }
}
let unmarkedSumOfLastBoard = unmarkedNumbersOfLastBoard.reduce((acc, curr) => acc += parseInt(curr), 0);
console.log('LAST BOARD : ' + unmarkedSumOfLastBoard * parseInt(lastNumberCalled));