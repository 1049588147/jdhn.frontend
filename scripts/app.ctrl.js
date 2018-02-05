var app= angular.module('makeFriends');
app.controller("appCtr",['$scope','$state','$timeout','$rootScope','$window',function ($scope,$state,$timeout,$rootScope,$window) {
	'use strict';
	$scope.token=$window.localStorage.getItem("token");
	$scope.uid=$window.localStorage.getItem("uid");
	if($scope.token==null||$scope.uid==null){
		$state.go("login");
	}
	$scope.home=function(){
		$state.go("home");
	}
	
	$scope.news=function(){
		$state.go("news");
	}
	
	$scope.my=function(){
		$state.go("my");
	}
	

}]);

app.factory('myInterceptor', ['$q','$window','$rootScope', function($q, $window,$rootScope) {
	return {
		// optional method
		'response' : function(response) {
			if (response.data.code) {
				var code = response.data.code;
				if(code==510){
					layer.close($rootScope.n);
					layer.close($rootScope.li);
					
					$window.localStorage.clear()
					layer.open({
					    content:"您的账号已在其它地点登录！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
				}
			}
			return response;
		}
	};
	
} ]);

app.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('myInterceptor');
}]);

