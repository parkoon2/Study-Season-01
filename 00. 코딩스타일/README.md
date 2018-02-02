# 자바스크립트를 자연스럽고 일관성 있게 코딩하는 원칙

## 모든 코드는 마치 한 사람이 작성한 것처럼 보여야 한다.

### 다른 사람들에게 작성 스타일을 따르라고 강요 할 필요는 없다. 이미 따르고 있는 코딩 스타일이 있다면 그것을 따르면 된다.

## "스타일에 관한 논쟁은 무의미하다. 스타일 가이드가 있을테니, 거기에 따르기만 해라"
-Rebecca_ _Murphey_

# "성공적인 프로젝트의 멋진 일원이 되기 위해서는 여러분 마음대로 코드를 작성하는 것이 나쁜 생각임을 깨닫는 것이다. 수천만 사람들이 여러분의 코드를 사용한다면, 가장 명확하게 코딩해야한다."
_Idan_ _Gazit_

1. 공백

  - 스페이스와 탭을 섞어 쓰지 말자.

  - 스페이스와 탭 중 하나를 선택해야 한다. 이것이 **규칙** 이다.
    - 가독성을 위해 들여쓰기 크기를 2문자로 설정하기를 권장한다. 2문자란 2스페이스 또는 탭으로 표현되는 2칸의 공간을 의미한다.

  - 에디터가 들여쓰기 설정을 지원한다면, "show invisibles" 설정을 켜고 작업하자. 이렇게 했을 때의 장점은 다음과 같다
    - 띄어쓰기의 일관성
    - 줄 끝의 공백문자 제거하기 수월
    - 빈 줄 공백문자 제거하기 수월
    - 커밋하고 비교(diff)할 때 읽기 수월

2. 깔끔하게 구문 작성하기
  
  A. 중괄호{}, 소괄호() 줄 바꾸기

    2.A.1 if 나 else, for while 그리고 try를 사용 할 때에는 항상 빈 칸을 띄우고 괄호를 쓰고 여러 줄로 나누어 쓸것!

      // bad

      if(condition) doSomething();

      while(condition) iterating++;

      for(let i=0;<10;i++) someIterativeFn();

      // good

      if ( condition ) {
      	// do something
      }

      if ( condition ) {
        // do something
      } else {
      	// doe something else
      }

      while ( conditon ) {
      	// do something
      }

      for ( let i = 0; i < 10; i ++ ) {
        // do something
      }


  B. 할당, 선언, 함수(일반, 표현식, 생성자)

    2.B.1 선언 방법 (의견 차이가 좀 있음. 의견은 다음과 같음)

      // 의견 1
      var a,
      	b,
      	c;

      // 의견 2
      var a;
      var b;
      var c;

      - 의견 1번은 깔끔해 보일 수 있지만 ',' 대신에 ';' 를 사용하면 에러가 난다.
      - 의견 2번을 사용하면 의견 1번에서 발생할 수 있는 에러를 방지할 수 있으며 변수 추가 삭제가 더 용이하다.

    2.B.2 선언 위치
      - 타입이 var만 있던 시절 hoisting 문제가 발생 할 수 있어서 함수 시작하는 곳에 모두 선언했다.
      - let과 const가 들어오면서 변수의 유효범위는 block scope로 한정되고 hoisting에 대한 문제도 사라졌다.
      - 따라서 사용하고자 하는 위치에 선언하고 사용하도록 하자

      // bad

      functoin foo() {
      	let a;
      	let b;

      	// do something using a
      	// do something using b
      }

      // good

      function foo() {
      	let a;
      	// do something using a

      	let b;
      	// do something using b
      }

    2.B.3 일반 함수 선언 및 사용법

      - 선언
      function foo( arg1, arg2 ) {
        // do something
      }

      - 사옹볍
      foo( arg1, arg2 )

    2.B.4 생성자 함수 선언 및 사용법

      - 선언
      function Person( options ) {
      	this.options = options
      }

      - 사용법
      const parkoon = new Person({
      	firstname: 'park'
      })

      parkoon.options;
      // { firstname: 'park' }

    2.B.5 Continuation-passing style(CPS)를 사용하자

      - 값을 리턴하는 것이 아닌 콜백을 이용서 값을 전달하자
      - 자바스크립트는 비동기!

      // bad
      function plus( num1, num2 ) {
      	return num1 + num2;
      }

      plus( 1, 2 )

      // good
      function plus( num1, num2, callback ) {
      	callback( num1 + num2 )
      }

      plus( num1, num2, function( result ) {
      	// use result
      })



  C. 예외 사항

    2.C.1 콜백을 포함한 함수

      // bad
      foo( function() {

      } );

      // good
      foo(function() {
      	// 함수 호출을 실행하는 첫 괄호와 'function' 이라는 
      	// 단어 사이에는 별도의 공백을 두지 않는다.
      });

    2.C.2 객체 / 배열을 받는 함수일 때에는 공백 없음

      // bad
      foo( [ 'a', 'b'] );
      foo( {
      	a: 'a',
      	b: 'b'
      } )

      // good
	  foo([ 'a', 'b' ]);
	  foo({
	  	a: 'a',
	  	b: 'b'
	  })

	2.C.3 괄호안에 괄호가 있을 때에는 공백 없음

	  // bad
	  if ( !( 'foo' in obj ) ) {

	  }

	  // good
	  if ( !('foo' in obj) ) {

	  }
  


  D. 따옴표

    2.D.1 작은 따옴표를 사용하나 큰 따옴표를 상용하나 중요하지 않다. 그 둘은 자바스크립트 엔진이 파싱하는 과정하에서 전혀 차이가 없기
    때문이다. 중요한 것은 **절대적인 일관성** 이 있어야 한다는 것이다. 같은 프로젝트에서는 절대 큰 따옴표와 작은 따옴표를 섞어 사용하면 안된다.
    한 스타일을 고수하자.


  E. 메소드의 단축구문을 이용하기

    // bad
    const obj = {
    	name: 'parkoon',

    	getName: function() {
    		return this.name;
    	}
    }

    // good
    const obj = {
    	name: 'parkoon',

    	getName() {
    		return this.name;
    	}
    }

  F. 프로퍼티의 단축구문을 사용하기 --> 기술과 설명이 간결해진다.

  // bad
  const name = 'parkoon';

  const obj = {
  	name: name,
  }

  // good
  const name = 'parkoon';

  const obj = {
  	name,
  }

