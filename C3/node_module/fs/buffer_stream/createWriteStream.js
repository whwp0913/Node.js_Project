const fs = require(`fs`);

const writeStream = fs.createWriteStream(`./writeme.txt`);

writeStream.on(`finish`, () => {
    console.log(`파일 쓰기 완료`);
});

writeStream.write(`안녕하세요~ㅋ\n`);
writeStream.write(`2번째 입니다~ㅋ`);
writeStream.end();
