(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('eventRegistrationControl', eventRegistrationControl)

    eventRegistrationControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function eventRegistrationControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
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

      		$scope.eventRegistration = [
			    {"type":"Text","title":"姓名"},
			    {"type":"Radio","title":"性别","options":["男", "女"]},
			    {"type":"Text","title":"出生年份"},
			    {"type":"Text","title":"就读或毕业高校名称"},
			    {"type":"Text","title":"工作单位全称（请在校生填所学专业）" },
			    {"type":"Text","title":"家乡"},
			    {"type":"Radio","title":"最高学历","options":["学士","硕士","博士"]},
			    {"type":"Text", "title":"身高" },
			    {"type":"Text","title":"兴趣爱好或特长"},
			    {"type":"Text","title":"手机号（绝对私密，仅作为后台联系）"},
			    {"type":"Text","title":"微信号（绝对保密，仅作为后台联系）"}
			]
      		
			for(var i=0;i<$scope.eventRegistration.length;i++){
				$scope.eventRegistration[i].information=''
				
			}
			var n=1;
      		$scope.submit_input=function(){
      			for(var j=0;j<$scope.eventRegistration.length;j++){
					if($scope.eventRegistration[j].information==""){
	      				layer.open({
						    content: "请输入"+ $scope.eventRegistration[j].title+"！"
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						});
					    return;
	      		 	}	
				}	
				console.log($scope.eventRegistration)
      		}
      		
      		$scope.key= function (i,t){
      			if(i.keyCode==13){
      				$(i.target).parents().parents().next().children(".dan").children("input").focus()
      			}
			}
    }
	
	
})();

