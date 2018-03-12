const http = require('http');
const socketio = require("socket.io");
const fs = require('fs');
const redis = require("redis"),
    client = redis.createClient();
let rooms = ["room_one", "room_two", "room_three", "room_four", "room_five"];

client.on("error", function (err) {console.log("Error " + err);});


let storeMessage = function(room, message) {
	console.log("room!!!",room); // submit 버튼으로 클릭시 현재 방 번호
	console.log("message!!!",message); //submit 버튼으로 클릭시 현재 쓴 메시지
	/** .lpush -> 문자열 배열을 redis queue 에 넣음*/
	client.lpush(room, message, function (err, res) {
		// room 목록이 0 번째 ~ 9 번째까지만 남겨놈
		client.ltrim(room, 0, 9);
	});
	io.sockets.in(room).emit("displayMessage", message);
}

let emitMessages = function(room, socket){
	client.lrange(room, 0, -1, function(err, messages){
		//reverse() 는 배열을 반전 시키는 메소드 (역순배열)
		messages = messages.reverse();
		messages.forEach(function(message) {
			socket.emit("displayMessage", message); // 이곳의 메시지는 이미 저장되어 있는 메시지
		});
	});
}

let handler = function(req, res) {
	fs.readFile(__dirname + '/index.html', function(err, data) {
		if(err) {
			res.writeHead(500);
			return res.end("Can not find index.html");
		} else {
			res.writeHead(200);
			res.end(data);
		}
	});
};

const app = http.createServer(handler);
const io = socketio.listen(app);

io.sockets.on("connection", function (socket) {
	var self = this;
	
	socket.join("room_one");
	
	emitMessages("room_one", socket);
	
	socket.on("chatMessage", function(data){
	  storeMessage(data[0], data[1]);
	  console.log("data[0]",data[0]); //submit 버튼 클릭시 현재 방번호
	  console.log("data[1]",data[1]); //submit 버튼 클릭시 현재 적힌 메시지
	});
	
	for (let i = 0; i < rooms.length; i++) {
		let room = rooms[i];
		let join_event = "join_"+room;
		socket.on(join_event, function(rooms){
			socket.leave(rooms[0]); // 클릭 하기 전 현재 방
			console.log("rooms[0]",rooms[0]);
			socket.join(rooms[1]); // 클릭한 방
			console.log("rooms[1]",rooms[1]);
			socket.emit("clear_room");
			emitMessages(rooms[1], socket);
		});	
	}
	
});

app.listen(8080);

 // JavaScript Document