const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath, 'utf8').split('\n')


function part1() {

    const intervals = input.map(line => {  
        const [x, y] = line.split(',')
        let [x1, x2] = x.split('-')
        let [y1, y2] = y.split('-')

        if (Number(x1) > Number(x2)) {
            const tmp = x1
            x1 = x2
            x2 = tmp
        }

        if (Number(y1) > Number(y2)) {
            const tmp = y1
            y1 = y2
            y2 = tmp
        }
        
        return {
            x1: Number(x1),
            x2: Number(x2),
            y1: Number(y1),
            y2: Number(y2)

        }
    })
    .filter(({x1, x2, y1, y2}) => {
        return (x1 >= y1 && x1 <= y2 && x2 >= y1 && x2 <= y2)
        || (y1 >= x1 && y1 <= x2 && y2 >= x1 && y2 <= x2)
    })

    return intervals.length
}

console.log('Part one - ', part1())


function part2() {

    const intervals = input.map(line => {  
        const [x, y] = line.split(',')
        let [x1, x2] = x.split('-')
        let [y1, y2] = y.split('-')

        if (Number(x1) > Number(x2)) {
            const tmp = x1
            x1 = x2
            x2 = tmp
        }

        if (Number(y1) > Number(y2)) {
            const tmp = y1
            y1 = y2
            y2 = tmp
        }
        
        return {
            x1: Number(x1),
            x2: Number(x2),
            y1: Number(y1),
            y2: Number(y2)

        }
    })
    .filter(({x1, x2, y1, y2}) => {
        return (x1 >= y1 && x1 <= y2)
        || (x2 >= y1 && x2 <= y2)
        || (y1 >= x1 && y1 <= x2)
        || (y2 >= x1 && y2 <= x2)
    })

    return intervals.length
}


console.log('Part two - ', part2())