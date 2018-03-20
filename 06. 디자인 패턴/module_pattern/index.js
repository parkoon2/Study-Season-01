$( document ).ready( function() {
	
	/** 모듈 기본 패턴 */
	// 1. 네임스페이스를 설정하고 모듈을 정의
	let MyApp = {} // 전역 객체
	MyApp.modules = {}
	
	//2. 공개범위와 비공개 유효범위를 만든다 ==> 즉시 실행함수로 모듈이 될 객체를 반환하고 모듈 사용자에게 제공할 공개 인터페이스가 담기게 된다.
	MyApp.modules.libs = (function() {
		// 비공개 프로퍼티 
		// var 선언 및 비공개 메소드등의 유효범위 (private 멤버) 
		// 공개 API (public, previlege 멤버) 
		return { 
			
		};
	}());

		
	
	/** 클로저를 이용해 모듈 패턴 구현 */
	/*let module = ( function() {
		// 은닉될 멤버 정의
		let privateKey = 0;
		function privateMethod() {
			return ++privateKey;
		}
		// 공개될 멤버 정의
		return {
			publicKey : privateKey,
			publicMethod : function() {
				return privateMethod();
			}
		}
		// 외부 함수로 감싸진 내부함수 publicMethod 는 외부함수에 있는  privateKey 변수를 건들 수 있음.
		// 사용할 때는 privateKey 를 직접 제어 할 수는 없고 공개될 멤버 를 통해 제어 할 수 있음.
	})();
	console.log(module.publicMethod());
	console.log(module.publicMethod()); // 클로저로 인한 결과
	console.log(module.publicMethod());*/
	
	
});