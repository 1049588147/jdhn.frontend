(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('MyFileControl', MyFileControl)

    MyFileControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','$upload'];

    function MyFileControl($scope, $rootScope, $state, $timeout, $window, $location, $http,$upload) {
        $rootScope.title = $state.$current.data.pageTitle;
        $scope.activity_id = $window.localStorage.getItem("activity_id");
        $scope.uid = $window.localStorage.getItem("uid");
        $scope.token = $window.localStorage.getItem("token");
        $scope.is = $window.localStorage.getItem("is");

        $scope.showjbxx = false;
        $scope.showgdzl = true;
        $scope.showzoxq = false;
        $scope.showrzcl = false;
        $scope.showgrxc = false;
        $scope.showjia = true;
        $scope.showCover = false;
        $scope.showmyhobbyList=false;
        $scope.showchooseHobby=false




        //兴趣爱好开始
        $scope.doNothing=function()
        {
            event.stopPropagation();
                //event.preventDefault()

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
            //console.log($(this).val())
            //console.log($(this).is(":checked"))
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
            //console.log($("input:checkbox[name='hobbyList']"))
            $("input:checkbox[name='hobbyList']:checked").each(function(){
                $scope.datalist.u_hobby=$scope.datalist.u_hobby+$(this).val()+'|'
            })

            $scope.datalist.u_hobby=$scope.datalist.u_hobby.substr(0,$scope.datalist.u_hobby.length-1)

            //console.log($scope.datalist.u_hobby)
            $scope.showmyhobbyList=false;

        }




        $scope.outgrxc=function()
        {
            event.stopPropagation();
            event.preventDefault();
            $scope.showgrxc=false;

        }

        //轮询
        setInterval(function(){

            if($scope.datalist && $scope.datalist.realName && $scope.datalist.birthday && $scope.datalist.height && $scope.datalist.u_marriage && $scope.datalist.academic && $scope.datalist.school && $scope.datalist.city && $scope.datalist.hometown && $scope.datalist.work && $scope.datalist.u_hobby && $scope.datalist.mobile && $scope.datalist.wechat_num)
                $scope.arr_jbzl=true;
            else
                $scope.arr_jbzl=false;

            if($scope.datalist && $scope.datalist.u_children && $scope.datalist.u_isOnly && $scope.datalist.u_work_property && $scope.datalist.ishouse && $scope.datalist.iscar && $scope.datalist.u_religion && $scope.u_cover=='已上传' && $scope.datalist.u_personImg.length==4 )
                $scope.arr_gdzl=true;
            else
                $scope.arr_gdzl=false;

            if($scope.selection && $scope.begin_date && $scope.end_date && $scope.selection.height && $scope.selection.marry_state && $scope.selection.children && $scope.selection.degree && $scope.selection.domicile && $scope.selection.hometown && $scope.selection.work_property && $scope.selection.salary && $scope.selection.house && $scope.selection.car && $scope.selection.religon)
                $scope.arr_zoxq=true;
            else
                $scope.arr_zoxq=false;




        },0)

        $scope.check=function()
        {
            //轮询
            setInterval(function(){

                if($scope.datalist && $scope.datalist.realName && $scope.datalist.birthday && $scope.datalist.height && $scope.datalist.u_marriage && $scope.datalist.academic && $scope.datalist.school && $scope.datalist.city && $scope.datalist.hometown && $scope.datalist.work && $scope.datalist.u_hobby && $scope.datalist.mobile && $scope.datalist.wechat_num)
                    $scope.arr_jbzl=true;
                else
                    $scope.arr_jbzl=false;

                if($scope.datalist && $scope.datalist.u_children && $scope.datalist.u_isOnly && $scope.datalist.u_work_property && $scope.datalist.ishouse && $scope.datalist.iscar && $scope.datalist.u_religion && $scope.u_cover=='已上传' && $scope.datalist.u_personImg.length==4 )
                    $scope.arr_gdzl=true;
                else
                    $scope.arr_gdzl=false;

                if($scope.selection && $scope.begin_date && $scope.end_date && $scope.selection.height && $scope.selection.marry_state && $scope.selection.children && $scope.selection.degree && $scope.selection.domicile && $scope.selection.hometown && $scope.selection.work_property && $scope.selection.salary && $scope.selection.house && $scope.selection.car && $scope.selection.religon)
                    $scope.arr_zoxq=true;
                else
                    $scope.arr_zoxq=false;




            },0)
        }















        //页面初始化
        $scope.init = function () {

            var url = 'http://api.jdhn.top/home/member/myinfo?uid=' + $scope.uid + "&token=" + $scope.token;
            $http.get(url).success(function (result) {
                console.log(result);
                if (result.code == 1) {
                    $scope.datalist = result.info;
                    $scope.selection = result.selection;
                    $scope.point = result.point;
                    $('#point').css('width',3.85*$scope.point/100+'rem')
					
					if(!$scope.datalist.u_personImg)
						$scope.datalist.u_personImg=''
					
					
			
			

					
					

                    //轮询
                    setInterval(function(){

                        if($scope.datalist && $scope.datalist.realName && $scope.datalist.birthday && $scope.datalist.height && $scope.datalist.u_marriage && $scope.datalist.academic && $scope.datalist.school && $scope.datalist.city && $scope.datalist.hometown && $scope.datalist.work && $scope.datalist.u_hobby && $scope.datalist.mobile && $scope.datalist.wechat_num)
                            $scope.arr_jbzl=true;
                        else
                            $scope.arr_jbzl=false;

                       if($scope.datalist && $scope.datalist.u_children && $scope.datalist.u_isOnly && $scope.datalist.u_work_property && $scope.datalist.ishouse && $scope.datalist.iscar && $scope.datalist.u_religion && $scope.u_cover=='已上传' && $scope.datalist.u_personImg.length==4 )
			{
				$scope.arr_gdzl=true;
				$scope.grxcState='已完成'
			}
                
            else
			{
				 $scope.arr_gdzl=false;
				 if($scope.datalist.u_personImg.length==4 )
					 $scope.grxcState='已完成'
				 else
					  $scope.grxcState='未完成'
					 
					 
				 
			}

                        if($scope.selection && $scope.begin_date && $scope.end_date && $scope.selection.height && $scope.selection.marry_state && $scope.selection.children && $scope.selection.degree && $scope.selection.domicile && $scope.selection.hometown && $scope.selection.work_property && $scope.selection.salary && $scope.selection.house && $scope.selection.car && $scope.selection.religon)
                            $scope.arr_zoxq=true;
                        else
                            $scope.arr_zoxq=false;




                    },0)


                    if(	$scope.datalist.u_intro==null || $scope.datalist.u_intro=='' )
                        $scope.datalist.u_intro="愿每一位优秀的人都不再孤单!"


                    if(result.selection)
                    {
                        if (result.selection.age) {
                            $scope.begin_date = result.selection.age.split(',')[0];
                            $scope.begin_date= parseInt($scope.begin_date)

                            $scope.end_date = result.selection.age.split(',')[1];
                            $scope.end_date=  parseInt($scope.end_date)
							
							// if($scope.begin_date==0 || $scope.begin_date==2019)
								 // $scope.begin_date='不限'
							 // if($scope.end_date==0 || $scope.end_date==2019)
								 // $scope.end_date='不限'
								


                        }
                        else
                        {
                            $scope.begin_date=0;
                            $scope.end_date=0

                        }

                        if($scope.selection.height!=null && $scope.selection.height!='')
                        {

                            $scope.begin_height=$scope.selection.height.split(',')[0];
                            $scope.end_height=$scope.selection.height.split(',')[1];
                        }
						
						if(!$scope.selection.marry_state)
							$scope.selection.marry_state='0'
						
						if(!$scope.selection.children)
							$scope.selection.children='0'
						
						if(!$scope.selection.degree)
							$scope.selection.degree='11'
						
						if(!$scope.selection.domicile)
							$scope.selection.domicile='不限'
						
						if(!$scope.selection.hometown)
							$scope.selection.hometown='不限'
						
						if(!$scope.selection.work_property)
							$scope.selection.work_property='7'
						
						if(!$scope.selection.salary)
							$scope.selection.salary='0'
						
						if(!$scope.selection.house)
							$scope.selection.house='0'
						
						if(!$scope.selection.car)
							$scope.selection.car='0'
						
						if(!$scope.selection.religon)
							$scope.selection.religon='不限'
						
						
							 
						


                    }
					else
                     {
							$scope.selection={
								'height':'1',
								'marry_state':'0',
								'children':'0',
								'degree':'11',
								'domicile':'不限',
								'hometown':'不限',
								'work_property':'7',
								'salary':'0',
								'house':'0',
								'car':'0',
								'religon':'不限'
							}
							
                            $scope.begin_date=0;
                            $scope.end_date=0;
							

                     }

                    if ($scope.datalist.u_cover == null || $scope.datalist.u_cover == '')
                        $scope.u_cover = '无'
                    else
                        $scope.u_cover = '已上传'

                    if ($scope.datalist.u_personImg != null && $scope.datalist.u_personImg != '') {
                        $scope.datalist.u_personImg = $scope.datalist.u_personImg.split(',')
                        $scope.imgae = $scope.datalist.u_personImg;
                        if ($scope.imgae.length == 0) {
                            $scope.x0 = false;
                            $scope.x1 = false;
                            $scope.x2 = false;
                            $scope.x3 = false;

                            $scope.img0 = false;
                            $scope.img1 = false;
                            $scope.img2 = false;
                            $scope.img3 = false;

                            $scope.showjia = true;
                        }
                        else if ($scope.imgae.length == 1) {
                            $scope.x0 = true;
                            $scope.x1 = false;
                            $scope.x2 = false;
                            $scope.x3 = false;

                            $scope.img0 = true;
                            $scope.img1 = false;
                            $scope.img2 = false;
                            $scope.img3 = false;

                            $scope.showjia = true;

                        }
                        else if ($scope.imgae.length == 2) {
                            $scope.x0 = true;
                            $scope.x1 = true;
                            $scope.x2 = false;
                            $scope.x3 = false;

                            $scope.img0 = true;
                            $scope.img1 = true;
                            $scope.img2 = false;
                            $scope.img3 = false;

                            $scope.showjia = true;
                        }
                        else if ($scope.imgae.length == 3) {
                            $scope.x0 = true;
                            $scope.x1 = true;
                            $scope.x2 = true;
                            $scope.x3 = false;

                            $scope.img0 = true;
                            $scope.img1 = true;
                            $scope.img2 = true;
                            $scope.img3 = false;

                            $scope.showjia = true;
                        }
                        else if ($scope.imgae.length == 4) {
                            $scope.x0 = true;
                            $scope.x1 = true;
                            $scope.x2 = true;
                            $scope.x3 = true;

                            $scope.img0 = true;
                            $scope.img1 = true;
                            $scope.img2 = true;
                            $scope.img3 = true;

                            $scope.showjia = false;
                        }


                    }
					
					
					
				



                }



            })




            //生日
            $("#birthday").focus(function () {
                document.activeElement.blur();
            });

            //时钟
            var t = '';
            $scope.startTime = function () {
                var today = new Date();
                var y = today.getFullYear();
                var mon = today.getMonth() + 1;
                mon = $scope.changNum(mon);
                var d = today.getDate();
                d = $scope.changNum(d);
                var h = today.getHours();
                var m = today.getMinutes();
                m = $scope.changNum(m);
                var s = today.getSeconds();
                s = $scope.changNum(s);
                t = y + '-' + mon + '-' + d
            }

            $scope.changNum = function (i) {   //月、日、秒如果小于10数字前加0
                if (i < 10) {
                    return "0" + i;
                }
                return i;
            }
            $scope.startTime()
            var calendar = new LCalendar();
            calendar.init({
                'trigger': '#birthday', //标签id
                'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
                'minDate': '1900-1-1',//最小日期 注意：该值会覆盖标签内定义的日期范围
                'maxDate': t//最大日期 注意：该值会覆盖标签内定义的日期范围
            });


        }

        //个人相册预览页面的选择

        $scope.preViewgrxc = function (file) {
            if ($scope.imgae != null)
                $scope.imglength = $scope.imgae.length;
            //console.log($scope.imglength)
            $rootScope.li = layer.open({
                type: 2
                , content: '上传中'
            });

            $scope.upload = $upload.upload({
                url: 'http://api.jdhn.top/home/member/uploadfile?type=person', //上传的url
                method: 'POST',
                file: file, // or list of files ($files) for html5 only
            }).progress(function (evt) {//上传进度


            }).success(function (data, status, headers, config) {
                console.log(data)
                if (data.code == 1) {
					
                    layer.close($rootScope.li);
                    if ($scope.imglength > 3) {
                        layer.open({
                            content: "最多上传4张照片！"
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                        return false;
                    }
                    if ($scope.imgae == null)
                        $scope.imgae = []

                    $scope.imgae.push(data.fullImgUrl);
                    $scope.imglength = $scope.imgae.length;


                    if ($scope.datalist.u_personImg == '')
                        $scope.datalist.u_personImg = []

                    //$scope.datalist.u_personImg[ $scope.grxcindex]=data.fullImgUrl;
                    //console.log( $scope.datalist.u_personImg[ $scope.grxcindex])
                    //$scope.grxcindex++;
                    //console.log($scope.imglength)
                    $scope.datalist.u_personImg[$scope.imglength - 1] = data.fullImgUrl;
                    //console.log($scope.datalist.u_personImg[$scope.imglength])
                    //$scope.grxcindex++;

                    //console.log($scope.imgae)
                    if ($scope.imgae.length == 0) {
                        $scope.x0 = false;
                        $scope.x1 = false;
                        $scope.x2 = false;
                        $scope.x3 = false;

                        $scope.img0 = false;
                        $scope.img1 = false;
                        $scope.img2 = false;
                        $scope.img3 = false;

                        $scope.showjia = true;
                    }
                    else if ($scope.imgae.length == 1) {
                        $scope.x0 = true;
                        $scope.x1 = false;
                        $scope.x2 = false;
                        $scope.x3 = false;

                        $scope.img0 = true;
                        $scope.img1 = false;
                        $scope.img2 = false;
                        $scope.img3 = false;

                        $scope.showjia = true;

                    }
                    else if ($scope.imgae.length == 2) {
                        $scope.x0 = true;
                        $scope.x1 = true;
                        $scope.x2 = false;
                        $scope.x3 = false;

                        $scope.img0 = true;
                        $scope.img1 = true;
                        $scope.img2 = false;
                        $scope.img3 = false;

                        $scope.showjia = true;
                    }
                    else if ($scope.imgae.length == 3) {
                        $scope.x0 = true;
                        $scope.x1 = true;
                        $scope.x2 = true;
                        $scope.x3 = false;

                        $scope.img0 = true;
                        $scope.img1 = true;
                        $scope.img2 = true;
                        $scope.img3 = false;

                        $scope.showjia = true;
                    }
                    else if ($scope.imgae.length == 4) {
                        $scope.x0 = true;
                        $scope.x1 = true;
                        $scope.x2 = true;
                        $scope.x3 = true;

                        $scope.img0 = true;
                        $scope.img1 = true;
                        $scope.img2 = true;
                        $scope.img3 = true;

                        $scope.showjia = false;

                    }
                    $.ajax({
                        type: "POST",
                        url: "http://api.jdhn.top/home/member/saveImg", /*url写异域的请求地址*/
                        data: {"img": $scope.imgae.join(","), "u_id": $scope.uid, "token": $scope.token},
                        success: function (result) {
                            var data = JSON.parse(result)
                            if (data.code == 1) {
                                layer.open({
                                    content: data.message
                                    , skin: 'msg'
                                    , time: 2 //2秒后自动关闭
                                });
                            } else if (data.code == 510) {
                                $window.localStorage.setItem("token", "");
                                $window.localStorage.setItem("uid", "");
                                layer.open({
                                    content: "您的账号已在其它地点登录！"
                                    , skin: 'msg'
                                    , time: 2 //2秒后自动关闭
                                });
                                $state.go("login");
                            } else {
                                layer.open({
                                    content: data.message
                                    , skin: 'msg'
                                    , time: 2 //2秒后自动关闭
                                });
                            }
                        }
                    });

                }
                else if (data.code == 510) {
                    layer.close($rootScope.li);
                    $window.localStorage.setItem("token", "");
                    $window.localStorage.setItem("uid", "");
                    layer.open({
                        content: "您的账号已在其它地点登录！"
                        , skin: 'msg'
                        , time: 2 //2秒后自动关闭
                    });
                    $state.go("login");
                } else {
                    layer.close($rootScope.li);
                    layer.open({
                        content: "上传失败，图片过大"
                        , skin: 'msg'
                        , time: 2 //2秒后自动关闭
                    });
                }


            }).error(function (data, status, headers, config) {
                //失败处理函数
                layer.close($rootScope.li);
                layer.open({
                    content: "网速太差，亲！"
                    , skin: 'msg'
                    , time: 2 //2秒后自动关闭
                });
            });


        }

        //个人相册预览删除
        $scope.close = function (event, index) {
            event.stopPropagation();
            event.preventDefault()
            $scope.imgae.splice(index, 1);
            $scope.imgone = $scope.imgae

            if ($scope.imgae.length == 0) {
                $scope.x0 = false;
                $scope.x1 = false;
                $scope.x2 = false;
                $scope.x3 = false;

                $scope.img0 = false;
                $scope.img1 = false;
                $scope.img2 = false;
                $scope.img3 = false;

                $scope.showjia = true;
            }
            else if ($scope.imgae.length == 1) {
                $scope.x0 = true;
                $scope.x1 = false;
                $scope.x2 = false;
                $scope.x3 = false;

                $scope.img0 = true;
                $scope.img1 = false;
                $scope.img2 = false;
                $scope.img3 = false;

                $scope.showjia = true;

            }
            else if ($scope.imgae.length == 2) {
                $scope.x0 = true;
                $scope.x1 = true;
                $scope.x2 = false;
                $scope.x3 = false;

                $scope.img0 = true;
                $scope.img1 = true;
                $scope.img2 = false;
                $scope.img3 = false;

                $scope.showjia = true;
            }
            else if ($scope.imgae.length == 3) {
                $scope.x0 = true;
                $scope.x1 = true;
                $scope.x2 = true;
                $scope.x3 = false;

                $scope.img0 = true;
                $scope.img1 = true;
                $scope.img2 = true;
                $scope.img3 = false;

                $scope.showjia = true;
            }
            else if ($scope.imgae.length == 4) {
                $scope.x0 = true;
                $scope.x1 = true;
                $scope.x2 = true;
                $scope.x3 = true;

                $scope.img0 = true;
                $scope.img1 = true;
                $scope.img2 = true;
                $scope.img3 = true;

                $scope.showjia = false;
            }


            $.ajax({
                type: "POST",
                url: "http://api.jdhn.top/home/member/saveImg", /*url写异域的请求地址*/
                data: {"img": $scope.imgone.join(","), "u_id": $scope.uid, "token": $scope.token},
                success: function (result) {
                    var data = JSON.parse(result)
                    if (data.code == 1) {
                        layer.open({
                            content: "删除成功"
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });


                    } else if (data.code == 510) {
                        $window.localStorage.setItem("token", "");
                        $window.localStorage.setItem("uid", "");
                        layer.open({
                            content: "您的账号已在其它地点登录！"
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                        $state.go("login");
                    } else {
                        layer.open({
                            content: data.message
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                    }
                }
            });

        }


        //个人相册上传完
        $scope.add_ok = function () {
            $scope.showjbxx = false;
            $scope.showgdzl = true;
            $scope.showzoxq = false;
            $scope.showrzcl = false;
            $scope.showgrxc = false;

        }


        $scope.saveCover = function (file) {

            //event.preventDefault();
            //event.stopPropagation();
            $scope.showgdzl = false;
            $scope.showCover = true;
            //$rootScope.li= layer.open({
            //    type: 2
            //    ,content: '上传中'
            //});

            $scope.upload = $upload.upload({
                url: 'http://api.jdhn.top/home/member/uploadfile?type=cover', //上传的url
                method: 'post',
                file: file, // or list of files ($files) for html5 only
            }).progress(function (evt) {//上传进度


            }).success(function (data, status, headers, config) {
                //console.log(data)
                if (data.code == 1) {
                    layer.close($rootScope.li);
                    $scope.datalist.u_cover = data.fullImgUrl;

                }
                else if (data.code == 510) {
                    layer.close($rootScope.li);
                    $window.localStorage.setItem("token", "");
                    $window.localStorage.setItem("uid", "");
                    layer.open({
                        content: "您的账号已在其它地点登录！"
                        , skin: 'msg'
                        , time: 2 //2秒后自动关闭
                    });
                    $state.go("login");
                } else {
                    layer.close($rootScope.li);
                    layer.open({
                        content: "上传失败，图片过大"
                        , skin: 'msg'
                        , time: 2 //2秒后自动关闭
                    });
                }


            }).error(function (data, status, headers, config) {
                //失败处理函数
                layer.close($rootScope.li);
                layer.open({
                    content: "网速太差，亲！"
                    , skin: 'msg'
                    , time: 2 //2秒后自动关闭
                });
            });


        }


        //保存图片
        $scope.saveImg = function (file, l) {
            $rootScope.li = layer.open({
                type: 2
                , content: '上传中'
            });
            if (l == 1) {

                $scope.upload = $upload.upload({
                    url: 'http://api.jdhn.top/home/member/uploadfile?type=idcard', //上传的url
                    method: 'POST',
                    file: file, // or list of files ($files) for html5 only
                }).progress(function (evt) {//上传进度
                }).success(function (data, status, headers, config) {
                    // 文件上传成功处理函数
                    //console.log(data.fullImgUrl)
                    if (data.code == 1) {
                        layer.close($rootScope.li);
                        $scope.datalist.u_idCardImg0 = data.fullImgUrl;
                        //console.log($scope.datalist.u_idCardImg0)

                    } else if (data.code == 510) {
                        layer.close($rootScope.li);
                        $window.localStorage.setItem("token", "");
                        $window.localStorage.setItem("uid", "");
                        $state.go("login");
                    } else {
                        layer.close($rootScope.li);
                        // $scope.re[0]=false;
                        layer.open({
                            content: "上传失败，图片过大"
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                    }

                }).error(function (data, status, headers, config) {
                    //失败处理函数
                    //console.log('上传失败');
                });
            } else if (l == 2) {
                $scope.upload = $upload.upload({
                    url: 'http://api.jdhn.top/home/member/uploadfile?type=idcarback', //上传的url
                    method: 'POST',
                    file: file, // or list of files ($files) for html5 only
                }).progress(function (evt) {//上传进度
                    //
                    //              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));

                }).success(function (data, status, headers, config) {
                    // 文件上传成功处理函数
                    if (data.code == 1) {
                        layer.close($rootScope.li);
                        $scope.datalist.u_idCardImg1 = data.fullImgUrl;
						//console.log( $scope.datalist.u_idCardImg1)

                    } else if (data.code == 510) {
                        layer.close($rootScope.li);
                        $window.localStorage.setItem("token", "");
                        $window.localStorage.setItem("uid", "");
                        $state.go("login");
                    } else {
                        layer.close($rootScope.li);
                        $scope.re[1] = false;
                        layer.open({
                            content: "上传失败，图片过大"
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                    }

                }).error(function (data, status, headers, config) {
                    //失败处理函数
                    //console.log('上传失败');
                });
            } else if (l == 3) {
                $scope.upload = $upload.upload({
                    url: 'http://api.jdhn.top/home/member/uploadfile?type=academic', //上传的url
                    method: 'POST',
                    file: file, // or list of files ($files) for html5 only
                }).progress(function (evt) {//上传进度
                    //
                    //              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));

                }).success(function (data, status, headers, config) {
                    // 文件上传成功处理函数
                    if (data.code == 1) {
                        layer.close($rootScope.li);
                        $scope.datalist.u_academicImg = data.fullImgUrl;

                    }
                    else if (data.code == 510) {
                        layer.close($rootScope.li);
                        $window.localStorage.setItem("token", "");
                        $window.localStorage.setItem("uid", "");
                        $state.go("login");
                    } else {
                        layer.close($rootScope.li);
                        $scope.re[2] = false;
                        layer.open({
                            content: "上传失败，图片过大"
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                    }

                }).error(function (data, status, headers, config) {
                    //失败处理函数
                    //console.log('上传失败');
                });
            } else if (l == 4) {
                $scope.upload = $upload.upload({
                    url: 'http://api.jdhn.top/home/member/uploadfile?type=work', //上传的url
                    method: 'POST',
                    file: file, // or list of files ($files) for html5 only
                }).progress(function (evt) {//上传进度
                    //
                    //              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));

                }).success(function (data, status, headers, config) {
                    // 文件上传成功处理函数
                    if (data.code == 1) {
                        layer.close($rootScope.li);
                        $scope.datalist.u_workerImg = data.fullImgUrl;

                    } else if (data.code == 510) {
                        layer.close($rootScope.li);
                        $window.localStorage.setItem("token", "");
                        $window.localStorage.setItem("uid", "");
                        $state.go("login");
                    } else {
                        layer.close($rootScope.li);
                        $scope.re[3] = false;
                        layer.open({
                            content: "上传失败，图片过大"
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                    }

                }).error(function (data, status, headers, config) {
                    //失败处理函数
                    //console.log('上传失败');
                });
            }
            else if (l == 5) {
                $scope.upload = $upload.upload({
                    url: 'http://api.jdhn.top/home/member/uploadfile?type=u_cover', //上传的url
                    method: 'POST',
                    file: file, // or list of files ($files) for html5 only
                }).progress(function (evt) {//上传进度
                    //
                    //              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));

                }).success(function (data, status, headers, config) {
                    // 文件上传成功处理函数
                    if (data.code == 1) {
                        layer.close($rootScope.li);
                        //console.log(data)
                        $scope.u_cover = '无'
                        $scope.datalist.u_cover == data.fullfullImgUrl;


                    } else if (data.code == 510) {
                        layer.close($rootScope.li);
                        $window.localStorage.setItem("token", "");
                        $window.localStorage.setItem("uid", "");
                        $state.go("login");
                    } else {
                        layer.close($rootScope.li);
                        $scope.re[3] = false;
                        layer.open({
                            content: "上传失败，图片过大"
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                    }

                }).error(function (data, status, headers, config) {
                    //失败处理函数
                    //console.log('上传失败');
                });
            }


        }

        //点击个人相册
        $scope.grxc = function () {
            $scope.showjbxx = false;
            $scope.showgdzl = true;
            $scope.showzoxq = false;
            $scope.showrzcl = false;
            $scope.showgrxc = true;

        }


        //确认封面上传
        $scope.cover_ok = function () {

            $scope.showgdzl = true;
            $scope.showCover = false;

            $.ajax({
                type: "POST",
                url: "http://api.jdhn.top/home/member/saveCover", /*url写异域的请求地址*/
                data: {"cover":  $scope.datalist.u_cover, "u_id": $scope.uid, "token": $scope.token},
                success: function (result) {
                    //console.log(result)
                    var data = JSON.parse(result)
                    if (data.code == 1) {
                        //layer.open({
                        //    content:data.message
                        //    ,skin: 'msg'
                        //    ,time: 2 //2秒后自动关闭
                        //});
						$scope.u_cover='已上传'
                    } else if (data.code == 510) {
                        $window.localStorage.setItem("token", "");
                        $window.localStorage.setItem("uid", "");
                        layer.open({
                            content: "您的账号已在其它地点登录！"
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                        $state.go("login");
                    } else {
                        layer.open({
                            content: data.message
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                    }
                }
            });

        }

        //取消封面上传
        $scope.cover_cancel = function ()
        {
            $scope.showgdzl = true;
            $scope.showCover = false;

        }


        //提交
        $scope.MyFile_submit=function () {
            $rootScope.li= layer.open({
                type: 2
                ,content: '上传中'
            });
            var url='http://api.jdhn.top/home/ustore/saveMemInfo'
            //$scope.begin_date=$('#begin_date').val()
            //$scope.end_date=$('#end_date').val()
            //$scope.datalist.city=$('#xjd').val();
            //$scope.datalist.hometown=$('#jx').val();
            //
            //

            //console.log(  $scope.begin_date)
            //console.log(  $scope.end_date)
            //console.log($scope.datalist.city)
            //console.log($scope.datalist.hometown)
            //console.log($scope.datalist.u_personImg)
            //$scope.datalist.u_personImg=$scope.datalist.u_personImg[0]+','+$scope.datalist.u_personImg[1]+','+$scope.datalist.u_personImg[2]+$scope.datalist.u_personImg[3]
            //console.log($scope.datalist.u_personImg)
            $scope.datalist.u_personImg=$scope.datalist.u_personImg.join(',')


            if($scope.begin_height>$scope.end_height)
            {
                $scope.begin_height=$('#end_height').val();
                $scope.end_height=$('#begin_height').val();

            }



            $scope.begin_height=parseInt($('#begin_height').val().split(':')[1])
            $scope.end_height=parseInt($('#end_height').val().split(':')[1])

            if($scope.begin_date>$scope.end_date)
            {
                $scope.begin_date=parseInt($('#end_date').val().split(':')[1]);
                $scope.end_date=parseInt($('#begin_date').val().split(':')[1]);

            }


            if(	$scope.datalist.u_intro==null || $scope.datalist.u_intro=='' )
                $scope.datalist.u_intro="愿每一位优秀的人都不再孤单!"

            var data={
                'u_id':$scope.uid,
                'token':$scope.token,
                'u_realName':$scope.datalist.realName,
                'u_birthday':$scope.datalist.birthday,
                'u_height':$scope.datalist.height,
                //'u_height':$scope.begin_date+','+ $scope.end_date,
                'u_marriage':$scope.datalist.u_marriage,
                'u_academic':$scope.datalist.academic,
                'u_school':$scope.datalist.school,
                //'u_city':$scope.datalist.city.split(':')[1],
                //'u_hometown':$scope.datalist.hometown.split(':')[1],
                'u_city':$scope.datalist.city,
                'u_hometown':$scope.datalist.hometown,
                'u_work':$scope.datalist.work,
                'u_hobby':$scope.datalist.u_hobby,
                'u_mobile':$scope.datalist.mobile,
                'u_wechat_num':$scope.datalist.wechat_num,
				'u_intro':$scope.datalist.u_intro,


                'u_children':$scope.datalist.u_children,
                'u_isOnly':$scope.datalist.u_isOnly,
                'u_work_property':$scope.datalist.u_work_property,
                'u_salary':$scope.datalist.salary,
                'u_ishouse':$scope.datalist.ishouse,
                'u_iscar':$scope.datalist.iscar,
                'u_religion':$scope.datalist.u_religion,
                'u_cover': $scope.datalist.u_cover,
                 'u_personImg':   $scope.datalist.u_personImg,



                //'age':$scope.begin_date.split(':')[1]+','+$scope.end_date.split(':')[1],
                'age':$scope.begin_date+','+$scope.end_date,
                'height':$scope.begin_height+','+ $scope.end_height,
                'marry_state':$scope.selection.marry_state,
                'children':$scope.selection.children,
                'degree':$scope.selection.degree,
                'domicile':$scope.selection.domicile,
                'hometown':$scope.selection.hometown,
                'work_property':$scope.selection.work_property,
                'salary':$scope.selection.salary,
                'house':$scope.selection.house,
                'car':$scope.selection.car,
                'religon':$scope.selection.religon,



                'u_idCardNo':$scope.datalist.u_idCardNo,
                "u_idCardImg0":$scope.datalist.u_idCardImg0,
                "u_idCardImg1":$scope.datalist.u_idCardImg1,
                "u_academicImg":$scope.datalist.u_academicImg,
                "u_workerImg":$scope.datalist.u_workerImg ,

            }
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
                if(request.code==1)
                  $state.go('memberDetail')
            })

            event.stopPropagation();
            event.preventDefault();






        }





        $scope.jbxx_next=function () {
            $scope.showjbxx=false;
            $scope.showgdzl=true;
            //console.log($scope.datalist.u_marriage)
            //console.log($scope.datalist.hometown)


        }

        $scope.gdzl_pre=function () {
            $scope.showgdzl=false;
            $scope.showjbxx=true;
            // console.log($scope.datalist.iscar)

        }

        $scope.gdzl_next=function () {
            $scope.showgdzl=false;
            $scope.showzoxq=true;

        }

        $scope.zoxq_pre=function () {
            $scope.showgdzl=true;
            $scope.showzoxq=false;

        }

        $scope.zoxq_next=function () {
            $scope.showrzcl=true;
            $scope.showzoxq=false;

            setInterval(function(){
                $scope.point=100;
                var x=0;
                if(!$scope.datalist.u_idCardNo || $scope.datalist.u_idCardNo=='')
                   x=x+2;

                if(!$scope.datalist.u_idCardImg0 || $scope.datalist.u_idCardImg0=='')
                    x=x+2;

                if(!$scope.datalist.u_idCardImg1 || $scope.datalist.u_idCardImg1=='')
                    x=x+2;
                if(!$scope.datalist.u_workerImg || $scope.datalist.u_workerImg=='')
                    x=x+2;
                if(!$scope.datalist.realName || $scope.datalist.realName=='')
                    x=x+3;

                $scope.point=$scope.point-x;
                $('#point').css('width',3.85*$scope.point/100+'rem')


            },100)




        }

        $scope.rzcl_pre=function () {
            $scope.showzoxq=true;
            $scope.showrzcl=false;

        }

        //各项数据列表

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
            {'id':'1','name':'无'},
            {'id':'2','name':'有'},

        ]
        $scope.select_u_ishouse2=[
            {'id':'0','name':'不限'},
            {'id':'1','name':'无'},
            {'id':'2','name':'有'},

        ]
        $scope.select_u_iscar=[
            //{'id':'0','name':''},
            {'id':'1','name':'无'},
            {'id':'2','name':'有'},

        ]
        $scope.select_u_iscar2=[
            {'id':'0','name':'不限'},
            {'id':'1','name':'无'},
            {'id':'2','name':'有'},

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
			{'id':'7','name':"不限"},
            {'id':'1','name':"企业单位"},
            {'id':'2','name':"事业单位"},
            {'id':'3','name':"机关单位"},
            {'id':'4','name':"社会团体"},
            {'id':'5','name':"创业"},
            {'id':'6','name':"个体"},
            
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



        $scope.init()






    }


})();