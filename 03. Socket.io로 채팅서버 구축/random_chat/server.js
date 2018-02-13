const express = require( "express" );
/** 요청 바디를 파싱하여 req.body 객체로 접근하게 함 */
const bodyParser = require( "body-parser" ); 
const path = require( "path" );
const app = express();

/** path 모듈의 join 함수로 현재 위치와 public 폴더 위치를 합쳐 이미지, css, javascript 파일과 같은 정적 파일 경로 제공 */
app.use( express.static( path.join( __dirname, "./public" ) ) );
/** body-parser를 사용해 application/x-www-form-urlencoded 파싱 -> form태그의 기본 인코딩 타입 */
app.use( bodyParser.urlencoded() );

const messages = [];
/** view 파일들이 있는 경로를 설정하는 영역 */
app.set( 'views', path.join( __dirname, './views' ) );
/** 템플릿 엔진 종류 셋팅 */
app.set( 'view engine', 'ejs' );

app.get( '/', function(req, res) {
 res.render( "index", {messages: messages} );
});
/** /test 로 post 요청이 들어오게 되면 req.body 객체를 웹페이지에 뿌려주는데 이 경우 bodyParser.urlencoded() 가
 * 매칭된 req.body 객체를 생성하여 연결해줌
 */
app.post( '/text', function(req, res) { 
	console.log( 'hello', req.body.message );
	res.redirect( '/' );
});

const server = app.listen( 8000, function() {
	console.log( "listening on port 8000" );
});

const io = require('socket.io').listen(server);

io.sockets.on( 'connection', function(socket) {
	let user_name;
	
	socket.on( 'user_connected', function(data) {
		user_name = data.name;
	});
	
	socket.on( 'message_sent', function(data) {
		messages.push( {name: user_name, message: data.message} );
		console.log( messages );
		io.emit( 'message_added', {name: user_name, message: data.message} );
	});	
});