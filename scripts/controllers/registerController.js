(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('registerControl', registerControl)

    registerControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function registerControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {

		$rootScope.title = $state.$current.data.pageTitle;
      	$scope.modifyPass={};
      	$scope.code=$window.localStorage.getItem("code");
		$scope.referCode=$window.localStorage.getItem("referCode");
		
		if($scope.referCode)
			$scope.referCode=$scope.referCode.split('&')[0]


	
		
		
		
		
      	if(!window.name){  
	       	$.ajax({
				type:"get",
				url:"http://api.jdhn.top/home/member/wechatLoginBack?code="+$scope.code+'&referCode='+$scope.referCode,/*url写异域的请求地址*/
				success:function(result){
					var data=JSON.parse(result);
			
					if(data.code==1){
						
						$scope.portrait=data.data.portrait;
						$scope.nickname=data.data.nickname;
						$scope.uid=data.data.uid;
						$window.localStorage.setItem("uid",$scope.uid);	
					}else{
						layer.open({
						    content: result.message
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						});
					}
				},
				error:function (result) {
					
	            }
			});	
	        window.name = 'jdhn';  
		}else{  
			$scope.reguid=$window.localStorage.getItem("uid");
		   var codeUrl="http://api.jdhn.top/home/member/getuserinfo?callback=JSON_CALLBACK&uid="+$scope.reguid+'&referCode='+$scope.referCode
		    $http.jsonp(codeUrl).success(function(data){
				if(data.code==1){
					$scope.portrait=data.data.portrait;
					$scope.nickname=data.data.nickname;
				}else{
					layer.open({
					    content: data.message
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					});
				}	
			})
		}  
      	
		// 验证码
	    var clock = '';
		var nums = 100;	
		$scope.dix = false;
		$scope.buttonName="获取验证码";
		$scope.sendCode=function(){
			var mobile = $scope.modifyPass.mobile;
			if($scope.modifyPass.mobile==""||$scope.modifyPass.mobile==null){ 
				layer.open({
				    content: '请输入手机号码！'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				 });
		        return false; 
		    }
			if(!(/^1[34578]\d{9}$/.test(mobile))){ 
				layer.open({
				    content: '手机号错误！'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				 });
		        return false; 
		    }
			$scope.captcha(mobile);
			
		}
		
		
		$scope.captcha=function(i){
			$scope.dix = true;
			var url='http://api.jdhn.top/home/member/msg?callback=JSON_CALLBACK&mobile='+i
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
		
		$scope.ischose=false;
      	$scope.choice=function(){
      		if(!$scope.ischose){
      			$(".choice").attr("src","img/xuanzhe.png");
      			
      			$scope.ischose=true;
      		}else{
      			$(".choice").attr("src","img/xuanzhe1.png");
      			
      			$scope.ischose=false;
      			
      		}
      	};
		
		$scope.register=function(){
				if(!$scope.ischose){
      		   		layer.open({
					    content: '请同意交大红娘法律条款！'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
      		   		return false;
      		   }
				
				if($scope.modifyPass.mobile==""||$scope.modifyPass.mobile==null){ 
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
			    	var s=  layer.open({
					    type: 2
					    ,content: '加载中'
					});
					
			    	$scope.objpass={
						'upass':$scope.modifyPass.upass,
						'mobile':$scope.modifyPass.mobile,
						'code':$scope.modifyPass.verification,
						"uid":$scope.uid,
						"referCode":$scope.referCode
					}
			    	$scope.buttonName ="获取验证码";
		        	clearInterval(clock); // 清除js定时器
		      		$scope.dix = false;
		      		nums = 100; // 重置时间
			    	$.ajax({
						type:"POST",
						url:"http://api.jdhn.top/home/member/setpass",/*url写异域的请求地址*/
						data:$scope.objpass,
							success:function(result){
							var data = JSON.parse(result)
				
							console.log(data)
							if(data.code==1){
								     layer.close(s);
								  $window.localStorage.setItem("token",data.data.token);	
								  $window.localStorage.setItem("uid",data.data.uid);	   
		 						  $state.go("home");
		 						   $(".verification").val("");
								   $(".modifypass").val("")
							}else if(data.code==510){
								$window.localStorage.setItem("token","");	
								$window.localStorage.setItem("uid","");	
								$state.go("login");
								 layer.close(s);
							}else{
								 layer.close(s);
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

