/*
인터넷 주소를 쉽게 조작해주는 모듈
기존 노드방식과 / WHATWG 방식이 있음
*/

const url = require(`url`);

//WHATWG 방식
const URL = url.URL;
const myURL = new URL(`https://github.com/whwp0913/Node.js_Project/tree/master/C3/node_module`);
console.log(`myURL ->`, myURL);
console.log(`url.format() ->`, url.format(myURL));

console.log(`====================`);

//기존 노드 방식
const parseUrl = url.parse(`https://github.com/whwp0913/Node.js_Project/tree/master/C3/node_module`);
console.log(`url.parse() ->`, parseUrl);
console.log(`url.format() ->`, url.format(parseUrl));

// url.format은 두 방식 모두 사용, 분해된 주소를 재조립

