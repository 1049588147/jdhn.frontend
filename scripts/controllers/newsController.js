(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('newsControl', newsControl)

    newsControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function newsControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
		$rootScope.title = $state.$current.data.pageTitle;
		$scope.isshowgd=false;
		$scope.loadMoresss=true;
      	
		$scope.message=0;
		$scope.token=$window.localStorage.getItem("token");
		$scope.uid=$window.localStorage.getItem("uid")
		if($scope.token==""||$scope.token==null){
			$state.go("login");
			return;
		}else if($scope.uid==""||$scope.uid==null){
			$state.go("login");
			return;
		}
		
		$scope.numstotal=false;
		$scope.numsuser=false;
		$scope.numssys=false;
		$scope.newslist=function(){
			$rootScope.li= layer.open({
				type: 2
				,content: '加载中'
			});
			var newUrl='http://api.jdhn.top/home/message/nums?callback=JSON_CALLBACK&uid='+$scope.uid+"&token="+$scope.token;
			$http.jsonp(newUrl).success(function(result){
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
					if(result.code==1){
						$scope.newcode=result.num
						if(result.num.total==0){
							$scope.numstotal=false;
							return;
						}else{
							$scope.numstotal=true;
							$scope.numtotal=result.num.total;
						}
						if($scope.newcode.user>0){
							$scope.numsuser=true;
						}else{
							$scope.numsuser=false;
						}
						
						if($scope.newcode.sys>0){
							$scope.numssys=true;
						}else{
							$scope.numssys=false;
						}
					}
			})
		}
		$scope.systemMessage=function(){
			$scope.message=0;
			$scope.system=true;
			$scope.myNews=false;
			$rootScope.li= layer.open({
				type: 2
				,content: '加载中'
			});
			var url='http://api.jdhn.top/home/message/mymessage?callback=JSON_CALLBACK&uid='+$scope.uid+"&token="+$scope.token
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
				if(result.code==1){
					$scope.systemMessagelist=result.data;
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
			
		}
		
		$scope.myMessage=function(){
			$scope.message=1;
			$scope.system=false;
			$scope.myNews=true;
			$rootScope.li= layer.open({
				type: 2
				,content: '加载中'
			});
			var url='http://api.jdhn.top/home/message/mymessage?callback=JSON_CALLBACK&uid='+$scope.uid+"&token="+$scope.token
			$http.jsonp(url).success(function(result){
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
				if(result.code==1){
					$scope.list=result.data
				}else if(result.code==510){
					$state.go("login")
				}else{
					layer.open({
					    content: data.message
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					});
				}
					
			})
		}
		
		$scope.newsClick=function(i,l){
			layer.open({
			    content: i
			    ,btn: '我知道了'
			});
			var newUrl='http://api.jdhn.top/home/message/updatemsg?callback=JSON_CALLBACK&msgid='+l.mid+"&token="+$scope.token
			if(l.mstate=='292'){
				$http.jsonp(newUrl).success(function(data){
					if(data.code==1){
						l.mstate='293';
						$scope.newslist()
					}
				})
			}
//			
		}
		$scope.newsClickone=function(i,l){
	
			layer.open({
			    content: i
			    ,btn: '我知道了'
			  });
			  
			var newUrl='http://api.jdhn.top/home/message/updatemsg?callback=JSON_CALLBACK&msgid='+l.mid+"&token="+$scope.token
			if(l.mstate=='292'){
				$http.jsonp(newUrl).success(function(data){
					if(data.code==1){
						l.mstate='293';
						$scope.newslist()
					}
				})
			}
		}
		
		$scope.myMessage();
		$scope.newslist()


		//我的消息
		var s=1;
		$scope.myMsg=function()
		{
			$rootScope.li= layer.open({
				type: 2
				,content: '加载中'
			});
			var url='http://api.jdhn.top/home/ustore/msgList?callback=JSON_CALLBACK&token='+$scope.token+'&uid='+$scope.uid+'&page='+s;
			$http.jsonp(url).success(function(result)
			{
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

				$scope.msgList=result.data;
                $scope.myMsgTotal=result.total;
				if( $scope.myMsgTotal/5 >s)
					$scope.isshowgd=true;

				for(var i=0;i<$scope.msgList.length;i++)
				{
					if($scope.msgList[i].num==0)
						$scope.msgList[i].num='';
					if($scope.msgList[i].num>99)
						$scope.msgList[i].num='99+';
					if($scope.msgList[i].state==0)
					   $scope.msgList[i].say='回复了您的消息~'
					if($scope.msgList[i].state==1)
						$scope.msgList[i].say='在跟你打招呼哦~~'

					if($scope.msgList[i].unread>0)
				{
					$scope.msgList[i].myNewsClass='new-list-unread'

				}
				else
				{
					$scope.msgList[i].myNewsClass='new-list-read'
				}

				}


			})


		}

		//加载更多
		$scope.loadMore=function()
		{


			s++;
			if( $scope.myMsgTotal/5 >s)
				$scope.isshowgd=true;
			else
				$scope.isshowgd=false;

			var url='http://api.jdhn.top/home/ustore/msgList?callback=JSON_CALLBACK&token='+$scope.token+'&uid='+$scope.uid+'&page='+s;
			$http.jsonp(url).success(function(result)
			{
				//console.log(result)

				if(result.data)
				{
					if(result.data.length==0)
						$scope.loadMoresss=false;
					else
					{
						$scope.msgList=$scope.msgList.concat(result.data)
						for(var i=0;i<$scope.msgList.length;i++)
						{
							if($scope.msgList[i].num==0)
								$scope.msgList[i].num='';
							if($scope.msgList[i].num>99)
								$scope.msgList[i].num='99+';
							if($scope.msgList[i].state==0)
								$scope.msgList[i].say='回复了您的消息~'
							if($scope.msgList[i].state==1)
								$scope.msgList[i].say='在跟你打招呼哦~~'


							if($scope.msgList[i].unread>0)
							{
								$scope.msgList[i].myNewsClass='new-list-unread'

							}
							else
							{
								$scope.msgList[i].myNewsClass='new-list-read'
							}


						}
						$timeout(function(){
							$scope.$broadcast('scroll.infiniteScrollComplete');
							$scope.loading=false;
						},1000);




					}


				}


			})





		}


		//点击进入聊天详情页
		$scope.gochatDetails=function(item)
		{
			//console.log(item)
			localStorage.setItem('chatDetails_id',item.id);
			if(item.uid==$scope.uid)
				localStorage.setItem('target_uid',item.accept_uid);
			else
				localStorage.setItem('target_uid',item.uid);


			$state.go('chatDetails')
			//$window.location.href='http://www.jdhn.top/jdhn.frontend/index.html#/chatDetails'
		}




		$scope.myMsg();



    }
	
	
})();

