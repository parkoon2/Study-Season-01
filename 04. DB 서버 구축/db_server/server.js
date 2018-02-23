const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

const router = require( './routes' )( app );
const server = app.listen( 3000, function() {
	console.log( 'server connection OK.' );
});

/** chatdb 는 db-name */
mongoose.connect( 'mongodb://localhost:27017/chatdb' );
const db = mongoose.connection;
db.on( 'error', console.error );
db.once( 'open', function callback() {
	console.log( 'mongo db connection OK.' );
});