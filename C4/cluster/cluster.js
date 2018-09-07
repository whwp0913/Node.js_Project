/*
cluster module은 싱글 스레드인 node가 cpu수만큼 프로세스를 만들어 작동하게 끔 해준다
cluster master process로 -> cpu의 코어만큼 worker process 생성
pid의 값이 모두 다르다
cluster 보단 pm2 등 모듈로 구현
*/
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`master process id : ${process.pid}`);

    for(let i=0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}의 워커 종료`);
        cluster.fork();
    });
} else {

    http.createServer((req, res) => {
        res.end('..............');
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }).listen(8080, () => {
        console.log('server wait....');
    });

    console.log(`${process.pid} worker excute`);
}
