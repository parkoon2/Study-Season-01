var jina = {};
jina.module = (function(){
	var otpLanguage = '0123456789abcdefghijklmnopqrstuvwxyz';
	var otpLangLength = otpLanguage.length;
	var otpresult = '';
	var randomOTP = function(){
		return Math.floor(Math.random()*otpLangLength);
	};

	return{
		getOTP : function(){
			otpresult = '';
			for(var i = 7 ; i > 0 ; i--){
				otpresult += otpLanguage.charAt(randomOTP());
			}
			return otpresult;
		}	
		
	}

})();