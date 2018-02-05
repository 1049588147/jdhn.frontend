(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('homepageControl', homepageControl)


    homepageControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','$upload'];

    function homepageControl($scope, $rootScope, $state, $timeout, $window, $location, $http,$upload) {
		$rootScope.title = $state.$current.data.pageTitle;
      	$scope.token=$window.localStorage.getItem("token");
		$scope.uid=$window.localStorage.getItem("uid");
		$window.localStorage.setItem("activity_id","");	
		$scope.imgae=[];
		$scope.imglength=0;
		$scope.isshow3=true;
        $scope.isshow4=true;
        $scope.isshow6=true;
        $scope.isshow8=true;
		//$scope.jbxxState=''
		$scope.nickNameinput=false;
		$scope.nickNamediv=true;

		$scope.smrz=false;
		$scope.gzrz=false;
		$scope.xlrz=false
		$scope.birthday=true
		$scope.showmyhobbyList=false;
		$scope.showchooseHobby=false
		//$scope.showupload=true;



		if($scope.token==""||$scope.token==null){
			$state.go("login");
			return;
		}else if($scope.uid==""||$scope.uid==null){
			$state.go("login");
			return;
		}


		setInterval(function(){
			if($scope.imglength>3)
			  $scope.showupload=false;
			else
				$scope.showupload=true;


		},100)

		$scope.doNothing=function()
		{
			event.stopPropagation();


		}

		$scope.chooseHobby=function()
		{
			event.stopPropagation();
			event.preventDefault()
			$scope.showmyhobbyList=true;

		}

		$scope.closeshowmyhobbyList=function()
		{
			$scope.showmyhobbyList=false;
		}


		var  hobbyListNum=0;
		$("input:checkbox[name='hobbyList']").click(function(){
			if($(this).is(":checked"))
			{
				if(hobbyListNum<4)
				{
					$(this).parent().css('background','#88D2FF')
					hobbyListNum++

				}
				else
				{
					$(this).prop("checked",false);

				}

			}
			else
			{

				$(this).parent().css('background','#D2D2D2')
				hobbyListNum--;

			}
			//console.log(hobbyListNum)


		})



		$scope.hobbyListChosed=function()
		{
			$scope.datalist.u_hobby=''
			$("input:checkbox[name='hobbyList']:checked").each(function(){
				$scope.datalist.u_hobby=$scope.datalist.u_hobby+$(this).val()+'|'
			})

			$scope.datalist.u_hobby=$scope.datalist.u_hobby.substr(0,$scope.datalist.u_hobby.length-1)

			//console.log($scope.datalist.u_hobby)
			$scope.showmyhobbyList=false;

		}





		$scope.toinput=function()
		{
			$scope.nickNameinput=true;
			$scope.nickNamediv=false;
			$timeout(function(){
				$('.saveOther1').focus()
			},100)

			$('.nike-title img').css('opacity','0')



		}


		$scope.isshow1=function (e) {
            $scope.isshow3=! $scope.isshow3;

        }
        $scope.isshow2=function () {
            $scope.isshow4=! $scope.isshow4;

        }
        $scope.isshow5=function () {
            $scope.isshow6=! $scope.isshow6;

        }
        $scope.isshow7=function () {
            $scope.isshow8=! $scope.isshow8;

        }
        $scope.goU=function () {
			$rootScope.li= layer.open({
				type: 2
				,content: '跳转中'
			});

			var url='http://api.jdhn.top/home/ustore/judgeInfo?callback=JSON_CALLBACK&token='+$scope.token+'&uid='+$scope.uid
			$http.jsonp(url).success(function(result){
				//console.log(result)
				layer.close($rootScope.li);
				if(result.code==510){

					$window.localStorage.setItem("token","");
					$window.localStorage.setItem("uid","");


					layer.open({
						content:"您的账号已在其它地点登录！"
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					});

					$state.go("login");
				}
				if(result.code==1)
					$state.go('goodKu')
				else
				{
					layer.open({
						'content':'请完善基本信息！',
						'skin':'msg',
						'time':2
					})
				}
				
			})
			




        }
        $scope.goHomepagebian=function () {
        	$state.go('homepagebian')

        }


        // 修改昵称和个人简介
		$('.saveOther1').blur(function () {
			var url='http://api.jdhn.top/home/member/saveOther'
			var data={
				'uid':$scope.uid,
				'token':$scope.token,
				'nickName':$scope.code.nickName,
				//'intro':$scope.datalist.u_intro
			}
            $http({
                method:'post',
                url:url,
                data: $.param(data),
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},

            }).success(function(request){
                //console.log(request)
				if(request.code==300)
				{
					layer.open({
						'content':'昵称不能为空！',
						'skin':'msg',
						'time':2
					})
					$timeout(function(){
						location.reload()
					},2000)
				}


				$scope.nickNameinput=false;
				$scope.nickNamediv=true;
            })


			$timeout(function(){
				$('.nike-title img').css('opacity','1')

			},200)


            event.stopPropagation();
            event.preventDefault();


        })

		$('.saveOther2').blur(function () {
			var url='http://api.jdhn.top/home/member/saveOther'
			if($scope.datalist.u_intro=='')
				$scope.datalist.u_intro='愿每一位优秀的人都不再孤单!'


			var data={
				'uid':$scope.uid,
				'token':$scope.token,
				//'nickName':$scope.code.nickName,
				'intro':$scope.datalist.u_intro
			}
			$http({
				method:'post',
				url:url,
				data: $.param(data),
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},

			}).success(function(request){
				//console.log(request)
			})

			event.stopPropagation();
			event.preventDefault();


		})




		if($scope.token==""||$scope.token==null){
			$state.go("login");
			return;
		}else if($scope.uid==""||$scope.uid==null){
			$state.go("login");
			return;
		}
		
		var fenxiangurl=$window.location.href.split("#")[0]
		$scope.urlgo=function(t,en){
			$.ajax({  
					type : "post",  
					dataType : "json",  
					url : "http://api.jdhn.top/home/share",
					data : {  
						url : fenxiangurl  
					},  
					complete : function() {  
					},  
					success : function(msg) {  
						
						 var  data=msg.data
							if (msg.code==1) {  
								wx.config({  
									debug : false, //  
									appId : data.appId, // 必填，公众号的唯一标识  
									timestamp :data.timestamp, // 必填，生成签名的时间戳  
									nonceStr : data.nonceStr, // 必填，生成签名的随机串  
									signature : data.signature,// 必填，签名，见附录1  
									jsApiList : [ 'onMenuShareTimeline',  
											'onMenuShareAppMessage', 'showOptionMenu' ]  
								// 必填，需要使用的JS接口列表，所有JS接口列表见附录2  
								});  
							}  
					},  
				});  
			
				
				
			var shareTitle = t;  
			var shareDesc = "快来和我遇见吧♥！";  
			var shareImg = "http://www.jdhn.top/img/sign.jpg";  
			var url = "http://www.jdhn.top/sharepage.html?u_id="+$scope.uid;  
				wx.ready(function() {  
					share();  
				});  
			 function share() {  
				wx.showOptionMenu();  
				wx.onMenuShareTimeline({  
					title : shareTitle, // 分享标题  
					link : url, // 分享链接  
					imgUrl : shareImg,  
					desc : shareDesc, // 分享描述  
					success : function() {  
					}  
				});  
				wx.onMenuShareAppMessage({  
					title : shareTitle, // 分享标题  
					link : url, // 分享链接  
					imgUrl : shareImg,  
					desc : shareDesc, // 分享描述  
					success : function() {  
					}  
				});  
				
				wx.onMenuShareQQ({
					title: shareTitle, // 分享标题
					desc: shareDesc, // 分享描述
					link: url, // 分享链接
					imgUrl: shareImg, // 分享图标
					success: function () { 
					   // 用户确认分享后执行的回调函数
					},
					cancel: function () { 
					   // 用户取消分享后执行的回调函数
					}
				});
			}  
			
			
		}

		//修改基本资料
        $scope.jbxxclick=1;
        $scope.canChange=true;

        //开始修改基本资料
		$scope.changejbzl=function () {
			event.stopPropagation();
			event.preventDefault();

			$scope.showchooseHobby=true

			$scope.birthday=true;

			$('#jbzl .album_center_list').css({
					'border-bottom':'1px solid #eeeeee ',
					'width':'90%',
					'margin-left':'2%',
					'padding-left':'2%'
			}
			)
			$('#jbzl select').removeAttr('disabled');
			$('#jbxxClick').attr({
				'src':'img/buyDetailsGou.png',
			})

			$('#jbzl').css({
				'padding-bottom':'1.5rem'
			})


			$scope.jbxxclick=2
			$scope.canChange=false;
			$scope.isshow3=true;





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
				'trigger': '#birthday', //标签id
				'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
				'minDate':'1900-1-1',//最小日期 注意：该值会覆盖标签内定义的日期范围
				'maxDate':t//最大日期 注意：该值会覆盖标签内定义的日期范围
			});






		}

		//修改成功基本资料
		$scope.changejbzlOk=function () {
			$scope.showchooseHobby=false
			$scope.jbxxclick=1;
			$scope.canChange=true;
			$('#jbzl select').attr('disabled','disabled')
			$('#jbxxClick').attr({
				'src':'img/homePageEditor.png',
			})

			//$('#jbzl .redStar').remove()
			$('#jbzl .album_center_list').css({
					'border-bottom':'0px solid #eeeeee ',
					'width':'100%',

				}
			)

			$('#jbzl').css({
				'padding-bottom':'20px'
			})

			$rootScope.li= layer.open({
				type: 2
				,content: '修改中'
			});





			var url='http://api.jdhn.top/home/member/myinfo';
			var data={
				'token':$scope.token,
				'u_id':$scope.uid,
				'realName':$scope.datalist.realName,
				'u_gender':$scope.datalist.gender,
				'birthday':$scope.datalist.birthday,
				'height':$scope.datalist.height,
				'marriage':$scope.datalist.u_marriage,
				'academic':$scope.datalist.academic,
				'school':$scope.datalist.school,
				'city':$scope.datalist.city,
				'hometown':$scope.datalist.hometown,
				'work':$scope.datalist.work,
				'hobby':$scope.datalist.u_hobby,
				'mobile':$scope.datalist.mobile,
				'wechat_num':$scope.datalist.wechat_num
			};

			//console.log(data)

			$http({
				method:'post',
				url:url,
                data: $.param(data),
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},

			}).success(function(result){
				//console.log(result)


				 if(result.code==510){

					$window.localStorage.setItem("token","");
					$window.localStorage.setItem("uid","");
					 layer.close($rootScope.li);
					layer.open({
						content:"您的账号已在其它地点登录！"
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					});

					$state.go("login");
				}


				if(result.code!=1)
				{
					$scope.birthday=false;
					layer.close($rootScope.li);
				}

					layer.open({
						content: result.message
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					});
				layer.close($rootScope.li);

					//$scope.jbxxState=result.code;
				   //localStorage.setItem('jbxxState',$scope.jbxxState)



			})

				event.stopPropagation();
				event.preventDefault();

		}







		//修改更多资料
		$scope.gdzlclick=1;
		$scope.gdzlcanChange=true;

		//开始修改更多资料
		$scope.changegdzl=function () {

			//$('#gdzl .album_center_list>div:nth-child(1)').prepend("<label class='redStar'>*</label>");
			$('#gdzl .album_center_list').css({
					'border-bottom':'1px solid #eeeeee ',
					'width':'90%',
					'margin-left':'2%',
					'padding-left':'2%'
				}
			)
			$('#gdzl').css({
				'padding-bottom':'1.5rem'
			})

			$('#gdzl select').removeAttr('disabled');
			$('#gdzlClick').attr({
				'src':'img/buyDetailsGou.png',
			})
			$scope.gdzlclick=2
			$scope.gdzlcanChange=false;
			$scope.isshow4=true;


			event.stopPropagation();
			event.preventDefault();


		}

		//修改成功更多资料
		$scope.changegdzlOk=function () {
			$scope.gdzlclick=1;
			$scope.gdzlcanChange=true;
			$('#gdzl select').attr('disabled','disabled');
			$('#gdzlClick').attr({
				'src':'img/homePageEditor.png',
			})

			$('#gdzl .album_center_list').css({
					'border-bottom':'0px solid #eeeeee ',
					'width':'100%',

				}
			)

			$('#gdzl').css({
				'padding-bottom':'20px'
			})

			$rootScope.li= layer.open({
				type: 2
				,content: '修改中'
			});





			var url='http://api.jdhn.top/home/member/setMoreData';
			var data={
				'token':$scope.token,
				'uid':$scope.uid,
				'u_isOnly':$scope.datalist.u_isOnly,
				'u_children':$scope.datalist.u_children,
				'u_work_property':$scope.datalist.u_work_property,
				'u_salary':$scope.datalist.salary,
				'u_ishouse':$scope.datalist.ishouse,
				'u_iscar':$scope.datalist.iscar,
				'u_religion':$scope.datalist.u_religion,
			};

			//console.log(data)

			$http({
				method:'post',
				url:url,
				data: $.param(data),
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},

			}).success(function(request){
				//console.log(request)
				layer.close($rootScope.li);
				 if(request.code==510){

					$window.localStorage.setItem("token","");
					$window.localStorage.setItem("uid","");


					layer.open({
						content:"您的账号已在其它地点登录！"
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					});

					$state.go("login");
				}
				layer.open({
					content: request.message
					,skin: 'msg'
					,time: 2 //2秒后自动关闭
				});
			})


			//$('#gdzl .redStar').remove()
			event.stopPropagation();
			event.preventDefault();

		}




		//修改择偶需求
		$scope.zoxqclick=1;
		$scope.zoxqcanChange=true;

		//开始修改择偶需求
		$scope.changezoxq=function () {

			//$('#zoxq .album_center_list>div:nth-child(1)').prepend("<label class='redStar'>*</label>");

			$('#zoxq .album_center_list').css({
					'border-bottom':'1px solid #eeeeee ',
					'width':'90%',
					'margin-left':'2%',
					'padding-left':'2%'
				}
			)
			$('#zoxq select').removeAttr('disabled');

			$('#zoxq').css({
				'padding-bottom':'1.5rem'
			})

			$('#zoxqClick').attr({
				'src':'img/buyDetailsGou.png',
			})
			$scope.zoxqclick=2
			$scope.zoxqcanChange=false;
			$scope.isshow6=true;


			event.stopPropagation();
			event.preventDefault();


		}

		//修改成功择偶需求
		$scope.changezoxqOk=function () {
			$scope.zoxqclick=1;
			$scope.zoxqcanChange=true;
			$('#zoxq select').attr('disabled','disabled');
			$('#zoxqClick').attr({
				'src':'img/homePageEditor.png',
			})
			$('#zoxq').css({
				'padding-bottom':'20px'
			})

			//$('#zoxq .redStar').remove()
			$('#gdzl .album_center_list').css({
					'border-bottom':'0px solid #eeeeee ',
					'width':'100%',

				}
			)
			//console.log($('#begin_height').val())
			//console.log($('#end_height').val())
			$rootScope.li= layer.open({
				type: 2
				,content: '修改中'
			});


	
				
			
			$scope.begin_date=parseInt($('#begin_date').val().split(':')[1])
            $scope.end_date=parseInt($('#end_date').val().split(':')[1])
			$scope.begin_height=parseInt($('#begin_height').val().split(':')[1])
			$scope.end_height=parseInt($('#end_height').val().split(':')[1])
						
			if(!$scope.begin_date || $scope.begin_date=='' || !$scope.end_date || $scope.end_date=='')
			{
				layer.open({
					content:'请正确输入年龄范围',
					skin:'msg',
					time:2
		
				})
				return;
			}
			if(!$scope.begin_height || $scope.begin_height=='' || !$scope.end_height || $scope.end_height=='')
			{
				layer.open({
					content:'请正确输入身高范围',
					skin:'msg',
					time:2
		
				})
				return;
			}
			
			

			if($scope.begin_date>$scope.end_date)
			{
				$scope.begin_date=parseInt($('#end_date').val().split(':')[1]);
				$scope.end_date=parseInt($('#begin_date').val().split(':')[1]);

			}
			// console.log($scope.begin_height)
			// console.log($scope.end_height)

			if($scope.begin_height>$scope.end_height)
			{
		
				$scope.begin_height=parseInt($('#end_height').val().split(':')[1]);
				$scope.end_height=parseInt($('#begin_height').val().split(':')[1]);

			}
			
			// console.log($scope.begin_height)
			// console.log($scope.end_height)

		
			


			var myinfourl='http://api.jdhn.top/home/member/setMySelection';
			var data={
				'token':$scope.token,
				'uid':$scope.uid,
				'age':$scope.begin_date+','+$scope.end_date,
				//'height':$scope.selection.height,
				'height':$scope.begin_height+','+$scope.end_height,
				'degree':$scope.selection.degree,
				'marry_state':$scope.selection.marry_state,
				'children':$scope.selection.children,
				'work_property':$scope.selection.work_property,
				'hometown':$scope.selection.hometown,
				'car':$scope.selection.car,
				'house':$scope.selection.house,
				'salary':$scope.selection.salary,
				'religon':$scope.selection.religon,
				'domicile':$scope.selection.domicile,
			};
			// console.log(data)

			$http({
				method:'post',
				url:myinfourl,
				data: $.param(data),
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},

			}).success(function(request){
				//console.log(request)
				layer.close($rootScope.li);
				if(request.code==510){

					$window.localStorage.setItem("token","");
					$window.localStorage.setItem("uid","");


					layer.open({
						content:"您的账号已在其它地点登录！"
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					});

					$state.go("login");
				}

				layer.open({
					content: request.message
					,skin: 'msg'
					,time: 2 //2秒后自动关闭
				});
				// console.log($scope.begin_date)
				// console.log($scope.end_date)

				$scope.begin_date=parseInt($scope.begin_date)
				$scope.end_date=parseInt($scope.end_date)
				$scope.begin_height=$scope.begin_height+''
				$scope.end_height=$scope.end_height+''

			})

			event.stopPropagation();
			event.preventDefault();


		}




        //修改认证材料
        $scope.rzclclick=1;
        $scope.rzclcanChange=true;

        //开始修改认证材料
        $scope.changerzcl=function () {

			//$('#rzcl').css({
			//	'padding-bottom':'1.5rem'
			//})

            //$('#rzcl .album_center_list>div:nth-child(1)').prepend("<label class='redStar'>*</label>");
            //$('#sfz').prepend("<label class='redStar'>*</label>")
			
			
				$('.imgClass').removeAttr('disabled')
			$('#rzcl .album_center_list').css({
					'border-bottom':'1px solid #eeeeee ',
					'width':'90%',
					'margin-left':'2%',
					'padding-left':'2%'
				}
			)
            $('#rzclClick').attr({
                'src':'img/buyDetailsGou.png',
            })
            $scope.rzclclick=2
            $scope.rzclcanChange=false;
			$scope.isshow8=true;


            event.stopPropagation();
            event.preventDefault();


        }

        //修改成功认证材料
        $scope.changerzclOk=function () {
            $scope.rzclclick=1;
            $scope.rzclcanChange=true;
			//$('#rzcl').css({
			//	'padding-bottom':'20px'
			//})
			
			
			$('.imgClass').attr('disabled',true)
            $('#rzclClick').attr({
                'src':'img/homePageEditor.png',
            })

			$('#rzcl .album_center_list').css({
					'border-bottom':'0px solid #eeeeee ',
					'width':'100%',

				}
			)

			$rootScope.li= layer.open({
				type: 2
				,content: '上传中'
			});


			//$('#rzcl .redStar').remove()


            //$scope.begin_date=$('#begin_date').val()
            //$scope.end_date=$('#end_date').val()

            var url="http://api.jdhn.top/home/member/certification";
            var data={
                'token':$scope.token,
                'uid':$scope.uid,
                'realName':$scope.datalist.realName,
                'idcardNo':$scope.datalist.u_idCardNo,
                "idcard":$scope.datalist.u_idCardImg0,
				"idcarback":$scope.datalist.u_idCardImg1,
				"academic":$scope.datalist.u_academicImg,
				"work":$scope.datalist.u_workerImg,

            };


            $http({
                method:'post',
                url:url,
                data: $.param(data),
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},

            }).success(function(result){
                //console.log(result)
				layer.close($rootScope.li);
				if(result.code==510){

					$window.localStorage.setItem("token","");
					$window.localStorage.setItem("uid","");


					layer.open({
						content:"您的账号已在其它地点登录！"
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					});

					$state.go("login");
				}
				layer.open({
					content: result.message
					,skin: 'msg'
					,time: 2 //2秒后自动关闭
				});
            })

            event.stopPropagation();
            event.preventDefault();

        }



		var url='http://api.jdhn.top/home/member/index?callback=JSON_CALLBACK&uid='+$scope.uid+"&token="+ $scope.token
		$http.jsonp(url).success(function(result){

                $('select').attr('disabled','disabled')



				if(result.code==1){
					$scope.code=result.data;

					$scope.urlgo($scope.code.nickName,$scope.code.u_intro)
					if($scope.code.u_personImg==""||$scope.code.u_personImg==null){
						$scope.imgae=[]
					}else{
						$scope.imgae=$scope.code.u_personImg.split(",")
					}
					 $scope.imglength=$scope.imgae.length;
					if( $scope.imglength>3)
					  $scope.showupload=false;
					else
						$scope.showupload=true;

						if($scope.code.state1==343){
							$scope.smrz=true;
						}
						if($scope.code.state2==342){
							$scope.gzrz=true;
						}
						
						if($scope.code.state3==344){
							$scope.xlrz=true;
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
      	
      	
      	var myinfourl='http://api.jdhn.top/home/member/myinfo?uid='+$scope.uid+"&token="+$scope.token;
		$rootScope.li= layer.open({
			type: 2
			,content: '加载中'
		});
		$http.get(myinfourl).success(function(data,status,headers,config){
            // console.log(data)
			layer.close($rootScope.li);
			if(data.code==510){

				$window.localStorage.setItem("token","");
				$window.localStorage.setItem("uid","");


				layer.open({
					content:"您的账号已在其它地点登录！"
					,skin: 'msg'
					,time: 2 //2秒后自动关闭
				});

				$state.go("login");
			}
			if(data.code==1){

		    	$scope.datalist=data.info;
		    	$scope.selection=data.selection;
				$scope.point=data.point;


				if($scope.datalist.u_hobby==0 || $scope.datalist.u_hobby==null )
					$scope.datalist.u_hobby=''
					

				if(!$scope.datalist.u_cover)
					$scope.datalist.u_cover='img/u_cover.jpg'

				if(!$scope.datalist.u_intro)
					$scope.datalist.u_intro='愿每一位优秀的人都不再孤单！'

				if(!$scope.datalist.nickName)
					$scope.code.nickName='未设置'

				if($scope.datalist.height==0)
					$scope.datalist.height=''






				if(data.selection){
					if(data.selection.age)
					{
						$scope.begin_date = data.selection.age.split(',')[0];
						$scope.begin_date= parseInt($scope.begin_date)

						$scope.end_date = data.selection.age.split(',')[1];
						$scope.end_date=  parseInt($scope.end_date)
					}
					else
					{
						$scope.begin_date=0;
						$scope.end_date=0

					}

					if($scope.selection.religon=="")
					//$scope.datalist.u_religion='未选择'
						$scope.selection.religon=$scope.religionList[0]


					if($scope.selection.height!=null && $scope.selection.height!='')
					{
						$scope.begin_height=$scope.selection.height.split(',')[0];
						$scope.end_height=$scope.selection.height.split(',')[1];
					}



				}


				if($scope.datalist.u_work_property=='')
					$scope.datalist.u_work_property='0'

				if($scope.datalist.u_hobby==null)
					$scope.datalist.u_hobby='0'

				if($scope.datalist.u_religion=="")
					//$scope.datalist.u_religion='未选择'
					$scope.datalist.u_religion=$scope.religionList[0]







				$('#point').css('width',3.82*$scope.point/100+'rem')
				if($scope.datalist.state1=='343')
					$('.shiming').css('background','#FD9473')
				if($scope.datalist.state2=='342')
					$('.xueli').css('background','#A4C1E7')
				if($scope.datalist.state3=='344')
					$('.gongz').css('background','#A4E4BA')



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
			//console.log(data);
			
		})

		$scope.dayList=[
			{'id':0,'name':'不限'}
		]

		for(var i=2018;i>=1900;i--)
		{
			var day={'id':i,'name':i}
			$scope.dayList.push(day)
		}
		
		





		//择偶需求-居住地

        $('#zoxq-jzd').jcity({
            urlOrData: 'dist/City/js/citydata.json',
            animate: { showClass: 'animated flipInX', hideClass: 'animated flipOutX' },  // 需要第一步引用的animate.min.css文件，也可以自己定义动画
            onChoice: function (data) {
                //console.log(data);
                $scope.selection.domicile=data.provinceName+'-'+data.cityName+'-'+data.areaName;
            }
        })

        $('#jbxx-xjd').jcity({
            urlOrData: 'dist/City/js/citydata.json',
            animate: { showClass: 'animated flipInX', hideClass: 'animated flipOutX' },  // 需要第一步引用的animate.min.css文件，也可以自己定义动画
            onChoice: function (data) {
                //console.log(data);
                $scope.datalist.city=data.provinceName+'-'+data.cityName+'-'+data.areaName;
            }
        })




		//各项数据列表
		$scope.genderList=[
			{"id":"2","name":"男"},
			{"id":"3","name":"女"},

		]

		$scope.heightList=[];
		for(var i=100;i<=200;i++)
		{
			$scope.heightList.push(i+'')

		}
		
		
	





		$scope.hobbyList=[
			//{"id":"0","name":""},
			{"id":"1","name":"阅读"},
			{"id":"2","name":"音乐"},
			{"id":"3","name":"电影"},
			{"id":"4","name":"旅行"},
			{"id":"5","name":"健身"},
			{"id":"6","name":"摄影"},
			{"id":"7","name":"美食"},
			{"id":"8","name":"摄影"},
			{"id":"9","name":"休闲"},
			{"id":"10","name":"发呆"},
			{"id":"11","name":"购物"},
			{"id":"12","name":"手工"},
			{"id":"13","name":"瑜伽"},
			{"id":"14","name":"徒步"},
			{"id":"15","name":"烘焙"},
			{"id":"16","name":"烹饪"},
			{"id":"17","name":"宠物"},
			{"id":"18","name":"动漫"},
			{"id":"19","name":"游戏"},
			{"id":"20","name":"展览"},
			{"id":"21","name":"话剧"},
			{"id":"22","name":"理财"},
			{"id":"23","name":"追剧"},
			{"id":"24","name":"品茶"},
			{"id":"25","name":"花草"},
			{"id":"26","name":"社交"},
			{"id":"27","name":"舞蹈"},
			{"id":"28","name":"装饰"},
			{"id":"29","name":"羽毛球"},
			{"id":"30","name":"足球"},
			{"id":"31","name":"篮球"},
			{"id":"32","name":"网球"},
			{"id":"33","name":"游泳"}
		]
		$scope.select_u_children=[
			//{'id':'0','name':''},
			{'id':'1','name':'归自己'},
			{'id':'2','name':'归对方'},
			{'id':'3','name':'无'},

		]
		$scope.select_u_children2=[
			{'id':'0','name':'不限'},
			{'id':'1','name':'归自己'},
			{'id':'2','name':'归对方'},
			{'id':'3','name':'无'},

		]
		$scope.select_u_isOnly=[
			//{'id':'0','name':''},
			{'id':'1','name':'是'},
			{'id':'2','name':'不是'},

		]
		$scope.select_u_ishouse=[
			//{'id':'0','name':''},
			{'id':'1','name':'未购房'},
			{'id':'2','name':'已购房'},

		]
		$scope.select_u_ishouse2=[
			{'id':'0','name':'不限'},
			{'id':'1','name':'未购房'},
			{'id':'2','name':'已购房'},

		]
		$scope.select_u_iscar=[
			//{'id':'0','name':''},
			{'id':'1','name':'未购车'},
			{'id':'2','name':'已购车'},

		]
		$scope.select_u_iscar2=[
			{'id':'0','name':'不限'},
			{'id':'1','name':'未购车'},
			{'id':'2','name':'已购车'},

		]
		$scope.select_u_salary=[
			//{"id":"31","name":""},
			{"id":"32","name":"10万以下"},
			{"id":"33","name":"10万-20万"},
			{"id":"34","name":"20万-30万"},
			{"id":"35","name":"30万以上"}

		]
		$scope.select_u_salary2=[
			//{"id":"31","name":""},
			// {"id":"0","name":"不限"},
			// {"id":"32","name":"10万以下"},
			// {"id":"33","name":"10万-20万"},
			// {"id":"34","name":"20万-30万"},
			// {"id":"35","name":"30万以上"}
			{"id":"0","name":"不限"},
			{"id":"32","name":"10万以下"},
			{"id":"33","name":"10万以上"},
			{"id":"34","name":"20万以上"},
			{"id":"35","name":"30万以上"}

		]
		$scope.u_marriagelist=[
			//{"id":"0","name":"--请选择--"},
			{"id":"1","name":"未婚(单身)"},
			{"id":"2","name":"离异(单身)"},
			{"id":"3","name":"丧偶(单身)"},
			{"id":"4","name":"恋爱中"},
			{"id":"5","name":"已婚"}
		]
		$scope.u_marriagelist2=[
			{"id":"0","name":"不限"},
			{"id":"1","name":"未婚(单身)"},
			{"id":"2","name":"离异(单身)"},
			{"id":"3","name":"丧偶(单身)"},
			// {"id":"4","name":"恋爱中"},
			// {"id":"5","name":"已婚"}
		]
		$scope.u_education=[
			//{"id":"11","name":""},
			{"id":"15","name":"学士"},
			{"id":"16","name":"硕士"},
			{"id":"17","name":"博士"}
		]
		$scope.u_education2=[
			{"id":"11","name":"不限"},
			{"id":"15","name":"学士"},
			{"id":"16","name":"硕士"},
			{"id":"17","name":"博士"}
		]
		$scope.u_height=[
			//{'id':'0','name':""},
			{'id':'1','name':"不限"},
			{'id':'2','name':"150+"},
			{'id':'3','name':"155+"},
			{'id':'4','name':"160+"},
			{'id':'5','name':"165+"},
			{'id':'6','name':"168+"},
			{'id':'7','name':"170+"},
			{'id':'8','name':"173+"},
			{'id':'9','name':"175+"},
			{'id':'10','name':"178+"},
			{'id':'11','name':"180+"},
			{'id':'12','name':"185+"},

		]
		$scope.u_work=[
			//{'id':'0','name':""},

			{'id':'1','name':"企业单位"},
			{'id':'2','name':"事业单位"},
			{'id':'3','name':"机关单位"},
			{'id':'4','name':"社会团体"},
			{'id':'5','name':"创业"},
			{'id':'6','name':"个体"},
			{'id':'7','name':"其他"},
		]
		$scope.u_work2=[
			//{'id':'0','name':""},
			{'id':'1','name':"不限"},
			{'id':'2','name':"企业单位"},
			{'id':'3','name':"事业单位"},
			{'id':'4','name':"机关单位"},
			{'id':'5','name':"社会团体"},
			{'id':'6','name':"创业"},
			{'id':'7','name':"个体"},
			{'id':'8','name':"其他"},
		]

		$scope.u_positions=['北京','上海','天津','重庆','广东','福建','湖北','湖南','河北','河南','山西','陕西','江苏','浙江','安徽','江西','山东','辽宁','吉林','黑龙江',
			'四川','贵州','云南','西藏','甘肃','青海','宁夏','新疆','内蒙古','广西','海南','香港','澳门','台湾']
		$scope.u_positions2=['不限','北京','上海','天津','重庆','广东','福建','湖北','湖南','河北','河南','山西','陕西','江苏','浙江','安徽','江西','山东','辽宁','吉林','黑龙江',
			'四川','贵州','云南','西藏','甘肃','青海','宁夏','新疆','内蒙古','广西','海南','香港','澳门','台湾']
		$scope.religionList=['无宗教信仰','道教','儒教', '大乘佛教显宗', '大乘佛教密宗','小乘佛教', '犹太教','基督教天主教派 ', '基督教东正教派', '天主教 ','基督教新教派','伊斯兰教什叶派','伊斯兰教逊尼派','印度教','神道教','萨满教','其他宗教信仰']
		$scope.religionList2=['不限','无宗教信仰','道教','儒教', '大乘佛教显宗', '大乘佛教密宗','小乘佛教', '犹太教','基督教天主教派 ', '基督教东正教派', '天主教 ','基督教新教派','伊斯兰教什叶派','伊斯兰教逊尼派','印度教','神道教','萨满教','其他宗教信仰']

		$scope.dayList=[
			{'id':2019,'name':'不限'}
		]

		for(var i=2018;i>=1900;i--)
		{
			var day={'id':i,'name':i}
			$scope.dayList.push(day)
		}
		
		$scope.dayList.push(
		{'id':0,'name':'不限'}
		)
		
	





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
                        $scope.datalist.u_idCardImg0=data.fullImgUrl;
                        //console.log( $scope.datalist.idCardImg0)

                    }else if(data.code==510){
                        layer.close($rootScope.li);
                        $window.localStorage.setItem("token","");
                        $window.localStorage.setItem("uid","");
                        $state.go("login");
                    }else{
                        layer.close($rootScope.li);
                        // $scope.re[0]=false;
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
                        $scope.datalist.u_idCardImg1=data.fullImgUrl;

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
                        $scope.datalist.u_academicImg=data.fullImgUrl;

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
                        $scope.datalist.u_workerImg=data.fullImgUrl;

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


		


		$scope.saveHeader=function(file){

			$rootScope.li= layer.open({
			     type: 2
			    ,content: '上传中'
			});
			$scope.upload = $upload.upload({
	            url: 'http://api.jdhn.top/home/member/uploadfile?type=portrait', //上传的url
	            method: 'POST',
	            file: file, // or list of files ($files) for html5 only
	        }).progress(function(evt) {//上传进度


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
										    content: data.message
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
					    content: data.message
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
	       			}

	        }).error(function(data, status, headers, config) {
	            //失败处理函数
	            //console.log('上传失败');
	        });
  	    }
      	
      	if($scope.txt==null||$scope.txt==""){
      		$scope.hometxt=true;	
      			$scope.txt="请填写个人简介"
      	}
      	
      	$scope.homepage=function(e){
      		if(e.keyCode==13){
      			$scope.ishow=false;	
      			$scope.hometxt=true;
      		}
      	}
      	
      	$scope.homepagetxt=function(){
      		$scope.ishow=true;	
      		$scope.hometxt=false;
      		
      	}
      	

		//封面上传
		$scope.saveCover=function(file){

			$rootScope.li= layer.open({
				type: 2
				,content: '上传中'
			});

			$scope.upload = $upload.upload({
				url: 'http://api.jdhn.top/home/member/uploadfile?type=cover', //上传的url
				// url: 'http://manage.deerlove.top/home/member/uploadfile?type=cover', //上传的url
				method: 'post',
				file: file, // or list of files ($files) for html5 only
			}).progress(function(evt) {//上传进度


			}).success(function(data, status, headers, config) {
				//console.log(data)
				if(data.code==1){
					layer.close($rootScope.li);
					$scope.datalist.u_cover=data.fullImgUrl;

					$.ajax({
						type:"POST",
						url:"http://api.jdhn.top/home/member/saveCover",/*url写异域的请求地址*/
						data: {"cover":data.fullImgUrl,"u_id":$scope.uid,"token":$scope.token},
						success:function(result){
							//console.log(result)
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

				}
				else if(data.code==510){
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
						content: "上传失败，图片过大"
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					});
				}


			}).error(function(data, status, headers, config) {
				//失败处理函数
				layer.close($rootScope.li);
				layer.open({
					content: "网速太差，亲！"
					,skin: 'msg'
					,time: 2 //2秒后自动关闭
				});
			});
		}

		//		相册上传
		$scope.saveImgone=function(file,l){
			//console.log(file)


			$rootScope.li= layer.open({
			     type: 2
			    ,content: '上传中'
			});

			$scope.upload = $upload.upload({
	            url: 'http://api.jdhn.top/home/member/uploadfile?type=person', //上传的url
	            method: 'POST',
	            file: file, // or list of files ($files) for html5 only
	        }).progress(function(evt) {//上传进度
				
	            
	        }).success(function(data, status, headers, config) {
	        	if(data.code==1){
	        		layer.close($rootScope.li);
	        		if($scope.imglength>3){
	        			layer.open({
						    content:"最多上传4张照片！"
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						 });
						return false; 
	        		}
	        		$scope.imgae.push(data.fullImgUrl);
	        		$scope.imglength=$scope.imgae.length;
					//console.log($scope.imglength)
						if($scope.imglength>3)
						{

								$scope.showupload=false;

						}

						else
							$scope.showupload=true;







					$.ajax({
						type:"POST",
						url:"http://api.jdhn.top/home/member/saveImg",/*url写异域的请求地址*/
						data: {"img":$scope.imgae.join(","),"u_id":$scope.uid,"token":$scope.token},
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
	        		
	        	}
				else if(data.code==510){
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
					    content: "上传失败，图片过大"
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
	       			}
	        	
				
	        }).error(function(data, status, headers, config) {
	            //失败处理函数
	           layer.close($rootScope.li);
   			  layer.open({
			    content: "网速太差，亲！"
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
			  });
	        });
  	    }  
  	    
  	    $scope.isfixed=false;
  	    $scope.imagesList=function(arr,i){

  	    	$scope.imgaes=arr;
  	    	$scope.indexs=i;
  	    	$scope.isfixed=true;
			//console.log($scope.imgaes)
			//console.log($scope.indexs)
  	    }
  	    
  	    $scope.close1=function(){
  	    	$scope.isfixed=false;
  	    }
  	    
		//		删除图片
		$scope.close=function(event,index){

			$scope.showupload=true;
			$scope.imglength--;
			 //event.stopPropagation();
			 //event.preventDefault()
			$scope.imgae.splice(index,1);
			$scope.imgone=$scope.imgae
			$.ajax({
			type:"POST",
			url:"http://api.jdhn.top/home/member/saveImg",/*url写异域的请求地址*/
			data: {"img":$scope.imgone.join(","),"u_id":$scope.uid,"token":$scope.token},
			success:function(result){
				var data=JSON.parse(result)
				if(data.code==1){
						layer.open({
							content:"删除成功"
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
			
		}
  	    
  	    
		$scope.education=function(v){
  	    	if(v=="11"){
  	    		return "未填写"
  	    	}else if(v=="15"){
  	    		return "学士"
  	    	}else if(v=="16"){
  	    		return "硕士"
  	    	}else if(v=="17"){
  	    		return "博士"
  	    	}
  	    }


  	    $scope.isOnly=function (v) {
  	    	if(v=='0')
               return '未填写'
            if(v=='1')
                return '是'
            if(v=='2')
                return '不是'

        }
  	    
  	  	$scope.nims=function(v){
  	    	if(v=="" || v==null || v==0){
  	    		return ""
  	    	}else{
  	    		return v
  	    	}
  	    }
  	    
  	    $scope.room=function(v){
  	    	if(v=='1'){
  	    		return "已购房";
  	    	}else{
  	    		return "未购房";
  	    	}
  	  	}
  	    
  	    $scope.vehicle=function(v){
  	    	if(v=='1'){
  	    		return "已购车";
  	    	}else{
  	    		return "未购车";
  	    	}
  	  	}
      	
      	$scope.incomelevel=function(v){
      		if(v=="31"){
      			return "未填写";
      		}else if(v=="32"){
      			return "10万以下";
      		}else if(v=="33"){
      			return "10万以上";
      		}else if(v=="34"){
      			return "20万以上";
      		}else if(v=="35"){
      			return "30万以上";
      		}
      	}
  	    
  	    
  	    $scope.sexNames=function(v){
  	    	if(v=='1'){
  	    		return "未填写";
  	    	}else if(v=='2'){
  	    		return "男";
  	    	}else if(v=="3"){
  	    		return "女";
  	    	}
  	  	}
  	    
	    $scope.marriagelist=function(v){
	    	if(v=='0'){
	    		return "未填写";
	    	}else if(v=='1'){
	    		return "未婚(单身)";
	    	}else if(v=="2"){
	    		return "离异(单身)";
	    	}else if(v=="3"){
	    		return "丧偶(单身)";
	    	}
			else if(v=="4"){
	    		return "恋爱中";
	    	}else if(v=="5"){
	    		return "已婚";
	    	}
	    }
  	    
  	    
  	    $scope.childrenlist=function(v){
	    	if(v=='0'){
	    		return "未填写";
	    	}else if(v=='1'){
	    		return "有（归自己）";
	    	}else if(v=="2"){
	    		return "有（归对方）";
	    	}else if(v=="3"){
	    		return "无子女";
	    	}else if(v=="4"){
	    		return "有";
	    	}
  	    }
  	    
  	    $scope.religion=function(v){
  	    	if(v==""){
  	    		return "无宗教";
  	    	}else{
  	    		return v;
  	    	}
  	    }
		
		 $scope.youku=function(){
  	    	layer.open({
			    content: "优库正在装修，请耐心等待！"
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
			  });
  	    }
		
    }





	
})();

