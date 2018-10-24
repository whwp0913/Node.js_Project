var crawling = require('./mahoutWebScr.js');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1q2w3e4r',
    port : 3306,
    database : 'pj01'
});

function addReview(list, mno){
    var insertReview = 'insert into t_review set ?'; // 리뷰에 인서트
        console.log("### 서버 : 리뷰 추가 시작합니다... ###");
    for(var i = 0; i < list.length; i++){

        var review = list[i];
        review.mno = mno;
        // console.log('review['+i+']: ', review);

        connection.query(insertReview, review , function(err,result){
            console.log("--------------------------------");
            // console.log("addReview:", result.insertId);
               console.log(result + "### 영화에 대한 리뷰가 추가되었습니다 ###")
        });

    }
}

function addMember(obj) {
    var query = "insert into t_member set ?";
        console.log("### 서버 : 회원 추가 시작합니다... ###");
    connection.query(query, obj.member, function(err,result){
        console.log(result + "### 회원님이 추가되었습니다 ###");
        // console.log("--------------------------------");
        // console.log('addMember:', result.insertId);
        addReview(obj.reviews, result.insertId);

    });
}

function updateLink(callback) {
    var query = "select imgLink from t_review where link is null group by imgLink";

    connection.query(query, function(err, result) {
        var update_list = callback(result);
        for (var i=0; i<update_list.length; i++) {
            connection.query('update t_review set link = ? where imgLink = ?', [update_list[i].value,update_list[i].key], function(err, result) {
                    console.log('update success !');
            });
        }
        console.log('update end');
    });
}

module.exports = {addReview:addReview, addMember : addMember, updateLink: updateLink}
