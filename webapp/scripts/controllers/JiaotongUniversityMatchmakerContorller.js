(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('JiaotongUniversityMatchmakerControl', JiaotongUniversityMatchmakerControl)

    JiaotongUniversityMatchmakerControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function JiaotongUniversityMatchmakerControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
      	

		
		
	
    }
	
	
})();

