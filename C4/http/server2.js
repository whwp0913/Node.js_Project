const http = require(`http`);
const fs = require(`fs`);

/*
const server = http.createServer((req, res) => {
    res.write(`hello node\n`);
    res.end(`my name is node`);
});
server.listen(8080);
server.on(`listening`, () => {
    console.log(`8080포트 서버 대기중...`);
});
server.on(`error`, (err) => {
    console.error(err);
});
*/

http.createServer((req, res) => {
    fs.readFile(`./server2.html`, (err, data) => {
        if (err) {
            console.error(err);
        }
        res.end(data);
    });
}).listen(8080, () => {
    console.log(`server on...`);
});
