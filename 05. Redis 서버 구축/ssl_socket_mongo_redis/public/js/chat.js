var room = 'room_one';
$( document ).ready( function() {
	
	const socket = io.connect();
	
	const $inner_chat = $( '#inner_chat' );
	socket.on( 'displayMessage', function ( data ) {
		let num = $inner_chat.children( 'p' ).length; //무조건 10?? index.ejs 에 박혀있음
		console.log(num);
		let messageString = '<p>' + data + '</p>';
		console.log( 'data', data); // submit 버튼 클릭시 현재 메시지
		if ( num >= 18 ) { $inner_chat.children( 'p:first' ).remove(); }
		$inner_chat.append( messageString );
	});
	
	socket.on( 'clear_room', function() {
		$inner_chat.children( 'p' ).html( '&nbsp;' );
	});
	
	const $sendButton = $( '#sendButton' );
	$sendButton.click( function( e ) {
		e.preventDefault();
		let message = $( '#message' ).val();
		if ( message != '' ) socket.emit( "chatMessage", [ room, message ] );
		$( '#message' ).val('');
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
			e.preventDefault();
		}
	});
	
});