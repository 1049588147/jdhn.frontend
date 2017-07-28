(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('realNameAuthenticationControl', realNameAuthenticationControl)

    realNameAuthenticationControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function realNameAuthenticationControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
      	
      	
      	
      	
      
      
    }
	
	
})();

