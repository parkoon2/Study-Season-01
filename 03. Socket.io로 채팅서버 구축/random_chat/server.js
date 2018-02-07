const express = require( 'express' );
const http = require( 'http' );
const app = express();

app.get( '/', function ( req, res ) {
  res.sendFile( __dirname + '/index.html' );
});

const httpServer = http.createServer( app ).listen( 3000, function( req,res ) {
  console.log( 'Socket IO server has been started' );
});

const io = require( 'socket.io' ).listen(httpServer);
 
io.sockets.on( 'connection', function( socket ) {
   socket.emit( 'toclient', { msg : 'Welcome !' } );
   socket.on( 'fromclient', function( data ) {
       socket.broadcast.emit( 'toclient', data ); // 자신을 제외하고 다른 클라이언트에게 보냄
       socket.emit( 'toclient', data ); // 해당 클라이언트에게만 보냄. 다른 클라이언트에 보낼려면?
       console.log( 'Message from client :' + data.msg );
   })
});

