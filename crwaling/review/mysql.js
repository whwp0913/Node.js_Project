var crawling = require('./crawling.js');
var mysql = require('mysql');

var paths = "http://movie.daum.net/boxoffice/";
var querys = ["weekly","monthly","yearly"];
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1q2w3e4r',
    port : 3306,
    database : 'pj01'
});

function cron() {

    for(var j=0; j<querys.length; j++) {

        crawling.crol(paths+querys[j],function(obj,rand){
            var abc = rand;
            var query = 'insert into t_'+querys[abc]+' set ?';
            console.log(query);
            connection.query(query, obj, function(err, result) {
                if(!err) {
                    console.log('success');
                    console.log(result);
                }else {
                    console.log(err);
                }
            });
        });

    }
}

module.exports = {cron:cron}
