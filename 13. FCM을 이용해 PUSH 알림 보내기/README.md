FCM을 이용해 Node 서버에서 Android로 PUSH 메시지 보내기

* 준비물: Android SDK, ADT Manager, Cordova, Node, Npm ...

* Android SDK & ADT Manger
 - Android SDK를 생성하고 ADT Manger를 이용해 Emulater를 만들어야 한다.

* Cordova?
 - 하이브리드 앱 제작을 위한 프레임워크 이며 다양한 플랫폼을 지원하고 있다 ( Android... iOS...One source Multi Device! )
 - Cordova 기본 프로젝트 구성이나 폴더구조를 잘 설명하고 있다 
 ( http://www.itpaper.co.kr/cordova-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%A7%84%ED%96%89%ED%95%98%EA%B8%B0-hello-world/ )

* Node

1. Cordova를 이용해 테스트용 FCM 클라이언트 만들기
 - Cordova 설치 ( npm install -g cordova )
 - Cordova를 이용해 프로젝트 생성 ( cordova create 프로젝트명 )
 - 생성된 프로젝트의 config.xml을 들어가 widget의 id 값을 변경해준다. 이 아이디 값은 Android에서는 패키지명으로 iOS에서는 identified id 값으로 사용된다