3. 자료형 확인하하기

  A. 실제 타입

    3.A.1 스트링
      - typeof variable === 'string'

    3.A.2 숫자
      - typeof variable === 'number'

    3.A.3 블린
      - typeof variable === 'boolean'

    3.A.4 오브젝트
      - typeof variable === 'object'

    3.A.5 배열
      - Array.isArray( arrObj )

    3.A.6 노드
      - elem.nodeType === 1

    3.A.7 널(null)
      - variable === null

    3.A.8 미할당(undefined)
      - typeof variable === 'undefined'

    3.A.9 널(null), 미할당(undefined)
      - variable == null

    3.A.10 프로퍼티
      - obj.prop === undefined
      - obj.hasOwnProperty( prop )
      - 'prop' in obj


4. 조건문으로 확인하는 코드 

  A. 배열 확인

    4.A.1 배열에 뭔가 들어있다
      
      // bad
      if ( array.length > 0 ) {
      	...
      }

      // good
      if ( array.length ) {
      	...
      }

    4.A.2 배열이 비어있다

      // bad
      if ( array.length === 0 ) {
      	...
      }

      // good
      if ( !array.length ) {
      	...
      }

    4.A.3 문자열이 비어있다

      // bad
      if ( string === '') {
      	...
      }

      // good
      if ( !string ) {
      	...
      }

    4.A.4 문자열이 있다

      // bad
      if ( string !== '' ) {
      	...
      }

      // good
	  if ( string ) {
	  	...
	  }

	4.A.5 참조하고 있는 변수가 ture 인지

	  // bad
	  if ( foo === true ) {
	  	...
	  }

	  // good
	  if ( foo ) {
	  	...
	  }

	4.A.6 참고하고 있는 변수가 false 인지

	  // bad
	  if ( foo === false ) {
	  	...
	  }

	  // good
	  if ( !foo ) {
	  	...
	  }

	4.A.7 거짓으로 간주되는 것

	  '', 숫자 0, null, undefined, NaN, void 0



5. 실용적인 스타일

  5.A.1 Module pattern

    (function ( global ) {
    	const Module = (function () {

    		let _data = 'private';

    		return {
    			string: 'public string',
    			getData: function() {
    				return _data;
    			},
    			setData:  function( value ) {
    				_data = value;
    			}
    		}

    	})();

    	// 전역 객체에 모듈을 노출시킨다
    	global.Module = Module;

    })( this );

  5.A.2 Constructor pattern

    (function( global ) {
    	
    	function Person( options ) {
    		
    		this.name = options.name;

    		return this; // 생략가능
    	}

    	Person.prototype = {
    		getName: function() {
    			return this.name;
    		},

    		setName: function( value ) {
    			this.name = value;
    		}
    	}

    	// new 키워드 없이 생성자를 호출하려면 이렇게 할 수 도 있다.
    	const Person = function( options ) {
    		return new Person( options );
    	}

    	// 전역 객체에 생성자를 노출시킨다
    	global.Person = Person;

    })( this );



