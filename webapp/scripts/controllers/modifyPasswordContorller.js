(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('modifyPasswordControl', modifyPasswordControl)

    modifyPasswordControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','$stateParams'];

    function modifyPasswordControl($scope, $rootScope, $state, $timeout, $window, $location, $http,$stateParams) {
		$rootScope.title = $state.$current.data.pageTitle;
      	
      	
      	console.log($stateParams.id)
      	
      	$scope.modifyPass={}
      	
      	
      
//    	验证码
	    var clock = '';
		var nums = 60;	
		$scope.dix = false;
		$scope.buttonName="获取验证码";
		$scope.sendCode=function(){
			var mobile = $scope.modifyPass.mobilePhone;
			if(!(/^1[34578]\d{9}$/.test(mobile))){ 
				layer.open({
				    content: '请输入手机号码！'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				 });
		        return false; 
		    }
//			$scope.captcha(mobile);
			$scope.buttonName = nums + "s";
			$scope.dix = true;
			clock = setInterval(function(){
	            $scope.$apply(function () {
	          	  nums--;
	          	  if (nums > 0) {
	          		  	$scope.buttonName = nums + "s";
	          	   } else {
	          		 clearInterval(clock); // 清除js定时器
	          		 $scope.buttonName ="点击重新发送";
	          		 nums = 60; // 重置时间
	          	   }
	            });
	        }, 1000 , 60); // 一秒执行一次
		}
      	
      	
//    	修改
			$scope.logout=function(){
      		   
      		   if(!(/^1[34578]\d{9}$/.test($scope.modifyPass.mobilePhone))){ 
					layer.open({
					    content: '请输入手机号码！'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
			        return false; 
			    }else if($scope.modifyPass.verification==""){ 
					layer.open({
					    content: '请输入验证码！'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
			        return false; 
			    }else if(!$scope.dix){ 
					layer.open({
					    content: '请点击验证码！！'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
			        return false; 
			    }else if($scope.modifyPass.pass==""){ 
					layer.open({
					    content: '请输入新密码！'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
			        return false; 
			    }else if($scope.modifyPass.pass!=$scope.modifyPass.password){ 
					layer.open({
					    content: '2次密码不一致'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
			        return false; 
			    }else{
			    	layer.open({
					    content: '修改成功！'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
			    	console.log($scope.modifyPass)
			    	$scope.buttonName ="获取验证码";
		        	clearInterval(clock); // 清除js定时器
		      		$scope.dix = false;
		      		nums = 60; // 重置时间
		      		

		      		$window.localStorage.setItem("login", $scope.modifyPass.mobilePhone);
		      		$window.localStorage.setItem("pass", $scope.modifyPass.pass);
			    }
      		   
      		   
      		}
      	
      	
    }
	
	
})();

