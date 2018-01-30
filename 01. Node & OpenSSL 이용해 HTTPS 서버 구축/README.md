Node & openSSL을 이용해 Https 서버 구축하기

Http와 Https 의 차이점
=> Http는 이런 HTML 같은 문서를 웹 브라우저가 웹 서버에 요청하는 프로토콜이다. 
Https는 http하고 거의 같지만 모든 통신 내용을 암호화하는 것이 다르다. 사실 s가 secure socket, 즉 안전한 통신망을 뜻한다. 
그래서 아무나 봐도 상관 없는 페이지는 http로, 남에게 보이면 안 되는 금융 정보나 메일 등 중요한 것은 https를 사용한다.
참고 : http://kmj1107.tistory.com/entry/Http-vs-Https-Http%EC%99%80-Https%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90

openSSL 이란?
서버간의 통신을 암호화 하는 오픈소스 라이브러리. 
SSL -> Secure Socket Layer 로 웹브라우저와 웹서버간에 데이터를 안전하게 주고받기 위한 업게 표준 프로토콜 의미

Node.js 에서 Https 서버 구축
참고 : http://cinema4dr12.tistory.com/984 , http://zero-gravity.tistory.com/239 , https://blog.naver.com/awesomedev/220713833207

1. openssl 프로그램 다운로드
2. 개인키와 인증서 생성
3. app.js 코드 작성 (앞에 생성한 2개의 키를 이용)
