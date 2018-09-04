const fs = require(`fs`);

fs.readdir(`./folder2`, (err, dir) => {
    if (err) {
        throw err;
    }
    console.log(`폴더는`, dir);
    fs.unlink(`./folder2/newFile.js`, (err) => {
        if (err) {
            throw err;
        }
        console.log(`파일삭제 완료`);
        fs.rmdir(`./folder2`, (err) => {
            if (err) {
                throw err;
            }
            console.log(`폴더삭제 완료`);
        });
    });
});
