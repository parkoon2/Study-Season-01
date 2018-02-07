const http = require( 'http' );
const path = require( 'path' );
const express = require( 'express' );
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