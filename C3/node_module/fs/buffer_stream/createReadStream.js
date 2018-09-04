const fs = require(`fs`);

//highWaterMark는 조각의 크기
const readStream = fs.createReadStream(`../readme.txt`, { highWaterMark : 1});
const data = [];

//chunk는 조각들 -> 조각들을 배열에 담았다
readStream.on(`data`, (chunk) => {
    data.push(chunk);
    console.log(`data :`, chunk, chunk.length);
});

//배열에 담긴 조각들을 합치고 toString()으로 문자열로 변환
readStream.on(`end`, () => {
    console.log(`end :`, Buffer.concat(data).toString());
});

readStream.on(`error`, (err) => {
    console.error(err);
});
