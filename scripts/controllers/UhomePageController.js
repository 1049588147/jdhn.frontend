(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('UhomePageControl', UhomePageControl)

    UhomePageControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function UhomePageControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
        $rootScope.title = $state.$current.data.pageTitle;
        $scope.activity_id = $window.localStorage.getItem("activity_id");
        $scope.uid = $window.localStorage.getItem("uid");
        $scope.token=$window.localStorage.getItem("token");
        // $scope.target_uid=$window.localStorage.getItem("target_uid");
        $scope.is=$window.localStorage.getItem("is");



        if($scope.token==""||$scope.token==null){
            $state.go("login");
            return;
        }else if($scope.uid==""||$scope.uid==null){
            $state.go("login");
            return;
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


        //页面初始化
        $scope.init=function () {
            //console.log($scope.target_uid)
            $rootScope.li= layer.open({
                type: 2
                ,content: '加载中'
            });
            var url="http://api.jdhn.top/home/ustore/uMemberInfo?callback=JSON_CALLBACK&token="+$scope.token+"&uid="+$scope.uid+"&target_uid="+$scope.uid;
            $http.jsonp(url).success(function (result) {
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
                if(result.code==1)
                {
                    $scope.data=result.data;
                    $scope.marrayInfo=result.marrayInfo;
                    $scope.total=result.total;
					
					if($scope.marrayInfo)
					{
						  if($scope.marrayInfo.height!=null && $scope.marrayInfo.height!='' )
                    {
                        $scope.marrayInfo.height=$scope.marrayInfo.height.split(',')[0] +'-'+$scope.marrayInfo.height.split(',')[1]
                    }
					}

                  

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

                    if(result.data.u_state1=='343'){
                        $scope.smrz=true;
                    }
                    if(result.data.u_state2=='342'){
                        $scope.gzrz=true;
                    }

                    if(result.data.u_state3=='344'){
                        $scope.xlrz=true;
                    }


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


                    if( $scope.data.u_work_property!='' && $scope.data.u_work_property!=null )
                    {
                        for(var i=0;i<$scope.u_work2.length;i++)
                        {
                            if( $scope.data.u_work_property==$scope.u_work2[i].id)
                                $scope.data.u_work_property=$scope.u_work2[i].name

                        }
                    }

                    if( $scope.data.u_hobby!='' && $scope.data.u_hobby!=null )
                    {
                        for(var i=0;i<$scope.hobbyList.length;i++)
                        {
                            if( $scope.data.u_hobby==$scope.hobbyList[i].id)
                                $scope.data.u_hobby=$scope.hobbyList[i].name

                        }
                    }
					
					if($scope.marrayInfo)
					{
						 if( $scope.marrayInfo.height!='' && $scope.marrayInfo.height!=null )
                    {
                        for(var i=0;i<$scope.u_height.length;i++)
                        {
                            if($scope.marrayInfo.height==$scope.u_height[i].id)
                                $scope.marrayInfo.height=$scope.u_height[i].name

                        }
                    }

                    if( $scope.marrayInfo.degree!='' && $scope.marrayInfo.degree!=null )
                    {
                        for(var i=0;i<$scope.u_education.length;i++)
                        {
                            if($scope.marrayInfo.degree==$scope.u_education[i].id)
                                $scope.marrayInfo.degree=$scope.u_education[i].name

                        }
                    }

                    if( $scope.marrayInfo.work_property!='' && $scope.marrayInfo.work_property!=null )
                    {
                        for(var i=0;i<$scope.u_work2.length;i++)
                        {
                            if( $scope.marrayInfo.work_property==$scope.u_work2[i].id)
                                $scope.marrayInfo.work_property=$scope.u_work2[i].name

                        }
                    }

                    if( $scope.marrayInfo.marry_state!='' && $scope.marrayInfo.marry_state!=null )
                    {
                        for(var i=0;i<$scope.u_marriagelist.length;i++)
                        {
                            if( $scope.marrayInfo.marry_state==$scope.u_marriagelist[i].id)
                                $scope.marrayInfo.marry_state=$scope.u_marriagelist[i].name

                        }
                    }

                    if( $scope.marrayInfo.age!='' && $scope.marrayInfo.age!=null)
                    {
                        $scope.marrayInfo.age=$scope.marrayInfo.age.split(',')
						console.log($scope.marrayInfo.age)
						if($scope.marrayInfo.age[0]==0 || $scope.marrayInfo.age[0]==2019  )
							$scope.marrayInfo.age[0]='不限'
						if($scope.marrayInfo.age[1]==0 || $scope.marrayInfo.age[1]==2019  )
							$scope.marrayInfo.age[1]='不限'
							
						
                        $scope.marrayInfo.age=  $scope.marrayInfo.age.join('-')


                    }

					}

                   






                }

            })

        }


        //去点赞页面
        $scope.gowhoLoveMe=function()
        {
            $state.go('whoLoveMe')
        }



        $scope.u_marriagelist=[
            {"id":"0","name":"未选择"},
            {"id":"1","name":"未婚(单身)"},
            {"id":"2","name":"离异(单身)"},
            {"id":"3","name":"丧偶(单身)"},
            {"id":"4","name":"恋爱中"},
            {"id":"5","name":"已婚"}
        ]

        $scope.u_education=[
            {"id":"11","name":"不限"},
			{"id":"15","name":"学士"},
			{"id":"16","name":"硕士"},
			{"id":"17","name":"博士"}
        ]
        $scope.u_height=[
            {'id':'0','name':"未选择"},
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

        $scope.hobbyList=[
            {"id":"0","name":"未选择"},
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