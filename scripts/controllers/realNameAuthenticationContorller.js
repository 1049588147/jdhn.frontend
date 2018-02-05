(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('realNameAuthenticationControl', realNameAuthenticationControl)

    realNameAuthenticationControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','$upload'];

    function realNameAuthenticationControl($scope, $rootScope, $state, $timeout, $window, $location, $http,$upload) {
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
      	var url='http://api.jdhn.top/home/member/certification?callback=JSON_CALLBACK&uid='+$scope.uid+"&token="+$scope.token
      	$http.jsonp(url).success(function(result){
      		if(result.code==1){
      			$scope.resultName=result.data;
      		}else if(result.code==510){
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
			
		})
      
      $scope.re=[false,false,false,false]
      $scope.saveImg=function(file,l){
      	$rootScope.li= layer.open({
		     type: 2
		    ,content: '上传中'
		});
		if(l==1){
			
			 $scope.upload = $upload.upload({
	            url: 'http://api.jdhn.top/home/member/uploadfile?type=idcard', //上传的url
	            method: 'POST',
	            file: file, // or list of files ($files) for html5 only
	        }).progress(function(evt) {//上传进度
	//          
	//              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	            
	        }).success(function(data, status, headers, config) {
	            // 文件上传成功处理函数
	            if(data.code==1){
	            	layer.close($rootScope.li);
	       				$scope.resultName.idCardImg0=data.fullImgUrl;
	       				$scope.re[0]=true;
	       			}else if(data.code==510){
	       				layer.close($rootScope.li);
						$window.localStorage.setItem("token","");	
						$window.localStorage.setItem("uid","");	
						$state.go("login");
					}else{
						layer.close($rootScope.li);
						$scope.re[0]=false;
	       			  layer.open({
					    content: "上传失败，图片过大"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
	       			}
	            
	        }).error(function(data, status, headers, config) {
	            //失败处理函数
	            //console.log('上传失败');
	        });
		}else if(l==2){
			$scope.upload = $upload.upload({
	            url: 'http://api.jdhn.top/home/member/uploadfile?type=idcarback', //上传的url
	            method: 'POST',
	            file: file, // or list of files ($files) for html5 only
	        }).progress(function(evt) {//上传进度
	//          
	//              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	            
	        }).success(function(data, status, headers, config) {
	            // 文件上传成功处理函数
	            if(data.code==1){
	            	layer.close($rootScope.li);
	       				$scope.resultName.idCardImg1=data.fullImgUrl;
	       				$scope.re[1]=true;
	       			}else if(data.code==510){
	       				layer.close($rootScope.li);
						$window.localStorage.setItem("token","");	
						$window.localStorage.setItem("uid","");	
						$state.go("login");
					}else{
						layer.close($rootScope.li);
						$scope.re[1]=false;
	       			  layer.open({
					    content: "上传失败，图片过大"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
	       			}
	            
	        }).error(function(data, status, headers, config) {
	            //失败处理函数
	            //console.log('上传失败');
	        });
		}else if(l==3){
			$scope.upload = $upload.upload({
	            url: 'http://api.jdhn.top/home/member/uploadfile?type=academic', //上传的url
	            method: 'POST',
	            file: file, // or list of files ($files) for html5 only
	        }).progress(function(evt) {//上传进度
	//          
	//              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	            
	        }).success(function(data, status, headers, config) {
	            // 文件上传成功处理函数
	            if(data.code==1){
	            	layer.close($rootScope.li);
	       				$scope.resultName.academicImg=data.fullImgUrl;
	       				$scope.re[2]=true;
	       			}else if(data.code==510){
	       				layer.close($rootScope.li);
						$window.localStorage.setItem("token","");	
						$window.localStorage.setItem("uid","");	
						$state.go("login");
					}else{
						layer.close($rootScope.li);
						$scope.re[2]=false;
	       			  layer.open({
					    content: "上传失败，图片过大"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
	       			}
	            
	        }).error(function(data, status, headers, config) {
	            //失败处理函数
	            //console.log('上传失败');
	        });
		}else if(l==4){
			$scope.upload = $upload.upload({
	            url: 'http://api.jdhn.top/home/member/uploadfile?type=work', //上传的url
	            method: 'POST',
	            file: file, // or list of files ($files) for html5 only
	        }).progress(function(evt) {//上传进度
	//          
	//              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	            
	        }).success(function(data, status, headers, config) {
	            // 文件上传成功处理函数
	            if(data.code==1){
	            	layer.close($rootScope.li);
	       				$scope.resultName.workImg=data.fullImgUrl;
	       				$scope.re[3]=true;
	       			}else if(data.code==510){
	       				layer.close($rootScope.li);
						$window.localStorage.setItem("token","");	
						$window.localStorage.setItem("uid","");	
						$state.go("login");
					}else{
						layer.close($rootScope.li);
						$scope.re[3]=false;
	       			  layer.open({
					   content: "上传失败，图片过大"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
	       			}
	            
	        }).error(function(data, status, headers, config) {
	            //失败处理函数
	            //console.log('上传失败');
	        });
		}
  	       
  	    }  
  	     $scope.uthenticationSubmit=function(){
  	     	var mobile=$scope.resultName.mobile;
  	     	var idcardNo=$scope.resultName.idCardNo;
  	     	//console.log($scope.re)
	     	if(mobile==null||mobile==""){
     			layer.open({
					    content: "请输入手机号！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
     			return
	     	}
	     	
	     	if(!(/^1[34578]\d{9}$/.test(mobile))){
     			layer.open({
					    content: "手机号错误！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
     			return
	     	}
     		if(idcardNo==""||idcardNo==null){
     			layer.open({
					    content: "请输入身份证！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
     			return
     		}
			if(!idCard(idcardNo)){
				layer.open({
					    content: "身份证错误！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
     			return
			}
			
     		if($scope.re[0]){
     			if($scope.resultName.idCardImg0==""){
     				layer.open({
					    content: "请上传身份证正面！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
     			return
     			}
     		}
	     	
	     	if($scope.re[1]){
	     		if($scope.resultName.idCardImg1==""){
     				layer.open({
					    content: "请上传身份证反面！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
     			return
     			}		
     		}
	     	
	     	
	     	if($scope.re[2]){
	     		if($scope.resultName.academicImg==""){
     				layer.open({
					    content: "请上传学历证书照片！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
     			return
     			}		
     		}
	     	
	     	if($scope.re[3]){
	     		if($scope.resultName.workImg==""){
     				layer.open({
					    content: "请上传工作证明照片！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
     			    return
     			}		
     			
     		}
	     	
	     		$scope.subobj={
	  	       		"mobile":$scope.resultName.mobile,
	  	       		"idcardNo":$scope.resultName.idCardNo,
	  	       		"idcarback":$scope.resultName.idCardImg1,
	  	       		"idcard":$scope.resultName.idCardImg0,
	  	       		"academic":$scope.resultName.academicImg,
	  	       		"work":$scope.resultName.workImg,
	  	       		"uid":$scope.uid,
	  	       		"token":$scope.token
	  	       }
	     		$rootScope.n= layer.open({
				    type: 2
				    ,content: '加载中'
			    });
	     		
	     		$.ajax({
					type:"POST",
					url:"http://api.jdhn.top/home/member/certification",/*url写异域的请求地址*/
					data:$scope.subobj,
						success:function(result){
							var data=JSON.parse(result);
							if(data.code==1){
								layer.open({
								    content: data.message
								    ,skin: 'msg'
								    ,time: 2 //2秒后自动关闭
								  });
								layer.close($rootScope.n);
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
	
	
})();

 function idCard(gets){
        //该方法由佚名网友提供;

        var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子;
        var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值，10代表X;

        if (gets.length == 15) {
            return isValidityBrithBy15IdCard(gets);
        }else if (gets.length == 18){
            var a_idCard = gets.split("");// 得到身份证数组
            if (isValidityBrithBy18IdCard(gets)&&isTrueValidateCodeBy18IdCard(a_idCard)) {
                return true;
            }
            return false;
        }
        return false;

        function isTrueValidateCodeBy18IdCard(a_idCard) {
            var sum = 0; // 声明加权求和变量
            if (a_idCard[17].toLowerCase() == 'x') {
                a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作
            }
            for ( var i = 0; i < 17; i++) {
                sum += Wi[i] * a_idCard[i];// 加权求和
            }
            valCodePosition = sum % 11;// 得到验证码所位置
            if (a_idCard[17] == ValideCode[valCodePosition]) {
                return true;
            }
            return false;
        }

        function isValidityBrithBy18IdCard(idCard18){
            var year = idCard18.substring(6,10);
            var month = idCard18.substring(10,12);
            var day = idCard18.substring(12,14);
            var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
            // 这里用getFullYear()获取年份，避免千年虫问题
            if(temp_date.getFullYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){
                return false;
            }
            return true;
        }

        function isValidityBrithBy15IdCard(idCard15){
            var year =  idCard15.substring(6,8);
            var month = idCard15.substring(8,10);
            var day = idCard15.substring(10,12);
            var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
            // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
            if(temp_date.getYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){
                return false;
            }
            return true;
        }

    }