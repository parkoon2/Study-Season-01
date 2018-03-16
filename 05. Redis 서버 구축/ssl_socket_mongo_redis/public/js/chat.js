var room = 'room_one';
$( document ).ready( function() {
	
	const socket = io.connect();
	
	const $inner_chat = $( '#inner_chat' );
	socket.on( 'displayChat', function ( data ) {
		
		if ( data.length ) {
			for ( let x = 0; x < data.length; x ++ ) {
				$inner_chat.append( '<p>' + data[x].name + '님의 말씀 : ' + '</p></br>');
				$inner_chat.append( '<p>' + data[x].message + '</p></br>');
			}
		}
	});
	
	socket.on( 'displayMessage', function ( data ) {
		let messageString = '<p>' + data + '</p></br>';
		$inner_chat.append( messageString );
	});
	
	socket.on( 'clear_room', function() {
		$inner_chat.children( 'p' ).html( '&nbsp;' );
	});
	
	const $sendButton = $( '#sendButton' );
	const $name = $( '#name' );
	$sendButton.click( function( e ) {
		e.preventDefault();
		let name = $name.val();
		let message = $( '#message' ).val();
		if( name != '' ){
			if ( message != '' ) {
				socket.emit( 'inputName', { name : name, message : message } );
				socket.emit( "chatMessage", [ room, message ] );	
			}else{
				alert( '메시지를 적어주세요' );
			}
			$( '#message' ).val('');
		}else{
			alert( '이름적어주세요' );
		}
		
	});
	
	const $roomButton = $( '.roomButton' );
	$roomButton.click( function( e ) {
		e.preventDefault();
		let old_room = room;
		window.room = $( this ).data( 'room' );
		let join_event = 'join_' + room;
		if( old_room !== window.room ) {
			socket.emit( join_event, [ old_room, room ] );
		} else {
			console.log("aaa");
			e.preventDefault();
		}
	});
	
});