const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath, 'utf8').split('\n')[0]


function part1(packetSize) {
    let index = packetSize - 1
    for (let i = packetSize - 1; i < input.length; i++) {
        const marker = input.substr(i - packetSize, packetSize)
        const set = new Set(marker.split(''))

        if (set.size === packetSize) {
            return index
        }
        index++
    }
}

console.log('part1', part1(4))
console.log('part2', part1(14))