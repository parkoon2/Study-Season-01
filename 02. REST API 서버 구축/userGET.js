//사용자 조회

const express = require('express');
const app = express();

let users = [
    {
      id: 1,
      name: 'jhpark'
    },
    {
      id: 2,
      name: 'jakim'
    }
  ]
  //users 변수에 저장된 사용자 데이터를 조회하도록 get() 함수를 이용하여 api 요청
  app.get('/users', (req, res) => { //라우팅 함수
    return res.json(users); //파라매터로 값을 받아 JSON 형식으로 변환시키는 함수
  });

  app.listen(3000, () => { 
    console.log('Example app listening on port 3000!');
  });
  