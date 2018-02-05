/**
 * 监控首页js服务
 */
(function () {
   'use strict';
   angular
       .module('makeFriends')
       .factory('detalisService', ['$http', '$q', '$rootScope',function ($http, $q,$rootScope) {
           return {
        	   detalis: function (param) {
					var url='http://api.jdhn.top/home/index/activitydetail?callback=JSON_CALLBACK&activity_id='+param.activity_id+"&uid="+param.uid+"&token="+param.token
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