/*
기존의 문자열에 +salt 붙인 후 -> 알고리즘 반복해서 적용
*/

const crypto = require(`crypto`);

//64바이트 길이의 문자열을 만든다 -> 이것이 salt
crypto.randomBytes(64, (err, buf) =>{
    const salt = buf.toString(`base64`);
    console.log(`salt :`, salt);
    //비밀번호, salt, 반복횟수, 출력바이트, 해시 알고리즘, 콜백 순으로 인자할당
    crypto.pbkdf2(`비밀번호`, salt, 100000, 64, `sha512`, (err,key) =>{
        console.log(`password :`, key.toString(`base64`));
    });
});
