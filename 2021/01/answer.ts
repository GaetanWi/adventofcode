const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath, 'utf8').split('\r\n')

// PART ONE
const nbIncreasing = input
    .map(v => new Number(v))
    .reduce((acc, currentValue, currentIndex, arr) => {
        if (currentIndex === 0) {
            return acc;
        }
    
        if (currentValue > arr[currentIndex - 1]) {
            return acc + 1;
        }
        return acc;
    }, 0);

console.log(nbIncreasing);

// PART 2
const increasingObj = input
    .map(v => new Number(v))
    .reduce((acc, currentValue, currentIndex, arr) => {        
        const firstValue = currentValue;
        const secondValue = arr.length > currentIndex + 1 ? arr[currentIndex + 1] : 0;
        const thirdValue = arr.length > currentIndex + 2 ? arr[currentIndex + 2] : 0;
        const additionResult = firstValue + secondValue + thirdValue;

        if (currentIndex === 0) {
            return { nbIncreasing: acc.nbIncreasing, previousAdditionResult: additionResult};
        }

        if (additionResult > acc.previousAdditionResult) {
            return { nbIncreasing: acc.nbIncreasing + 1, previousAdditionResult: additionResult};;
        }
        return { nbIncreasing: acc.nbIncreasing, previousAdditionResult: additionResult};;
    }, { nbIncreasing: 0, previousAdditionResult: 0});

console.log(increasingObj.nbIncreasing);