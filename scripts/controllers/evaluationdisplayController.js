(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('evaluationdisplayControl', evaluationdisplayControl)

    evaluationdisplayControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','$ionicSlideBoxDelegate'];

    function evaluationdisplayControl($scope, $rootScope, $state, $timeout, $window, $location, $http,$ionicSlideBoxDelegate) {
		$rootScope.title = $state.$current.data.pageTitle;
		 $scope.activity_id = $window.localStorage.getItem("activity_id");
		 $scope.uid = $window.localStorage.getItem("uid");
		 $scope.token=$window.localStorage.getItem("token");
		 $scope.isfixed=false;
		if($scope.token==""||$scope.token==null){
			$state.go("login");
			return;
		}else if($scope.uid==""||$scope.uid==null){
			$state.go("login");
			return;
		}
		
		
		 var commenturl='http://api.jdhn.top/home/index/comment?callback=JSON_CALLBACK&activity_id='+$scope.activity_id+"&token="+$scope.token
           $http.jsonp(commenturl).success(function(result){
           	//console.log(result)
				if(result.code==1){
					$scope.list=result.data;
					for(var i=0;i<$scope.list.length;i++){
						var index=i;
						$scope.list[index].arr=$scope.list[index].ocm_img.split(",") 
					}
				}else if(result.code==510){
					 $window.localStorage.setItem("token","");	
				     $window.localStorage.setItem("uid","");	
					$state.go("login");
				}else{
					layer.open({
					    content: result.message
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
					return;
				}
		   })
       

        $scope.imagesList=function(i,arr){
			$scope.isfixed=true;
			$scope.indexs=i;
			$scope.motaiArr=arr;
			$ionicSlideBoxDelegate.update();
		    $ionicSlideBoxDelegate.loop(true);   
		}
        
        $scope.motai=function(){
        	$scope.isfixed=false;
        }
    }
	
	
})();

