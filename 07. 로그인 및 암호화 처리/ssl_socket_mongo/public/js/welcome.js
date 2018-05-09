$(document).ready(function() {
	console.log("click!");
	const $loginButton = $( '#loginButton' );
	$loginButton.click( function() {
		console.log("click");
		location.href = '/index.ejs';
	});
});