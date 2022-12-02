const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath, 'utf8').split('\n')

const LOSS_POINTS = 0
const DRAW_POINTS = 3
const WIN_POINTS = 6

const ROCK_POINTS = 1
const PAPER_POINTS = 2
const SCISSORS_POINTS = 3

function part1() {
    const resultMatrix = {
        'X': {
            'A': DRAW_POINTS,
            'B': LOSS_POINTS,
            'C': WIN_POINTS,
        },
        'Y': {
            'A': WIN_POINTS,
            'B': DRAW_POINTS,
            'C': LOSS_POINTS,
        },
        'Z': {
            'A': LOSS_POINTS,
            'B': WIN_POINTS,
            'C': DRAW_POINTS,
        }
    }
    const inputValue = {
        'X': 1,
        'Y': 2,
        'Z': 3,
    }

    return input.reduce((acc, line) => {
        const [opponent, player] = line.split(' ')
        acc += resultMatrix[player][opponent] + inputValue[player]
        return acc
    },0)
}

console.log('plannedScore - part 1 : ', part1())

function part2() {

    const inputValue = {
        'X': 0,
        'Y': 3,
        'Z': 6,
    }

    const resultMatrix = {
        'X': {
            'A': SCISSORS_POINTS,
            'B': ROCK_POINTS,
            'C': PAPER_POINTS,
        },
        'Y': {
            'A': ROCK_POINTS,
            'B': PAPER_POINTS,
            'C': SCISSORS_POINTS,
        },
        'Z': {
            'A': PAPER_POINTS,
            'B': SCISSORS_POINTS,
            'C': ROCK_POINTS,
        },
    }
    
    return input.reduce((acc, line) => {
        const [opponent, expectedResult] = line.split(' ')
        acc += resultMatrix[expectedResult][opponent] + inputValue[expectedResult]
        return acc
    },0)
}

console.log('plannedScore - part 2 : ', part2())