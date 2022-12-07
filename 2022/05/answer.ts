const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath, 'utf8').split('\n')

/**
[N]         [C]     [Z]            
[Q] [G]     [V]     [S]         [V]
[L] [C]     [M]     [T]     [W] [L]
[S] [H]     [L]     [C] [D] [H] [S]
[C] [V] [F] [D]     [D] [B] [Q] [F]
[Z] [T] [Z] [T] [C] [J] [G] [S] [Q]
[P] [P] [C] [W] [W] [F] [W] [J] [C]
[T] [L] [D] [G] [P] [P] [V] [N] [R]
 1   2   3   4   5   6   7   8   9 
 */

function part1(multiCrate) {

     
   const craneLayout = [
        ['T', 'P', 'Z', 'C', 'S', 'L', 'Q', 'N'],
        ['L', 'P', 'T', 'V', 'H', 'C', 'G'],
        ['D', 'C', 'Z', 'F'],
        ['G', 'W', 'T', 'D', 'L', 'M', 'V', 'C'],
        ['P', 'W', 'C'],
        ['P', 'F', 'J', 'D', 'C', 'T', 'S', 'Z'],
        ['V', 'W', 'G', 'B', 'D'],
        ['N', 'J', 'S', 'Q', 'H', 'W'],
        ['R', 'C', 'Q', 'F', 'S', 'L', 'V'],
    ]

    for (const line of input) {
        const [amount, targets] = line.split(' from ')
        const [from, to] = targets.split(' to ')
        
        const sanitizedAmount = amount.replace('move ', '')
        const sanitzedFrom = Number(from) - 1
        const sanitzedTo = Number(to) - 1


        let cratesToMove = craneLayout[sanitzedFrom].splice(-sanitizedAmount)

        if (!multiCrate) {
            cratesToMove = cratesToMove.reverse()
        }
        craneLayout[sanitzedTo.toString()].push(...cratesToMove)
    }


    return craneLayout.map(x => x[x.length - 1]).join('')
}

part1()
console.log('Part one - ', part1(false))
console.log('Part two - ', part1(true))