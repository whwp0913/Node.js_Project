var request = require('request');
var cheerio = require('cheerio');




function crol(path,callback) {
    request({
        url: path,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36'
        }
    }, function(err, res, html) {
        if (err) {
            console.log(err);
            return;
        }

        var $ = cheerio.load(html);

        var poster = $('.info_movie');
        var title = $('.info_tit');
        var grade = $('.info_grade');
        var state = $('.info_state');
        var src = $('.desc_movie');
        var desc = $('.wrap_desc');


        // var objArr = [];
        for (var i = 0; i < poster.length; i++) {
            var obj = {};
            var foo = [];

            obj.img = poster.eq(i).find('img').attr('src').replace('//','');

            obj.tit = title.eq(i).find('a').text();

            obj.grade = grade.eq(i).find('.grade_netizen').find('.num_grade').text().replace(/^0|\\b./gi, "").replace(/.0/gi,".");

            foo = state.eq(i).text().split("・");
            obj.open = foo[0].replace(/\t|\n/gi,'');

            obj.infoLink = 'movie.daum.net'+src.eq(i).attr('href');
            obj.des = desc.eq(i).html();

            console.log(obj.imgsrc);
            var rand;

            if(path == 'http://movie.daum.net/boxoffice/weekly') {
                rand = 0;
            }else if ( path == 'http://movie.daum.net/boxoffice/monthly') {
                rand = 1;
            }else if ( path =='http://movie.daum.net/boxoffice/yearly') {
                rand = 2;
            }
            callback(obj,rand);
        }

    });
}


module.exports = {crol:crol}
