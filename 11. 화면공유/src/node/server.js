const http = require( 'http' );
const path = require( 'path' );
const express = require( 'express' );
const socket = require( 'socket.io' );
const app = express();

const port = 7777;

const indexHTML = path.join( __dirname, 'views/index.html' );

app.use( express.static('public') );

/**
 * 뷰 엔진 설정
 */
app.set( 'views', path.join(__dirname, 'views') );
app.set( 'view engine', 'ejs' );



app.get( '/', function(req, res) {
    // res.sendFile( indexHTML );
    res.render( 'index', {

    })
})

const server = http.createServer( app ).listen( port, function() {
    console.log(`Test server for chrome extension listen ${ port } port`)
})

let io = socket.listen( server );
/**
 * 임시 USER DATABASE
 */
let users = [];

io.sockets.on( 'connection', function( socket ) {
    users.push( socket.id );

    socket.on( 'webrtc', function( message ) {
        message = JSON.parse( message )
        console.log( '!!!', message )

        if ( message.cmd === 'offer' ) {
            console.log('!')
            socket.broadcast.emit( 'webrtc', JSON.stringify(message) );
        } else if ( message.cmd === 'answer' ) {
            console.log('zzzzzzzzzzzzzzzz')
        }
    })

    socket.on( 'disconnect', function() {
        users.splice( users.indexOf(socket.id), 1 );
        console.log( '남은 사용자', users )
    });
})