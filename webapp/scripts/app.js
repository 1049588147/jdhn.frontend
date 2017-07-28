(function () {
    'use strict';
    angular
        .module('makeFriends', ['ionic','oc.lazyLoad']);
})();

/**
 * @author rongying
 * */
//var head = document.getElementsByTagName("head")[0];
//var bootPATH = "";
//(function() {
//	var scripts = head.getElementsByTagName("script");
//	for (var i = 0; i < scripts.length; i++) {
//		var script = scripts[i];
//		var regex = /app\.js(\?v=.*)?/ig;
//		result = regex.exec(script.src);
//		if (result) {
//			bootPATH = script.src.substring(0,script.src.lastIndexOf("scripts/app.js"));
//			if (result[1]) {
//				version = result[1];
//			}
//			break;
//		}
//	}
//})();