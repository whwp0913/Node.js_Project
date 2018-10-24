
var request = require('request');
var srequest = require('sync-request');
var cheerio = require('cheerio');
var Iconv = require('iconv').Iconv;
var euck = new Iconv('EUC-KR','UTF-8//translit//ignore');
var async = require('async');

var dao = require('./mahoutWebMySQL');
var file = require('./fileUtil.js');

global.inserted_id_list = file.get(); //

// 등록된 리뷰 번호 리스트
// console.log("init inserted_id_list: ", inserted_id_list);

global.member_list = []; // [{member: {...}, reviews: [{...}, {...}]]
var path = "https://movie.naver.com/movie/point/af/list.nhn?st=nickname&target=after&sword=";
var _current = 0; // 현재 루프 값
// size 70000 번까지 돌림
var size = 1000000; // 반복문 루프 카운터 sword=값
// var size = 1;


for(var i=4; i < size;) {

    if (_current == i) {
        continue;
    }
    _current = i;
    console.log(i, "번 째 페이지 입니다...");

    var _continue = false;
    for (var x = 0; x < inserted_id_list.length; x++) {
        if (inserted_id_list[x] == (i+"")) {
            _continue = true;
            // console.log('!데이터 중복 sword=', i);
            i++;
            break;
        }
    }
    if (_continue) {
        if (i == size) {
            // console.log('member_list: ', member_list);
            for (var y = 0; y < member_list.length; y++) {
                dao.addMember(member_list[y]);
            }
            file.set(inserted_id_list);
        }
        continue;
    }

    async.waterfall([
            function (callback) {
                setData(path + i, callback);
                //callback(null);
            }
        ], function(err, result){
            console.log('### 파싱작업이 완료되었습니다... 서버 작업 시작합니다... ###');
            i++;

            if (i == size) {
                // console.log('member_list: ', member_list);
                for (var y = 0; y < member_list.length; y++) {
                    dao.addMember(member_list[y]);
                }
                file.set(inserted_id_list);

            }
        });
}

function getHtml(path) {
    try {
        var html = srequest('GET',path, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36',
                },
                timeout: 12 * 1000,
                encoding : 'binary'
            });
        var str = new Buffer(html.getBody(),'binary');
        str = euck.convert(str).toString();
        return str;
    } catch (error) {
        console.log('ERROR', error);
        return null;
    }
}

function setData(path, callback) {
    var first_str = getHtml(path);

    if (first_str == null) {
        callback(null);
        return;
    }

    var $ = cheerio.load(first_str);
    var $first = $(".list_netizen");
    var html_arry = [];
    html_arry.push($first);

    // 여기에 페이징 처리해서 반복문...
    var total_size = $('.c_88.fs_11').text();
    if (total_size == '' || total_size == null || total_size == undefined) {
        console.log('########### 삭제된 페이지입니다..... ###########');
        callback(null);
        return;
    }
    var page = total_size / 10;
    if (total_size % 10 > 0) {
        page = page + 1;
    }
    page = parseInt(page);
    console.log('현재 페이지의 총 게시물은 :'+ total_size + "개 입니다... 작업 시작합니다...");
    // console.log('page: ', page);

    if (page > 1) {
        for (var b = 2; b <= page; b++) {

            var _val = getHtml(path+'&page='+b);
            if (_val == null) {
                callback(null);
                return;
            }

            var _$ = cheerio.load(_val);
            html_arry.push(_$(".list_netizen"));
        }
    }

    var result = {};
    result.member = {};
    result.reviews = [];
    var _id = $first.find('tr').eq(1).find('.num').find('a').text();
    result.member.mid = (_id.replace(/\*/g,'') + '_' + new Date().getTime());
    result.member.mpw = '100';
    result.member.mname = '100';

    for (var z=0; z<html_arry.length; z++) {
        var $html = html_arry[z];
        for(var i=1; i< $html.find('tr').length; i++) {
            var review = {};

            var post_id = $html.find('tr').eq(i).find('td').eq(0).text();
            inserted_id_list.push(post_id);

            review.mid = result.member.mid; // 준제야... 리뷰 인설트안되서 mid 빠진거 찾느라고 죽는줄알았다...
            review.rating = parseFloat($html.find('tr').eq(i).find('.point').text())/2;
            review.title = $html.find('tr').eq(i).find('.title').find('a').eq(0).text();
            review.code = $html.find('tr').eq(i).find('.movie').attr('href').split('=')[2].split('&')[0];
            review.comment = $html.find('tr').eq(i).find('.title').text();
            review.imgLink = "https://movie.naver.com/movie/point/af/list.nhn?st=mcode&sword="+ $html.find('tr').eq(i).find('.movie').attr('href').split('=')[2].split('&')[0] + "&target=after";
            result.reviews.push(review);
        }
    }
    member_list.push(result);
    callback(null);
 }




// function getLink(result) {
//     var list = [];
//     for (var i=0; i<result.length; i++) {
//         var item = {};
//         item.key = result[i].imgLink;
//         console.log('imgLink: ', item.key);
//         var html = getHtml(item.key);
//         if (html == null) {
//             continue;
//         }
//         var $ = cheerio.load(html);
//         var $list = $(".list_netizen");
//         var target = $(".fl").find('img').attr('src');
//         item.value = target;
//         list.push(item);
//     }
//     return list;
// }









