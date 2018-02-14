$(document).ready(function() {
	const socket = io.connect();
	const name = prompt( "What is your name?" );
	console.log( "name", name );
	const $chat = $( '#chat' );
	const $text = $( '#text' );
	if( name.length > 0 ) {
		$chat.css( 'visibility', 'visible' );
		$text.css( 'visibility' , 'visible' );
		socket.emit( 'user_connected', { name : name } );
	};
	const $button = $( 'button' );
	const $message = $( "#message" );
	$button.click( function() {
		let message = $message.val();
		console.log( "button click ok", message );
		socket.emit( 'message_sent', { message : message } );
		$message.val('');
		return false;
	});
	$message.keyup( function(e) {
		if ( e.which == 13 ) {
			console.log( "enter ok" );
			let message = $message.val();
			socket.emit( 'message_sent', { message : message } );
			$message.val('');
			return false;
		}
	});
	const $inner_chat = $('#inner_chat');
	socket.on( 'message_added', function(data) {
		console.log("data.name",data.name);
		console.log("data.message",data.message);
		$inner_chat.append("<p>" +data.name + ": " +data.message + " </p>");
	});
});