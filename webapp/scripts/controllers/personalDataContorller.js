(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('personalDataControl', personalDataControl)

    personalDataControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function personalDataControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
		
      	$("#start_date").focus(function(){
	        document.activeElement.blur();
	    });
      	
      	var calendar = new LCalendar();
		calendar.init({
			'trigger': '#start_date', //标签id
			'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
			'minDate': (new Date().getFullYear()-100) + '-' + 1 + '-' + 1, //最小日期
			'maxDate': (new Date().getFullYear()+100) + '-' + 12 + '-' + 31 //最大日期
		});
      	
      
      	$scope.personalData={}
      	
      	$scope.submit_input=function(){
      		if($scope.personalData.nickname==null||$scope.personalData.nickname==""){
      			layer.open({
				    content: '请输入昵称'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.fullName==null||$scope.personalData.fullName==""){
      			layer.open({
				    content: '请输入姓名'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.Gender==null||$scope.personalData.Gender==""){
      			layer.open({
				    content: '请输入性别'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.Birth==null||$scope.personalData.Birth==""){
      			layer.open({
				    content: '请输入出生年月'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.height==null||$scope.personalData.height==""){
      			layer.open({
				    content: '请输入身高'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.school==null||$scope.personalData.school==""){
      			layer.open({
				    content: '请输入毕业院校'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.company==null||$scope.personalData.company==""){
      			layer.open({
				    content: '请输入工作单位'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.education==null||$scope.personalData.education==""){
      			layer.open({
				    content: '请输入学历'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.annualincomeLevel==null||$scope.personalData.annualincomeLevel==""){
      			layer.open({
				    content: '请输入年收入水平'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.city==null||$scope.personalData.city==""){
      			layer.open({
				    content: '请输入居住城市'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else{
      			console.log($scope.personalData)
      		}
      		
      		
      	}
      	
    }
	
	
})();

