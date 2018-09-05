const http = require(`http`);
const fs = require(`fs`);
const url = require(`url`);
const qs = require(`querystring`);

const parseCookies = (cookie = '') =>
    cookie
    .split(';')
    .map(v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    },{});

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    //login으로 접속할 시 쿠키만들어주고 302(리다이렉트) --> location = '/'
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() +5);
        res.writeHead(302, {
            Location : '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
        });
        res.end();
    //이미 쿠키를 가지고 있을 때
    } else if (cookies.name) {
        res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    //'/' 접속했을 시 server4.html 로드
    } else {
        fs.readFile('./server4.html', (err, data) => {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    }
}).listen(8080, () => {
    console.log(`server on...`);
});
