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
//http://localhost:3000/users/1
  app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); //req.params.id 값이 문자열 형식이기 때문에 정수형으로 변경 
    if (!id) { //에러 발생시 서버에서는 상태 코드로 응답
      return res.status(400).json({error: 'Incorrect id'});
    }
  
    let user = users.filter(user => user.id === id)[0] //filter() 함수는 배열의 각 요소를 점검하면서 통과한 값들을 필터링해서 별도의 배열에 담는 역할 -> 배열의 첫번째 값만 가져옴
    if (!user) { // 빈 배열의 첫번째 값을 가져오게되면 404
      return res.status(404).json({error: 'Unknown user'});
    }
  
    return res.json(user); // 성공 응답
  });
  

app.listen(3000, () => { 
    console.log('Example app listening on port 3000!');
});
  