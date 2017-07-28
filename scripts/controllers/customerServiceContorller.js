(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('customerServiceControl', customerServiceControl)

    customerServiceControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function customerServiceControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
      	

		
		
	
    }
	
	
})();

