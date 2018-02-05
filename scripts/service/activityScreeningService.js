/**
 * 监控首页js服务
 */
(function () {
   'use strict';
   angular
       .module('makeFriends')
       .factory('activityScreeningService', ['$http', '$q','$rootScope', function ($http, $q,$rootScope) {
           return {

				activeList: function (param) {
//                var url=$rootScope.$host+"v1/activitys/inactive-list?limit="+param+"&offset=0&callback=JSON_CALLBACK" 
				 var url='http://api.jdhn.top/home/index/preactivitylst?callback=JSON_CALLBACK&page='+param.page+"&type="+param.type+"&time="+param.time+"&address="+param.address
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