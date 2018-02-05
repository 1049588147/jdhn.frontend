(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('loginControl', loginCtrl)

    loginCtrl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function loginCtrl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
		$scope.token=$window.localStorage.getItem("token");
		$scope.uid=$window.localStorage.getItem("uid");
		if($scope.token==""||$scope.token==null){
			
		}else if($scope.uid==""||$scope.uid==null){
			
		}else{
			 $state.go("home")
		}
		
		$scope.loginParameter={}
		layer.close($rootScope.n);
		layer.close($rootScope.li);
		$scope.loginBtn=function(){
			if($scope.loginParameter.uname==null){
				layer.open({
				    content: '请输入手机号码！'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				  });
				return;
			}
			if(!(/^1[34578]\d{9}$/.test($scope.loginParameter.uname))){
				layer.open({
				    content: '手机号不正确！'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				  });
				return;
			}
			if($scope.loginParameter.upass==null || $scope.loginParameter.upass==""){
				layer.open({
				    content: '请输入密码！'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				  });
				return;
			}
			
			var s=  layer.open({
			    type: 2
			    ,content: '加载中'
			});
			
		    var srcurl='http://api.jdhn.top/home/member/dologin'
		    $.ajax({
				type:"POST",
				url:srcurl,/*url写异域的请求地址*/
				data:$scope.loginParameter,
					success:function(result){
							
							var data = JSON.parse(result)
							if(data.code==1){
								  layer.close(s);
								  $window.localStorage.setItem("token",data.data.token);	
								  $window.localStorage.setItem("uid",data.data.uid);	   
		 						  $state.go("home")
							}else if(result.code==510){
								 $window.localStorage.setItem("token","");	
							     $window.localStorage.setItem("uid","");
							     
								$state.go("login");
								layer.close(s);
								layer.open({
				    				content: "您的账号已在其他地点登录！"
								    ,skin: 'msg'
								    ,time: 2 //2秒后自动关闭
								});
							}else{
								layer.close(s);
								layer.open({
				    				content: data.message
								    ,skin: 'msg'
								    ,time: 2 //2秒后自动关闭
								});
							}
					}
			});
		}

		onkeydown = function(event){
			 var e = event || window.event || arguments.callee.caller.arguments[0];
			if(e.keyCode == 13)
			{
				$scope.loginBtn()
			}
		}
    }
	
	
})();

