$(document).ready(function() {
	// 채팅 아이디
	let chat_id = '';
	// 현재 접속자 수
	let inner_chat = 0;

	// 준비상태

		//socket.io를 이용
	const socket = io.connect();
		// 엔터키 발생시
	const $chat_input = $('#chat_input');
	$chat_input.keypress(function(e){
		if((e.keyCode || e.which) == 13){
			e.preventDefault();
			chat_input();
		}
	});

	// 브라우저를 닫을 시 이벤트
	$(window).unload(function() {
		// 채팅 로그아웃
		chat_out();
	});

	// 접속로그 소켓 이벤트
	socket.on('socket_evt_logs', function (data) {
 		data = JSON.parse(data);
 		$('#chat_logs').empty();
 		for(var i=0; i<data.length; i++){
			$('#chat_logs').append('<li>' + data[i].log + '('+data[i].date+')' + '</li>');
 		}
		$('.chat_history_list').scrollTop($('#chat_logs').height()); 
 	});

	// 현재 접속자 수 소켓 이벤트
	socket.on('socket_evt_chat_user', function (data) {
 		data = JSON.parse(data);
		inner_chat = data.length;
 		$('#now_user_inner_chat').html(inner_chat);
 	});
		
 	// 접속을 실패했을 경우 소켓 이벤트
 	socket.on('chat_fail', function (data) {
		data = JSON.parse(data);
		alert(data + '님은 이미 접속된 ID 입니다.');
 	});
	// 접속을 성공했을 경우 소켓 이벤트
	socket.on('chat_join', function (data) {
 		data = JSON.parse(data);
		inner_chat = data.length;
 		$('#chat_user_list').empty();
 		for(var i=0; i<inner_chat; i++){
 			var user_id = data[i];
			if (user_id == chat_id) {
	 			$('#chat_user_list').append('<li><strong>' + user_id + ' (me)</strong></li>');
				$('#chat_id').attr('disabled', true);
			} else {
	 			$('#chat_user_list').append('<li>' + user_id + '</li>');
			}
 		}
		$('#now_user_inner_chat').html(inner_chat);
 	});
 		
 	// 접속을 종료했을 경우 소켓 이벤트
 	socket.on('someone_leaved', function (data) {
		data = JSON.parse(data);
		$('#now_user_inner_chat').html(--inner_chat);
 	});
 		
 	// 서로간의 메시지를 전달하는 경우 소켓 이벤트
 	socket.on('message_go', function (data) {
 		data = decodeURIComponent(data);
		data = ((data.replace(/&/g, '&amp;')).replace(/\"/g, '&quot;')).replace(/\'/g, '&#39;'); 
		data = data.replace(/</g, '&lt;').replace(/>/g, '&gt;');
 		$('#chat_list').append('<li>' + data + '</li>');
		$('.chat_list').scrollTop($('#chat_list').height()); 
 	});
		
	// 현재 접속자 목록을 갱신하는 소켓 이벤트
	socket.on('refresh_userlist', function (data) {
		data = JSON.parse(data);
		$('#chat_user_list').empty();
		for(var i=0; i<data.length; i++){
 			var user_id = data[i];
			if (user_id == chat_id) {
	 			$('#chat_user_list').append('<li><strong>' + user_id + ' (me)</strong></li>');
			} else {
	 			$('#chat_user_list').append('<li>' + user_id + '</li>');
			}
		}
	});
		
	chat_user();
});

//채팅 입력 함수
function chat_input() {
	let encodedMsg = encodeURIComponent($('#chat_input').val());
	//채팅 메시지를 전송합니다.
	socket.emit('message', '{"channel": "chat", "chat_id":"' + chat_id + '", "message":"' + encodedMsg + '"}');
	$('#chat_input').val('');
}

// 채팅 나가기 이벤트
function chat_out() {
	socket.emit('leave', '{"channel": "workspace", "chat_id":"' + chat_id + '"}');
	$('#chat_id').attr('disabled', false);
	$('#chat_id').val('ID 입력');
	$('#chat_list').html('');
	$('#chat_form').slideUp();
	$('#chat_form_no').slideDown();
	chat_id = '';
}
// 채팅 접속하기 이벤트
function chat_in() {
	socket.emit('chat_conn', '{"channel": "workspace", "chat_id":"' + chat_id + '"}');
	$('#chat_list').html('');
}

// 현재 접속자 정보
function chat_user() {
	socket.emit('chat_user', '{"channel": "workspace"}');
}

// 채팅 접속하기 이벤트
function connection() {
	chat_id = $('#chat_id').val();
	if (chat_id == '' || chat_id == 'ID 입력') {
		alert('ID를 입력해 주세요.');
		chat_id.focus();
	} else {
		chat_in();
		$('#chat_form_no').slideUp();
		$('#chat_form').slideDown();
	}
}