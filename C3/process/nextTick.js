setImmediate(() => {
    console.log('immediate');
});

process.nextTick(() => {
    console.log('nextTick');
});

setTimeout(() => {
    console.log('setTimeout');
},0);

Promise.resolve().then(() => console.log('promise'));

/*
nextTick 과 Promise 는 마이크로 태스크(microtask)
setTimeout, Immediate 보다 먼저 실행된다
*/
