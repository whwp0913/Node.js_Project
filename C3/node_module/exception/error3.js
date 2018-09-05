process.on(`uncaughtException`, (err) => {
    console.error(`error.......\n`, err);
});

setInterval(() => {
    throw new Error(`error2...`);
}, 1000);

setTimeout(() => {
    console.log(`error3...`);
}, 2000);

/*
uncaughtException이 throw된 error를 잡아주고 프로세스를 계속 실행시킨다 --> setTimeout
*/
