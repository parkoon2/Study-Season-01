//express 로 hello world 찍기
const express = require('express');
const app = express();

//라우팅 : 클라이언트 요청과 서버의 로직을 연결하는 것
app.get('/', (req, res) => { // '/' 요청에 대해 라우팅 로직을 설정
  res.send('Hello World!!!!!!!!!\n');
 });
 //요청 메소드가 get 이라는 것을 설정
 //요청이 들어오면 req,res 두 개의 파라매터를 받는 콜백 함수 동작
 //req 는 express 요청 객체로 서버로 요청한 클라이언트 정보를 담고있음
 //res 는 응답 객체로 요청한 클라이언트에게 응답하기 위한 함수로 구성된 객체

 //express 의 listen() 함수를 이용해 서버가 클라이언트의 요청 대기 상태로 들어감
app.listen(3000, () => { // 첫 번째 파라매터 3000이 대기할 포트 번호 , 두 번째 파라매터는 listen() 이 완료되면 실행되는 콜백함수
  console.log('Example app listening on port 3000!');
});