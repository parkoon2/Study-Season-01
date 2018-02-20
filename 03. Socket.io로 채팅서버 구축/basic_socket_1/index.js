var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){ // 서버와 클라이언트가 연결되었을 때 실행
  socket.on('chat message', function(msg){ // 클라이언트에서 서버로 오는 요청을 처리하는 이벤트 리스너
    io.emit('chat message', msg); // 클라이언트로 데이터를 보내는 부분
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
