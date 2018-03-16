const http = require( 'http' );
const express = require( 'express' );
const mongoose = require( 'mongoose' );
const path = require( 'path' );
const fs = require( 'fs' );
const app = express();
const redis = require( 'redis' );
const clientRoom = redis.createClient();
let rooms = [ 'room_one', 'room_two', 'room_three', 'room_four', 'room_five' ];
mongoose.connect( 'mongodb://localhost:27017/mongochat' );
const db = mongoose.connection;
const options = {
	key: fs.readFileSync( './https/key.pem' ),
	cert: fs.readFileSync( './https/cert.pem' )
};
app.use( express.static( path.join( __dirname, './public' ) ) );
app.set( 'views', path.join( __dirname, './views' ) );
app.set( 'view engine', 'ejs' );
app.get( '/', function( req, res ) {
	res.render( 'index' );
});

clientRoom.on( 'error', function( err ) { console.log( 'Error ' + err ); } );

const server = app.listen( 3000, function() {
	console.log( 'listening on port 3000' );
});

const client = require( 'socket.io' ).listen( server ).sockets;


let storeMessage = function( room, message ) { // submit 버튼으로 클릭시 현재 방 번호와 메시지
	/** .lpush -> 문자열 배열을 redis queue 에 넣음*/
	clientRoom.lpush( room, function ( err, res ) {
		// room 목록이 0 번째 ~ 9 번째까지만 남겨놈
		clientRoom.ltrim( room, 0, 9 );
	});
	//client.in( room ).emit( 'displayMessage', message );
}

let emitMessages = function( room, socket ) {

	clientRoom.lrange( room, 0, -1, function ( err, messages ) {
		messages = messages.reverse();
	});
}


client.on( 'connection', function( socket ) {
	console.log( 'connect' );
	let chat = db.collection( 'chats' );
	
	socket.join( 'room_one' );
	emitMessages( 'room_one', socket );
	
	chat.find().limit( 100 ).sort({ _id : 1 }).toArray( function( err, res ) {
		if ( err ) {
			throw err;
		}
		socket.emit( 'displayChat', res );
	});
	socket.on( 'inputName', function( data ) {
		chat.insert({ name : data.name, message : data.message }, function() {
			client.emit( 'displayChat', [ data ] );
		});
	});
	
	socket.on( 'chatMessage', function( data ) {
		storeMessage( data[0], data[1] ); // submit 버튼 클릭시 현재 방번호, 현재 적힌 메시지
	});
	
	for ( let i = 0; i < rooms.length; i++ ) {
		let room = rooms[i];
		let join_event = 'join_' + room;
		socket.on( join_event, function( rooms ) {
			socket.leave( rooms[0] ); // 클릭 하기 전 현재 방
			socket.join(rooms[1]); // 클릭한 방
			socket.emit( 'clear_room' );
			emitMessages( rooms[1], socket );
		});	
	}
	
});

