/**
 * 监控首页js服务
 */
(function () {
   'use strict';
   angular
       .module('makeFriends')
       .factory('activityScreeningService', ['$http', '$q', function ($http, $q) {
           return {
        	   queryWarehouseInfoList: function (param) {
                   var url = "dist/json.json";
                   var deferred = $q.defer();
                   $http.get(url, param).success(function (result) {
                       deferred.resolve(result); // 声明执行成功，即http请求数据成功，可以返回数据了
                   }).error(function (result) {
                       deferred.reject(result);
                   });
                   return deferred.promise;
               }
           }
       }]);

})();