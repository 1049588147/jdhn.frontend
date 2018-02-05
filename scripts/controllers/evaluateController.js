(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('evaluateControl', evaluateControl)

    evaluateControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','$upload'];

    function evaluateControl($scope, $rootScope, $state, $timeout, $window, $location, $http,$upload) {
		$rootScope.title = $state.$current.data.pageTitle;
		$scope.activity_id=$window.localStorage.getItem("activity_id");
		$scope.uid=$window.localStorage.getItem("uid")
		$scope.enroll_id=$window.localStorage.getItem("enroll_id")
		$scope.token=$window.localStorage.getItem("token")
		$scope.star_customer=0;
		$scope.star_field=0;
		$scope.star_dire=0;
		$scope.isfixed=false;
		$scope.txt="";
		$scope.isselect=false;
		if($scope.token==""||$scope.token==null){
			$state.go("login");
			return;
		}else if($scope.uid==""||$scope.uid==null){
			$state.go("login");
			return;
		}
//		客服点评
		$scope.starreview=function(v){
			$scope.isselect=true;
			if(v==1){
				$scope.star_customer=1;
				$scope.commenttext='非常差';
			}else if(v==2){
				$scope.star_customer=2;
				$scope.commenttext='差';
			}else if(v==3){
				$scope.star_customer=3;
				$scope.commenttext='一般'
			}else if(v==4){
				$scope.star_customer=4;
				$scope.commenttext='好'
			}else if(v==5){
				$scope.star_customer=5;
				$scope.commenttext='非常好'
			}
		}
		
	//场地点评
		$scope.field=function(v){
			$scope.isselect=true;
			if(v==1){
				$scope.star_field=1;
				$scope.starreviewtext='非常差';
				
			}else if(v==2){
				$scope.star_field=2;
				$scope.starreviewtext='差';
			}else if(v==3){
				$scope.star_field=3;
				$scope.starreviewtext='一般';
			}else if(v==4){
				$scope.star_field=4;
				$scope.starreviewtext='好';
			}else if(v==5){
				$scope.star_field=5;
				$scope.starreviewtext='非常好';
			}
		}
		
	//活动总监	
		$scope.chiefinspector=function(v){
			$scope.isselect=true;
			if(v==1){
				$scope.star_dire=1;
				$scope.chiefinspectortext='非常差';
			}else if(v==2){
				$scope.star_dire=2;
				$scope.chiefinspectortext='差';
			}else if(v==3){
				$scope.star_dire=3;
				$scope.chiefinspectortext='一般';
			}else if(v==4){
				$scope.star_dire=4;
				$scope.chiefinspectortext='好';
			}else if(v==5){
				$scope.star_dire=5;
				$scope.chiefinspectortext='非常好';
			}
		}
		
		$scope.imgae=[];
		$scope.imglength=0;
//		上传
		$scope.saveImg=function(file){
			$rootScope.li= layer.open({
			     type: 2
			    ,content: '上传中'
			});
			$scope.upload = $upload.upload({
	            url: 'http://api.jdhn.top/home/member/uploadfile?type=comment', //上传的url
	            method: 'POST',
	            file: file, // or list of files ($files) for html5 only
	        }).progress(function(evt) {//上传进度
				
	            
	        }).success(function(data, status, headers, config) {
	        	if(data.code==1){
	        		layer.close($rootScope.li);
	        		if($scope.imglength>1){
	        			layer.open({
						    content:"最多上传2张照片！"
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						 });
						return false; 
	        		}
	        		$scope.imgae.push(data.fullImgUrl);
	        		$scope.imglength=$scope.imgae.length;
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
					    content: "上传失败"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
	       			}
	        	
				
	        }).error(function(data, status, headers, config) {
	            //失败处理函数
	            //console.log('上传失败');
	        });
  	    }  
		
//		$scope.imgae = ['img/jdhn1.jpg','img/jdhn2.jpg','img/xiaolulogon.png']
		
		
//		删除图片
		$scope.close=function(index){
			$scope.imgae.splice(index,1);
		}
		
//		预览图片
		$scope.imagesList=function(i){
			$scope.isfixed=true;
			$scope.indexs=i
		}
		//关闭弹框
		$scope.close1=function(){
			$scope.isfixed=false;
		}
		
		
		//发布
		$scope.release=function(){
			$scope.obj={
				"uid":$scope.uid,
				"activity_id":$scope.activity_id,
				"enroll_id":$scope.enroll_id,
				"star_customer":$scope.star_customer,
				"star_field":$scope.star_field,
				"star_dire":$scope.star_dire,
				"text":$scope.txt,
				'img':$scope.imgae.join(","),
				"token":$scope.token
			  }
		
			if(!$scope.isselect){
				layer.open({
				    content:"请至少对一个进行心心评价！"
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				 });
			}else if($scope.obj.text==""){
				layer.open({
				    content: "请输入评价内容！"
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				  });
				   return
			}else{
				$.ajax({
					type:"POST",
					url:"http://api.jdhn.top/home/index/subcom",/*url写异域的请求地址*/
					data: $scope.obj,
					success:function(result){
						var data= JSON.parse(result)
						//console.log(data)
						if(data.code==1){
							layer.open({
							    content: "发布成功！"
							    ,skin: 'msg'
							    ,time: 2 //2秒后自动关闭
							  });
							  
							 $state.go("myActivities");
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
							    content: "发布失败"
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

