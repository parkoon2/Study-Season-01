const express = require( 'express' );
/** 요청 바디를 파싱하여 req.body 객체로 접근하게 함 */
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const path = require( "path" );
const fs = require('fs');
const app = express();

let chatUserSchema = new Schema({
	name : { type: String, required: true, unique: true },
	message : String
});

let chatUser = mongoose.model('chatUser', chatUserSchema);

mongoose.connect( 'mongodb://localhost:27017/mongochatcrud' );
const db = mongoose.connection;

app.use( express.static( path.join( __dirname, './public' ) ) );
//사용자 커넥션 추적을 유지하기 위한 객체 생성 
let messages = [];
let name;
let message;
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.set( 'views', path.join( __dirname, './views' ) );
app.set( 'view engine', 'ejs' );

app.get( '/', function( req, res ) {
 res.render( 'index');
});





const server = app.listen( 3000, function() {
	console.log( "listening on port 3000" );
});


const client = require( 'socket.io' ).listen( server ).sockets;

	
	client.on( 'connection', function( socket ) {
		messages.push( socket );
		//console.log( 'Connected: %s sockets connected', connections.length );
		console.log('connect');
		
		socket.on( 'sendMessage', function( data ) {
		//	name = socket._id;
		//	message = data;
			chatUser.create( { name : data.name, message : data.message }, function( err, chatuser ) {
				client.emit( 'data_send', chatuser );
				console.log('chatuser',chatuser);
			});
			
			
			socket.on( 'clear', function( data ) {
				chatUser.remove( {}, function() {
					socket.emit( 'cleared' );
				});
			});
			
			
			
		});
		socket.on( 'findmessage',function(data){
			console.log("find",data);
			chatUser.find( {}, function( err, chatuser ) {
				client.emit( 'find', chatuser );
				console.log('chatuser', chatuser);
			});
		});
		
		socket.on( 'findonemessage',function(data){
			console.log("findone",data);
			chatUser.find( {}, function( err, chatuser ) {
				client.emit( 'find', chatuser );
				console.log('chatuser', chatuser);
			});
		});
		
		socket.on( 'deleteOnemessage',function(data){
			console.log("deleteOnemessage",data);
			chatUser.findByIdAndRemove( {}, function( err, chatuser ) {
				client.emit( 'find', chatuser );
				console.log('chatuser', chatuser);
			});
		});
		
		
		
	});


	
	
	
	
	
	
	
	
	
	
