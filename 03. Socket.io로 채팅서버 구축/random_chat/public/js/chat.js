
let name = prompt( "What is your name?" );
let $chat = $( '#chat' );
let $text = $( '#text' );
let $button = $( 'button' );
let $inner_chat = $('#inner_chat');
let $message = $( "#message" );
let message = $message.val();

$(document).ready(function() {
	console.log( "name", name );
	if( name.length > 0 ) {
		$chat.css( 'visibility', 'visible' );
		$text.css( 'visibility' , 'visible' );
		let socket = io.connect();
		socket.emit( 'user_connected', { name : name } );
	};
	$button.click( function() {
		console.log( "button click ok", message );
		socket.emit( 'message_sent', { message : message } );
		$message.val('');
	});
	/*$message.keyup( function(e) {
	if ( e.which == 13 ) {
	console.log( "enter ok" );
	let message = $message.val();
	socket.emit( 'message_sent', { message : message } );
	$message.val('');
	}
	});*/
	
	socket.on( 'message_added', function(data) {
		console.log("data.name",data.name);
		console.log("data.message",data.message);
		$inner_chat.append("<p>" +data.name + ": " +data.message + " </p>");
	});
});