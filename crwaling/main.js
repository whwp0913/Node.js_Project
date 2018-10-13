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

//설정 정보
casper.options.verbose = false;
casper.options.logLevel = "debug";
casper.options.viewportSize = {
    width: 300,
    height: 200
};
casper.options.pageSettings = {
    loadImages: true,
    loadPlugins: false
};

//요일에 해당하는 타겟들 주소
function getUrlList() {
    var target = document.querySelectorAll('.col_selected ul .title');
    var list = [];
    for(var i=0; i < target.length; i++) {
        list.push(target[i].href);
    }
    return list;
}

//업로드 됐는지 확인여부
function checkUpload() {
    var checkpoint = document.querySelectorAll('img');

    for(var i=0; i < checkpoint.length; i++) {
        if(checkpoint[i].alt == 'UP') {
            return true;
        }
    }
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

    casper.each(titleList, function(self, link) {
        self.thenOpen(link, function() {
            var check = this.evaluate(checkUpload);

            if(check) {
                this.click('.title a');

                casper.then(function() {
                    var day = this.getHTML('.category_tab .on a');
                    var title = this.getTitle().trim();
                    var subTitle = this.getHTML('.view h3').trim();
                    casper.echo(title+"추가완료!");
                    this.
                    captureSelector('/Users/whwp0913/Downloads/Comic/'+day+'/'+title+'/'+subTitle+'.png', '.wt_viewer', { quality : 20 });
                });
            }
        });
    });
});

casper.run(function() {
    console.log('작업완료...');
    casper.exit();
});
