(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('searchControl', searchControl)

    searchControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','searchService'];

    function searchControl($scope, $rootScope, $state, $timeout, $window, $location, $http,searchService) {
		$rootScope.title = $state.$current.data.pageTitle;
		$scope.token=$window.localStorage.getItem("token");
		$scope.uid=$window.localStorage.getItem("uid");
		if($scope.token==""||$scope.token==null){
			$state.go("login");
			return;
		}else if($scope.uid==""||$scope.uid==null){
			$state.go("login");
			return;
		}
      	 $scope.search=$window.localStorage.getItem("search")
      	
      	$scope.loadMoresss=false;
		var i=0;
		var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
		
		$scope.searchClick=function(){
			if($scope.search==""|| $scope.search==null||pattern.test($scope.search)){
				return;
			}
			$rootScope.n= layer.open({
			    type: 2
			    ,content: '加载中'
			  });
			i=0
			var promise = searchService.search({"search":$scope.search,"page":i,"token":$scope.token,"uid":$scope.uid});
				promise.then(function (result) {
					
				if(result.code==1){
					layer.close($rootScope.n);
					if(i==0){
						$window.localStorage.setItem("search", $scope.search);
						$scope.listUrl=result.data;
						$scope.loadMoresss=false;
						if(result.total>5){
					    	$scope.loadMoresss=true;
						}
					}
				}else if(result.code==510){
					$state.go("login");
					 $window.localStorage.setItem("token","");	
						 $window.localStorage.setItem("uid","");	
				}else{
					layer.close($rootScope.n);
					$scope.listUrl=[]
					$scope.loadMoresss=false;
					layer.open({
				    content:result.message
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				  });
				  
				  return false;
				}
		   });	
		}
		
		
		$scope.loadMore=function(){
			$scope.loading=true;
	    	  i++;
	    	 	var promise = searchService.search({"search":$scope.search,"page":i,"token":$scope.token,"uid":$scope.uid});
				promise.then(function (result) { 
					if(result.code==1){
						if(i==1){
							$scope.listUrl=result.data;
						}else{
							$scope.listUrl=$scope.listUrl.concat(result.data) ;
						}	
						
					}else if(result.code==510){
						$window.localStorage.setItem("token","");	
						$window.localStorage.setItem("uid","");	
						$state.go("login");
					}else{
						layer.open({
					    content:"没有更多数据"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
					   $scope.loadMoresss=false;
					   $scope.loading=false;
					  return false;
					}
				$timeout(function(){
		    	  $scope.$broadcast('scroll.infiniteScrollComplete');
		    	  $scope.loading=false;
		    	},1000);
		    });	
		}
		
		
	$scope.detalisclick=function(id){
		 $window.localStorage.setItem("activity_id",id);	
		 $window.localStorage.setItem("uid",$scope.uid);
		 $window.localStorage.setItem("is",1);
		 $state.go("detalis")
	}
	
	 $scope.searchClick()
    }
	
})();

