const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath, 'utf8').split('\n')

function part1() {
    const commons = []
    for (const line of input) {
        const middle = Math.floor(line.length / 2)

        const left = line.slice(0, middle)
        const right = line.slice(middle)



        const leftSet = new Set(left.split(''))
        const rightSet = new Set(right.split(''))

        const common = [...leftSet].filter(x => rightSet.has(x))
        commons.push(...common)
    }

    return commons.reduce((acc, c) => {
        if (/[A-Z]/g.test(c)){
            acc += c.charCodeAt(0) - 38
        }

        if (/[a-z]/g.test(c)){
            acc += c.charCodeAt(0) - 96
        }

        return acc
    }, 0)
}

console.log('Part one - ', part1())


function part2() {
    const score = []
    
    let left = []
    let right = []
    for (const line of input) {
        if (left.length < 3) {
            left.push(line)
        } else {
            right.push(line)
        }

        if (left.length === 3 && right.length === 3) {

            const leftCommon = left[0].split('')
                .filter(x => left[1].includes(x) && left[2].includes(x))

            const rightCommon = right[0].split('')
                .filter(x => right[1].includes(x) && right[2].includes(x))

            const common = [...new Set(leftCommon), ...new Set(rightCommon)]

            const sum = common.reduce((acc, c) => {
                if (/[A-Z]/g.test(c)){
                    acc += c.charCodeAt(0) - 38
                }

                if (/[a-z]/g.test(c)){
                    acc += c.charCodeAt(0) - 96
                }

                return acc
            }, 0)

            score.push(sum)

            left = []
            right = []
        }
    }

    return score.reduce((acc, c) => acc + c, 0)
}

console.log('Part two - ', part2())