/**
 * Created by xjw on 2017/12/9.
 */
(function () {
    'use strict';


    angular
        .module('makeFriends')
        .controller('goodKu02Control', goodKu02Control)

    goodKu02Control.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','$ionicModal'];

    function goodKu02Control($scope, $rootScope, $state, $timeout, $window, $location, $http,$ionicModal) {
        $rootScope.title = $state.$current.data.pageTitle;
        $scope.activity_id = $window.localStorage.getItem("activity_id");
        $scope.uid = $window.localStorage.getItem("uid");
        $scope.token=$window.localStorage.getItem("token");
        $scope.is=$window.localStorage.getItem("is");
		$rootScope.backIndex=1;




        if($scope.token==""||$scope.token==null){
            $state.go("login");
            return;
        }else if($scope.uid==""||$scope.uid==null){
            $state.go("login");
            return;
        }

        /*------------------------------------------------------------------优库首页--------------------------------------------------------------------------*/

        //头像展示
        var url="http://api.jdhn.top/home/ustore/index?callback=JSON_CALLBACK&token="+$scope.token+"&uid="+$scope.uid;
        $http.get(url).success(function (result) {
            // console.log(result)
            $scope.data=result.data;
            $scope.total=result.total;

        })

        //点击换一批
        var index=1;
        $scope.changeOther=function () {
            if(index+1>$scope.total/13)
                index=1;
            index++;
            $rootScope.li= layer.open({
                type: 2
                ,content: '换一批'
            });
            var url="http://api.jdhn.top/home/ustore/index?callback=JSON_CALLBACK&token="+$scope.token+"&uid="+$scope.uid+"&page="+index;
            $http.get(url).success(function (result) {
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
                $scope.data=result.data;
            })

        }

        //点击头像
        $('.nothing').click(function () {
            var url='http://api.jdhn.top/home/ustore/judge?callback=JSON_CALLBACK&token='+$scope.token+'&uid='+$scope.uid;
            $rootScope.li= layer.open({
                type: 2
                ,content: '加载中'
            });
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
                    $state.go('memberDetail');
                    return;
                     // $scope.openModal()
                 
                 }
				 else
				 {
					 $scope.openModal()
				 }
				





             })



            $scope.u_id=$(this).attr('id')
            localStorage.setItem('target_uid', $scope.u_id);
            var url="http://api.jdhn.top/home/ustore/getTarget?callback=JSON_CALLBACK&uid="+$scope.uid+"&target_uid="+$scope.u_id+"&token="+$scope.token;
            $http.jsonp(url).success(function (result) {
                //console.log(result)
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
                {
                    $scope.modalU_portrait=result.targetInfo.u_portrait;
                    $scope.targetInfo=result.targetInfo;
                    $scope.targetInfo.u_birthday= $scope.targetInfo.u_birthday.split('-')[0];
                    $scope.moveState=result.moveState;
                    //心动
                    if( !$scope.targetInfo.u_cover)
                    {
                        $scope.targetInfo.u_cover='img/u_cover.jpg'

                    }


                    if(result.moveState==1)
                    {
                        $scope.modalMoveState="img/redHeart-btn.png";
                    }
                    else
                    {
                        $scope.modalMoveState="img/greyHeart-btn.png";
                    }
                    //名字
                    $scope.modalU_nickName=result.targetInfo.u_nickName;

                    //性别图片
                    if(result.targetInfo.u_gender==2)
                    {
                        $scope.modalU_gender="img/nan.png"
                    }
                    else
                    {
                        $scope.modalU_gender="img/nv.png"
                    }

                    //个性签名
                    if(!result.targetInfo.u_intro)
                        $scope.modalU_intro='愿每一位优秀的人都不再孤单！'
                    else
                        $scope.modalU_intro=result.targetInfo.u_intro;




                    //标签
                    $scope.modalTags=[]
                    if(result.tags!=null && result.tags!='' && result.tags.length!=0 )
                    {
                        if(result.tags.chars!=null && result.tags.chars!='' && result.tags.chars.length!=0 )
                            $scope.modalTags= $scope.modalTags.concat(result.tags.chars)

                        if(result.tags.hobby!=null && result.tags.hobby!='' && result.tags.hobby.length!=0 )
                            $scope.modalTags= $scope.modalTags.concat(result.tags.hobby)

                        if(result.tags.other!=null && result.tags.other!='' && result.tags.other.length!=0 )
                            $scope.modalTags= $scope.modalTags.concat(result.tags.other)


                    }

                    //$scope.modalTags= $scope.modalTags.concat(result.tags.chars,result.tags.hobby,result.tags.other);

                    //console.log(  $scope.modalTags)



                    setTimeout($scope.openModal,1000)

                }

            })
        })


        //心动 or 取消
        $scope.move=function () {
            $rootScope.li= layer.open({
                type: 2
                ,content: '设置中'
            });
            if($scope.moveState==1)
            {
                $scope.modalMoveState="img/greyHeart-btn.png";
                $scope.moveState=2;

            }
            else
            {
                $scope.modalMoveState="img/redHeart-btn.png";
                $scope.moveState=1;
            }

            var url="http://api.jdhn.top/home/ustore/setMoved?callback=JSON_CALLBACK&token="+$scope.token+"&uid="+$scope.uid+"&target_uid="+$scope.u_id+"&status="+$scope.moveState;
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


            })



        }

        //进入下个页面
        $scope.nextPage=function () {
			
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
				  $scope.closeModal()
			},2000)

        }



        $scope.nims=function(v){
            if(v=="" || v==null){
                return "未填写"
            }else{
                return v
            }
        }

        //去我自己的U库主页
        $scope.goMyinfo=function()
        {

            $state.go('UhomePage')

        }



        // 模态框
        $ionicModal.fromTemplateUrl('chooseDetail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
            location.reload()
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });

        $scope.doNothing=function()
        {
            event.stopPropagation();
            event.preventDefault();
        }













    }


})();