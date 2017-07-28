(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('myControl', myControl)

    myControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function myControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
      	

		
		
	
    }
	
	
})();

