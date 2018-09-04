const fs = require(`fs`);

fs.copyFile(`../readme.txt`, `./copy.txt`, (error) => {
    if (error) {
        return console.error(err);
    }
    console.log(`복사 완료`);
});
