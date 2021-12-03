const fs = require('fs');
const path = require('path');

const FORWARD = 'forward';
const DOWN = 'down';
const UP  = 'up';

const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath, 'utf8').split('\r\n')


// PART ONE
const pos = { horizontal: 0, depth: 0 };

input.forEach(value => {
    const valueKey = value.split(' ');

    switch (valueKey[0]) {
        case FORWARD:
            pos.horizontal = pos.horizontal + parseInt(valueKey[1]);
            break;
        case DOWN:
            pos.depth = pos.depth + parseInt(valueKey[1]);
            break;
        case UP:
            pos.depth = pos.depth - parseInt(valueKey[1]);
            break;
    }
});

console.log(pos.horizontal * pos.depth);


// PART TWO
let aim = 0;
pos.horizontal = 0
pos.depth = 0;

input.forEach(value => {
    const valueKey = value.split(' ');

    switch (valueKey[0]) {
        case FORWARD:
            pos.horizontal = pos.horizontal + parseInt(valueKey[1]);
            pos.depth = pos.depth + aim * parseInt(valueKey[1]);
            break;
        case DOWN:
            aim = aim + parseInt(valueKey[1]);
            break;
        case UP:
            aim = aim - parseInt(valueKey[1]);
            break;
    }
});

console.log(pos.horizontal * pos.depth);