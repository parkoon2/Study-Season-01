
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
 