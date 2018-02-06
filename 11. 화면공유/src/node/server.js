const http = require( 'http' );
const path = require( 'path' );
const express = require( 'express' );
const app = express();

const port = 7777;

const indexHTML = path.join( __dirname, 'public/views/index.html' );

app.use( express.static('public') );

app.get( '/', function(req, res) {
    res.sendFile( indexHTML );
})

const server = http.createServer( app ).listen( port, function() {
    console.log(`Test server for chrome extension listen ${ port } port`)
})