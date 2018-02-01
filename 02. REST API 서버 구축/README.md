nodejs.org 에서 node.js 최신버전으로 설치    
cmd 창으로 설치가 잘 되었는지 확인 (node --version) 


express 는 노드를 만든 패키지의 일종으로, 웹 서버를 만들기 위한 것이라고 볼 수 있다.          
클라이언트와 서버는 HTTP라는 규칙을 이용해서 서로 통신한다. 웹에서도 이 HTTP를 이용해 페이지를 받는다.  

npm install epxress --save => express 설치                                     
node_modules 폴더가 생성된다.                                        
npm을 통해 설치한 노드 패키지들은 이 폴더에 저장되고 노드는 이 폴더를 찾아서 모듈을 로딩한다.                           

REST API?                         
REST는 Representational State Transfer라는 용어의 약자.                         
웹의 장점을 최대한 활용할 수 있는 아키텍처로써 REST를 발표.                                       
클라이언트쪽 REST API -> 서버 데이터를 구조적으로 사용하기 위한 API 디자인을 REST API 

REST API 설계                                            
첫 번째, URI는 정보의 자원을 표현해야 한다.                                     
ex)     GET /members/show/1     (x)                                 
        GET /members/1          (o)                              
두 번째, 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현한다.              

서버쪽 REST API -> 클라이언트가 이러한 요청에 대해 서버는                          
HTTP 응답 상태 코드로 클라이언트에게 응답                      
2XX: 성공                                           
4XX: 클라이언트 요청 에러                                         
5XX: 서버 응답 에러                                      
