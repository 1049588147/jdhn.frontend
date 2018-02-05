(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('eventRegistrationControl', eventRegistrationControl)

    eventRegistrationControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','eventRegistrationService','$stateParams'];

    function eventRegistrationControl($scope, $rootScope, $state, $timeout, $window, $location, $http,eventRegistrationService,$stateParams) {
		$rootScope.title = $state.$current.data.pageTitle;
			 $scope.activity_id=$window.localStorage.getItem("activity_id");
		     $scope.uid = $window.localStorage.getItem("uid");
		     $scope.token=$window.localStorage.getItem("token");
		     if($scope.token==""||$scope.token==null){
				$state.go("login");
				return;
			}else if($scope.uid==""||$scope.uid==null){
				$state.go("login");
				return;
			}
		     $scope.eventRegist={
		     	"gender":"1"
		     }
		    
		     $scope.isarr=[]
			var promise = eventRegistrationService.eventRegistrationinput({activity_id:$scope.activity_id,"uid":$scope.uid,"token": $scope.token});
			promise.then(function (result) { 
				
				 if(result.code==1){
				 	 $scope.result=result.activityInfo
					 $scope.eventRegist=result.memberData;
			         $scope.eventRegist.gender=Number($scope.eventRegist.gender);	
			         $scope.memberData=result.memberData;
			         $scope.eventRegistration=JSON.parse(result.customerForm)
			         $scope.customerForm=result.customerForm;
			         if($scope.eventRegistration==null){
			         	$scope.eventRegistration=[];
			         }
			        for(var i=0;i<$scope.eventRegistration.length;i++){
						$scope.eventRegistration[i].value='';
						
						if($scope.eventRegistration[i].type=="1"){
							for(var j=0; j<$scope.eventRegistration[i].options.length;j++){
								$scope.eventRegistration[i].options[j].flag=false;
							}
						}
						if($scope.eventRegistration[i].type=="2"){
							$scope.eventRegistration[i].s=[]
							for(var j=0; j<$scope.eventRegistration[i].options.length;j++){
								$scope.eventRegistration[i].s.push($scope.eventRegistration[i].options[j].optionText);
							}
							
						}
//						console.log($scope.eventRegistration[i])
					}
			       
				 }else if(result.code==510){
					 $window.localStorage.setItem("token","");	
				     $window.localStorage.setItem("uid","");	
					$state.go("login");
				}else{
				 	layer.open({
					    content:result.message
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
					  
					  return false;
				 }
			var arr=[]	
			$scope.selects=function(i,l,a,th){
				 arr=[]
				a.options[th].flag=!a.options[th].flag;
				if(a.options[th].flag){
						$(".options-img").eq(th).attr("src","img/duo1.png")	
				}else{
					$(".options-img").eq(th).attr("src","img/duo.png")	
				}
				
				for(var n=0;n<a.options.length;n++){
				
					if(a.options[n].flag){
						arr.push(a.options[n].optionText)
						
					}
				}
				a.value=arr.join(",")
				
			}	
			$scope.isselet=false;
			$scope.motai=function(){
				$scope.isselet=true;
			}
			
			$scope.confirmClick=function(e){
				e.stopPropagation();
				$scope.isselet=false;
				$scope.even=arr.join(",");
			}
			
			var n=1;
			$scope.submitObj = {
				
				'uid': $scope.uid,
				"token": $scope.token,
				"activity_id":$scope.activity_id
			}
			
			$scope.submit_inputmotai=function(){
				layer.open({
				    content: '请确认填写信息无误！ 如：出生年月日-xxxx年xx月xx日'
					    ,btn: ['确定', '关闭']
					    ,yes: function(index){
							$scope.submit_input()
					       layer.close(index);
				        }
				});
			}
			
      		$scope.submit_input=function(){
			var regu =/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
			var re = new RegExp(regu);
			if(re.test($scope.eventRegist.nickname)){
						layer.open({
							content:"请不要输入表情！"
							,skin: 'msg'
							,time: 2 //2秒后自动关闭
						});
						return;
				}

      			if($scope.eventRegist.realName==""||$scope.eventRegist.gender==""||$scope.eventRegist.birthday==""||$scope.eventRegist.mobile==""){
		         	layer.open({
					    content: '请完善个人资料！'
					    ,btn: ['确定', '关闭']
					    ,yes: function(index){
					      $state.go("personalData");
					       layer.close(index);
					    }
					  });
				 	return ;
		        }
      			for(var j=0;j<$scope.eventRegistration.length;j++){
				
      				if(re.test($scope.eventRegistration[j].value)){
						layer.open({
							content:"请不要输入表情！"
							,skin: 'msg'
							,time: 2 //2秒后自动关闭
						});
						return;
				}
				
					if($scope.eventRegistration[j].value==""){
	      				layer.open({
						    content: "请输入"+ $scope.eventRegistration[j].title+"！"
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						});
					    return;
	      		 	}	
				}	
      			$scope.submitObj.customerForm=$scope.eventRegistration;
      			$scope.submitObj.nickname=$scope.eventRegist.nickname;
      			$rootScope.n= layer.open({
				    type: 2
				    ,content: '加载中'
				});
      			$.ajax({
					type:"POST",
					url:"http://api.jdhn.top/home/index/enlist",/*url写异域的请求地址*/
					data:$scope.submitObj,
						success:function(result){
							var data = JSON.parse(result);
							
							if(data.code==1){
									layer.close($rootScope.n);
								layer.open({
								    content:data.message
								    ,skin: 'msg'
								    ,time: 2 //2秒后自动关闭
							    });
								$timeout(function(){
									$state.go("detalis")
								},1000)
							 }else if(result.code==510){
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
								    content:data.message
								    ,skin: 'msg'
								    ,time: 2 //2秒后自动关闭
								  });
							 }
						}
				});
      		}
      		
      		
		   });	      	
		
			
			$scope.education=[
				{"id":1,"name":"--请选择--"},
			    {"id":2,"name":"学士"},
			    {"id":3,"name":"硕士"},
			    {"id":4,"name":"博士"}
			]
			
			$scope.identity = [
				{"id":1,"name":"--请选择--"},
			    {"id":2,"name":"男嘉宾"},
			    {"id":3,"name":"女嘉宾"},
			    
			]
			$scope.sexNames=[
				{"id":1,"name":"--请选择--"},
			    {"id":2,"name":"男"},
			    {"id":3,"name":"女"}
			]


    }
	
	
})();

