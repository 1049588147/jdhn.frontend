(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('accountSettingsControl', accountSettingsControl)

    accountSettingsControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function accountSettingsControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
      	
      	
      	$http.jsonp("https://api.douban.com/v2/movie/top250?count=100").success(function(data){
      		
      		
      		
      	})
      	
      
      
    }
	
	
})();

