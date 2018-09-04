let i = 1;

setInterval(() => {
    if ( i === 5) {
        console.log(`종료`);
        process.exit();
    }
    console.log(i);
    i++;
}, 1000);

// process.exit는 실행 중인 노드 프로세스를 강제종료
