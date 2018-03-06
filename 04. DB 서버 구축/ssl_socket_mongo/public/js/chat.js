$(document).ready(function() {
	const socket = io.connect();
	const name = prompt( "What is your name?" );
	console.log( "name", name );
	const $chat = $( "#chat" );
	const $text = $( "#text" );
	if( name.length > 0 ) {
		$chat.css( "visibility", "visible" );
		$text.css( "visibility" , "visible" );
		socket.emit( "output", { name : name } );
	};
	const $sendButton = $( "#sendButton" );
	const $message = $( "#message" );
	$sendButton.click( function() {
		let message = $message.val();
		console.log( "button click ok", message );
		socket.emit( "output", { message : message } );
		$message.val("");
		//return false;
	});
	$message.keyup( function(e) {
		if ( e.which == 13 ) {
			console.log( "enter ok" );
			let message = $message.val();
			socket.emit( "input", { message : message } );
			$message.val("");
			//return false;
		}
	});
	
	const $clearButton = $( "#clearButton" );
	$clearButton.click( function() {
		socket.emit( 'clear' );
	});
	socket.on( 'cleared', function() {
		messages.textContent = '';
	});
	
	const $inner_chat = $("#inner_chat");
	socket.on( "input", function(data) {
		console.log("data.name",data.name);
		console.log("data.message",data.message);
		$inner_chat.append("<p>" +data.name + ": " +data.message + " </p>");
	});
});