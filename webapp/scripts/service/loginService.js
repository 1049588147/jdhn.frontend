/**
 * 监控首页js服务
 */
(function () {
   'use strict';
   angular
       .module('makeFriends')
       .factory('loginService', ['$http', '$q', function ($http, $q) {
           return {
        	   login: function (param) {
                   var url = bootPATH + "appEnt/login.do";//登陆
                   var deferred = $q.defer();
                   $http.post(url, param).success(function (result) {
                       deferred.resolve(result); // 声明执行成功，即http请求数据成功，可以返回数据了
                   }).error(function (result) {
                       deferred.reject(result);
                   });
                   return deferred.promise;
               },
               getKeyPair: function (param) {
                   var url = bootPATH + "entAppLoginGetKeyPair.do";//获取秘钥对
                   var deferred = $q.defer();
                   $http.post(url, param).success(function (result) {
                       deferred.resolve(result); // 声明执行成功，即http请求数据成功，可以返回数据了
                   }).error(function (result) {
                       deferred.reject(result);
                   });
                   return deferred.promise;
               },
               getWechatUserInfo: function (param) {
                   var url = bootPATH + "getWechatUserInfo.do";//获取微信用户信息
                   var deferred = $q.defer();
                   $http.post(url, param).success(function (result) {
                       deferred.resolve(result); // 声明执行成功，即http请求数据成功，可以返回数据了
                   }).error(function (result) {
                       deferred.reject(result);
                   });
                   return deferred.promise;
               }
           }
       }]);

})();