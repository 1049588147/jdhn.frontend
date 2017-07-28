(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('myActivitiesControl', myActivitiesControl)

    myActivitiesControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function myActivitiesControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
      
      
    }
	
	
})();

