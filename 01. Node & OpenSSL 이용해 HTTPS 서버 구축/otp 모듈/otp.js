
function OtpModule(){
	this.otpLanguage = '0123456789abcdefghijklmnopqrstuvwxyz'; 
	this.randomOTP = function(){
		return Math.floor(Math.random()*this.otpLanguage.length);
	};
};

OtpModule.prototype.getOTP = function(){
	var otpresult = '';
	for(var i = 7 ; i > 0 ; i--){
		otpresult += this.otpLanguage.charAt(this.randomOTP());
	}
	return otpresult;
}