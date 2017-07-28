(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('detalisControl', detalisControl)

    detalisControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function detalisControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;

		      	
      	
      	$scope.vo = {
	        slides:[{
	            lbpicNum:1,
	            lbpicUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2728159135,4130384536&fm=15&gp=0.jpg'
	        },{
	            lbpicNum:2,
	            lbpicUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2728159135,4130384536&fm=15&gp=0.jpg'
	        },{
	            lbpicNum:3,
	            lbpicUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484459979379&di=baaaa8808fb1da266db58b415cac2119&imgtype=0&src=http%3A%2F%2Ffile.desktx.com%2Fpc%2Fwallpaper%2Fplant%2F20090622%2FBlue-flowers-320-240.jpg'
	        }]
	    };
      	
      	
      
      
    }
	
	
})();

