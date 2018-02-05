/**
 * 监控首页js服务
 */
(function () {
   'use strict';
   angular
       .module('makeFriends')
       .factory('eventRegistrationService', ['$http', '$q','$rootScope', function ($http, $q,$rootScope) {
           return {

				eventRegistrationinput: function (param) {
                 var url='http://api.jdhn.top/home/index/enlistinfo?callback=JSON_CALLBACK&uid='+param.uid+"&activity_id="+param.activity_id+"&token="+param.token
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