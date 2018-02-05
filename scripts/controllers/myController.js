(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('myControl', myControl)

    myControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','$upload'];

    function myControl($scope, $rootScope, $state, $timeout, $window, $location, $http,$upload) {
		$rootScope.title = $state.$current.data.pageTitle;
		$scope.token=$window.localStorage.getItem("token");
		$scope.uid=$window.localStorage.getItem("uid");
		$window.localStorage.setItem("activity_id","");	
//		$scope.authentication=""
		if($scope.token==""||$scope.token==null){
			$state.go("login");
			return;
		}else if($scope.uid==""||$scope.uid==null){
			$state.go("login");
			return;
		}
		$scope.numstotal=false;
		
		$scope.f=false;
		$scope.a=false;
		$scope.l=false;
		$scope.s=false;
		var newUrl='http://api.jdhn.top/home/message/nums?callback=JSON_CALLBACK&uid='+$scope.uid+"&token="+$scope.token;
		$http.jsonp(newUrl).success(function(result){
			
				if(result.code==1){
					if(result.num.total==0){
						$scope.numstotal=false;
						return;
					}else{
						$scope.numstotal=true;
						$scope.numtotal=result.num.total;
					}
				}
		})
			var url='http://api.jdhn.top/home/member/index?callback=JSON_CALLBACK&uid='+$scope.uid+"&token="+ $scope.token
			$http.jsonp(url).success(function(result){
				
				if(result.code==1){
					
					$scope.code=result.data
					if($scope.code.state1==1&&$scope.code.state2==0&&$scope.code.state3==0){
						$scope.f=true;
					}else{
						$scope.f=false;
							if($scope.code.state1==343){
								$scope.a=true;	
							}
							if($scope.code.state2==342){
								$scope.l=true;
							}
							if($scope.code.state3==344){
								$scope.s=true;
							}
					}
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
					
				}
			})
		
		$scope.saveImg=function(file){
			$rootScope.li= layer.open({
			     type: 2
			    ,content: '上传中'
			});
			$scope.upload = $upload.upload({
	            url: 'http://api.jdhn.top/home/member/uploadfile?type=portrait', //上传的url
	            method: 'POST',
	            file: file, // or list of files ($files) for html5 only
	        }).progress(function(evt) {//上传进度
	//          
	//              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	            
	        }).success(function(data, status, headers, config) {
	            // 文件上传成功处理函数
	            if(data.code==1){
						layer.close($rootScope.li);
	       				$scope.code.photo=data.fullImgUrl;
	       				$.ajax({
						type:"POST",
						url:"http://api.jdhn.top/home/member/saveportrait",/*url写异域的请求地址*/
						data: {"portrait":$scope.code.photo,"uid":$scope.uid},
						success:function(result){
								var data=JSON.parse(result)
								if(data.code==1){
										layer.open({
										    content:data.message
										    ,skin: 'msg'
										    ,time: 2 //2秒后自动关闭
										  });
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
										    content:'上传失败，图片过大'
										    ,skin: 'msg'
										    ,time: 2 //2秒后自动关闭
										 });
									}
							    }
						});
	       			}else if(data.code==510){
						layer.close($rootScope.li);
						$window.localStorage.setItem("token","");	
						$window.localStorage.setItem("uid","");	
						layer.open({
						    content:"您的账号已在其它地点登录！"
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						 });
						$state.go("login");
					}else{
					  layer.close($rootScope.li);
	       			  layer.open({
					   content:'上传失败，图片过大'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
	       			}
	            
	        }).error(function(data, status, headers, config) {
	            //失败处理函数
	            //console.log('上传失败');
	        });
  	    }  
		
		var urllist='http://api.jdhn.top/home/member/logout?callback=JSON_CALLBACK&uid='+$scope.uid+"&token="+ $scope.token
		$scope.logout=function(){
			$http.jsonp(urllist).success(function(result){
				//console.log(result)
				if(result.code==1){
					$state.go("login");
					 $window.localStorage.clear()
				}else{
					layer.open({
					    content: result.message
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
				}
			})
	    }
		
		
		$scope.photo=function(v){
			if(v!=""||v!=null){
				return v
			}else{
				return "img/beike.png"
			}
		}
    }
	
	
})();

