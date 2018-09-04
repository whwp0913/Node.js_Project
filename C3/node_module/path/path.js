/*
폴더와 파일 경로를 쉽게 조작하도록 도와주는 모듈
왜냐면 os별로 경로 구분자가 다르기 때문
Window Type
POSIX Type -> unix, macOS, linux ...
*/

const path = require(`path`);
const string = __filename;

console.log(`path.sep ->`, path.sep); // 경로 구분자
console.log(`path.delimiter ->`, path.delimiter); // 환경변수 구분자

console.log(`path.dirname() ->`, path.dirname(string));
console.log(`path.extname() ->`, path.extname(string));
console.log(`path.basename() ->`, path.basename(string));
console.log(`path.basename() ->`, path.basename(string, path.extname(string)));

console.log(`path.parse() ->`, path.parse(string));
console.log(`path.format() ->`, path.format({
    dir : path.parse(string).dir,
    name : path.parse(string).name,
    ext : path.parse(string).ext
}));

console.log(`path.normalize() ->`, path.normalize(`User///whwp0913//Projects///Node_Project//C3//node_module`));

console.log(`path.isAbsolute() ->`, path.isAbsolute(`/`));
console.log(`path.isAbsolute() ->`, path.isAbsolute(`./User`));

console.log(`path.relative() ->`, path.relative(`/Users/whwp0913/Projects`, `/Users/whwp0913`));

console.log(`path.join() ->`, path.join(__dirname, `..`, `..`,`whwp0913`));
console.log(`path.resolve() ->`, path.resolve(__dirname, '..', 'whwp0913', '.', '/Projects'));

//path.resolve는 절대경로(/)를 만나면 앞에 경로는 무시, path.join은 상대경로로 처리









