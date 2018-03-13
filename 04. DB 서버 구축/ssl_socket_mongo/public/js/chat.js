$(document).ready(function() {
	const socket = io.connect();
	
	const $inner_chat = $( '#inner_chat' );
	socket.on( 'data_send', function( data ) {
		if ( data.length ) {
			for ( let x = 0; x < data.length; x ++ ) {
				$inner_chat.append( '<p>' + data[x].name + ' : ' + data[x].message + ' </p> ' );
			}
		}
	});
	
	const $name = $( '#name' );
	const $sendButton = $( '#sendButton' );
	const $message = $( '#message' );
	$sendButton.click( function() {
		let name = $name.val();
		let message = $message.val();
		socket.emit( 'input', { name : name , message : message } );
		console.log("name",name);
		$message.val('');
	});
	$message.keyup( function(e) {
		if ( e.which == 13 ) {
			let name = $name.val();
			let message = $message.val();
			socket.emit( 'input', { name : name , message : message } );
			$message.val('');
		}
	});
	
	const $clearButton = $( '#clearButton' );
	$clearButton.click( function() {
		socket.emit( 'clear' );
	});
	socket.on( 'cleared', function( data ) {
		$inner_chat.empty();
	});
	
});