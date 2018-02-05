(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('modifyPasswordControl', modifyPasswordControl)

    modifyPasswordControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','$stateParams'];

    function modifyPasswordControl($scope, $rootScope, $state, $timeout, $window, $location, $http,$stateParams) {
		$rootScope.title = $state.$current.data.pageTitle;
		$scope.uid = $stateParams.uid;
		$scope.token = $stateParams.token;
      	$scope.modifyPass={}
      	if($scope.token==""||$scope.token==null){
			$state.go("login");
			return;
		}else if($scope.uid==""||$scope.uid==null){
			$state.go("login");
			return;
		}
      	var modifySrc="http://api.jdhn.top/home/member/savepass?uid="+$scope.uid+"&token="+$scope.token;
      	$http.get(modifySrc).success(function(data,status,headers,config){
			if(data.code==1){
				$scope.modifyPass.mobile=data.data.mobile;
			}else if(data.code==510){
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
				    content: data.message
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				  });
			}
		}).error(function(data,status,headers,config){
			
		})
//    	验证码
	    var clock = '';
		var nums = 100;	
		$scope.dix = false;
		$scope.buttonName="获取验证码";
		$scope.sendCode=function(){
			var mobile = $scope.modifyPass.mobile;
			if(mobile==""||mobile==null){ 
				layer.open({
				    content: '请输入手机号码！'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				 });
		        return false; 
		    }
			if(!(/^1[34578]\d{9}$/.test(mobile))){ 
				layer.open({
				    content: '手机号不正确!'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				 });
		        return false; 
		    }
			$scope.captcha(mobile);
			
		}

		
		$scope.captcha=function(i){
			$scope.dix = true;
			var url='http://api.jdhn.top/home/member/msg?callback=JSON_CALLBACK&mobile='+i+"&type=modify"
			$http.jsonp(url).success(function(result){

				if(result.status==1){
					layer.open({
					    content: result.message
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
					$scope.yan=result.code;
					$scope.buttonName = nums + "s";
					
					clock = setInterval(function(){
			            $scope.$apply(function () {
			          	  nums--;
			          	  if (nums > 0) {
			          		  	$scope.buttonName = nums + "s";
			          	   } else {
			          		 clearInterval(clock); // 清除js定时器
			          		 $scope.buttonName ="点击重新发送";
			          		 nums = 100; // 重置时间
			          		 $scope.dix = false;
			          	   }
			            });
			        }, 1000 , 60); // 一秒执行一次
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
					$scope.buttonName ="获取验证码";
		        	clearInterval(clock); // 清除js定时器
		      		$scope.dix = false;
		      		nums = 100; // 重置时间
					return false;
				}
			})
		}
		
//    	修改
			$scope.logout=function(){	
      		   
      		   if($scope.modifyPass.mobile==null||$scope.modifyPass.mobile==""){ 
					layer.open({
					    content: '请输入手机号码！'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
			        return false; 
			    }else if(!(/^1[34578]\d{9}$/.test($scope.modifyPass.mobile))){ 
					layer.open({
					    content: '手机号错误！'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
			        return false; 
			    }else if($scope.modifyPass.verification==""||$scope.modifyPass.verification==null){ 
					layer.open({
					    content: '请输入验证码！'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
			        return false; 
			    }else if($scope.modifyPass.upass==""||$scope.modifyPass.upass==null){ 
					layer.open({
					    content: '请输入新密码！'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
			        return false; 
			    }else if($scope.modifyPass.upass!=$scope.modifyPass.password){ 
					layer.open({
					    content: '2次密码不一致'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
			        return false; 
			    }else if($scope.modifyPass.verification!=$scope.yan){
			    	layer.open({
					    content: '验证码输入错误！'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
			    }else{
					$scope.objpass={
						'upass':$scope.modifyPass.upass,
						'mobile':$scope.modifyPass.mobile,
						'code':$scope.modifyPass.verification,
						'uid':$scope.uid,
						'token':$scope.token
					}
			    	$scope.buttonName ="获取验证码";
		        	clearInterval(clock); // 清除js定时器
		      		$scope.dix = false;
		      		nums = 100; // 重置时间
		      		$rootScope.n= layer.open({
					    type: 2
					    ,content: '加载中'
				    });
                 	$.ajax({
						type:"POST",
						url:"http://api.jdhn.top/home/member/savepass",/*url写异域的请求地址*/
						data:$scope.objpass,
							success:function(result){
								var data=JSON.parse(result)
								if(data.code==1){
									layer.open({
									    content: data.message
									    ,skin: 'msg'
									    ,time: 2 //2秒后自动关闭
									 });
									 $(".verification").val("");
									 $(".modifypass").val("")
									layer.close($rootScope.n);
								}else if(result.code==510){
									layer.close($rootScope.n);
									 $window.localStorage.setItem("token","");	
								     $window.localStorage.setItem("uid","");	
									$state.go("login");
									
								}else{
									layer.close($rootScope.n);
									layer.open({
									    content: data.message
									    ,skin: 'msg'
									    ,time: 2 //2秒后自动关闭
									 });
									  $(".verification").val("");
									 $(".modifypass").val("")
								}
							}
					});	
			    }
      		   
      		   
      		}
      	
      	
    }
	
	
})();

