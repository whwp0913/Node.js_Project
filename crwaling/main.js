/*
절차
1. 홈페이지에 접속
2. web을 클릭
3. daily별 웹툰을 클릭
4. 해당날짜 리스트 접속
5. 해당 target의 폴더를 만들고(없는 경우) -> 제목으로 폴더 생성 -> 폴더 내에 최산화 내용 저장
6. 반복작업
*/

var casper = require('casper').create();

casper.options.verbose = false;
casper.options.logLevel = "debug";

function getUrlList() {
    var target = document.querySelectorAll('.col_selected ul a');
    var list = [];
    for(var i=0; i < target.length; i++) {
        list.push(target[i].href);
    }
    return list;
}

function checkUpload() {
    if()
    var target = document.querySelectorAll('.title');
}

//웹툰
casper.start('', function() {
    this.click('.mn_comic');
});

//요일별 웹툰
casper.then(function() {
    this.click('.Ntxt_webtoon');
});

//요일웹툰 리스트
casper.then(function() {
    var titleList = this.evaluate(getUrlList);
        casper.open(targetList[0]).then(function() {
            var check =
            this.click()
        })

});

casper.run();
