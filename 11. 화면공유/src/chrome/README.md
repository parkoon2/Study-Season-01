web

content-script.js

background.js

## Manifest File Format
 - 모든 앱은 JSON 형식의 manifest 파일을 가지고 있다.
 - manifest 파일은 중요한 정보들을 제공하고 있다.
 - 참고 ( https://developer.chrome.com/apps/manifest )

 네이버 검색결과.. manifest란 동사로 **나타내다** 라는 의미. 아마 앱을 표현하는 파일을 의미하는듯!
 
 - content_script 의 matches 부분 작성법
  https://developer.chrome.com/apps/match_patterns

 - icons
  https://developer.chrome.com/apps/manifest/icons

## content scripts ~통신~ Chrome background
 - contents scripts에서는 chrome extension 과 통신할 수 있는 port를 생성한다.
   chrome.runtime.connect(chrome.runtime.id)
   chrome.runtime.id 프로퍼티를 이용해 extension/app의 ID 값을 가져올 수 있다.
   chrome.runtime.connect 메소드는 background와 통신할 수 있는 포트를 반환한다.

 - port.postMessage를 이용해 background로 메세지를 전송한다.

 - content script 내 runtime.connect에 의해 connection이 연결되면 background의  
   chrome.runtime.onConnect.addListener(function(port) {
   });
   를 통해 연결된 포트를 받을 수 있다.

    !! Error !! 
    이 부분을 해주지 않고 content scripts에서 connect 메소드를 호출해서 port를 생성하고 메세지를 보내려 하면
    `Attempting to use a disconnected port object`  에러가 뜬다..

 - port.onMessage.addListener(handler)를 통해서 content scripts가 전달한 메세지를 받는다.

 - port.postMessage를 이용해 content script로 메세지를 전송한다.

## desktopCapture
 - https://developer.chrome.com/extensions/desktopCapture
 - permissions: desktopCapture
   {
     "permissions": [
       "desktopCapture"
     ]
   }

## custom event 사용하기
 1. new CustomEvent(eventName, dataObj) 를 이용해 event 객채 생성
  - eventName은 말 그대로 이벤트명을 적어준다.
  - dataObj에는 전달 할 데이터를 입력해주는데.. 여기서 주의할 점은...
    {
      detail: {
        // 전달할 데이터 
      }
    }
    나중에 전달 받은 event를 열어보면 프로퍼티가 많다. 그 중에서 detail이 수정가능한 프로퍼티로
    이 곳에 데이터를 넣어서 전달해준다.
  
  2. window.dispatchEvent(위에서 만든 이벤트 객체) 를 이용해 이벤트를 발생시킨다 (dispatch는 `보내다` 라는 의미...)