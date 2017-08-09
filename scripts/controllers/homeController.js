(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('homeControl', homeCtrl)

    homeCtrl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$stateParams','homeService',"$http"];

    function homeCtrl($scope, $rootScope, $state, $timeout, $window, $stateParams,homeService,$http) {
		$rootScope.title = $state.$current.data.pageTitle;
		
	    $scope.login=$window.localStorage.getItem("login")
		$scope.pass=$window.localStorage.getItem("pass")
		
		if($scope.login==null||$scope.pass==null){
		 var index =	layer.open({
			  content: '请先登录',
			  btn: '确定',
			  shadeClose: false,
			  yes: function(){
			  	layer.close(index)
			    $state.go("login")
			  }
			});
			
		}

		$scope.vo = {
	        slides:[{
	            lbpicNum:1,
	            lbpicUrl:'img/jdhn1.jpg'
	        },{
	            lbpicNum:2,
	            lbpicUrl:'img/jdhn2.jpg'
	        },{
	            lbpicNum:3,
	            lbpicUrl:'img/jdhn3.jpg'
	        }]
	    };
		
		
			var i=0;
			$scope.start=function(){
				var n= layer.open({
				    type: 2
				    ,content: '加载中'
				  });
				var promise = homeService.queryWarehouseInfoList();
				promise.then(function (result) { 	
		        	console.log(result)
		        	if(result.code==200){
		        		layer.close(n);
		        		$scope.listUrl=result.data;
			        	$scope.result = [];
						$scope.listUrlOne=[];
						for(var i=0;i<$scope.listUrl.length;i+=5){
						   $scope.result.push($scope.listUrl.slice(i,i+5));
						}
						
						$scope.listUrlOne=$scope.result[0]
		        	}else{
		        		layer.close(n);
		        		layer.open({
						    content: "查询失败！"
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						  });
						return;
		        	}
		        	
		       });	
			       
//			    var promise = homeService.queryWarehouseInfoByStockGuid();
//					promise.then(function (result) { 	
//			        	console.log(result)
//			        	$scope.listUrl=result.data
//						$scope.result = [];
//						$scope.listUrlOne=[];
//						for(var i=0;i<$scope.listUrl.length;i+=5){
//						   $scope.result.push($scope.listUrl.slice(i,i+5));
//						}
//						
//						$scope.listUrlOne=$scope.result[0]
//						console.log($scope.listUrlOne)
//			       });	   
			    
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
		    	  i++;
		    	  $scope.listUrlOne= $scope.listUrlOne.concat($scope.result[i])
		    	  $scope.$broadcast('scroll.infiniteScrollComplete');
		    	  
		    	  $scope.loading=false;
		    	  
		    	},1000);
		    }
	 
		
		
		$scope.start()
    }
	
})();
