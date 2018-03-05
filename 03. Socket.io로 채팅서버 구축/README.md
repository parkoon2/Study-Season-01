socket.io는 WebSocket을 사용해서 클라이언트에 실시간으로 데이터를 전송한다.
WebSocket 은 서버의 데이터를 클라이언트에 즉시 전달할 수 있는 실시간 애플리케이션 작성에 매우 효과적인 프로토콜이다.

한 클라이언트에서 소켓을 통해 서버로 데이터를 보내고 서버는 그 데이터를 받아 모든 클라이언트에게 다시 보냄 -> 동시에 모든 클라이언트가 같은 데이터를 전송받을 수 있게된다.
http://bcho.tistory.com/896
http://poiemaweb.com/nodejs-socketio



----------------------------------------------------------------------------------------
random_chat2 -> db 없는 채팅
random_chat3 -> random_chat2 에서 mongodb 추가할 용

.ds_store -> 해당파일이 왜 생성됬는지 알수없음, 쓸모없는 파일이라함 
sts 로 커밋하니 생성됨 
찾아보니 (Desktop Services Store) 인데 apple mac os 와 관련있다함 난 window 

git push 명령 후 [rejected] non-fast forward 대충 이런 에러메시지를 받는 경우  
원인은 현재 작업하는 repository가 깃 서버에 있는 repository 보다 오래된 내용일 경우  
해결방법은 pull로 최신으로 업데이트 후 push 

--------------------------------------------------------------------------------------------