(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('loginControl', loginCtrl)

    loginCtrl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function loginCtrl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
      	
//    	$scope.appSize=function(){
//		var browser = {
//			  versions: function () {
//			    var u = navigator.userAgent, app = navigator.appVersion;
//			    return {     //移动终端浏览器版本信息
//			      trident: u.indexOf('Trident') > -1, //IE内核
//			      presto: u.indexOf('Presto') > -1, //opera内核
//			      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
//			      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
//			      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//			      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//			      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
//			      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
//			      iPad: u.indexOf('iPad') > -1, //是否iPad
//			      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
//			    };
//			  }(),
//			  language: (navigator.browserLanguage || navigator.language).toLowerCase()
//			}
//		          	
//			if(browser.versions.mobile){
//				$(".imgAlert").css("display","none")
//			}else{
//				$(".imgAlert").css("display","block")
//			}
//		}
//	
//		$scope.appSize()	
//		$(window).resize(function() {
//		  $scope.appSize()
//	    });	
		
		
		
		$scope.loginParameter={}
		
		$scope.loginBtn=function(){
			if($scope.loginParameter.mobilePhone==null || !(/^1[34578]\d{9}$/.test($scope.loginParameter.mobilePhone))){
				layer.open({
				    content: '请输入手机号码！'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				  });
				return;
			}
			if($scope.loginParameter.pass==null || $scope.loginParameter.pass==""){
				layer.open({
				    content: '请输入密码！'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				  });
				return;
			}
			
			$window.localStorage.setItem("login", $scope.loginParameter.mobilePhone);
		    $window.localStorage.setItem("pass", $scope.loginParameter.pass);
		    $state.go("home")
		}
    }
	
	
})();

