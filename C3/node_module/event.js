const EventEmitter = require(`events`);

const myEvent = new EventEmitter();

// event1, event2 추가
myEvent.addListener(`event1`, () => {
    console.log(`event1`);
});
myEvent.on(`event2`, () => {
    console.log(`event2`);
});
myEvent.on(`event2`, () => {
    console.log(`event2 add`);
});
// event1, event2 실행
myEvent.emit(`event1`);
myEvent.emit(`event2`);

//event3 --> once로 추가시 한 번만 실행됨
myEvent.once(`event3`, () => {
    console.log(`event3`);
});
myEvent.emit(`event3`);
myEvent.emit(`event3`);

//event4 추가 후 바로 제거 --> 호출안됨
myEvent.on(`event4`, () => {
    console.log(`evnet4`);
});
myEvent.removeAllListeners(`event4`);
myEvent.emit(`event4`);

//함수를 생성한 뒤 인자로 event 등록
const listener = () => {
    console.log(`event5`);
};
myEvent.on(`event5`, listener);
myEvent.removeListener(`event5`, listener);
myEvent.emit(`event5`);

//event2에 걸린 event 갯수
console.log(myEvent.listenerCount(`event2`));
