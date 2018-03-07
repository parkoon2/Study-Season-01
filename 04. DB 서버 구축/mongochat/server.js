const mongoose = require( 'mongoose' );
const client = require( 'socket.io' ).listen( 4000 ).sockets;

mongoose.connect( 'mongodb://localhost:27017/mongochat' );
const db = mongoose.connection;
db.on( 'open', function callback() {
	//socket.io 연결
	client.on( 'connection', function( socket ) {
		console.log("socket connect");
		let chat = db.collection( 'chats' );
		//status 를 보내는 함수 생성
		sendStatus = function( s ) {
			console.log("s",s);
			socket.emit( 'status', s );
		}
		console.log("sendStatus",sendStatus);
		chat.find().limit( 100 ).sort({ _id : 1 }).toArray( function( err, res ) {
			if ( err ) {
				throw err;
			}
			socket.emit( 'output', res );
		});
		
		socket.on( 'input', function( data ) {
			let name = data.name;
			let message = data.message;
			if ( name == '' || message == '' ) {
				sendStatus( 'please enter a name and message' );
			} else {
				chat.insert({ name:name, message:message }, function() {
					client.emit( 'output', [data] );
					sendStatus({
						message : 'Message send',
						clear : true
					});
				});
			}
		});

		socket.on( 'clear', function( data ) {
			chat.remove( {}, function() {
				socket.emit( 'cleared' );
			});
		});
	});
});