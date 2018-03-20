const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
const redis = require( 'redis' );
const JSON = require( 'JSON' );
const path = require( 'path' );
client = redis.createClient();
app.set( 'views', path.join( __dirname, './views' ) );
app.set( 'view engine', 'ejs' );
app.use( bodyParser.json() ); 
app.use( bodyParser.urlencoded({ extended:true }) );

client.on( ' error ', function( err ) {
	console.log( 'error', err );
});

app.get( '/', function( req, res ) {
	res.render( 'index' );
});

app.post( '/insert', function( req, res ) {
	client.set( 'message', req.body.message , function( err, result ) {
		if ( err ) res.send( 'error : ' + err );
		else console.log( 'message : ' + result );
	});
});
app.get( '/get', function( req, res ) {
	client.hmget( 'message', function( err, result ) {
		if ( err ) console.log( 'Error: '+ err );
	    else res.send( result );
	});
});
app.post( '/delete', function( req, res ) {
	client.del( 'message', function( err, result ) {
		console.log( result );
	});
});

app.listen( 3000, function() {
	console.log( '3000 port connect' );
});