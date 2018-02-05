(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('homepagebianControl', homepagebianControl)

    homepagebianControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','$upload'];

    function homepagebianControl($scope, $rootScope, $state, $timeout, $window, $location, $http,$upload) {
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
		var url='http://api.jdhn.top/home/member/myinfo?uid='+$scope.uid+"&token="+$scope.token;
		$http.get(url).success(function(data,status,headers,config){
			if(data.code==1){
				
		    	$scope.personalData=data.data;
		    	if($scope.personalData.u_religion==''){
		    		$scope.personalData.u_religion="无宗教信仰"
		    	}
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
      	
      	
      	$scope.marriagelist=[
      		{"id":"0","name":"--请选择--"},
		   	{"id":"1","name":"未婚(单身)"},
		   	{"id":"2","name":"离异(单身)"},
		   	{"id":"3","name":"丧偶(单身)"},
		   	{"id":"4","name":"恋爱中"},
		   	{"id":"5","name":"已婚"}
		]
      	
      	
      	$scope.childrenlist=[
      		{"id":"0","name":"--请选择--"},
		    {"id":"1","name":"有（归自己）"},
		    {"id":"2","name":"有（归对方）"},
		    {"id":"3","name":"无子女"},
			{"id":"4","name":"有"},
		]
      	
      	
      	$scope.positions=['北京','上海','天津','重庆','广东','福建','湖北','湖南','河北','河南','山西','陕西','江苏','浙江','安徽','江西','山东','辽宁','吉林','黑龙江',
      	'四川','贵州','云南','西藏','甘肃','青海','宁夏','新疆','内蒙古','广西','海南','香港','澳门','台湾']
      	
      
      	$scope.religionList=['无宗教信仰','道教','儒教', '大乘佛教显宗', '大乘佛教密宗','小乘佛教', '犹太教','基督教天主教派 ', '基督教东正教派', '天主教 ','基督教新教派','伊斯兰教什叶派','伊斯兰教逊尼派','印度教','神道教','萨满教','其他宗教信仰']
      	
      	var readurl='http://api.jdhn.top/home/member/certification?callback=JSON_CALLBACK&uid='+$scope.uid+"&token="+$scope.token
      	$http.jsonp(readurl).success(function(result){
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
	        }).success(function(data, status, headers, config) {
	            // 文件上传成功处理函数
	            if(data.code==1){
	            	layer.close($rootScope.li);
	       				$scope.resultName.idCardImg0=data.fullImgUrl;
	       				$.ajax({
						type:"POST",
						url:"http://api.jdhn.top/home/member/saveiden",/*url写异域的请求地址*/
						data: {"u_idCardImg0":$scope.resultName.idCardImg0,"u_id":$scope.uid,"token":$scope.token,"type":"idcard"},
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
										    content: data.message
										    ,skin: 'msg'
										    ,time: 2 //2秒后自动关闭
										  });
									}
							    }
						});
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
	       				$.ajax({
						type:"POST",
						url:"http://api.jdhn.top/home/member/saveiden",/*url写异域的请求地址*/
						data: {"u_idCardImg1":$scope.resultName.idCardImg1,"u_id":$scope.uid,"token":$scope.token,"type":"idcarback"},
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
										    content: data.message
										    ,skin: 'msg'
										    ,time: 2 //2秒后自动关闭
										  });
									}
							    }
						});
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
	       				$.ajax({
						type:"POST",
						url:"http://api.jdhn.top/home/member/saveiden",/*url写异域的请求地址*/
						data: {"u_academicImg":$scope.resultName.academicImg,"u_id":$scope.uid,"token":$scope.token,"type":"academic"},
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
										    content: data.message
										    ,skin: 'msg'
										    ,time: 2 //2秒后自动关闭
										  });
									}
							    }
						});
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
	       				$.ajax({
						type:"POST",
						url:"http://api.jdhn.top/home/member/saveiden",/*url写异域的请求地址*/
						data: {"u_workerImg":$scope.resultName.workImg,"u_id":$scope.uid,"token":$scope.token,"type":"work"},
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
										    content: data.message
										    ,skin: 'msg'
										    ,time: 2 //2秒后自动关闭
										  });
									}
							    }
						});
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
      	
      	
      	
      	
      	
      	
      	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
      	$scope.submit_input=function(){
      		$scope.personalData.token=$scope.token;
      		var idcardNo=$scope.personalData.u_idCardNo;
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
      		}else if($scope.personalData.hometown==null||$scope.personalData.hometown==""){
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
      		}else if(idcardNo==""||idcardNo==null){
     			layer.open({
					    content: "请输入身份证！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
     			return
     		}else if(!idCard(idcardNo)){
				layer.open({
					    content: "身份证错误！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
     			return
			}else if($scope.personalData.city==null||$scope.personalData.city==""){
				layer.open({
					    content: "请输入城市！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
     			return
			}else if($scope.personalData.u_marriage==null||$scope.personalData.u_marriage=="0"){
				layer.open({
					    content: "请输入婚姻状况！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
     			return
			}else if($scope.personalData.u_children==null||$scope.personalData.u_children=="0"){
				layer.open({
					    content: "请输入有无子女！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
     			return
			}else if($scope.personalData.u_religion==null||$scope.personalData.u_religion==" "){
				layer.open({
					    content: "请输入请教信仰！"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					 });
     			return
			}else{
      		$rootScope.n= layer.open({
				    type: 2
				    ,content: '加载中'
			});
			
//			console.log($scope.personalData.u_marriage)
			$scope.homepage={
				"work":$scope.personalData.work,
				"token":$scope.personalData.token,
				"academic":$scope.personalData.academic,
				"birthday":$scope.personalData.birthday,
				"city":$scope.personalData.city,
				"gender":$scope.personalData.gender,
				"height":$scope.personalData.height,
				"hometown":$scope.personalData.hometown,
				"iscar":$scope.personalData.iscar,
				"ishouse":$scope.personalData.ishouse,
				"mobile":$scope.personalData.mobile,
				"nickName":$scope.personalData.nickName,
				"realName":$scope.personalData.realName,
				"salary":$scope.personalData.salary,
				"school":$scope.personalData.school,
				"children":$scope.personalData.u_children,
				"u_id":$scope.personalData.u_id,
				"u_idCardNo":$scope.personalData.u_idCardNo,
				"u_intro":$scope.personalData.u_intro,
				"marriage":$scope.personalData.u_marriage,
				"religion":$scope.personalData.u_religion,
				"wechat_num":$scope.personalData.wechat_num
			}
			
			$.ajax({
					type:"POST",
					url:"http://api.jdhn.top/home/member/myinfo",/*url写异域的请求地址*/
					data:$scope.homepage,
						success:function(result){
							var data = JSON.parse(result);
							//console.log(data)
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