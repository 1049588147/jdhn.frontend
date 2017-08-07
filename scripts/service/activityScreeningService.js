/**
 * 监控首页js服务
 */
(function () {
   'use strict';
   angular
       .module('makeFriends')
       .factory('activityScreeningService', ['$http', '$q', function ($http, $q) {
           return {

				activeList: function (param) {
                  var url="http://api.deerlove.top/v1/activitys/inactive-list?limit="+param+"&offset=0&callback=JSON_CALLBACK" 
                  var deferred = $q.defer();
                   $http.jsonp(url).success(function(result){
						deferred.resolve(result)
					}).error(function (result) {
                       deferred.reject(result);
                   });;
		        return deferred.promise;          
               }
           }
       }]);

})();