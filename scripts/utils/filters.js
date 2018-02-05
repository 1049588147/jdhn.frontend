(function () {
    'use strict';
    angular
        .module('makeFriends')
        .filter('academicvalue', [function () {
            return function (value) {
                if(value==15){
                	alert(1)
                	return "学士"
                }else if(value==16){
                	return "硕士"
                }else if(value==17){
                	return "博士"
                }
            };
        }])
        
 
})();