var server = require('./mysql.js');
var schedule = require('node-schedule');


schedule.scheduleJob('30 * * * * *',function(){
    server.cron();
});

