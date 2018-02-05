(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('detalisControl', detalisControl)

    detalisControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','detalisService','$stateParams','$ionicSlideBoxDelegate','$timeout'];

    function detalisControl($scope, $rootScope, $state, $timeventRegistrationClickeout, $window, $location, $http,detalisService,$stateParams,$ionicSlideBoxDelegate,$timeout) {
		
		 $rootScope.title = $state.$current.data.pageTitle;
		 $scope.activity_id = $window.localStorage.getItem("activity_id");
		 $scope.uid = $window.localStorage.getItem("uid");
		 $scope.token=$window.localStorage.getItem("token");
		 $scope.is=$window.localStorage.getItem("is");
		 $scope.refund_motai=false;
		 $scope.fees="";
        $scope.isselect2=false;

        //留言加载更多开始
        $scope.loadMoresss=true;
        $scope.data=false;
        $scope.leavingMessage=[]

        var s=1;

        $scope.loadMore=function(){

            $scope.loading=true;
            $scope.data=false;
            s++;
            var url="http://api.jdhn.top/home/index/bbs?callback=JSON_CALLBACK&token="+$scope.token+"&act_id="+$scope.activity_id+"&page="+s;/*url写异域的请求地址*/
            $http.jsonp(url).success(function(result){
                if(result.code==1){
                    if($scope.leavingMessage.length==result.total){
                        $scope.loadMoresss=false;
                        $scope.loading=false;
                    }
                    if(result.total==0){
                        $scope.data=true;
                    }
                    if(s==1){
                        $scope.leavingMessage=result.data;
                        if(result.data.length<5){
                            $scope.loadMoresss=false;
                            $scope.loading=false;
                            return;
                        }
                    }else{
                        $scope.leavingMessage=$scope.leavingMessage.concat(result.data) ;
                        $scope.data=false;
                    }


                    if($scope.leavingMessage.length==result.total)
                    	$scope.isselect2=false;


                }else if(result.code==510){
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
                        content:"没有更多数据"
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                    $scope.loadMoresss=false;
                    $scope.loading=false;
                    return false;

                }
                $timeout(function(){
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.loading=false;
                },1000);
            })



        }



        //留言加载更多结束





        var fenxiangurl=$window.location.href.split("#")[0]
		$scope.urlgo=function(t){
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
			
				
			t=''	
			var shareTitle = t;  
			var shareDesc = t;  
			var shareImg = "http://www.jdhn.top/img/sign.jpg";  
			var url = "http://www.jdhn.top/publishingactivities.html?activity_id="+$scope.activity_id;  
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
		
		 $scope.list={}
		 $scope.isslect=false;
		 $scope.isShow=false;
		 $scope.sex=false;
		 $scope.complete=false;
		 $scope.benotin=false;
		 $scope.init=function(){

             $rootScope.li= layer.open({
				     type: 2
				    ,content: '加载中'
				  });

			 	var promise = detalisService.detalis({"activity_id":$scope.activity_id,"uid":$scope.uid,"token":$scope.token});
				promise.then(function (result) {
                    console.log(result)
		        	if(result.code==1){
		        		layer.close($rootScope.li);
		        		$scope.numstate=result.numstate;
		        	 	$scope.state=result.state;
		        	 	$scope.list=result.data;
		        	 	//$scope.list.actm_num=result.comNum;
		        	 	if(result.comNum>5)
		        	 		$scope.isselect2=true;

		        	 	$window.localStorage.setItem("enroll_id",$scope.list.enroll_id);
						$scope.urlgo($scope.list.title);

		        	 	if(result.vip==''||result.vip==null){
		        	 		$scope.fees=$scope.list.price_show
		        	 	}else{
		        	 		$scope.fees=$scope.list.act_lovePrice
		        	 	}

						//dick写的
						// $scope.list.enroll_state='276'
		    
		        	 	if($scope.list.enroll_state=='276'){
		        	 		$scope.complete=true;
		        	 	}else{
		        	 		$scope.complete=false;
		        	 		if($scope.list.date_state==510){
		        	 			$scope.benotin=true;
		        	 		}else{
		        	 			$scope.benotin=false;
		        	 			if($scope.state==''||$scope.state==null){
				        	 		if($scope.numstate=='22'){
				        	 			$scope.nu="男生报名人数已满";
				        	 			$scope.sex=true;
				        	 		}else if($scope.numstate=='33'){
				        	 			$scope.nu="女生报名人数已满";
				        	 			$scope.sex=true;
				        	 		}
				        	 	}else if($scope.state=='max'){
				        	 		$scope.nu="报名人数已满";
				        	 		$scope.sex=true;
				        	 	}
		        	 		}
		        	 	}
						
						
						
						//我写的
						// if($scope.list.date_state==510)
						// {
							// $scope.benotin=true;
						// }
						// else
						// {
							// $scope.benotin=false;
							// if($scope.state=''||$scope.state==null){
								// if($scope.state=='max'){
								 		// $scope.nu="报名人数已满";
								 		// $scope.sex=true;
								// }
								 		// else if($scope.numstate=='22'){
								 			// $scope.nu="男生报名人数已满";
								 			// $scope.sex=true;
								 		// }else if($scope.numstate=='33'){
								 			// $scope.nu="女生报名人数已满";
								 			// $scope.sex=true;
								 		// }
								 	// }
							
						
							// else {
								// if($scope.list.enroll_state=='276'){
									// $scope.complete=true;
								// }else{
									// $scope.complete=false;
								// }
							// }
						// }
						
						
						
						
		        	 	$scope.flags=result.flag;
		        	 	$scope.li = JSON.parse($scope.list.photos)
		        	 	$ionicSlideBoxDelegate.update();
		        	 	$ionicSlideBoxDelegate.loop(true);
		        	 	$scope.enrollInfo=result.enrollInfo;

		        	 	$scope.open=result.actComment;


                        var url="http://api.jdhn.top/home/index/bbs?callback=JSON_CALLBACK&token="+$scope.token+"&act_id="+$scope.activity_id+"&page="+1;/*url写异域的请求地址*/
                        $(".iframe_list").append(result.data.richTextHtml)
                        $http.jsonp(url).success(function (result) {

							if(result.code==1){
                                console.log(result.total)
								$scope.list.actm_num=result.total;
								if(result.total>5)
									$scope.isselect2=true;
                                $scope.leavingMessageAll=result.data;

                                if(result.data.length>=5)
                                {
                                    $scope.leavingMessage=$scope.leavingMessageAll.slice(0,5);
                                }
                                else
                                {
                                    $scope.leavingMessage=result.data;

                                }

							}
							if(result.code==0)
							{
                                $scope.list.actm_num=0;
							}

                        })

		        	}else if(result.code==510){
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
						    content: "查询失败！"
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						  });
						return;
		        	}
		       var srcurl="http://api.jdhn.top/home/index/getEnroller?activity_id="+ $scope.activity_id

		       $http.get(srcurl).success(function(data,status,headers,config){
		       		if(data.code==1){
		       			$scope.numlist=data.num;
		       			$scope.enrollInfo=data.data;
						$scope.signup=data.data.splice(0, 19);
		        	 	if($scope.enrollInfo.length<=19){
		        	 		 $scope.isslect=false;
		        	 	}else{
		        	 		$scope.isslect=true;
		        	 	}
		       		}else{
		       			layer.open({
						    content: "查询失败！"
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						  });
						return;
		       		}
				}).error(function(data,status,headers,config){

				})



			});
		 }

//    	图片过滤器
      	$scope.imgurl=function(v){
      		if(v==""){
      			return "img/beike.png"
      		}else{
      			return v
      		}
      	}

      	//		更多点击事件
      	$scope.moreClick=function(){
      		$scope.signup=$scope.enrollInfo;
      		$scope.isslect=false;
      	}
      	
      	
      	$scope.eventRegistrationClick=function($event){

      		if($scope.flags=="yes"){
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


      		var url='http://api.jdhn.top/home/index/enlistinfo?callback=JSON_CALLBACK&uid='+$scope.uid+"&activity_id="+$scope.activity_id+"&token="+$scope.token
               $http.jsonp(url).success(function(result){

					if(result.code==1){
						$state.go("eventRegistration",{activity_id:$scope.activity_id,uid:$scope.uid})
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
						return;
					}
				})
      	}
      	
      	$scope.leavingmessage_btn=function(){
      		if($scope.leavingmessagemoder==""|| $scope.leavingmessagemoder==null){
      			layer.open({
				    content:"留言为空"
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				  });
				  return;
      		}

            var w=layer.open({
                type: 2
                ,content: '加载中'

            });

            $('.leavingmessage-btn').attr('ng-click','null');



            $.ajax({
					type:"POST",
					url:"http://api.jdhn.top/home/index/subactm",/*url写异域的请求地址*/
					data:{"uid":$scope.uid,"activity_id":$scope.activity_id,"comment":$scope.leavingmessagemoder,"token":$scope.token},
						success:function(result){



							var data = JSON.parse(result)
							if(data.code==1){
								$scope.leavingmessagemoder="";
								// $scope.init();

                                layer.close(w)

                                $('.leavingmessage-btn').attr('ng-click','leavingmessage_btn()');


                                var url="http://api.jdhn.top/home/index/bbs?callback=JSON_CALLBACK&token="+$scope.token+"&act_id="+$scope.activity_id+"&page="+1;/*url写异域的请求地址*/
								$http.jsonp(url).success(function (result) {
									$scope.leavingMessage=result.data;
									$scope.list.actm_num=result.total;
									s=1;
                                    if(result.total>5)
                                       $scope.isselect2=true;


                                })


								layer.open({
								    content:data.message
								    ,skin: 'msg'
								    ,time: 2 //2秒后自动关闭
								});
								$timeout(function(){
									$('.content').animate({ scrollTop: $('.content')[0].scrollHeight}, 100);
								},1000)
							 }else if(result.code==510){
								 $window.localStorage.setItem("token","");
							     $window.localStorage.setItem("uid","");
								$state.go("login");
							}else{
							 	layer.open({
								    content:data.message
								    ,skin: 'msg'
								    ,time: 2 //2秒后自动关闭
								  });
							 }
						}
				});


        }    	
//      支付
		var wxpay='';
        $scope.payment=function(){
        	var w=layer.open({
				type: 5
				,content: '加载中'
			});
        	$.ajax({
					type:"POST",
					url:"http://api.jdhn.top/home/wxpay/index",/*url写异域的请求地址*/
					data:{"uid":$scope.uid,"activity_id":$scope.activity_id,"token":$scope.token,"fee":$scope.fees,'enroll_id':$scope.list.enroll_id},
						success:function(result){
							var data = JSON.parse(result);
							if(data.code==1){
								wxpay = data.data;
								layer.close(w)
								$scope.callpay();
							}else if(result.code==510){
								 layer.close(w)
								 $window.localStorage.setItem("token","");	
							     $window.localStorage.setItem("uid","");	
								 $state.go("login");
								
							}else{
								layer.close(w)
								layer.open({
								    content:data.message
								    ,skin: 'msg'
								    ,time: 2 //2秒后自动关闭
								});
							}
						}
				});
        }
        
        
        $scope.jsApiCall=function()
        {
        	
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
               {
					'appId':wxpay.appId,
					'nonceStr':wxpay.nonceStr,
					'package':wxpay.package,
					'paySign':wxpay.paySign,
					'signType':wxpay.signType,
					'timeStamp':wxpay.timeStamp,
					//'total_fee':wxpay.total_fee,
				},
                function(res){
                  
                    // alert(res.err_code+res.err_desc+res.err_msg);
                    if(res.err_msg == 'get_brand_wcpay_request:fail' || res.err_msg == 'get_brand_wcpay_request:cancel') {
                    		layer.open({
							    content:"支付失败，请重新支付"
							    ,skin: 'msg'
							    ,time: 2 //2秒后自动关闭
							});
							return;
					}else{
						$.ajax({
							url:'http://api.jdhn.top/home/member/getordstate',
							data:{"uid":$scope.uid,"activity_id":$scope.activity_id,"token":$scope.token},
							type:'post',
							success:function(res) {
								var data = JSON.parse(res);
								if(data.code == 1) {
									layer.open({
									    content:"支付成功"
									    ,skin: 'msg'
									    ,time: 2 //2秒后自动关闭
									});
									window.location.reload()
								}else if(result.code==510){
									 $window.localStorage.setItem("token","");	
								     $window.localStorage.setItem("uid","");	
									$state.go("login");
								}else{
									layer.open({
									    content:"支付失败，请重新支付"
									    ,skin: 'msg'
									    ,time: 2 //2秒后自动关闭
									});
								}
							}
						
						});
					}

                }
            );
        }

         $scope.callpay=function()
        {
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', $scope.jsApiCall, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', $scope.jsApiCall); 
                    document.attachEvent('onWeixinJSBridgeReady', $scope.jsApiCall);
                }
            }else{
                $scope.jsApiCall();
            }
        }
        
        $scope.orcmnum=function(){
        	$state.go("evaluationdisplay")
        }
        
        
           if($scope.activity_id==74)
			{
				$scope.refund=function(){
					layer.open({
						content: '【退费注意事项】<div>1、如果在活动开始前48小时以外，发现自己不能来参加活动了，可以在报名系统自主选择退款，我们只收取3元手续费。</div><div>2、如果在活动开始前48小时之内、活动开始前36小时以外要退出活动，我们将退还50%的费用。</div><div>3、活动开始前36个小时之内告知无法参加活动者，我们概不退款哦。因为那个时候我们已经准备好活动所需要的所有物资了，请知晓。</div><div><laber style="color:red;margin-top:5px;display:block;">4.退款理由(必填)</laber></div><textarea class="input-txt" style="width:100%;border:1px solid #ccc;height:58px;padding:5px"></textarea>'
						,btn: ['确定', '关闭']
						,yes: function(index){
							$scope.refundzhifu()
							layer.close(index);
						}
					});
				}

			}
			else if($scope.activity_id==96)
			{
				$scope.refund=function(){
					layer.open({
							content: '【退费注意事项】<div>1、如果在1月23号23:59之前,发现自己不能来参加活动了，可以在报名系统自主选择退款，我们只收取3元手续费。</div><div>2、如果在1月24号23:59分之前退出活动,我们将退还50%的费用。</div><div>3、如果在1月25号00:00以后决定不参加活动，我们概不退款哦。因为那个时候我们已经准备好活动所需要的所有物资了，请知晓。</div><div><laber style="color:red;margin-top:5px;display:block;">4.退款理由(必填)</laber></div><textarea class="input-txt" style="width:100%;border:1px solid #ccc;height:58px;padding:5px"></textarea>'
							,btn: ['确定', '关闭']
							,yes: function(index){
								$scope.refundzhifu()
								layer.close(index);
							}
						});
				}
				
			}
		
			else
			 {
				$scope.refund=function(){
					layer.open({
						content: '【退费注意事项】<div>1、活动开始前24小时以外取消活动，仅收取3元手续费；</div><div>2、活动开始前24小时之内、活动开始前6小时以外申请取消活动，我们将退还50%的费用；</div><div>3、活动开始前6个小时之内申请取消，我们概不退款哦。因为那个时候我们已经准备好活动所需要的所有物资了，请知晓。确定退款吗？</div><div><laber style="color:red;margin-top:5px;display:block;">4.退款理由(必填)</laber></div><textarea class="input-txt" style="width:100%;border:1px solid #ccc;height:58px;padding:5px"></textarea>'
						,btn: ['确定', '关闭']
						,yes: function(index){
							$scope.refundzhifu()
							layer.close(index);
						}
					});
				}

			 }
        
		
		$scope.refundzhifu=function(){
		var t =	$(".input-txt").val();
		if(t==""||t==null){
			layer.open({
			    content:"请填写退款理由！"
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
			});
			return;
		 }
			var re=layer.open({
				type: 5
				,content: '退款中,请稍后！'
			});
			$.ajax({
				url:'http://api.jdhn.top/home/refund',
				data:{"uid":$scope.uid,"act_id":$scope.activity_id,"token":$scope.token,'enroll_id':$scope.list.enroll_id,'txt':t},
				type:'post',
				success:function(res) {
					var data = JSON.parse(res);
					if(data.code == 1) {
						layer.close(re)
						$scope.refund_motai=true;
						$scope.init()
					}else if(data.code==510){
						layer.close(re)
						 $window.localStorage.setItem("token","");	
					     $window.localStorage.setItem("uid","");	
						$state.go("login");
					}else if(data.code==100){
						layer.close(re)
						layer.open({
						    content:data.message
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						});
					}else{
						layer.close(re)
						layer.open({
						    content:"退款失败，请联系客服"
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						});
					}
				}
			});
		}
        
        $scope.loveImg=function(){
		
			$window.location.href="https://mp.weixin.qq.com/s?__biz=MzA3NzM5MzkwNQ==&mid=2650104069&idx=5&sn=9ab5a00bf6f94fe395e2fd5afbeefa8a&chksm=87537b9bb024f28d40135967551d9ccfee4806db604487c4815d061c0b2e92e4a43eb71271c9#rd"
		}
        
        $scope.refund_close=function(){
			$scope.refund_motai=false;
		}
        
        
        $scope.elected=function(){
			console.log()
			if($scope.list.ele_state=="1"){
				$window.location.href="listsounds.html"
			}else{
				$window.location.href="echocardiography.html";
			}  	
        }
        
        
		$scope.init()
    }
	
	
})();
