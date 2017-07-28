(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('homeControl', homeCtrl)

    homeCtrl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$stateParams','homeService'];

    function homeCtrl($scope, $rootScope, $state, $timeout, $window, $stateParams,homeService) {
		$rootScope.title = $state.$current.data.pageTitle;
	    $scope.login=$window.localStorage.getItem("login")
		$scope.pass=$window.localStorage.getItem("pass")
		
		console.log($scope.login+"--"+$scope.pass)
		
		if($scope.login==null||$scope.pass==null){
			$state.go("login")
		}

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
		
		
		var i=0;
			$scope.start=function(){
					var promise = homeService.queryWarehouseInfoList({});
					promise.then(function (result) { 	
			        	console.log(result)
			        	$scope.listUrl=result
			       });	
			    
			}    
				
			$scope.doRefresh=function(){
		    	$timeout(function(){
		    		 $scope.start()
	                $scope.$broadcast('scroll.refreshComplete');
	             
	            },3000);
		    }
			
		    $scope.loadMore=function(){
		    	$scope.loading=true;
		    	$timeout(function(){
		    	  i+=5;
		    	  $scope.listUrl.push({id:$scope.listUrl.length+1,name:'item '+($scope.listUrl.length+1)});
		    	  $scope.$broadcast('scroll.infiniteScrollComplete');
		    	  console.log(i)
		    	  $scope.loading=false;
		    	  
		    	},1000);
		    }
	 
		
		
		$scope.start()
    }
	
})();
