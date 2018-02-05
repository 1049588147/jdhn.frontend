(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('personalDataControl', personalDataControl)

    personalDataControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function personalDataControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
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
		$scope.personalData={}
		
		var url='http://api.jdhn.top/home/member/myinfoss?uid='+$scope.uid+"&token="+$scope.token;
		$http.get(url).success(function(data,status,headers,config){
			// console.log(data)
			if(data.code==1){
		    	$scope.personalData=data.data;
				$scope.personalData.nickName=data.data.nickName
				$scope.personalData.realName=data.data.realName
				$scope.personalData.gender=data.data.gender
				$scope.personalData.birthday=data.data.birthday
				$scope.personalData.height=data.data.height
				$scope.personalData.school=data.data.school
				$scope.personalData.work=data.data.work
				$scope.personalData.academic=data.data.academic
				$scope.personalData.salary=data.data.salary
			}else if(data.code==510){
				$window.localStorage.setItem("token","");	
				$window.localStorage.setItem("uid","");	
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
		
      	$("#start_date").focus(function(){
	        document.activeElement.blur();
	    });
	    
	    //时钟
	    var t='';
		$scope.startTime=function() {
		    var today=new Date();
		    var y=today.getFullYear();
		    var mon=today.getMonth()+1;
		        mon=$scope.changNum(mon);
		    var d=today.getDate();
		        d=$scope.changNum(d);
		    var h=today.getHours();
		    var m=today.getMinutes();
		        m=$scope.changNum(m);
		    var s=today.getSeconds();
		        s=$scope.changNum(s);
			t=y+'-'+mon+'-'+d
		   }    
		   $scope.changNum=function(i){   //月、日、秒如果小于10数字前加0
		       if(i<10){
		          return "0"+i;
		       }
		       return i;
		   }
	    $scope.startTime ()
      	var calendar = new LCalendar();
		calendar.init({
			'trigger': '#start_date', //标签id
			'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
			'minDate':'1900-1-1',//最小日期 注意：该值会覆盖标签内定义的日期范围
    		'maxDate':t//最大日期 注意：该值会覆盖标签内定义的日期范围
		});
      	
      	$scope.education=[
      		{"id":"11","name":"--请选择--"},
		    {"id":"15","name":"学士"},
		    {"id":"16","name":"硕士"},
		    {"id":"17","name":"博士"}
		]
      	
      	$scope.room=[
      		
		    {"id":"1","name":"已购房"},
		    {"id":"0","name":"未购房"}
		]
      	
      	$scope.vehicle=[
      		
		    {"id":"1","name":"已购车"},
		    {"id":"0","name":"未购车"}
		]
      	
      	$scope.sexNames=[
      		{"id":"1","name":"--请选择--"},
		    {"id":"2","name":"男"},
		    {"id":"3","name":"女"}
		]
      	
      	$scope.incomelevel=[
      		{"id":"31","name":"--请选择--"},
		    {"id":"32","name":"10万以下"},
		    {"id":"33","name":"10万-20万"},
		    {"id":"34","name":"20万-30万"},
		    {"id":"35","name":"30万以上"}
		]
      	
      	$scope.positions=['北京','上海','天津','重庆','广东','福建','湖北','湖南','河北','河南','山西','陕西','江苏','浙江','安徽','江西','山东','辽宁','吉林','黑龙江',
      	'四川','贵州','云南','西藏','甘肃','青海','宁夏','新疆','内蒙古','广西','海南','香港','澳门','台湾']
      	
      	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
      	$scope.submit_input=function(){
      		$scope.personalData.token=$scope.token;
      		if($scope.personalData.nickName==null||$scope.personalData.nickName==""||pattern.test($scope.personalData.nickName)){
      			layer.open({
				    content: '请输入您的昵称'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.gender=='1'||$scope.personalData.gender==""||pattern.test($scope.personalData.gender)){
      			layer.open({
				    content: '请输入性别'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.birthday==null||$scope.personalData.birthday==""||pattern.test($scope.personalData.birthday)){
      			layer.open({
				    content: '请输入出生年月日'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.school==null||$scope.personalData.school==""||pattern.test($scope.personalData.school)){
      			layer.open({
				    content: '请输入就读或就业高校'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.work==null||$scope.personalData.work==""||pattern.test($scope.personalData.work)){
      			layer.open({
				    content: '请输入工作单位'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.academic==null||$scope.personalData.academic==""||pattern.test($scope.personalData.academic)){
      			layer.open({
				    content: '请输入学位'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.hometown==null||$scope.personalData.hometown==""||pattern.test($scope.personalData.hometown)){
      			layer.open({
				    content: '请输入户籍'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.height==null||$scope.personalData.height==""||pattern.test($scope.personalData.height)||$scope.personalData.height==0){
      			layer.open({
				    content: '请输入身高'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.realName==null||$scope.personalData.realName==""||pattern.test($scope.personalData.realName)){
      			layer.open({
				    content: '请输入真实姓名'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.mobile==null||$scope.personalData.mobile==""||pattern.test($scope.personalData.mobile)){
      			layer.open({
				    content: '请输入手机号'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if(!(/^1[34578]\d{9}$/.test($scope.personalData.mobile))){
      			layer.open({
				    content: '请输入正确的手机号'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else if($scope.personalData.wechat_num==null||$scope.personalData.wechat_num==""){
      			layer.open({
				    content: '请输入微信号'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				});
				return;
      		}else{
      		$rootScope.n= layer.open({
				    type: 2
				    ,content: '加载中'
			});
			$.ajax({
					type:"POST",
					url:"http://api.jdhn.top/home/member/myinfoss",/*url写异域的请求地址*/
					data:$scope.personalData,
						success:function(result){
							var data = JSON.parse(result);
							if(data.code==1){
								layer.close($rootScope.n);
								$scope.activity_id=$window.localStorage.getItem("activity_id");  
								if($scope.activity_id==''||$scope.activity_id==null){
									 layer.open({
									    content: data.message
									    ,skin: 'msg'
									    ,time: 2 //2秒后自动关闭
									  });
									return;
								}else{
									layer.open({
									    content: data.message
									    ,skin: 'msg'
									    ,time: 2 //2秒后自动关闭
									  });
									$state.go("detalis");
								}
							}else if(data.code==510){
								layer.close($rootScope.n);
								$window.localStorage.setItem("token","");	
								$window.localStorage.setItem("uid","");	
								layer.open({
								    content:"您的账号已在其它地点登录！"
								    ,skin: 'msg'
								    ,time: 2 //2秒后自动关闭
								 });
								$state.go("login");
							}else{
								layer.close($rootScope.n);
								layer.open({
								    content: data.message
								    ,skin: 'msg'
								    ,time: 2 //2秒后自动关闭
								});
							}
								
						}
				  });
			      
      			
      		}
 		
      	}
      	
    }
	
	
})();

