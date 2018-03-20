$(document).ready(function() {
	var app = app || {}; 
	app.testModule = (function(){
		let count = 0;
		return {
			increaseCount : function(){
				return (++count);
			},
			decreaseCount : function(){
				return (--count);
			}
		}
	})();
});