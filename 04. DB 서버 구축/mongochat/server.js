const mongoose = require( 'mongoose' );
const client = require( 'socket.io').listen(4000).sockets;

mongoose.connect( 'mongodb://localhost:27017/mongochat' );
const db = mongoose.connection;
db.on( 'error', console.error );
db.once( 'open', function callback() {
	
	console.log( 'mongo db connection OK.' );
	
	//socket.io 연결
	client.on( 'connection', function(socket) {
		let chat = db.collection('chats');
		
		//status 를 보내는 함수 생성
		sendStatus = function( s ) {
			socket.emit( 'status', s );
		}
		//mongo collection 을 chats 로 가져옴
		chat.find().limit(100).sort({_id:1}).toArrat(function(err, res){
			if(err){
				throw err;
			}
			//emit the messages
			socket.emit('output', res);
		});
		
		//handle input events
		socket.on('input', function(data){
			let name = data.name;
			let message = data.message;
			
			//check for name and message
			if(name == '' || message == ''){
				//send error status
				sendStatus( 'please enter a name and message' );
			}else{
				//insert message
				chat.insert({name:name, message:message}, function(){
					client.emit('output', [data]);
					//send status object
					sendStatus({
						message : 'Message send',
						clear : true
					});
				});
			}
		});
		// handle clear
		socket.on('clear', function(data){
			//remove all chats from collection
			chat.remove({}, function(){
				//emit cleared
				socket.emit('cleared');
			});
		});
	});
});