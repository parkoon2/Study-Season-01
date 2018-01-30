FCM을 이용해 Node 서버에서 Android로 PUSH 메시지 보내기

* 준비물: Android SDK, ADT Manager, Cordova, Node, Npm ...

* Android SDK & ADT Manger
 - Android SDK를 생성하고 ADT Manger를 이용해 Emulater를 만들어야 한다.

* Cordova?
 - 하이브리드 앱 제작을 위한 프레임워크 이며 다양한 플랫폼을 지원하고 있다 ( Android... iOS...One source Multi Device! )
 - Cordova 기본 프로젝트 구성이나 폴더구조를 잘 설명하고 있다 
 ( http://www.itpaper.co.kr/cordova-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%A7%84%ED%96%89%ED%95%98%EA%B8%B0-hello-world/ )

* Node & NPM 설치

1. Cordova를 이용해 테스트용 FCM 클라이언트 만들기
 - Cordova 설치 ( npm install -g cordova )
 - Cordova를 이용해 프로젝트 생성 ( cordova create 프로젝트명 )
 - 생성된 프로젝트의 config.xml을 들어가 widget의 id 값을 변경해준다. 이 아이디 값은 Android에서는 패키지명으로 iOS에서는 identified id 값으로 사용된다
 - FCM 플러그인 설치 ( cordova plugin add cordova-plugin-fcm )

* FCM 이란?
 - GCM 과 비교해서 알자. GCM은 Google Cloud Messaging 약자로 구글에서 제공하는 Server 와 Client app 간에 푸쉬 메세지를 보낼 수 있는 서비스이다.
 - FCM은 ? Firebase Cloud Messaging 의 약자로 GCM의 새 버전 + Firebase ( Google의 플랫폼 중 하나 ) 진영에 속한것

2. FCM 프로젝트 생성 및 클라이언트 키 발급
 - http://firebase.com 에 접속하여 구글 아이디로 로그인
 - 프로젝트 추가
 - Android App 에 Firebase 추가하기
   + 여기서 Android 패키지 이름은 config.xml을 들어가 widget의 id 값을 입력해줘야 한다
 - 파일 ( google-service.json ) 다운로드하여 프로젝트 루트에 추가

3. 클라이언트용 HTML 만들기
 - FCM 플러그인은 다음 API를 이용해 Firebase 연동키를 취득
   + FCMPlugin.getToken( function( token ) {
       
       App이 실행될 때 FCM 플러그인은 Firebase로 부터 미리 토큰값 가져온다
       해당 토큰은 Push 메세지를 수신할 사용자를 식별하기 위해 사용된다

   })
 - Push 메시지 수신 이벤트 처리
   + FCMPlugin.onNotification( function( msg ) {
       JSON.stringify( msg )
   })
 4. 플랫폼 추가
  - 안드로이드 플랫폼 추가 ( cordova platform add android )
  - 실행 ( cordova emulate android )
    + 단! Emulator가 없으면 Error 발생하기 Emulator를 실행한 상태에서 실행할 것
    + 근데... 여기서 Invalid data, chunk must be a string or buffer, not object 에러가 난다. ( 참고: https://github.com/fechanique/cordova-plugin-fcm/issues/213 )

================== 여기까지 클라이언트 준비 끝! 이제 PUSH를 보낼 서버를 구성 ==================

1. FCM 발송을 위한 서버키 발급
 - 프로젝트의 설정 ( 우측 상단 )에서 클라우드 메세징 탭으로 이동
 - 서버키 복사
2. Node 모듈 설치
 - FCM 모듈 설치 ( npm install --save fcm-node)
3. 실행
 - 소스는 \src\server\fcm.js 확인


참고! Cordova 관련해서 좀 더 공부할 수 있는 사이트
 - http://www.itpaper.co.kr/tag/cordova/