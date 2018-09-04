const fs = require(`fs`);

fs.access(`./folde2`, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if (err) {
        if (err.code === `ENOENT`) {
            console.log(`폴더 없음`);
            fs.mkdir(`./folder2`, (err) => {
                if (err) {
                    throw err;
                }
                console.log(`폴더 생성!!!`);
                fs.open(`./folder2/file.js`, `w`, (err, fd) => {
                    if (err) {
                        throw err;
                    }
                    console.log(`빈 파일 생성!!!`, fd);
                    fs.rename(`./folder2/file.js`, './folder2/newfile.js', (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log(`이름 바꿈!!!`);
                    });
                });
            });
        } else {
            throw err;
        }
    } else {
        console.log(`이미 폴더가 있습니다 ㅎ`);
    }
});
