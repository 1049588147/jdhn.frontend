var app= angular.module('makeFriends');
app.controller("appCtr",['$scope','$state','$timeout','$rootScope',function ($scope,$state,$timeout,$rootScope) {
	'use strict';


	$scope.home=function(){
		$state.go("home");
	}
	
	$scope.news=function(){
		$state.go("news");
	}
	
	$scope.my=function(){
		$state.go("my");
	}
	
	console.log(111)
}]);
