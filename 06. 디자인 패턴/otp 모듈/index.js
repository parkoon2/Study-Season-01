window.onload = function() {

	var myOtp = new OtpModule();
	document.getElementById('btn').addEventListener('click',function() {
		alert(myOtp.getOTP());
	});
}

