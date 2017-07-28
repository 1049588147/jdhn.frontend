(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('newsControl', newsControl)

    newsControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function newsControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
      	
		$scope.message=0;
		$scope.systemMessage=function(){
			$scope.message=0;
		}
		$scope.myMessage=function(){
			$scope.message=1;
		}
		
    }
	
	
})();

