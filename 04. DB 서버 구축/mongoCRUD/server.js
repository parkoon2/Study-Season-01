const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const path = require( 'path' );
const fs = require( 'fs' );
const app = express();

let chatUserSchema = new Schema ({
	name : { type: String, required: true, unique: true },
	message : String
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

app.get('/get', function( req, res ) {
	chatUser.find( {}, function( err,doc ){
        if ( err ) console.log( 'err' );
        res.send( doc );
    });

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

app.post( '/update', function( req, res ) {
	let id = req.body.id;
	chatUser.findById( id, function( err, doc ){
		if( err ){
			console.log('error found while updating');
		}
		doc.name = req.body.name;
		doc.message = req.body.message;
		doc.save();
	});
	res.redirect('/');
});

app.post( '/id_delete', function( req, res ) {
	let id = req.body.id;
	chatUser.findByIdAndRemove( id ).exec();
	res.redirect( '/' );
});

app.post( '/delete', function( req, res ) {
	chatUser.remove( {}, function( ) {
		res.send( 'success delete' );
	});
});

const server = app.listen( 3000, function() {
	console.log( 'listening on port 3000' );
});



	
	
	
	
	
