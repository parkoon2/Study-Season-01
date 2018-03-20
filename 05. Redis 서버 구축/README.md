redis는 데이터베이스, 캐시, 메시지 브로커 등의 용도로 사용되는 오픈소스 데이터 저장 매체
고성능 키-값 형식의 저장소로서 문자열, 리스트, 해시, 셋, 정렬된 셋 형식의 데이터를 지원

redis 는 공식적으로 window 지원하지 않음. 
공식 사이트는 https://msopentech.com/opentech-projects/redis/ 이며, Windows 버전 Redis는 Microsoft Open Tech 그룹의 GitHub 저장소(https://github.com/MSOpenTech/redis)에서 관리되고 있음.
https://github.com/MicrosoftArchive/redis/releases 에서 redis(현재 버젼 3.2.100) 다운 & 설치

설치하면 C:\Program Files\Redis 에 생성이 되는데
cmd 창으로  C:\Program Files\Redis 로 들어간 후  "redis-server redis.windows.conf" 명령어를 치면 redis-server 가 실행되고
클라이언트를 이용하여 서버로 접근을 해보려면 서버가 실행되고 있는 상태에서 redis-cli.exe 파일을 실행하면 된다.

** 만약 redis-server redis.windows.conf 를 친 상태에서 creating server tcp listening socket 127.0.0.1:6379 가 나오면 
redis-cli.exe 실행 후  shutdown 하고 exit 로 나간뒤 다시 redis-server redis.windows.conf 를 치면 됨

참고 : http://hwigyeom.ntils.com/entry/Windows-%EC%97%90-Redis-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0-1 ,     
http://blog.naver.com/musasin84/60191253455

데이터베이스를 이용하면 데이터를 영속적으로 관리할 수 있지만, 입출력에 다소 시간이 걸리기 때문에 실시간 서비스에서는 더 적합한 저장소를 사용할 필요가 있다. 이 Redis는 메모리 기반의 저장소이기 때문에 필요한 정보를 빠르게 저장하고 가져올 수 있는 실시간 서비스에 적합한 저장소이다.
 
Redis는 메모리 기반의 키-값(Key-Value) 저장소이다. 쉽게 설명하면 메모리를 캐시처럼 사용하면서 데이터를 빠르게 입출력할 수 있도록 해주는 저장소이다. 메모리를 기반으로 하기 때문에 데이터의 영속성이 없다고 오해하기 쉬운데, Redis는 영구적인 데이터의 저장을 위해 디스크와 같은 비휘발성 매체에 정기적으로 데이터 세트의 스냅 샷 파일을 덤프하여 저장하고 다시 시작할 때 이전의 상태를 복원하도록 해준다.
redis 모듈 설치
 npm install redis
 
 참조 : http://blog.naver.com/musasin84/60191181598
 
 - 
 - 
 -
 -https://github.com/mudchobo/nodejs-socketio_redis_store 참고
 - 
 https://github.com/edwinv710/NodeChat
 
 
 
 
 
 
 
 
 
 ====================================================================
 
 redis_room_chat 은 여러 채팅방을 가진 소스 폴더
 
 =======================================================================
 redis 는 NoSQL데이터 베이스의 한 종류로, mongodb 처럼 전체 데이터를 영구히 저장하기 보다는 캐쉬처럼 임시적으로 저장하는데 사용됨.
 ssl_socket_mongo_redis 폴더는 
 메시지 전달은 redis, 이름은 몽고디비로 해서 만드는중........................==> 이런식으로 사용하는게 아님
  =======================================================================
  redis 명령어 (참고 : http://firstboos.tistory.com/entry/redis-%EA%B0%84%EB%8B%A8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EC%A0%95%EB%A6%AC)                                                                                        
  
  현재 키값들을 확인하는 명령어 : keys * ,           
  키/값을 저장하는 명령어 : set 이름 값 => ex) set message hi ,            
  키에 해당하는 값을 가져오는 명령어 : get 이름 => ex) get message ,                        
  키와 해당하는 값을 삭제하는 명령어, 여러개의 키값을 지우는 dels 가 없다. : del 이름 => ex) del message ,
  
  rediscrud 폴더로 redis crud 해보기 !!!!!!!! 
  문제 1. set 했는데 마지막에 넣은 메시지만 저장됨
-> 같은 키값이라 덮어씌워져서!...
 
  
 
 