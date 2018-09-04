/*
기존 노드 url방식 search 부분을 객체로 만드는 모듈
*/

const url = require(`url`);
const querystring = require(`querystring`);

const parseUrl = url.parse(`https://www.google.co.kr/search?q=%EB%A6%AC%EB%88%85%EC%8A%A4+%EC%A0%84%EC%B2%B4%ED%8F%B4%EB%8D%94+%EC%9D%B4%EB%8F%99&ei=MC-OW8_sFseO8wWfibiICA&start=60&sa=N&biw=1309&bih=730`);

console.log(`url.parse() ->`,parseUrl);

const query = querystring.parse(parseUrl.query);
console.log(`querystring.parse() ->`, query);

//분해된 쿼리 객체 다시 조립
console.log(`querystring.stringify() ->`,querystring.stringify(query));

