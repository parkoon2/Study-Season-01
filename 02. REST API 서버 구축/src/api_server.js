const http = require( 'http' );
const express = require( 'express' );
const path = require( 'path' );
const app = express();

const port = 7777;

const indexHTML = path.join( __dirname, 'index.html' );

app.get( '/', function( req, res ) {
    res.sendFile( indexHTML )
})




const api_server = http.createServer( app ).listen( port, function() {
    console.log(`API Server Listen ${ port } port!`)
})