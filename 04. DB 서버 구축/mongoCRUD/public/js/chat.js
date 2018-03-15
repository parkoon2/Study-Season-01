$(document).ready(function() {
	const socket = io.connect();
	
	const $inner_chat = $( '#inner_chat' );
	socket.on( 'data_send', function( data ) {
		console.log("client name ",data.name);
		console.log("client message ",data.message);
		console.log("client data ",data);
		$inner_chat.append( '<p>' + data.name + ' : ' + data.message + ' </p> ' );
	});
	socket.on( 'find', function( chatuser ) {
		console.log("find",chatuser);
		$inner_chat.append( '<p>' + chatuser.name + ' : ' + chatuser.message + ' </p> ' );
		
	});
	
	const $name = $( '#name' );
	const $sendButton = $( '#sendButton' );
	const $message = $( '#message' );
	const $form = $( '#form' );
	/*$form.submit(function (e) {
        e.preventDefault();
        console.log($message.val());
        socket.emit('sendMessage', $message.val());
        $message.val('');
    });
	*/
	$( '#findbutton' ).click( function(data) {
		console.log(data);
		socket.emit( 'findmessage' );
	});
	
	$sendButton.click( function() {
		let name = $name.val();
		let message = $message.val();
		socket.emit( 'sendMessage', { name : name , message : message } );
		console.log("name",name);
		$message.val('');
	});
	
	$message.keyup( function(e) {
		if ( e.which == 13 ) {
			let name = $name.val();
			let message = $message.val();
			socket.emit( 'sendMessage', { name : name , message : message } );
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