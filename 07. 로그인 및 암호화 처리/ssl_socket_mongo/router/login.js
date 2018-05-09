const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const path = require( 'path' );
const fs = require( 'fs' );
const app = express();

let chatUserSchema = new Schema ({
	id : { type: String, required: true, unique: true },
    pwd : String,
    name : String
});
let chatUser = mongoose.model( 'chatUser', chatUserSchema );

mongoose.connect( 'mongodb://localhost:27017/mongochatcrud' );
const db = mongoose.connection;

app.use( express.static( path.join( __dirname, './public' ) ) );

app.use( bodyParser.json() ); 
app.use( bodyParser.urlencoded({ extended:true }) );
app.set( 'views', path.join( __dirname, './views' ) );
app.set( 'view engine', 'ejs' );

app.get( '/', function( req, res ) {
	res.render( 'index' );
});


app.post( '/insert', function( req, res ) {
	let item = {
			name : req.body.name,
			message : req.body.message
	};
	let data = new chatUser( item );
	data.save();
	res.redirect( '/' );
});





	
	
	
	
	
