(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('activityScreeningControl', activityScreeningControl)

    activityScreeningControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','activityScreeningService'];

    function activityScreeningControl($scope, $rootScope, $state, $timeout, $window, $location, $http,activityScreeningService) {
		$rootScope.title = $state.$current.data.pageTitle;
		$scope.token=$window.localStorage.getItem("token");
		$scope.uid=$window.localStorage.getItem("uid");
		$scope.loadMoresss=true;
		$scope.data=false;
		$scope.listUrl=[];
		if($scope.token==""||$scope.token==null){
			$state.go("login");
			return;
		}else if($scope.uid==""||$scope.uid==null){
			$state.go("login");
			return;
		}
      	var s=0; 
		//上啦加载
		$scope.loadMore=function(){

	    	$scope.loading=true;
	    	$scope.data=false;
	    	  s++;
	    	var url="http://api.jdhn.top/home/index/preactivitylst?callback=JSON_CALLBACK&page="+s+"&token="+$scope.token;/*url写异域的请求地址*/
	    	$http.jsonp(url).success(function(result){
	    		
				if(result.code==1){
					if($scope.listUrl.length==result.total){
						$scope.loadMoresss=false;
						$scope.loading=false;
					}
					if(result.total==0){
						$scope.data=true;
					}
					if(s==1){
						$scope.listUrl=result.data;
						if(result.data.length<5){
							$scope.loadMoresss=false;
							$scope.loading=false;
							return;
						}
					}else{
						$scope.listUrl=$scope.listUrl.concat(result.data) ;
						$scope.data=false;
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
			})
		}
		
//		类型
		$scope.types1=function(t,ins){
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
			$(".place_list>div").css({"background":"#fff","color":"#000","border":"0.5px solid #ccc"})
			$(".place_list>div").eq(ins).css({"background":"rgba(239, 112, 93,0.7)","color":"#fff","border":"0.5px solid rgb(228, 147, 135)"});
			for (var i = 0; i < $scope.place_list.length; i++) {
	            $scope.place_list[i].flag = false;
		    }
	        t.flag = true;
		}
		
//		类型数据结构
		$scope.types=[
			{"id":1, "name":"相亲","flag":false},
			{"id":2,"name":"远足","flag":false},
			{"id":3,"name":"交友","flag":false},
			{"id":4,"name":"饭局","flag":false},
			{"id":5,"name":"旅游","flag":false},
			{"id":6,"name":"自驾","flag":false}
		]
		
		
		$scope.times_list=[
			{"id":"1","name":"近三天","flag":false},
			{"id":"2","name":"近一周","flag":false},
			{"id":"3","name":"近一月","flag":false},
			{"id":"4","name":"近三月","flag":false},
		]
		
		$scope.place_list=[
			{"name":"上海","flag":false},
			{"name":"苏州","flag":false},
			{"name":"杭州","flag":false},
			{"name":"南京","flag":false},
		]
		
		
//		点击确定事件
		$scope.btn=function(){
			$scope.loadMoresss=true;
			$scope.data=false;
			$rootScope.n= layer.open({
				    type: 2
				    ,content: '加载中'
				  });
			$(".screen_motai").hide();
			isSelact=false;
			$scope.x=[];
			for (var i=0;i< $scope.types.length;i++){
				if($scope.types[i].flag){
					$scope.x.push($scope.types[i].id)	
					$scope.mun=$scope.x.join(",")
				}
			}
			$scope.t=[];
			for (var i=0;i< $scope.times_list.length;i++){
				if($scope.times_list[i].flag){
					$scope.t=$scope.times_list[i].id;
				}
			}
			$scope.d=[];
			for (var i=0;i< $scope.place_list.length;i++){
				if($scope.place_list[i].flag){
					$scope.d=$scope.place_list[i].name;
				}
			}
			$scope.activity={"page":0,"type":$scope.mun,"time":$scope.t,"address":$scope.d,"token":$scope.token}
			
			var url="http://api.jdhn.top/home/index/preactivitylst?callback=JSON_CALLBACK&page="+0+"&token="+$scope.token+"&type="+$scope.mun+"&time="+$scope.t+"&address="+$scope.d;/*url写异域的请求地址*/
	    	$http.jsonp(url).success(function(result){
	    		
					if(result.code==1){
						layer.close($rootScope.n);
						$scope.listUrl=result.data;
						if(result.data.length==0){
							$scope.data=true;
						}
						if($scope.listUrl.length<5){
							$scope.loadMoresss=false;
						}
					}else{
						
						$scope.loadMoresss=false;
						$scope.listUrl=[];
						layer.close($rootScope.n);
						layer.open({
						    content: result.message
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						});
						  
						return;
					}
			})
		}
		
//		打开筛选点击事件
		var isSelact=false;
		$(".screen").on("click",function(){
			s=0; 
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
		
		
		$scope.detalisclick=function(id){
			 $window.localStorage.setItem("activity_id",id);	
			 $window.localStorage.setItem("uid",$scope.uid);
			  $window.localStorage.setItem("is",2);
			 $state.go("detalis")
		}
   }
})();