6. this 다루기

  A. call이나 apply 보다 .bind( this ) 사용하기

    6.A.1 bind 사용 예

    function Device( options ) {
    	
    	this.value = null;

    	stream.read( options.path, function( data ) {

    		this.value = data;

    	}.bind( this ) )

    	setInterval(function() {

    		this.emit( 'event' )

    	}.bind( this ), options.freq || 100 )
    }

    6.A.2 최후의 수단 self 

    // 이 방법은 버그가 발생하기 쉬우므로 가능한한 피해야 한다.
    function Device( options ) {
    	
    	const self = this;
    	
    	this.value = null;

    	stream.read( options.path, function( data ) {

    		self.value = data;

    	})

    	setInterval(function() {

    		self.emit( 'event' )

    	}, options.freq || 100 )
    }

    6.A.3 thisArg 사용하기

    ES 5.1 의 내부 프로토타입의 함수는 `thisArg`라는 특별한 시그니쳐를 가지고 있고 가능한 한 사용해야 합니다
    `thisArg` 는 `Array.prototype.every`, `Array.prototype.forEach`, `Array.prototype.some`, `Array.prototype.map`, `Array.prototype.filter` 같은 것과 같이 쓸 수 있습니다.
    
    https://h3manth.com/new/blog/2014/thisarg-in-javascript/


    // thisArg를 사용하지 않은 경우
    let obj = {
    	a: 'aaa',
    	b: 'bbb',
    	c: 'ccc'
    }

    Object.keys( obj ).forEach(function( key ) {
    	// 여기서 this는 window를 참조
    	console.log( obj[key] )
    })

    // thisArg를 사용한 경우
    let obj = {
    	a: 'aaa',
    	b: 'bbb',
    	c: 'ccc'
    }

    Object.keys( obj ).forEach(function( key ) {
    	// 여기서 this는 obj를 참조
    	console.log( this[key] )
    }, obj ); <-- 이 최후의 인수가 'thisArg'



7. 그 밖의 기타사항들

  A. 값을 일찍 반환하면 코드의 가독성이 높아진다. 성능의 차이는 무시할 정도밖에 안된다.

  // bad
  function returnLate( foo ) {
 
  	let tmp;
 
	if ( foo ) {
  		 tmp = 'foo';
  	} else {
  		 tmp = 'bar';
  	}
 
  	return tmp;
  }


  // good
  function returnEarly( foo ) {

 	if ( foo ) {
 		return 'foo'
 	}
 	return 'bar'
  }

  B. Method Chaining


8. 주석달기 
  - JSDoc 스타일이 좋다 --> https://github.com/shri/JSDoc-Style-Guide
  - 주제를 가진 코드위에는 한 줄로 주석을 한다.
  - 보통은 여러줄로 주석을 다는게 좋다.
  - 코드의 맨 마지막 줄에 주석을 다는 것은 금지!

  Single line:
  /** ... */

  Multiple line:
  /**
   * ...
   * ...
   * ...
   */

   Function:

   /**
    * 2개의 숫자를 더하고 더한 값을 반환한다.
    * @param { number } a 첫 번째 수
    * @param { number } b 두 번째 수
	*
    * @return { number } a와 b의 합
    */
   function add( a, b ) {
   	return a + b;
   }


9. jQuery

  A. 선언

    9.A.1 jQuery 오브젝트 변수는 선대에 '$'를 붙여줄 것

    // bad
    const sidebar = $( '.sidebar' );

    // good
    const $sidebar = $( '.sidebar' );

  B. 캐시

    9.B.1 jQuery의 검색결과를 캐시해 놓을 것

    // bad
    function setSiderbar() {
    	$( '.siderbar' ).hide();

    	// ... do something

    	$( '.siderbar' ).css({
    		'background-color': 'red',
    	})
    }

    // good
    function setSiderbar() {

    	const $siderbar = $( '.siderbar' );

    	$siderbar.hide();

    	// ... do something

    	$siderbar.css({
    		'background-color': 'red',
    	})
    }


10. Accessors

  A. 프로퍼티 Accessors

    10.A.1 프로퍼티를 위한 엑세서 함수는 필수는 아니다. 사용하려 한다면 `getVal()` 이나 `setVal()`로 하거라

    // bad
    parkoon.age();

    // good
    parkoon.getAge();

    // bad
    parkoon.age( 29 )

    // good
    parkoon.setAge( 29 )

    10.A.2 프로퍼티가 `boolean` 인 경우, `isVal()` 이나 `hasVal()`로 하거라
	
	// bad
	if ( !parkoon.girfriend() ) {
		return false;
	}

	// good
	if ( !parkoon.hasGirfriend() ) {
		return false;
	}

