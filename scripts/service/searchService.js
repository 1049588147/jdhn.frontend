/**
 * 监控首页js服务
 */
(function () {
   'use strict';
   angular
       .module('makeFriends')
       .factory('searchService', ['$http', '$q', '$rootScope',function ($http, $q,$rootScope) {
           return {
        	   search: function (param) {
				var url='http://api.jdhn.top/home/index/activitylst?callback=JSON_CALLBACK&search='+param.search+"&page="+param.page+"&token="+param.token+"&uid="+param.uid
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