const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath, 'utf8').split('\n\n')

const calories = []

for (const elf of input) {
    const sum = elf.split('\n')
        .reduce((acc, line) => {
            return acc + Number(line)
        }
        , 0)

    calories.push(sum)
}

// PART ONE
const max = calories.sort((a, b) => b - a)[0]
console.log('part 1', max)


// PART TWO
const top3sum = calories.sort((a, b) => b - a).slice(0, 3).reduce((acc, c) => acc + c, 0)
console.log('part 2', top3sum)