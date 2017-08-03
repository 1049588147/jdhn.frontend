/**
 * 监控首页js服务
 */
(function () {
   'use strict';
   angular
       .module('makeFriends')
       .factory('homeService', ['$http', '$q', function ($http, $q) {
           return {
        	   queryWarehouseInfoList: function (param) {
//				   var url="https://saas.sunjoypai.com/data/initUser.do?callback=JSON_CALLBACK&id="+param
//				   var url="https://passport.sunjoypai.com/passport/loginMobie.do?callback=JSON_CALLBACK&id="+param
                  var url="http://api.deerlove.top/v1/activitys?callback=JSON_CALLBACK" 
                  var deferred = $q.defer();
                   $http.jsonp(url).success(function(result){
						deferred.resolve(result)
					}).error(function (result) {
                       deferred.reject(result);
                   });;
		        return deferred.promise;          
               },
               queryWarehouseInfoByStockGuid: function (param) {
                   var url = "dist/json.json";//获取仓库的首页显示信息
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