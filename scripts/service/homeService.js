/**
 * 监控首页js服务
 */
(function () {
   'use strict';
   angular
       .module('makeFriends')
       .factory('homeService', ['$http', '$q', '$rootScope',function ($http, $q,$rootScope) {
           return {
        	   queryWarehouseInfoList: function (param) {
//				   var url="https://saas.sunjoypai.com/data/initUser.do?callback=JSON_CALLBACK&id="+param
//				   var url="https://passport.sunjoypai.com/passport/loginMobie.do?callback=JSON_CALLBACK&id="+param
//                var url=$rootScope.$host+"v1/activitys/active-list?callback=JSON_CALLBACK" 
				    var url='http://api.jdhn.top/home/index/activitylst?callback=JSON_CALLBACK&uid='+param.uid+"&token="+param.token+"&page="+param.page
                    var deferred = $q.defer();
                    $http.jsonp(url).success(function(result){
                    	
						deferred.resolve(result)
					}).error(function (result) {
                       deferred.reject(result);
                    });
                   
		        return deferred.promise;          
               }
           }
       }]);

})();