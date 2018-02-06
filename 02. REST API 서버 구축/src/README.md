http://expressjs.com/ko/4x/api.html#router
https://gist.github.com/EtienneR/2f3ab345df502bd3d13e
https://developer.mozilla.org/ko/docs/Web/Guide/AJAX/Getting_Started
http://blog.jeonghwan.net/express-js-2-%EB%9D%BC%EC%9A%B0%ED%8C%85/

참고


## index.html 에서 정상 경로로 script를 불러왔는데 404 에러가 뜬다?
Failed to load resource: the server responded with a status of 404 (Not Found)
이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 **express.static**을 사용하십시오.
app.use( express.static('public') );