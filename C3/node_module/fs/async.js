const fs = require(`fs`);

console.log(`시작`);

fs.readFile(`./readMe.txt`, (err, data) => {
    console.log(`4번`, data.toString());
});

fs.readFile(`./readMe.txt`, (err, data) => {
    console.log(`1번`, data.toString());
});

fs.readFile(`./readMe.txt`, (err, data) => {
    console.log(`2번`, data.toString());
});

fs.readFile(`./readMe.txt`, (err, data) => {
    console.log(`3번`, data.toString());
});

console.log(`끝`);

/*
순서를 유지하고 싶다면 callback 패턴사용
fs.readFile(`./readme.txt`, (err, data) =>{
    console.log(`1번`, data.toString());

    fs.readFile(`./readme.txt`, (err, data) =>{
        console.log(`2번`, data.toString());

        fs.readFile(`./readme.txt`, (err, data) =>{
            console.log(`3번`, data.toString());

            fs.readFile(`./readme.txt`, (err, data) =>{
                console.log(`4번`, data.toString());
            });
        });
    });
})
*/



















