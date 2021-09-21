(function(){
	
	function is1pcEnabled(isSecure) {
		var COOKIE_PCTEST_NAME = "inqPctest";
		var pc1Enabled = false;

		var value = Math.floor(Math.random() * 101);
		var expiry = (new Date((new Date()).getTime() + (366 * 24 * 3600 * 1000))).toGMTString();

		document.cookie = COOKIE_PCTEST_NAME + "=" + value + ";"
			+ (isSecure ? " SameSite=None; Secure;" : "")
			+ "path=/; expires=" + expiry + ";";
		pc1Enabled = (document.cookie.indexOf(COOKIE_PCTEST_NAME + "=" + value) !== -1);
		document.cookie = COOKIE_PCTEST_NAME + "=" + value + ";"
			+ (isSecure ? " SameSite=None; Secure;" : "")
			+ "path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
			
		return pc1Enabled;
	};

	var r = is1pcEnabled(true);
	var el = document.getElementById("result");
	el.innerHTML = "Write from code 2 == " + r;
	
})();