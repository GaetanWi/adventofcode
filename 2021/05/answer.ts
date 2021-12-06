const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath, 'utf8').split('\r\n');

const x1Arr = [];
const y1Arr = [];
const x2Arr = [];
const y2Arr = [];
let board;

function populateItems() {
    for (let line of input) {
        const splittedLine = line.split(" -> ");
        const startValues = splittedLine[0].split(",");
        const endValues = splittedLine[1].split(",");

        x1Arr.push(parseInt(startValues[0]));
        y1Arr.push(parseInt(startValues[1]));

        x2Arr.push(parseInt(endValues[0]));
        y2Arr.push(parseInt(endValues[1]));
    }
}

function drawBoard() {
    const maxX1 = Math.max(...x1Arr);
    const maxX2 = Math.max(...x2Arr);
    const maxY1 = Math.max(...y1Arr);
    const maxY2 = Math.max(...y2Arr);

    const matrixLength = maxX1 > maxX2 ? maxX1 + 1 : maxX2 + 1;
    const matrixHeight = maxY1 > maxY2 ? maxY1 + 1: maxY2 + 1;

    board = Array.from(Array(matrixHeight), () => new Array(matrixLength));

    for (let i = 0; i < matrixHeight; i++) {
        for (let j = 0; j < matrixLength; j++) {
            board[i][j] = 0;
        }
    }
}

function fillBoard() {
    for (let i = 0; i < x1Arr.length; i++) {
        // x1 = x2 => vertical
        if (x1Arr[i] === x2Arr[i]) {
            const vectorStartingPoint = y1Arr[i] > y2Arr[i] ? y2Arr[i] : y1Arr[i];
            const vectorEndingPoint = y1Arr[i] > y2Arr[i] ? y1Arr[i] : y2Arr[i];
            for (let row = vectorStartingPoint; row <=vectorEndingPoint; row++) {
                board[row][x1Arr[i]] = board[row][x1Arr[i]]+ 1;
            }
        // y1 = y2 => horizontal
        } else if (y1Arr[i] === y2Arr[i]) {
            const vectorStartingPoint = x1Arr[i] > x2Arr[i] ? x2Arr[i] : x1Arr[i];
            const vectorEndingPoint = x1Arr[i] > x2Arr[i] ? x1Arr[i] : x2Arr[i];
            for (let column = vectorStartingPoint; column <=vectorEndingPoint; column++) {
                board[y1Arr[i]][column] = board[y1Arr[i]][column] + 1;
            }
        }
    }
}

function getNbOverlaps() {
    let nbOverlap = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] > 1) {
                nbOverlap = nbOverlap + 1;
            }
        }
    }

    return nbOverlap;
}

populateItems();
drawBoard();
fillBoard();
console.log(getNbOverlaps());