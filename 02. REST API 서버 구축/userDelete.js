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

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({error: 'Incorrect id'});
    }
  
    const userIdx = users.findIndex(user => user.id === id);
    if (userIdx === -1) { // 유저가 없을 때
      return res.status(404).json({error: 'Unknown user'});
    }

    users.splice(userIdx, 1); // 첫번째 파라매터:삭제할 인덱스 숫자, 두번째 파라매터:삭제할 갯수
    res.status(204).send();
});
app.get('/users', (req, res) => { //라우팅 함수
    return res.json(users); //파라매터로 값을 받아 JSON 형식으로 변환시키는 함수
  });


app.listen(3000, () => { 
    console.log('Example app listening on port 3000!');
});
  