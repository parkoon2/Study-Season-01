const https = require('https');
const express = require( 'express' );
/** 요청 바디를 파싱하여 req.body 객체로 접근하게 함 */
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const path = require( "path" );
const fs = require('fs');
const app = express();

mongoose.connect( 'mongodb://localhost:27017/mongochat' );
const db = mongoose.connection;
const options = {
	key: fs.readFileSync('./https/key.pem'),
	cert: fs.readFileSync('./https/cert.pem')
};

app.use( express.static( path.join( __dirname, './public' ) ) );

let messages = [];
let name;
let message;

app.set( 'views', path.join( __dirname, './views' ) );
app.set( 'view engine', 'ejs' );

app.get( '/', function( req, res ) {
 res.render( 'index', { messages : messages } );
});

const server = https.createServer(options, app).listen(3000, function() {
  console.log("HTTPS server listening on port " + 3000);
});
/*const server = app.listen( 3000, function() {
	console.log( "listening on port 3000" );
});*/


const client = require( 'socket.io' ).listen( server ).sockets;

	
	client.on( 'connection', function( socket ) {
		console.log("socket connect");
		let chat = db.collection( 'chats' );

		//limit( 100 ) : 보여주고싶은 데이터 갯수 제한(100개) 
		chat.find().limit( 100 ).sort({ _id : 1 }).toArray( function( err, res ) {
			if ( err ) {
				throw err;
			}
			socket.emit( 'data_send', res );
		});

		socket.on( 'input', function( data ) {
			chat.insert({ name : data.name, message : data.message }, function() {
				client.emit( 'data_send', [ data ] );
			});
		});
		
		socket.on( 'clear', function( data ) {
			chat.remove( {}, function() {
				socket.emit( 'cleared' );
			});
		});
	});


