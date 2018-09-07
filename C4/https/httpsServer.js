/*
https는 웹 서버에 SSL 암호화를 추가
인증 기관이 필요함
*/
const https = require('https');
const fs = require('fs');

https.createServer({
    cert : fs.readFileSync('도메인 인증서 경로'),
    key : fs.readFileSync('도메인 비밀키 경로'),
    ca : [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로')
    ]
}, (req, res) => {
    res.write('<h1>Hello...</h1>');
    res.end('<p>Node...!</p>');
}).listen(443, () => {
    console.log('443번(https) 포트에서 서버 대기중...');
});
