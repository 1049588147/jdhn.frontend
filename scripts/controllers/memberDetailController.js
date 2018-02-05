(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('memberDetailControl', memberDetailControl)

    memberDetailControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function memberDetailControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
        $rootScope.title = $state.$current.data.pageTitle;
        $scope.activity_id = $window.localStorage.getItem("activity_id");
        $scope.uid = $window.localStorage.getItem("uid");
        $scope.token=$window.localStorage.getItem("token");
        $scope.target_uid=$window.localStorage.getItem("target_uid");
        $scope.is=$window.localStorage.getItem("is");
        $scope.call0=false;
        $scope.calln=false;
        $scope.callmsg=false;
        var msg='';
        $scope.call0div=true



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


        //页面初始化
        $scope.init=function () {
            //console.log($scope.target_uid)
            $rootScope.li= layer.open({
                type: 2
                ,content: '加载中'
            });

            var url="http://api.jdhn.top/home/ustore/uMemberInfo?callback=JSON_CALLBACK&token="+$scope.token+"&uid="+$scope.uid+"&target_uid="+$scope.target_uid;
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
                if(result.code==1)
                {
                    $scope.data=result.data;
                    $scope.chatState=result.chatState;
                    $scope.marrayInfo=result.marrayInfo;
                    $scope.chatState=result.chatState;
                    $scope.upair=result.upair;
                    $scope.TagList=result.chars;

                    if(result.move==2)
                    {
                        $scope.isshow1=false;
                        $scope.isshow2=true;

                    }
                    else
                    {
                        $scope.isshow1=true;
                        $scope.isshow2=false;
                    }

                    if(!$scope.data.u_intro)
                        $scope.data.u_intro='愿每一位优秀的人都不再孤单！'


                    if(result.data.u_state1=='343'){
                        $scope.smrz=true;
                    }
                    if(result.data.u_state2=='342'){
                        $scope.gzrz=true;
                    }

                    if(result.data.u_state3=='344'){
                        $scope.xlrz=true;
                    }


                    // if(result.data.u_marriage==1)
                        // $scope.data.u_marriage='已婚'
                    // if(result.data.u_marriage==2)
                        // $scope.data.u_marriage='未婚'
                    // if(result.data.u_marriage==0)
                        // $scope.data.u_marriage='未填'
					 if(result.data.u_marriage==0)
                        $scope.data.u_marriage='未填'
					 if(result.data.u_marriage==1)
                        $scope.data.u_marriage='未婚(单身)'
                    if(result.data.u_marriage==2)
                        $scope.data.u_marriage='离异(单身)'
                    if(result.data.u_marriage==3)
                        $scope.data.u_marriage='丧偶(单身)'
					if(result.data.u_marriage==4)
                        $scope.data.u_marriage='恋爱中'
                    if(result.data.u_marriage==5)
                        $scope.data.u_marriage='已婚'
					

                    if(result.data.u_personImg)
                       $scope.u_personImgs=result.data.u_personImg.split(',');

                    if( $scope.data.u_cover==null)
                        $scope.data.u_cover='img/u_cover.jpg'


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

                    for(var i=0;i<$scope.u_work.length;i++)
                    {
                        if($scope.u_work[i].id==$scope.data.u_work_property)
                            $scope.data.u_work_property=$scope.u_work[i].name
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
                    for(var i=0;i<$scope.hobbyList.length;i++)
                    {
                        if($scope.hobbyList[i].id==$scope.data.u_hobby)
                            $scope.data.u_hobby=$scope.hobbyList[i].name
                    }




                    if( $scope.marrayInfo)
                    {
                        if($scope.marrayInfo.age)
                        {
                            $scope.marrayInfo.age=$scope.marrayInfo.age.split(',')[0]+'-'+$scope.marrayInfo.age.split(',')[1]
                        }

                        if($scope.marrayInfo.height!=null && $scope.marrayInfo.height!='' )
                        {
                            $scope.marrayInfo.height=$scope.marrayInfo.height.split(',')[0] +'-'+$scope.marrayInfo.height.split(',')[1]
                        }




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
                        for(var i=0;i<$scope.u_height.length;i++)
                        {
                            if($scope.u_height[i].id==$scope.marrayInfo.height)
                                $scope.marrayInfo.height=$scope.u_height[i].name
                        }

                        $scope.u_education2=[
                            {"id":"11","name":"不限"},
                            {"id":"15","name":"学士"},
                            {"id":"16","name":"硕士"},
                            {"id":"17","name":"博士"}
                        ]
                        for(var i=0;i<$scope.u_education2.length;i++)
                        {
                            if($scope.u_education2[i].id==$scope.marrayInfo.degree)
                                $scope.marrayInfo.degree=$scope.u_education2[i].name
                        }

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
                        for(var i=0;i<$scope.u_work2.length;i++)
                        {
                            if($scope.u_work2[i].id==$scope.marrayInfo.work_property)
                                $scope.marrayInfo.work_property=$scope.u_work2[i].name
                        }

                        $scope.u_marriagelist2=[
                            {"id":"0","name":"不限"},
                            {"id":"1","name":"未婚(单身)"},
                            {"id":"2","name":"离异(单身)"},
                            {"id":"3","name":"丧偶(单身)"},
                            {"id":"4","name":"恋爱中"},
                            {"id":"5","name":"已婚"}
                        ]
                        for(var i=0;i<$scope.u_marriagelist2.length;i++)
                        {
                            if($scope.u_marriagelist2[i].id==$scope.marrayInfo.marry_state)
                                $scope.marrayInfo.marry_state=$scope.u_marriagelist2[i].name
                        }






                    }











                }

            })

            //$scope.payment();




        }

        //点回
        $scope.out=function()
        {
            $scope.call0=false;
            $scope.calln=false;
            $scope.callmsg=false;
            $scope.call0img=false;
            $scope.call0div=true



        }
        $scope.donothing=function()
        {
            event.stopPropagation();
            event.preventDefault();
        }


        //设置心动
        $scope.setMove=function () {
            $rootScope.li= layer.open({
                type: 2
                ,content: '发送中'
            });
            var url="http://api.jdhn.top/home/ustore/setMoved?callback=JSON_CALLBACK&token="+$scope.token+"&uid="+$scope.uid+"&target_uid="+$scope.target_uid+"&status="+'1';
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
                if(result.code==1)
                {
                    $scope.isshow1=true;
                    $scope.isshow2=false;
                    layer.open({
                        content:'已给对方发送一枚小心心！!',
                        skin:'msg',
                        time:2
                    })

                }


            })


        }


        //私信心动
        $scope.CallMove=function()
        {
            $rootScope.li= layer.open({
                type: 2
                ,content: '私信中'
            });

            if($scope.chatState==1)
            {
                $window.location.href='http://www.jdhn.top/#/chatDetails'
                $window.localStorage.setItem("chatDetails_id",$scope.upair);

                return
            }


            if($scope.upair>0)
            {
                $scope.call0=false;
                $scope.calln=false;
                $scope.callmsg=true;
            }


            var url='http://api.jdhn.top/home/ustore/msgNum?callback=JSON_CALLBACK&uid='+$scope.uid+'&token='+$scope.token;
            $http.jsonp(url).success(function(result)
            {
                // console.log(result)

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


                if(result.data==null)
                {
                    result.data={}
                    result.data.usage_buy=0;
                    result.data.usage_love=0;
                    result.data.usage_recom=0;
					result.data.usage_free=0;


                }



                if(result.code!=401)
                {

                    $scope.msgTotal=parseInt(result.data.usage_buy)+parseInt(result.data.usage_free)+parseInt(result.data.usage_recom);
                    if(result.uvip==0)
                    {
                        if($scope.upair >0)
                        {
                            $scope.call0=false;
                            $scope.calln=false;
                            $scope.callmsg=true;

                        }
                        else{
                            if(parseInt(result.data.usage_buy)+parseInt(result.data.usage_free)+parseInt(result.data.usage_recom) ==0)
                            {
                                $scope.call0=true;
                                $scope.calln=false;
                                $scope.callmsg=false;
                            }
                            if(parseInt(result.data.usage_buy)+parseInt(result.data.usage_free)+parseInt(result.data.usage_recom)>0)
                            {

                                $scope.call0=false;
                                $scope.calln=true;
                                $scope.callmsg=false;
                            }


                        }


                    }

                    if(result.uvip==99)
                    {
                        $scope.call0=false;
                        $scope.calln=false;
                        $scope.callmsg=true;
                    }

                    if(result.data.usage_free>0)
                        $scope.usage_free_msg='免费体验'+result.data.usage_free+'次;'
                    else
                        $scope.usage_free_msg=''
                    if(result.data.usage_buy>0)
                       $scope.usage_buy_msg='购买剩余'+result.data.usage_buy+'次;'
                    else
                        $scope.usage_buy_msg=''

                    if(result.data.usage_recom>0)
                        $scope.usage_recom_msg='推荐剩余'+result.data.usage_recom+'次;'
                    else
                        $scope.usage_recom_msg=''





                }
                else
                {
                    $scope.call0=true;
                    $scope.calln=false;
                    $scope.callmsg=false;

                }







            })



        }


        //立即发送
        $scope.ljfsClick=function()
        {
            $scope.call0=false;
            $scope.calln=false;
            $scope.callmsg=true;

        }


        //选择语句
        $scope.setMsg=function($event,id)
        {
            msg=$event.target.getAttribute('msg');

            $('#gdyj_0101').attr('src','img/gdyj_0101.gif')
            $('#gdyj_0201').attr('src','img/gdyj_0201.gif')
            $('#gdyj_0301').attr('src','img/gdyj_0301.gif')
            $('#gdyj_0401').attr('src','img/gdyj_0401.gif')
            $('#gdyj_0501').attr('src','img/gdyj_0501.gif')

            if(id==1)
                $('#gdyj_0101').attr('src','img/gdyj_0102.png')
            if(id==2)
                $('#gdyj_0201').attr('src','img/gdyj_0202.png')
            if(id==3)
                $('#gdyj_0301').attr('src','img/gdyj_0302.png')
            if(id==4)
                $('#gdyj_0401').attr('src','img/gdyj_0402.png')
            if(id==5)
                $('#gdyj_0501').attr('src','img/gdyj_0502.png')





        }



        //发送
        $scope.sendMsg=function()
        {

            var url='http://api.jdhn.top/home/ustore/msg'
            $rootScope.li= layer.open({
                type: 2
                ,content: '发送中'
            });

            var data={
                'token':$scope.token,
                'uid':$scope.uid,
                'target_uid':$scope.target_uid,
                'msg':msg

            }

            $http({
                method:'post',
                url:url,
                data: $.param(data),
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},

            }).success(function(result){
                console.log(result)
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
                    'content':result.message,
                    'skin':'msg',
                    'time':2

                })

                $('#gdyj_0101').attr('src','img/gdyj_0101.gif')
                $('#gdyj_0201').attr('src','img/gdyj_0201.gif')
                $('#gdyj_0301').attr('src','img/gdyj_0301.gif')
                $('#gdyj_0401').attr('src','img/gdyj_0401.gif')
                $('#gdyj_0501').attr('src','img/gdyj_0501.gif')

                $scope.call0=false;
                $scope.calln=false;
                $scope.callmsg=false;
				location.reload()


            })


        }


        //去邀请
        $scope.qyq=function()
        {
            var myurl='http://api.jdhn.top/home/ustore/recom?callback=JSON_CALLBACK&token='+$scope.token+'&uid='+$scope.uid;
            $http.jsonp(myurl).success(function(result)
            {
				// console.log(result)
                //返回的分享地址
                var shareurl=result.data;
				var referCode=result.referCode;
                $window.localStorage.setItem('recom_url',shareurl)
				$window.localStorage.setItem('referCode',referCode)
				 // var url="www.jdhn.top";

                //配置接口
                var myurl='http://api.jdhn.top/home/share'
                var mydata={
                    'url':$window.location.href.split("#")[0]
					 // 'url':'http://www.jdhn.top'
                }

                $http({
                    method:'post',
                    url:myurl,
                    data: $.param(mydata),
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},

                }).success(function(result){
                    var data=result.data;
                    // console.log(data)
                    //配置微信
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



                    var shareTitle = "快来注册交大红娘，一起脱单！";
                    var shareDesc = "愿每一位优秀的人都不再孤单！";
                    var shareImg = "http://www.jdhn.top/img/shareImg.jpg";
					//console.log(url)
					var url = "http://www.jdhn.top/memberDetailSharePage.html?referCode="+referCode;
		
					// console.log(url)
					// console.log(referCode)
					
					   $scope.share=function() {

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
					
                    wx.ready(function() {
                        $scope.share();
                    });
               






                })

                $scope.call0div=false;
                $scope.call0img=true;








            })






        }







        //付费发送
        var wxpay='';
        $scope.payment=function(){
			$scope.call0=false;
			
            var w=layer.open({
                type: 5
                ,content: '加载中'
            });

            var url='http://api.jdhn.top/home/upay'

            var data={"uid":$scope.uid,"token":$scope.token,"fee":'6.99'}

            $http({
                method:'post',
                url:url,
                data: $.param(data),
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},

            }).success(function(data){
                   //console.log(data)
                $scope.tradeNum=data.tradeNum;

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
                })

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

                    //alert(res.err_code+res.err_desc+res.err_msg);
                    if(res.err_msg == 'get_brand_wcpay_request:fail' || res.err_msg == 'get_brand_wcpay_request:cancel') {
                        layer.open({
                            content:"支付失败，请重新支付"
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        return;
                    }else{
				


                        $.ajax({
                            url:'http;//api/api.jdhn.top/home/ustore/judgeOrder',
                            // url：'http://api.jdhn.top/home/ustore/msgNum',
                            data:{"uid":$scope.uid,"token":$scope.token,'tradeNum':$scope.tradeNum},
                            type:'post',
                            success:function(res) {
                                var data = JSON.parse(res);
                                if(data.code == 1) {
                                    layer.open({
                                        content:"支付成功"
                                        ,skin: 'msg'
                                        ,time: 2 //2秒后自动关闭
                                    });
									
								

                                    if(data.data.usage_free>0)
                                        $scope.usage_free_msg='免费体验'+data.data.usage_free+'次;'
                                    else
                                        $scope.usage_free_msg=''
                                    if(data.data.usage_buy>0)
                                        $scope.usage_buy_msg='购买剩余'+data.data.usage_buy+'次;'
                                    else
                                        $scope.usage_buy_msg=''

                                    if(data.data.usage_recom>0)
                                        $scope.usage_recom_msg='推荐剩余'+data.data.usage_recom+'次;'
                                    else
                                        $scope.usage_recom_msg=''



                                    $scope.msgTotal=parseInt(data.data.usage_love)+parseInt(data.data.usage_recom)+parseInt(data.data.usage_buy)+parseInt(data.data.usage_free)
                                    // window.location.reload()
                                }else if(data.code==510){
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


        $scope.nims=function(v){
            if(v=="" || v==null){
                return "未填写"
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
            // if(v=="31"){
                // return "未填写";
            // }else if(v=="32"){
                // return "10万以下";
            // }else if(v=="33"){
                // return "10万-20万";
            // }else if(v=="34"){
                // return "20万-30万";
            // }else if(v=="35"){
                // return "30万以上";
            // }
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
            }else if(v=="4"){
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


        $scope.init();






    }


})();