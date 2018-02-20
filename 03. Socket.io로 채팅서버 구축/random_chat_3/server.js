const express = require('express');
const routes = require('./routes');
const user = require('./routes/user');
const http = require('http');
const path = require('path');
const redis = require('redis');
const socketio = require('socket.io');
const mongoose = require('mongoose');

// MongoDB 접속
mongoose.connect('mongodb://localhost/12701');

// 모델 정의 (Schema 명칭)
let Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
let chatLogSchema = new Schema({
	id: ObjectId,
	log: String,
	date: String
});

// 컬렉션 생성
let ChatLogModel = mongoose.model('chatLog', chatLogSchema);

// EXPRESS, HTTP, SOCKET.IO 객체
const app = express();
var server = null;
var io = null;
// 채팅방 참여 유저
let users = [];

// REDIS (발행자, 구독자)
var subscriber = redis.createClient();
var publisher = redis.createClient();
// EXPRESS 설정
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

// 서버 생성
server = http.createServer(app);

// HTTP서버를 이용하여 SOCKET.IO 초기화
io = socketio.listen(server);

io.sockets.on('connection', function (socket) {
	// 최초 접속시 호출
	socket.on('chat_user', function (raw_msg) {
		var msg = JSON.parse(raw_msg);
		var channel = '';
		if(msg["channel"] != undefined) {
			channel = msg["channel"];
		}
		socket.emit('socket_evt_chat_user', JSON.stringify(users));
		var chatLog = mongoose.model('chatLog', chatLogSchema);
		chatLog.find({}, function (err, logs) {
			socket.emit('socket_evt_logs', JSON.stringify(logs));
			socket.broadcast.emit('socket_evt_logs', JSON.stringify(logs));
		});
	});

	//사용자가 접속했을 때의 상황 처리
	socket.on('chat_conn', function (raw_msg) {
		var msg = JSON.parse(raw_msg);
		var channel = '';
		if(msg['channel'] != undefined) {
			channel = msg['channel'];
		}
		socket.set('workspace', msg.workspace);
		var index = users.indexOf(msg.chat_id);
		if (index != -1) {
			socket.emit('chat_fail', JSON.stringify(msg.chat_id));
		} else {
			users.push(msg.chat_id);
			socket.broadcast.emit('chat_join', JSON.stringify(users));
			socket.emit('chat_join', JSON.stringify(users));
			var chatLog = new ChatLogModel();
			chatLog.log = msg.chat_id + ' 접속하셨습니다.';
			chatLog.date = getToday();
			chatLog.save(function (err) {
				if (err)
					return handleError(err);
				var chatLog_ = mongoose.model('chatLog', chatLogSchema);
				chatLog_.find({}, function (err, logs) {
					socket.emit("socket_evt_logs", JSON.stringify(logs));
					socket.broadcast.emit("socket_evt_logs", JSON.stringify(logs));
				});
			});
		}
	});
	
	//사용자가 메시지를 보냈을 때의 상황 처리
	socket.on('message', function (raw_msg) {
		var msg = JSON.parse(raw_msg);
		var channel = '';
		if(msg['channel'] != undefined) {
			channel = msg['channel'];
		}
		if (channel == 'chat') {
			var chatting_message = msg.chat_id + ' : ' + msg.message;
			publisher.publish('chat', chatting_message);
		}
	});
	
	//사용자가 채팅방을 나갔을 때의 상황 처리
	socket.on('leave', function (raw_msg) {
		var msg = JSON.parse(raw_msg);
		if (msg.chat_id != '' && msg.chat_id != undefined) {
			var index = users.indexOf(msg.chat_id);
			socket.emit('someone_leaved', JSON.stringify(msg.chat_id));
			socket.broadcast.emit('someone_leaved', JSON.stringify(msg.chat_id));
			users.splice(index, 1);
			var chatLog = new ChatLogModel();
			chatLog.log = msg.chat_id + '님이 나가셨습니다.';
			chatLog.date = getToday();
			chatLog.save(function (err) {
				if (err)
					return handleError(err);
				var chatLog_ = mongoose.model('chatLog', chatLogSchema);
				chatLog_.find({}, function (err, logs) {
					socket.emit('socket_evt_logs', JSON.stringify(logs));
					socket.broadcast.emit('socket_evt_logs', JSON.stringify(logs));
				});
			});
		}
		socket.emit('refresh_userlist', JSON.stringify(users));
		socket.broadcast.emit('refresh_userlist', JSON.stringify(users));
	});
	
	//구독자 객체가 메시지를 받으면 소켓을 통해 메시지를 전달
	subscriber.on('message', function (channel, message) {
		socket.emit('message_go', message);
	});
	
	//구독자 객체는 'chat'을 구독 시작
	subscriber.subscribe('chat');
}); 

// 현재 시간 얻기
function getToday() {
	var date = new Date();
	return date.getFullYear() +'.'+ (date.getMonth()+1) +'.'+ date.getDate() +' '+ date.getHours() +':'+ date.getMinutes() +':'+date.getSeconds();
}

// SOCKET 연결 끊어질 시 호출
io.sockets.on('close', function (socket) {
	subscriber.unsubscribe();
	publisher.close();
	subscriber.close();
});

// 서버 시작 
server.listen(app.get('port'), function(){
	console.log('채팅방 서버를 기동 합니다. 포트 : ' + app.get('port'));
});

