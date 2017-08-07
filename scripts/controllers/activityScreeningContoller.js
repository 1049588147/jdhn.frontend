(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('activityScreeningControl', activityScreeningControl)

    activityScreeningControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','activityScreeningService'];

    function activityScreeningControl($scope, $rootScope, $state, $timeout, $window, $location, $http,activityScreeningService) {
		$rootScope.title = $state.$current.data.pageTitle;
      	var i=0;
      	
//    初始加载函数接口
		$scope.start=function(){
				var promise = activityScreeningService.queryWarehouseInfoList({});
				promise.then(function (result) { 	
		        	console.log(result)
		        	$scope.listUrl=result.list
		       });	
		    
		}    
		
//		上啦加载
		$scope.loadMore=function(){
	    	$scope.loading=true;
	    	$timeout(function(){
	    	  i++;
	    	  $scope.listUrl.push({id:$scope.listUrl.length+1,name:'item '+($scope.listUrl.length+1)});
	    	  $scope.$broadcast('scroll.infiniteScrollComplete');
	    	  console.log(i)
	    	  $scope.loading=false;
	    	  
	    	},1000);
		}
		
		
//		类型
		$scope.type=function(t,ins){
			if(!t.flag){
				$(".type_list>div").eq(ins).css({"background":"rgba(239, 112, 93,0.7)","color":"#fff","border":"0.5px solid rgb(228, 147, 135)"});
				t.flag=true;
			}else{
				$(".type_list>div").eq(ins).css({"background":"rgba(255, 255, 255,1)","color":"#000","border":"0.5px solid #ccc"});
				t.flag=false;
			}
		}
        
//      时间
        $scope.timesList=function(l,i){
			$(".times_list>div").css({"background":"#fff","color":"#000","border":"0.5px solid #ccc"})
			$(".times_list>div").eq(i).css({"background":"rgba(239, 112, 93,0.7)","color":"#fff","border":"0.5px solid rgb(228, 147, 135)"});
			for (var i = 0; i < $scope.times_list.length; i++) {
	            $scope.times_list[i].flag = false;
		    }
	        l.flag = true;
		} 
		$scope.placeList=function(t,ins){
			if(!t.flag){
				$(".place_list>div").eq(ins).css({"background":"rgba(239, 112, 93,0.7)","color":"#fff","border":"0.5px solid rgb(228, 147, 135)"});
				t.flag=true;
			}else{
				$(".place_list>div").eq(ins).css({"background":"rgba(255, 255, 255,1)","color":"#000","border":"0.5px solid #ccc"});
				t.flag=false;
			}
		}
		
//		类型数据结构
		$scope.types=[
			{"name":"相亲","flag":false},
			{"name":"远足","flag":false},
			{"name":"交友","flag":false},
			{"name":"饭局","flag":false},
			{"name":"旅游","flag":false},
			{"name":"自驾","flag":false}
		]
		
		$scope.times_list=[
			{"name":"近三天","flag":false},
			{"name":"近一周","flag":false},
			{"name":"近一月","flag":false},
			{"name":"近三月","flag":false},
		]
		
		$scope.place_list=[
			{"name":"上海","flag":false},
			{"name":"苏州","flag":false},
			{"name":"杭州","flag":false},
			{"name":"南京","flag":false},
		]
		
		
//		点击确定事件
		$scope.btn=function(){
			$scope.x=[];
			for (var i=0;i< $scope.types.length;i++){
				if($scope.types[i].flag){
					$scope.x.push($scope.types[i].name);
				}
			}
			
			console.log($scope.x)
			$scope.t=[];
			for (var i=0;i< $scope.times_list.length;i++){
				if($scope.times_list[i].flag){
					$scope.t.push($scope.times_list[i].name);
				}
			}
			console.log($scope.t)
			$scope.d=[];
			for (var i=0;i< $scope.place_list.length;i++){
				if($scope.place_list[i].flag){
					$scope.d.push($scope.place_list[i].name);
				}
			}
			console.log($scope.d)
			
			$scope.activity=[
				{type:$scope.x},
				{time:$scope.t},
				{didian:$scope.d}
			]
			
			console.log(angular.toJson($scope.activity,true))
		}
		
//		打开筛选点击事件
		var isSelact=false;
		$(".screen").on("click",function(){
			if(!isSelact){
				$(".screen_motai").show();
				isSelact=true;
			}else{
				$(".screen_motai").hide();
				isSelact=false;
			}
			
		});
		
//		阻止冒泡
		$(".screen_motai_center").on("click",function(event){
			event.stopPropagation();
		})
		
//		关闭模态框
		$(".screen_motai").on("click",function(){
			if(!isSelact){
				$(".screen_motai").show();
				isSelact=true;
			}else{
				$(".screen_motai").hide();
				isSelact=false;
			}
		})

		$scope.start()
   }
})();

