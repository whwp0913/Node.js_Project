const A = require('./globalA');

global.message = `hello`;

//A는 global.message 반환
console.log(A());
