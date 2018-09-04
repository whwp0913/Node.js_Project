/*
WHATWG searchParams 객체
*/

const { URL } = require(`url`);

const myURL = new URL(`https://www.google.co.kr/search?q=%EB%A6%AC%EB%88%85%EC%8A%A4+%EC%A0%84%EC%B2%B4%ED%8F%B4%EB%8D%94+%EC%9D%B4%EB%8F%99&ei=MC-OW8_sFseO8wWfibiICA&start=60&sa=N&biw=1309&bih=730`);

console.log(`searchParams ->`, myURL.searchParams); // query 키&값 형태로 보여줌
console.log(`searchParams.getAll() ->`, myURL.searchParams.getAll(`q`)); // 해당하는 키에 대한 값모두 불러옴
console.log(`searchParams.get() ->`, myURL.searchParams.get(`q`));
console.log(`searchParams.has() ->`, myURL.searchParams.has(`q`));

console.log(`searchParams.keys() ->`, myURL.searchParams.keys()); // query 키 모두 가져옴
console.log(`searchParams.values() ->`, myURL.searchParams.values());

myURL.searchParams.append(`filter`,`es3`);
myURL.searchParams.append(`filter`,`es4`);
console.log(myURL.searchParams.getAll(`filter`));

myURL.searchParams.set(`filter`, `es1`);
console.log(myURL.searchParams.getAll(`filter`));

myURL.searchParams.delete(`filter`);
console.log(myURL.searchParams.getAll(`filter`));

console.log(`searchParams.toString() ->`, myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();

console.log(myURL.search);
