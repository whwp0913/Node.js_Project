const { odd, even } = require('./var');
const checkNumber = require('./func');

function checkStringOddOrEven(str) {
    if(str.length % 2) {
        return odd;
    }
    return even;
}

//checkNumber의 경우 odd, even도 같이 넘어옴
console.log(checkNumber(10));
console.log(checkStringOddOrEven(`hello`));

console.log(global);
