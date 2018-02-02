const http = require( 'http' );
const https = require( 'https' );
const fs = require( 'fs' );
const express = require( 'express' );
const app = express();

const options = {
    key: fs.readFileSync( 'key.pem' ),
    cert: fs.readFileSync( 'cert.pem' ),
}

const port = 7777;

https.createServer( options, app ).listen( port, function() {
    console.log( `Https Server Listening on port ${ port }`)
});

app.get( '/', function( req, res) {
    res.send( 'Hello World!' )
})

