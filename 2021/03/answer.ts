const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath, 'utf8').split('\r\n')

const BINARY_INPUT_LENGTH = 12;

function replaceCharAt(string, index, character) {
    return index > string.length - 1 ? string : string.substring(0, index) + character + string.substring(index + 1);
}

function decodeBinary(binaryStr) {
    let currentPower = 0;
    let result = 0;

    for (let i = binaryStr.length - 1; i >= 0; i--) {
        const char = binaryStr[i];
        result += (parseInt(char) * Math.pow(2, currentPower));
        currentPower++;
    }

    return result;
}

// PART ONE
let defaultPattern = '';
for (let i = 0; i < BINARY_INPUT_LENGTH; i++) {
    defaultPattern += 'X';
}

let gammaRateBinary = defaultPattern;
let epsilonRateBinary = defaultPattern;

// PART ONE & TWO
let scrubberList = JSON.parse(JSON.stringify(input));
let oxygenList = JSON.parse(JSON.stringify(input));

for (let k = 0; k < BINARY_INPUT_LENGTH; k++) {
    // PART ONE
    let sumInp0 = 0, sumInp1 = 0
    for (const inp of input) {
        inp.charAt(k) === '0' ? sumInp0++ : sumInp1++;
    }

    if (sumInp0 > sumInp1) {
        gammaRateBinary = replaceCharAt(gammaRateBinary, k, '0');
        epsilonRateBinary = replaceCharAt(epsilonRateBinary, k, '1');
    } else {
        gammaRateBinary = replaceCharAt(gammaRateBinary, k, '1');
        epsilonRateBinary = replaceCharAt(epsilonRateBinary, k, '0');
    }

    // PART TWO
    let sumScr0 = 0, sumScr1 = 0;
    for (const scr of scrubberList) {
        scr.charAt(k) === '0' ? sumScr0++ : sumScr1++;
    }

    let sumOxy0 = 0, sumOxy1 = 0;
    for (const oxy of oxygenList) {
        oxy.charAt(k) === '0' ? sumOxy0++ : sumOxy1++;
    }

    if (scrubberList.length > 1) {
        scrubberList = sumScr0 > sumScr1 ? scrubberList.filter(it => it.charAt(k) === '1') : scrubberList.filter(it => it.charAt(k) === '0');
    }

    if (oxygenList.length > 1) {
        oxygenList =  sumOxy1 >= sumOxy0 ? oxygenList.filter(it => it.charAt(k) === '1') : oxygenList.filter(it => it.charAt(k) === '0');
    }
}

// PART ONE RESULT
const gammaDecimal = decodeBinary(gammaRateBinary);
const epsilonDecimal = decodeBinary(epsilonRateBinary);

console.log(gammaDecimal * epsilonDecimal);

// PART TWO RESULT
const oxygenGeneratorDecimal = decodeBinary(oxygenList[0]);
const scrubberRatingDecimal = decodeBinary(scrubberList[0]);

console.log(oxygenGeneratorDecimal * scrubberRatingDecimal)