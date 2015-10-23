/* Bookmarklet v 2.0.0 */
javascript: (function() {
	if (typeof window.AESf === "undefined") {
		var aJS = document.createElement("script");
		aJS.type = "text/javascript";
		aJS.src = "https://goo.gl/JuQ6cj";
		document.getElementsByTagName("head")[0].appendChild(aJS)
	} else AESf()
})();

