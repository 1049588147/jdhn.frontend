
(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('chatDetailsControl', chatDetailsControl)

    chatDetailsControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','$ionicPopup'];

    function chatDetailsControl($scope, $rootScope, $state, $timeout, $window, $location, $http,$ionicPopup) {
        $rootScope.title = $state.$current.data.pageTitle;
        $scope.uid = $window.localStorage.getItem("uid");
        $scope.token=$window.localStorage.getItem("token");
        $scope.target_uid=$window.localStorage.getItem("target_uid");
        $scope.chatDetails_id=$window.localStorage.getItem("chatDetails_id");
        $scope.ispb=false;
        $scope.myMsg=''
        $scope.loadMoresss=true;



        if($scope.token==""||$scope.token==null){
            $state.go("login");
            return;
        }else if($scope.uid==""||$scope.uid==null){
            $state.go("login");
            return;
        }


        //加载初始化
        $scope.init=function()
        {
            $rootScope.li= layer.open({
                type: 2
                ,content: '加载中'
            });

            var url='http://api.jdhn.top/home/ustore/msgDetail?callback=JSON_CALLBACK&token='+$scope.token+'&uid='+$scope.uid+'&id='+$scope.chatDetails_id;
            $http.jsonp(url).success(function(result)
            {
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

                console.log(result)
                $rootScope.title=result.name;
                $scope.msgs=result.data;
                $scope.page=result.page;
                for(var i=0;i<$scope.msgs.length;i++)
                {
                    if($scope.msgs[i].uid==$scope.uid)
                    {
                        $scope.msgs[i].chats='chat_right';
                        $scope.msgs[i].img1='chat_right_img1'
                        $scope.msgs[i].img2='chat_right_img2'
                        $scope.msgs[i].arrow='img/chat-right.png'
                        $scope.msgs[i].chat_time='chat_time_right'
                        if($scope.msgs[i].msg_state==99)
                        {
                            $scope.msgs[i].msg_state='已读'
                            $scope.msgs[i].isread=true


                        }



                    }

                    else
                    {
                        $scope.msgs[i].chats='chat_left';
                        $scope.msgs[i].img1='chat_left_img1'
                        $scope.msgs[i].img2='chat_left_img2'
                        $scope.msgs[i].arrow='img/chat-left.png'
                        $scope.msgs[i].chat_time='chat_time_left'
                    }

                }
                $scope.msgs= $scope.msgs.reverse()
                //console.log(  $scope.msgs)

                if(result.state==0)
                {
                    $scope.chat_state1=false;
                    $scope.chat_state2=false;
                    $scope.ispb=false;
                }
                if(result.state==1)
                {
                    $scope.chat_state1=true;
                    $scope.chat_state2=false;
                    $scope.ispb=false;
                }
                if(result.state==2)
                {
                    $scope.chat_state1=false;
                    $scope.chat_state2=false;
                    $scope.ispb=true;
                }
                if(result.state==3)
                {
                    $scope.chat_state1=false;
                    $scope.chat_state2=true;
                    $scope.ispb=false;
                }




            })



        }

        $scope.init();



        //点击头像
        $scope.previewInfo=function()
        {
            $state.go('memberDetail')

        }









        //是否屏蔽
        $scope.changeispb=function()
        {
            $rootScope.li= layer.open({
                type: 2
                ,content: '设置中'
            });

            if( $scope.ispb)
            {
                //解除屏蔽
                $scope.ispb=false

                var url='http://api.jdhn.top/home/ustore/outhandle'
                var data={
                    'token':$scope.token,
                    'uid':$scope.uid,
                    'upair_id':$scope.chatDetails_id,

                }

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
                })






            }
            else
            {
                //屏蔽
                $scope.ispb=true
                var url='http://api.jdhn.top/home/ustore/handle'
                var data={
                    'token':$scope.token,
                    'uid':$scope.uid,
                    'upair_id':$scope.chatDetails_id,
                    'status':'3'

                }

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
                })

            }


        }




        //投诉框
        $scope.showPopup = function() {
            $scope.complain = ''

            var myPopup = $ionicPopup.show({
                template: '<input id="complain" type="complain" ng-model="complain">',
                title: '请输入投诉理由：',
                scope: $scope,
                buttons: [
                    { text: 'Cancel'},
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {

                                var url='http://api.jdhn.top/home/ustore/handle'
                                var data={
                                    'token':$scope.token,
                                    'uid':$scope.uid,
                                    'upair_id':$scope.chatDetails_id,
                                    'complain': $('#complain').val(),
                                    'status':'4'
                                }

                                $http({
                                    method:'post',
                                    url:url,
                                    data: $.param(data),
                                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},

                                }).success(function(request){
                                    //console.log(request)
                                })

                        }
                    },
                ]
            });


        };


        //举报
        $scope.chatDetail_jb=function()
        {
            $scope.showPopup();


        }


        //回车发送信息
        $scope.myKeyup=function(e)
        {
            $rootScope.li= layer.open({
                type: 2
                ,content: '发送中'
            });

               var url='http://api.jdhn.top/home/ustore/sendMsg'

                var data={
                    'uid':$scope.uid,
                    'token':$scope.token,
                    'target_uid':$scope.target_uid,
                    'upair_id':$scope.chatDetails_id,
                    'msg':$scope.myMsg
                }
            //console.log(data)

                $http({
                    method:'post',
                    url:url,
                    data: $.param(data),
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},

                }).success(function(request){
                    //console.log(request)
                    //console.log( $scope.msgs)
                    //$scope.msgs= $scope.msgs.push($scope.myMsg)
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
                    $('#myMsg').val('')
                    //console.log(  $scope.msgs)
                    if(request.code==1)
                    {
                        layer.open({
                            content:'发送成功!',
                            skin:'msg',
                            time:2
                        })
                        $timeout(function(){
                            $window.location.reload()

                        },2000)
                        //$window.location.reload()

                    }
                    else
                    {
                        layer.open({
                            content:'对方已关闭聊天通道，无法发送!',
                            skin:'msg',
                            time:2
                        })

                    }







                })








        }



        //加载更多
        var k=0;
        $scope.loadMore=function()
        {
            //console.log('1')
            $timeout(function(){
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },1000);

            if($scope.page>1 && k>0){

                $scope.page--;
                var url='http://api.jdhn.top/home/ustore/msgDetail?callback=JSON_CALLBACK&token='+$scope.token+'&uid='+$scope.uid+'&id='+$scope.chatDetails_id+'&page='+$scope.page;
                $http.jsonp(url).success(function(result)
                {
                    //$rootScope.title=result.name;
                    //console.log(result)
                    //$rootScope.title=result.name;
                    if(result.code==1)
                    {
                        if($scope.page>1)
                        {
                            if(result.data.length>0)
                            {
                                result.data=result.data.reverse();
                                $scope.msgs=$scope.msgs.concat(result.data);
                                for(var i=0;i<$scope.msgs.length;i++)
                                {
                                    if($scope.msgs[i].uid==$scope.uid)
                                    {
                                        $scope.msgs[i].chats='chat_right';
                                        $scope.msgs[i].img1='chat_right_img1'
                                        $scope.msgs[i].img2='chat_right_img2'
                                        $scope.msgs[i].arrow='img/chat-right.png'
                                        $scope.msgs[i].chat_time='chat_time_right'
                                        if($scope.msgs[i].msg_state==99)
                                        {
                                            $scope.msgs[i].msg_state='已读'
                                            $scope.msgs[i].isread=true


                                        }



                                    }

                                    else
                                    {
                                        $scope.msgs[i].chats='chat_left';
                                        $scope.msgs[i].img1='chat_left_img1'
                                        $scope.msgs[i].img2='chat_left_img2'
                                        $scope.msgs[i].arrow='img/chat-left.png'
                                        $scope.msgs[i].chat_time='chat_time_left'
                                    }

                                }
                                //$scope.msgs= $scope.msgs.reverse()

                                if(result.state==0)
                                {
                                    $scope.chat_state1=false;
                                    $scope.chat_state2=false;
                                    $scope.ispb=false;
                                }
                                if(result.state==1)
                                {
                                    $scope.chat_state1=true;
                                    $scope.chat_state2=false;
                                    $scope.ispb=false;
                                }
                                if(result.state==2)
                                {
                                    $scope.chat_state1=false;
                                    $scope.chat_state2=false;
                                    $scope.ispb=true;
                                }
                                if(result.state==3)
                                {
                                    $scope.chat_state1=false;
                                    $scope.chat_state2=true;
                                    $scope.ispb=false;
                                }
                            }
                            else
                            {
                                $scope.loadMoresss=false;
                            }


                        }

                    }



                })
            }
            else
            {
                if($scope.page<=1)
                  $scope.loadMoresss=false;
                else
                 k++;

            }



        }


        //下拉刷新
        $scope.doRefresh=function()
        {
                $scope.page++;
                var url='http://api.jdhn.top/home/ustore/msgDetail?callback=JSON_CALLBACK&token='+$scope.token+'&uid='+$scope.uid+'&id='+$scope.chatDetails_id+'&page='+$scope.page;
                $http.jsonp(url).success(function(result)
                {
                    //$rootScope.title=result.name;
                    //console.log(result)
                    //$rootScope.title=result.name;
                    if(result.code==1)
                    {

                            if(result.data.length>0)
                            {
                                result.data=result.data.reverse();
                                $scope.msgs=result.data.concat(  $scope.msgs);
                                for(var i=0;i<$scope.msgs.length;i++)
                                {
                                    if($scope.msgs[i].uid==$scope.uid)
                                    {
                                        $scope.msgs[i].chats='chat_right';
                                        $scope.msgs[i].img1='chat_right_img1'
                                        $scope.msgs[i].img2='chat_right_img2'
                                        $scope.msgs[i].arrow='img/chat-right.png'
                                        $scope.msgs[i].chat_time='chat_time_right'
                                        if($scope.msgs[i].msg_state==99)
                                        {
                                            $scope.msgs[i].msg_state='已读'
                                            $scope.msgs[i].isread=true


                                        }



                                    }

                                    else
                                    {
                                        $scope.msgs[i].chats='chat_left';
                                        $scope.msgs[i].img1='chat_left_img1'
                                        $scope.msgs[i].img2='chat_left_img2'
                                        $scope.msgs[i].arrow='img/chat-left.png'
                                        $scope.msgs[i].chat_time='chat_time_left'
                                    }

                                }

                                //$scope.msgs= $scope.msgs.reverse()

                                if(result.state==0)
                                {
                                    $scope.chat_state1=false;
                                    $scope.chat_state2=false;
                                    $scope.ispb=false;
                                }
                                if(result.state==1)
                                {
                                    $scope.chat_state1=true;
                                    $scope.chat_state2=false;
                                    $scope.ispb=false;
                                }
                                if(result.state==2)
                                {
                                    $scope.chat_state1=false;
                                    $scope.chat_state2=false;
                                    $scope.ispb=true;
                                }
                                if(result.state==3)
                                {
                                    $scope.chat_state1=false;
                                    $scope.chat_state2=true;
                                    $scope.ispb=false;
                                }
                            }
                            else
                            {
                                $scope.loadMoresss=false;
                            }





                    }



                })

                $timeout(function(){
                    $scope.$broadcast('scroll.refreshComplete');
                },1000);

        }









    }


})();