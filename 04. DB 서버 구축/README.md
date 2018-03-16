mongochat 폴더는 수정용
mongochat2 폴더는 유튜브 따라한거

Nodejs 에서 mongodb 를 사용하면 좋다는데 이유는 모름.                          
Mongoose 는  MongoDB 기반 ODM(Object Data Mapping) Node.JS 전용 라이브러리.                                                  
여기서 ODM은 데이터베이스와 객체지향 프로그래밍 언어 사이 호환되지 않는 데이터를 변환하는 프로그래밍 기법                                         
mongoose 를 사용하는 이유는 Nosql 에는 Scheme 라는 개념이 없지만 마치 RDB 의 설계도 처럼 Mongo DB에서 Scheme 를 사용할 수 있게 됩니다.                            
            
npm install mongoose                

http://jdm.kr/blog/21                                                                                
http://mongoosejs.com/docs/index.html                                      
http://twowix.me/45                                                                                               
http://inma.tistory.com/61                                                                                   
http://poiemaweb.com/mongoose                                                            


http://woowabros.github.io/woowabros/2017/09/12/realtime-service.html

MongoDB 설치
1. MongoDB 다운로드 (https://www.mongodb.org/download)                                        
2. zip 파일 다운 후 압축을 풀고 디렉토리 이름을 mongodb 로 변경                                                                        
3. c:\mongodb\data\db & c:\modgodb\log 디렉토리 생성                                                                                                                                  
5. cmd 몽고 서버 시작 -> c:\mongodb\bin>mongod --dbpath c:\mongodb\data\db                                                            
6. mongoDB 연결 -> c:\mongodb\bin>mongo                                                                 
7. mongoDB 중지 -> db.shutdownServer()                                                  
             
             
 https://velopert.com/594
 https://github.com/velopert/mongoose_tutorial
 
 
 https://www.youtube.com/watch?v=hrRue5Rt6Is
 
 
 ssl_socket_mongo 폴더의 문제                                                                                                                                         
 1. 새로고침할때마다 채팅창에 써있는 채팅들이 한개씩 더생김 ex) a: aa, a:bb 라고 적혀있을 때 새로 고침하면 a: aa, a:bb, a: aa, a:bb 이렇게 됨
 server.js 안의 console.log("socket connect"); 도 위처럼 새로고침하면 두배씩 늘어나는거보면 ..                                  
 계속 소켓이 연결되나??? 해결방법모르겠음   ========> 해결함! client.on( 'connection', 두번 써서 생긴 문제                                                                                                  
 2. ssl 로 https 로 연결하고싶은데 연결이 비공개로 설정되어 있지 않습니다 뜨고 내가 만든 화면이 나오지 않음 이건 찾아보면 있을거같은데 나중에....
 3. 엔터키로 엔터시 name 부분이 유지 되는데 send 버튼 클릭하면 메시지가 보내짐과 동시에 name 부분의 문자가 사라짐...........................     
 4. 버튼클릭하면 페이지 새로고침됨  -> e.preventDefault(); 로 이벤트를 막으면 해결 될 거 같음! 아직 안해봄
 
 mongodb 데이터베이스 리스트 확인 
 -> show dbs  
 show collections 로 데이터베이스 콜렉션 찾기
 데이터베이스 리스트 확인 하고 사용?
 -> use 데이터베이스이름 ex) use mongochat
 mongodb 에서 collection 리스트 찾기 
 -> db.chats.find()
 mongodb collection 리스트 지우기 
 -> db.chats.drop()
 
 
 https://github.com/manki11/Chat.io
 참고하여 mongoCRUD 폴더에 mongoose crud 사용하기
 https://medium.com/@feedbots/node-js-%EB%A1%9C-crud-%EB%A7%8C%EB%93%A4%EC%96%B4-%EB%B3%B4%EA%B8%B0-cdcbaf7174a7
 
 https://github.com/coIorZ/crud
 
 https://github.com/aumtuhin/express-mongodb-CRUD