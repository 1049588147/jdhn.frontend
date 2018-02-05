(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('whoLoveMeControl', whoLoveMeControl)

    whoLoveMeControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function whoLoveMeControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
        $rootScope.title = $state.$current.data.pageTitle;
        $scope.activity_id = $window.localStorage.getItem("activity_id");
        $scope.uid = $window.localStorage.getItem("uid");
        $scope.token=$window.localStorage.getItem("token");
        $scope.target_uid=$window.localStorage.getItem("target_uid");
        $scope.is=$window.localStorage.getItem("is");
        $scope.search='';
        $scope.type='';
        $scope.sendSrc='img/sendBlue.png'
        $scope.getSrc='img/getGrey.png'
		
		
		
		



        if($scope.token==""||$scope.token==null){
            $state.go("login");
            return;
        }else if($scope.uid==""||$scope.uid==null){
            $state.go("login");
            return;
        }

		
		//点击头像
		
		$scope.toDetail=function(id){
			//console.log(id)
			 localStorage.setItem('target_uid',id)
	
			 
			 var url='http://api.jdhn.top/home/ustore/judge?callback=JSON_CALLBACK&token='+$scope.token+'&uid='+$scope.uid;
             $http.jsonp(url).success(function(result){
                 //console.log(result)
                 if(result.code==1){
                    $state.go('memberDetail');
                    return;
                 
                 }
				 else
				 {
								layer.open({
				content:'请先100%完善个人资料',
				skin:'msg',
				time:1.5
			})
			
		
             $timeout(function()
			{
               
				// $state.go('MyFile')
				// $window.location.href='http://www.jdhn.top/jdhn/#/MyFile'
				$window.location.href='http://www.jdhn.top/#/MyFile'
				},2000)
					 
					 
					 
				 }
				





             })

			
			
			
			
			
			
		}
		
		
		

        var url="http://api.jdhn.top/home/ustore/point?callback=JSON_CALLBACK&token="+$scope.token+"&uid="+$scope.uid+"&page=0&key="+$scope.search+"&type="+$scope.other;
        $rootScope.li= layer.open({
            type: 2
            ,content: '加载中'
        });


        $http.jsonp(url).success(function (result) {
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
            $scope.Touches=result.data;
			
			if($scope.Touches.length>0)
			{
				
				$('#TimeForBottom').css('height','1.5rem')
			}
				
			else
			{
				
				$scope.TimeForBottom=false;
				$('#TimeForBottom').css('height','0rem')
			}
				
			
					
            if( result.cover==null || result.cover=='')
                $scope.cover='img/u_cover.jpg'
            else
                $scope.cover=result.cover





        })


        $scope.changeType=function () {
            $scope.type=''
            $scope.search=''
            $rootScope.li= layer.open({
                type: 2
                ,content: '切换中'
            });
            var url="http://api.jdhn.top/home/ustore/point?callback=JSON_CALLBACK&token="+$scope.token+"&uid="+$scope.uid+"&page=0&key="+$scope.search;
            $http.jsonp(url).success(function (result) {
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
                $scope.Touches = result.data;
				
				if($scope.Touches.length>0)
			{
				
				$('#TimeForBottom').css('height','1.5rem')
			}
				
			else
			{
				
				$scope.TimeForBottom=false;
				$('#TimeForBottom').css('height','0rem')
			}
				
					
					
                $scope.sendSrc='img/sendBlue.png'
                $scope.getSrc='img/getGrey.png'


            })

        }


        $scope.changeTypeOther=function () {
                $scope.type='other';
                $scope.search=''
            $rootScope.li= layer.open({
                type: 2
                ,content: '切换中'
            });

            var url="http://api.jdhn.top/home/ustore/point?callback=JSON_CALLBACK&token="+$scope.token+"&uid="+$scope.uid+"&page=0&key="+$scope.search+"&type=other";
            $http.jsonp(url).success(function (result) {
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

                $scope.Touches = result.data;
				if($scope.Touches.length>0)
			{
				
				$('#TimeForBottom').css('height','1.5rem')
			}
				
			else
			{
				
				$scope.TimeForBottom=false;
				$('#TimeForBottom').css('height','0rem')
			}
					
					
				
                $scope.sendSrc='img/sendGrey.png'
                $scope.getSrc='img/getBlue.png'


            })




        }


        $scope.seachKey=function () {
            //console.log($scope.type)
            $rootScope.li= layer.open({
                type: 2
                ,content: '搜索中'
            });
            var url="http://api.jdhn.top/home/ustore/point?callback=JSON_CALLBACK&token="+$scope.token+"&uid="+$scope.uid+"&page=0&key="+$scope.search+"&type="+$scope.type;
            $http.jsonp(url).success(function (result) {
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

                $scope.Touches=result.data;
				if($scope.Touches.length>0)
			{
				
				$('#TimeForBottom').css('height','1.5rem')
			}
				
			else
			{
				
				$scope.TimeForBottom=false;
				$('#TimeForBottom').css('height','0rem')
			}
				
					
				




            })




        }










    }


})();