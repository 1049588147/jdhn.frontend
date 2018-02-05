(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('myActivitiesControl', myActivitiesControl)

    myActivitiesControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function myActivitiesControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
		$scope.token=$window.localStorage.getItem("token");
		$scope.uid=$window.localStorage.getItem("uid")
		if($scope.token==""||$scope.token==null){
			$state.go("login");
			return;
		}else if($scope.uid==""||$scope.uid==null){
			$state.go("login");
			return;
		}
		$scope.loadMoresss=false;
		var s=1; 
      	   var url='http://api.jdhn.top/home/member/myactivity?callback=JSON_CALLBACK&uid='+$scope.uid+"&token="+$scope.token+"&page="+s
			$http.jsonp(url).success(function(result){
				if(result.code==1){
					$scope.myactivity = result.data;
					$scope.loadMoresss=false;
					if(result.total>5){
				    	$scope.loadMoresss=true;
					}
				}else if(result.code==510){
					 $window.localStorage.setItem("token","");	
				     $window.localStorage.setItem("uid","");
				     layer.open({
					    content:"您的账号已在其它地点登录！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
					$state.go("login");
				}else{
					$scope.loadMoresss=false;
					layer.open({
					    content: "暂无活动"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
					  
				}
				
			})
      		
      	$scope.loadMore=function(){
	    	$scope.loading=true;
	    	 s++;
	    	
	    	var url='http://api.jdhn.top/home/member/myactivity?callback=JSON_CALLBACK&uid='+$scope.uid+"&page="+s+"&token="+$scope.token
			$http.jsonp(url).success(function(result){
				
				if(result.code==1){
					if(s==1){
						$scope.myactivity=result.data ;
					}else{
						$scope.myactivity=$scope.myactivity.concat(result.data) ;
					}
					
				}else if(result.code==510){
					 $window.localStorage.setItem("token","");	
				     $window.localStorage.setItem("uid","");	
				     layer.open({
					    content:"您的账号已在其它地点登录！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
					$state.go("login");
				}else{
					layer.open({
					    content: "暂无活动"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
					$scope.loadMoresss=false;
				}
				
				$timeout(function(){
		    	  $scope.$broadcast('scroll.infiniteScrollComplete');
		    	  $scope.loading=false;
		    	},1000);
			})
		}	
		
		$scope.detalisclick=function(id){
			 $window.localStorage.setItem("activity_id",id);	
			 $window.localStorage.setItem("uid",$scope.uid);
			 $window.localStorage.setItem("is",1);
			 $state.go("detalis")
		}
		
		$scope.evaluate=function(e,id,enroll_id){
			e.stopPropagation();
			 $window.localStorage.setItem("activity_id",id);	
			 $window.localStorage.setItem("uid",$scope.uid);
			  $window.localStorage.setItem("enroll_id",enroll_id);
			$state.go("evaluate")
		}
		
    }
	
	
})();

