const http = require(`http`);

/*
http.createServer((req, res) => {
    console.log(`환영합니다!`);
});
*/

http.createServer((req, res) => {
    res.write(`<h1>hello NodeWorld!</h1>`);
}).listen(8080, () => {
    console.log(`서버 대기중입니다...`);
});
