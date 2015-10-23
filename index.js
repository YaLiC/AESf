/* index.js v 1.3.0 */
var AESf = function() {
	var TXT = tXt = TxT = passwd = cmd = "";
	var inewindow = false;

	if (window.getSelection) tXt = window.getSelection()
	else if (document.getSelection) tXt = document.getSelection()
	else tXt = document.selection.createRange().text;
	if (tXt == "") Array.prototype.slice.call(document.querySelectorAll("iframe")).map(function(el){ TXT += el.contentWindow.getSelection().toString(); })
	if (tXt == "" && TXT == "") { alert("Nothing selected!"); throw ''; }

	tXt = (tXt != "")?tXt.toString():TXT.toString();
	cmd = prompt("\'E\' - encode or \'D\' - decode?\n\'C\' - compress or \'U\' - decompress? (LZW, base64)\n\'C16\' - compress or \'U16\' - decompress? (LZW, UTF16)\n* use the commands in lowercase to open in a new window", "E");
	passwd = prompt("Please enter your password:\n* only needs to encode and decode", "*****");

	switch (cmd) {
		case "e": inewindow = true;
		case "E": TxT = GibberishAES.enc(tXt,passwd); break;
		case "d": inewindow = true;
		case "D": TxT = GibberishAES.dec(tXt.replace(/[^0-9a-z\+/=]/gim,""),passwd); break;
		case "c": inewindow = true;
		case "C": TxT = LZString.compressToBase64(tXt); break;
		case "u": inewindow = true;
		case "U": TxT = LZString.decompressFromBase64(tXt.replace(/[^0-9a-z\+/=]/gim,"")); break;
		case "c16": inewindow = true;
		case "C16": TxT = LZString.compressToUTF16(tXt); break;
		case "u16": inewindow = true;
		case "U16": TxT = LZString.decompressFromUTF16(tXt); break;
		default: alert("Unknown command"); throw '';
	}

	if (inewindow == false && TXT == "") {

		if (document.activeElement.nodeName === "TEXTAREA" || document.activeElement.nodeName === "INPUT") {
			var ta = document.activeElement;
			ta.value = ta.value.slice(0, ta.selectionStart) + TxT + ta.value.slice(ta.selectionEnd, ta.length);
		} else {
			var sel = window.getSelection();
			var range;
			if (sel.rangeCount) {
				range = sel.getRangeAt(0);
				range.deleteContents();
				range.insertNode(document.createTextNode(TxT));
			};
		};

	} else window.open('data:text/plain,' + encodeURIComponent(TxT), 'AESf', 'menubar=yes,location=no,resizable=yes,scrollbars=yes,status=no');

	delete tXt,TxT,TXT,passwd,cmd;
	void(0);

};

var lzJS = document.createElement("script");
var aesJS = document.createElement("script");
lzJS.type = "text/javascript";
aesJS.type = "text/javascript";
lzJS.src = "https://yalic.pw/aes/lz-string.min.js";
aesJS.src = "https://yalic.pw/aes/gibberish-aes.js";
document.getElementsByTagName("head")[0].appendChild(lzJS);
document.getElementsByTagName("head")[0].appendChild(aesJS);
aesJS.onload = aesJS.onreadystatechange = function() {
	if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
		AESf();
	};
};
