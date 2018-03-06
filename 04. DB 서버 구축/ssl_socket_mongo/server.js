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
app.use( bodyParser.urlencoded() );

let messages = [];
let user_name;
/** view 파일들이 있는 경로를 설정하는 영역 */
app.set( 'views', path.join( __dirname, './views' ) );
/** 템플릿 엔진 종류 셋팅 */
app.set( 'view engine', 'ejs' );

app.get( '/', function( req, res ) {
 res.render( 'index', { messages : messages } );
});
/** /test 로 post 요청이 들어오게 되면 req.body 객체를 웹페이지에 뿌려주는데 이 경우 bodyParser.urlencoded() 가
 * 매칭된 req.body 객체를 생성하여 연결해줌
 */
app.post( '/text', function( req, res ) { 
	console.log( 'hello', req.body.message );
});

/*const server = https.createServer(options, app).listen(3000, function() {
  console.log("HTTPS server listening on port " + 3000);
});*/
const server = app.listen( 3000, function() {
	console.log( "listening on port 3000" );
});


const client = require( 'socket.io' ).listen( server ).sockets;

client.on( 'connection', function() {
	
	client.on( 'connection', function( socket ) {
		console.log("socket connect");
		let chat = db.collection( 'chats' );
		//status 를 보내는 함수 생성
		sendStatus = function( s ) {
			socket.emit( 'status', s );
		}
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

