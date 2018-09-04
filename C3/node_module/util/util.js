/*
각종 편의 기능을 모아둔 모듈
*/

const util = require(`util`);
const crypto = require(`crypto`);

const dontUseMe = util.deprecate( (x, y) => {
    console.log(x + y);
}, `더 이상 사용하지 마세요!`);
dontUseMe(1,2);

//crypto.randomBytes 콜백을 프로미스로 전환
const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
.then((buf) => {
    console.log(buf.toString(`base64`));
})
.catch((err) => {
    console.error(err);
});

