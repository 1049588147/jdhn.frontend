(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('searchControl', searchControl)

    searchControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function searchControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
      	

		
		
	
    }
	
	
})();

