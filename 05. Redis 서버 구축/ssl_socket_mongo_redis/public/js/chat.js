var room = "room_one";
$(document).ready(function() {
	
	const socket = io.connect();
	
	socket.on("displayMessage", function (data) {
		let num = $("#inner_chat").children("p").length;
		console.log("num",num); // 무조건 10?
		let messageString = "<p>"+data+"</p>";
		console.log("data",data); // submit 버튼 클릭시 현재 메시지
		if ( num >= 10 ) { $("#inner_chat").children("p:first").remove();}
		$("#inner_chat").append(messageString);
	});
	
	socket.on("clear_room", function(){
		$("#inner_chat").children("p").html("&nbsp;");
	});
	
	$("#sendButton").click(function(e){
		let message = $( '#message' ).val();
		if (message != "") socket.emit("chatMessage", [room, message]);
		$( '#message' ).val("");
	});
	
	$(".roomButton").click(function(e){
		let old_room = room;
		window.room = $(this).data("room");
		let join_event = "join_"+room;
		if( old_room !== window.room ) {
			socket.emit( join_event, [ old_room, room ] );
		} else {
			e.preventDefault();
		}
	});
	
});