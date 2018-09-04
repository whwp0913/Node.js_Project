const buffer = Buffer.from(`나는 버퍼입니다`);
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [Buffer.from(`띄엄 `), Buffer.from(`띄엄 `), Buffer.from(`띄어쓰기`)];
const buffer2 = Buffer.concat(array);
console.log(buffer2);
console.log(buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log(buffer3);
