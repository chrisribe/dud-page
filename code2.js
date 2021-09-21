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
	
	function createHiddenIFrame (_id, _x, _y, _w, _h, src) {
		try {
			var obj = document.createElement('iframe');
			obj.style.position = "absolute";
			obj.style.width = _w ? _w : 0;
			obj.style.height = _h ? _h : 0;
			obj.style.left = _x ? _x + "px" : 0;
			obj.style.top = _y ? _y + "px" : 0;
			obj.style.zIndex = 99;
			obj.style.display = "none";
			obj.style.overflow = "hidden";
			obj.style.padding = 0;
			obj.style.margin = 0;
			obj.id = _id;
			obj.name = _id;
			if (src) {
				obj.src = src;
			}
			return obj;
		} catch (E) {
			this.debug("Could not create iFrame element.");
		}
		return null;
	};
	
	var r = is1pcEnabled(true);
	var el = document.getElementById("result");
	el.innerHTML = "Write from code 2 == " + r;
	
	var iframe = createHiddenIFrame(666, 0, 0, 1, 1, "http://dud-page.pixagreat.com");
	iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');

	if (window.addEventListener) {
		iframe.addEventListener("load", function(){
			console.log("IFrame loaded !!!!!");
			console.log("IFrame src !!!!! =>", iframe.src);
		}.bind(this), false);
	}
	document.getElementsByTagName("body")[0].appendChild(iframe);
	
	
	
})();