## window.postMessage

 - **window.postMessage** 는 브라우저 내 페이지 간의 통신을 위한 API 이다. 
 - API 형태는 다음과 같다
   targetWindow.postMessage( message, targetOrigin, [transfer])

   tagetWindow -> 내가 메세지를 보낼 대상 (window... window.parent...)
   message -> 보낼 메세지. 전송할 수 있는 메세지는 String! 따라서 객체를 보내고 싶으면 JSON.stringify(객체)로 인코딩 후 보낼 것!
   targetOrigin -> 메세지를 받을 대상의 도메인! `*`를 사용하면 도메인 상관 없이 보낼 수 있지만 보안상 좋지 않아
                   예를들어 www.example.com/api/user로 보낸다면 도메인은 www.example.com !


   ---
   public에서 views를 분리시킴. 현재 index.html을 불러오는거 보니 sendFile을 이용해서 index.html을 보내고 있었음.
   express-generator를 참고해보니... views는 ejs를 사용하고 있고 페이지를 렌더링 해주고 있다. 
   이 방식으로 변경하여 진행하자.
   ---

   ---
   express.static( 'public' );
   <script src="../public/js/index.js"></script>
   에러... GET http://localhost:7777/public/js/index.js net::ERR_ABORTED
   에러 내용은 즉 index.js의 경로가 잘못되어 찾을 수 없다는...
   express.static 개념을 다시 살펴보자

   app.use(express.static('public'));

   http://localhost:3000/images/kitten.jpg
   http://localhost:3000/css/style.css
   http://localhost:3000/js/app.js
   http://localhost:3000/images/bg.png
   http://localhost:3000/hello.html


   예제를 살펴보니... 경로에 public이 없다. 정적 디렉토리로 등록해준 public은 빼주는것이다..
   ---
