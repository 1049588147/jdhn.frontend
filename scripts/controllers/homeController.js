(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('homeControl', homeCtrl)

    homeCtrl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$stateParams','homeService',"$http"];

    function homeCtrl($scope, $rootScope, $state, $timeout, $window, $stateParams,homeService,$http) {
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


		$scope.goU=function(index)
		{
			if(index==0)
			{
				
				var url='http://api.jdhn.top/home/ustore/judgeInfo?callback=JSON_CALLBACK&token='+$scope.token+'&uid='+$scope.uid
				$http.jsonp(url).success(function(result){
				//console.log(result)
				if(result.code==1)
					$state.go('goodKu')
				else
				{
					layer.open({
						'content':'请到个人主页完善基本信息！',
						'skin':'msg',
						'time':2
					})
					$timeout(function(){
						$state.go('homepage')
					},2000)
				}
				
			})
			

			}

		}

		
		$scope.numstotal=false;
		var newUrl='http://api.jdhn.top/home/message/nums?callback=JSON_CALLBACK&uid='+$scope.uid+"&token="+$scope.token;
		$http.jsonp(newUrl).success(function(result){
				if(result.code==1){
					if(result.num.total==0){
						$scope.numstotal=false;
						return;
					}else{
						$scope.numstotal=true;
						$scope.numtotal=result.num.total;
					}
				}else if(result.code==510){
					
		        		 $window.localStorage.setItem("token","");	
						 $window.localStorage.setItem("uid","");	
		        		layer.open({
						    content:"您的账号已在其它地点登录！"
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						 });
						  
						$state.go("login")
				}
		})
		
		$scope.loadMoresss=false;
		$scope.vo = {
	        slides:[
			{
					lbpicNum:1,
					lbpicUrl:'img/jdhn4.jpg'
				},
			
			{
	            lbpicNum:2,
	            lbpicUrl:'img/jdhn1.jpg'
	        },
				
				{
					lbpicNum:3,
					lbpicUrl:'img/jdhn3.jpg'
				},
				{
	            lbpicNum:4,
	            lbpicUrl:'img/jdhn2.jpg'
	        },

			]

	    };
		
			$scope.listUrl=[];
		    $scope.activity=false;
			var i=1;
			$scope.start=function(){
				i=1;
				$rootScope.n= layer.open({
				    type: 2
				    ,content: '加载中'
				  });
				var promise = homeService.queryWarehouseInfoList({"token":$scope.token,"uid":$scope.uid,"page":i});
				promise.then(function (result) {
					//console.log(result)
		        	if(result.code==1){
		        		layer.close($rootScope.n);
		        		$scope.listUrl=result.data;
						if($scope.listUrl.length==0){
		        			$scope.activity=true;
		        		} 	
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
						    
						$state.go("login")
					}else{
		        		layer.close($rootScope.n);
		        		layer.open({
						    content: "没有活动！"
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						  });
						return;
		        	}
		        	
		       });		   
			}    
				
			$scope.doRefresh=function(){
		    	$timeout(function(){
		    		 $scope.start()
	                $scope.$broadcast('scroll.refreshComplete');
	             	
	            },3000);
		    }
			
			$scope.detalisclick=function(id){
				 $window.localStorage.setItem("activity_id",id);	
				 $window.localStorage.setItem("uid",$scope.uid);
				 $window.localStorage.setItem("is",1);
				 $state.go("detalis")
			}
			
		    $scope.loadMore=function(){
		    	$scope.loading=true;
		    	i++;

		    	var promise = homeService.queryWarehouseInfoList({"token":$scope.token,"uid":$scope.uid,"page":i});
				promise.then(function (result) { 	
		        	if(result.code==1){
		        		 $scope.listUrl= $scope.listUrl.concat(result.data)
		        	}else if(result.code==510){
						 $window.localStorage.setItem("token","");	
					     $window.localStorage.setItem("uid","");	
						$state.go("login");
					}else{
		        		$scope.loadMoresss=false;
		        		layer.open({
						    content: "没有更多了！"
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						  });
						return;
		        	}
		       });		   
		    	$timeout(function(){
		    	  $scope.$broadcast('scroll.infiniteScrollComplete');
		    	  $scope.loading=false;	  
		    	},1000);
		    }
		if($scope.token==""||$scope.token==null){
			$state.go("login")
		}else{
			$scope.start()
		}
		
		
		
    }
	
})();
