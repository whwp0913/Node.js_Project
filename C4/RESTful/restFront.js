function getUser() {
    var xhr = new XMLHttpRequest(); //Ajax 통신위해 XMLHttpRequest 생성

    xhr.onload = function () {
        if (xhr.status === 200) {
            var users = JSON.parse(xhr.responseText); //JSON으로 받은 구문을 분석 (객체 반환)
            var list = document.getElementById('list'); //list 객체

            list.innerHTML = '';
            //Object.keys(users) --> users 의 속성과 기능 이름 열거
            Object.keys(users).map(function (key) {
                var userDiv = document.createElement('div');
                var span = document.createElement('span');
                span.textContent = users[key];
                var edit = document.createElement('button');
                edit.textContent = '수정';

                edit.addEventListener('click', function() {
                    var name = prompt('바꿀이름을 입력하세요...');
                    if(!name) {
                        return alert('이름을 반드시 입력해주세요');
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function() {
                        if(xhr.status === 200) {
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('PUT', '/users/' + key);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({name : name}));
                });
                var remove = document.createElement('button');
                remove.textConet = '삭제';
                remove.addEventListener('click', function() {
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('DELETE', '/users/' + key);
                    xhr.send();
                });
                userDiv.appendChild(span);
                userDiv.appendChild(edit);
                userDiv.appendChild(remove);
                list.appendChild(userDiv);
            });
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.open('GET', '/users');
    xhr.send();
}
window.onload = getUser;

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = e.target.username.value; //form 입력한 아이디를 받았다
    if(!name) {
        return alert('이름을 입력하세요...'); //아이디를 입력안했다면 경고 문구
    }
    var xhr = new XMLHttpRequest(); //Ajax 통신 하기위해 XMLHttpRequest 생성
    xhr.onload = function() {
        if(xhr.status === 201) {
            console.log(xhr.responseText);
            getUser(); //새로운 내용 갱신위해 getUser(); 호출
        } else {
            console.log(xhr.responseText);
        }
    };
    xhr.open('POST', '/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({name : name})); //stringify --> 객체/배열 을 JSON 문자열로 만들어서 보냄
    e.target.username.value = ''; //보낸 뒤에는 form input 초기화
});
