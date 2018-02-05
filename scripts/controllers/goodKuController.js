(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('goodKuControl', goodKuControl)

    goodKuControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http','$ionicModal'];

    function goodKuControl($scope, $rootScope, $state, $timeout, $window, $location, $http, $ionicModal) {
        $rootScope.title = $state.$current.data.pageTitle;
        $scope.activity_id = $window.localStorage.getItem("activity_id");
        $scope.uid = $window.localStorage.getItem("uid");
        $scope.token=$window.localStorage.getItem("token");
        $scope.is=$window.localStorage.getItem("is");
        $scope.isShowDetail=false;
        $scope.isShowBq=true;



        if($scope.token==""||$scope.token==null){
            $state.go("login");
            return;
        }else if($scope.uid==""||$scope.uid==null){
            $state.go("login");
            return;
        }


        /*---------------------------------------------U库过渡页------------------------------------------------------------*/




        $scope.nextStep=function () {
            $rootScope.li= layer.open({
                type: 2
                ,content: '加载中'
            });
            var url="http://api.jdhn.top/home/ustore/getLabelState?callback=JSON_CALLBACK&token="+$scope.token+'&uid='+$scope.uid;
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
                if(result.code==0)
                {
					
                    var url="http://api.jdhn.top/home/ustore/getChars?callback=JSON_CALLBACK&token="+$scope.token+'&uid='+$scope.uid;
                    $http.jsonp(url).success(function (result) {

                        //console.log(result)
                        $scope.Chars=result.chars;
                        $scope.Hobby=result.hobby;
                        $scope.Other=result.other;

                        $scope.chars=$scope.Chars.slice(0,6);
                        $scope.hobby=$scope.Hobby.slice(0,6);
                        $scope.other=$scope.Other.slice(0,6);
                        $scope.openModal();
                    })

                }
                else
                {
             
				
                    $state.go('goodKu02')
                }

            })
        }

		
		if($rootScope.backIndex==1)
		{
			$rootScope.backIndex=0
		}
		else
		{
		 $(function(){
           $timeout($scope.nextStep,2000)
			})
		}

       



        /*---------------------------------------------U库标签页------------------------------------------------------------*/

        //换一批chars
        var charsIndex=0;
        $scope.changeChars=function () {

            //console.log($scope.charsChosed)

            for(var i=0;i<$scope.Chars.length;i++)
            {
                for(var j=0;j<$scope.charsChosed.length;j++)
                {
                    if($scope.Chars[i].id==$scope.charsChosed[j].id)
                    {
                        $scope.Chars.splice(i,1);
                    }

                }
            }


            charsIndex++;
            if(charsIndex*6+6<$scope.Chars.length)
            {
                $scope.chars=$scope.Chars.slice(charsIndex*6,charsIndex*6+6);
            }
            else
            {
                $scope.chars=$scope.Chars.slice(charsIndex*6,$scope.Chars.length);
                $scope.chars=$scope.chars.concat($scope.Chars.slice(0,6-($scope.Chars.length-charsIndex*6)));
                charsIndex=-1;
            }
			
			
			 for(var i=0;i<$scope.charsChosed.length;i++)
            {
				
				var obj1={
					'id':$scope.chars[$scope.charsChosed[i].num].id,
					'char_name': $scope.chars[$scope.charsChosed[i].num].char_name
				}
				var obj2={
					'id':$scope.charsChosed[i].id,
					'char_name':$scope.charsChosed[i].text
				}
                $scope.chars[$scope.charsChosed[i].num].id=$scope.charsChosed[i].id
                $scope.chars[$scope.charsChosed[i].num].char_name=$scope.charsChosed[i].text;
				
				
				
			
				//console.log($scope.Chars)
				var change1=-1;
				var change2=-1;
				for(var j=0;j<$scope.Chars.length;j++)
				{
					if($scope.Chars[j].id==obj1.id)
					{
						change1=j;
					
					}
					if($scope.Chars[j].id==obj2.id)
					{
						change2=j;
				
					}
					
					
				}
				$scope.Chars[change1]=obj2;
				$scope.Chars[change2]=obj1;
				
				
				
				
		
            }
			

           

            //$('.chars .ykbqGrey').attr('src','img/ykbqGrey.png')
        }
        //换一批hobby
        var hobbyIndex=0;
        $scope.changeHobby=function () {
            //console.log($scope.hobbyChosed)
            for(var i=0;i<$scope.Hobby.length;i++)
            {
                for(var j=0;j<$scope.hobbyChosed.length;j++)
                {
                    if($scope.Hobby[i].id==$scope.hobbyChosed[j].id)
                        $scope.Hobby.splice(i,1);
                }
            }

            hobbyIndex++;

            if(hobbyIndex*6+6<$scope.Hobby.length)
            {
                $scope.hobby=$scope.Hobby.slice(hobbyIndex*6,hobbyIndex*6+6);
            }
            else
            {
                $scope.hobby=$scope.Hobby.slice(hobbyIndex*6,$scope.Hobby.length);
                $scope.hobby=$scope.hobby.concat($scope.Hobby.slice(0,6-($scope.Hobby.length-hobbyIndex*6)));
                hobbyIndex=-1;
            }
			
			
			
			//console.log($scope.hobbyChosed)

            for(var i=0;i<$scope.hobbyChosed.length;i++)
            {
				
				var obj1={
					'id':$scope.hobby[$scope.hobbyChosed[i].num].id,
					'char_name': $scope.hobby[$scope.hobbyChosed[i].num].char_name
				}
				var obj2={
					'id':$scope.hobbyChosed[i].id,
					'char_name':$scope.hobbyChosed[i].text
				}
                $scope.hobby[$scope.hobbyChosed[i].num].id=$scope.hobbyChosed[i].id
                $scope.hobby[$scope.hobbyChosed[i].num].char_name=$scope.hobbyChosed[i].text;
				
				
				
			
				//console.log($scope.Hobby)
				var change1=-1;
				var change2=-1;
				for(var j=0;j<$scope.Hobby.length;j++)
				{
					if($scope.Hobby[j].id==obj1.id)
					{
						change1=j;
					
					}
					if($scope.Hobby[j].id==obj2.id)
					{
						change2=j;
				
					}
					
					
				}
				$scope.Hobby[change1]=obj2;
				$scope.Hobby[change2]=obj1;
				
				
				
				
		
            }
            //$('.hobby .ykbqGrey').attr('src','img/ykbqGrey.png')

        }
        //换一批other
        var otherIndex=0;
        $scope.changeOther=function () {
            //console.log($scope.otherChosed)

            for(var i=0;i<$scope.Other.length;i++)
            {
                for(var j=0;j<$scope.otherChosed.length;j++)
                {
                    if($scope.Other[i].id==$scope.otherChosed[j].id)
                        $scope.Other.splice(i,1);
                }
            }


            otherIndex++;
            if(otherIndex*6+6<$scope.Other.length)
            {
                $scope.other=$scope.Other.slice(otherIndex*6,otherIndex*6+6);
            }
            else
            {
                $scope.other=$scope.Other.slice(otherIndex*6,$scope.Other.length);
                $scope.other=$scope.other.concat($scope.Other.slice(0,6-($scope.Other.length-otherIndex*6)));
                otherIndex=-1;
            }
			
			 for(var i=0;i<$scope.otherChosed.length;i++)
            {
				
				var obj1={
					'id':$scope.other[$scope.otherChosed[i].num].id,
					'char_name': $scope.other[$scope.otherChosed[i].num].char_name
				}
				var obj2={
					'id':$scope.otherChosed[i].id,
					'char_name':$scope.otherChosed[i].text
				}
                $scope.other[$scope.otherChosed[i].num].id=$scope.otherChosed[i].id
                $scope.other[$scope.otherChosed[i].num].char_name=$scope.otherChosed[i].text;
				
				
				
			
				//console.log($scope.Other)
				var change1=-1;
				var change2=-1;
				for(var j=0;j<$scope.Other.length;j++)
				{
					if($scope.Other[j].id==obj1.id)
					{
						change1=j;
					
					}
					if($scope.Other[j].id==obj2.id)
					{
						change2=j;
				
					}
					
					
				}
				$scope.Other[change1]=obj2;
				$scope.Other[change2]=obj1;
				
				
				
				
		
            }

           


        }

        //选择标签
        $scope.charsChosed=[];
        $scope.hobbyChosed=[];
        $scope.otherChosed=[];

        var charsCount=0;
        $scope.getChars=function (event) {
            var obj={
                'num':event.target.getAttribute('num'),
                'id':event.target.id,
                'text':event.target.innerText

            }

            if(charsCount<3)
            {
					for(var i=0;i<$scope.charsChosed.length;i++)
					{
						if($scope.charsChosed[i].id==event.target.id)
							$scope.charsChosed.splice(i,1);
							
					}
                if(  event.target.previousElementSibling.getAttribute('src')=='img/TagBlueFour.png')
                {
                    event.target.previousElementSibling.setAttribute('src','img/TagGreyFour.png')
					
			
					
                    charsCount--;


                }

                else
                {
                    event.target.previousElementSibling.setAttribute('src','img/TagBlueFour.png')
                    $scope.charsChosed.push(obj);
                    charsCount++;
                }

            }
            else
            {
				for(var i=0;i<$scope.charsChosed.length;i++)
					{
						if($scope.charsChosed[i].id==event.target.id)
							$scope.charsChosed.splice(i,1);
							
					}
                if(  event.target.previousElementSibling.getAttribute('src')=='img/TagBlueFour.png')
                {
                    event.target.previousElementSibling.setAttribute('src','img/TagGreyFour.png')
                    charsCount--;

                }

            }

            
        }

        var hobbyCount=0;
        $scope.getHobby=function (event) {
			 var obj={
                'num':event.target.getAttribute('num'),
                'id':event.target.id,
                'text':event.target.innerText

            }
            

            if(hobbyCount<3)
            {
				for(var i=0;i<$scope.hobbyChosed.length;i++)
					{
						if($scope.hobbyChosed[i].id==event.target.id)
							$scope.hobbyChosed.splice(i,1);
							
					}
                if(  event.target.previousElementSibling.getAttribute('src')=='img/TagBlueFour.png')
                {
                    event.target.previousElementSibling.setAttribute('src','img/TagGreyFour.png')
                    hobbyCount--;

                }

                else
                {
                    event.target.previousElementSibling.setAttribute('src','img/TagBlueFour.png')
                    hobbyCount++;
					$scope.hobbyChosed.push(obj);
                }

            }
            else
            {
				for(var i=0;i<$scope.hobbyChosed.length;i++)
					{
						if($scope.hobbyChosed[i].id==event.target.id)
							$scope.hobbyChosed.splice(i,1);
							
					}
                if(  event.target.previousElementSibling.getAttribute('src')=='img/TagBlueFour.png')
                {
                    event.target.previousElementSibling.setAttribute('src','img/TagGreyFour.png')
                    hobbyCount--;

                }

            }


        }

        var otherCount=0;
        $scope.getOther=function (event) {
			 var obj={
                'num':event.target.getAttribute('num'),
                'id':event.target.id,
                'text':event.target.innerText

            }
           
            if(otherCount<3)
            {
				for(var i=0;i<$scope.otherChosed.length;i++)
					{
						if($scope.otherChosed[i].id==event.target.id)
							$scope.otherChosed.splice(i,1);
							
					}
                if(  event.target.previousElementSibling.getAttribute('src')=='img/TagBlueFour.png')
                {
                    event.target.previousElementSibling.setAttribute('src','img/TagGreyFour.png')
                    otherCount--;

                }

                else
                {
                    event.target.previousElementSibling.setAttribute('src','img/TagBlueFour.png')
                    otherCount++;
					 $scope.otherChosed.push(obj);
                }

            }
            else
            {
				for(var i=0;i<$scope.otherChosed.length;i++)
					{
						if($scope.otherChosed[i].id==event.target.id)
							$scope.otherChosed.splice(i,1);
							
					}
                if(  event.target.previousElementSibling.getAttribute('src')=='img/TagBlueFour.png')
                {
                    event.target.previousElementSibling.setAttribute('src','img/TagGreyFour.png')
                    otherCount--;

                }

            }
        }





        //点击蓝色圆形提交按钮
        $scope.toPagegoodKu02=function () {
            //console.log($scope.token)
            //console.log($scope.charsChosed)
            //console.log($scope.hobbyChosed)
            //console.log($scope.otherChosed)
            var charsChosedString1=[ ];
            var hobbyChosedString1=[ ];
            var otherChosedString1=[ ];

            for(var i=0;i<$scope.charsChosed.length;i++)
            {
                charsChosedString1.push($scope.charsChosed[i].id)

            }
            for(var i=0;i<$scope.hobbyChosed.length;i++)
            {
              hobbyChosedString1.push($scope.hobbyChosed[i].id)

            }
            for(var i=0;i<$scope.otherChosed.length;i++)
            {
               otherChosedString1.push($scope.otherChosed[i].id)

            }

            var charsChosedString=charsChosedString1.join(',');
            var hobbyChosedString=hobbyChosedString1.join(',');
            var otherChosedString=otherChosedString1.join(',');
            //console.log(charsChosedString)
            //console.log(hobbyChosedString)
            //console.log(otherChosedString)
			
			if(!charsChosedString || !hobbyChosedString || !otherChosedString )
			{
				layer.open({
					content: '每类标签请选择1~3个'
					,skin: 'msg'
					,time: 2 //2秒后自动关闭
				});
				return;
			}

            $rootScope.li= layer.open({
                type: 2
                ,content: '提交中'
            });

            var url="http://api.jdhn.top/home/ustore/subChars";
            $http({
                method:'post',
                url:"http://api.jdhn.top/home/ustore/subChars",
                data:$.param({
                    token:$scope.token,
                    uid:$scope.uid,
                    character:charsChosedString,
                    hobby:hobbyChosedString,
                    other:otherChosedString
                }),
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

            }).success(function(result){
                // console.log(result);
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
						 $state.go('goodKu02')
						layer.open({
							'content':'设置成功',
							'skin':'msg',
							'time':2
						})
						
					}
                       

            })




            // $state.go('goodKu02');

        }











        /*---------------------------------------------模态框---------------------------------------------------*/
        $ionicModal.fromTemplateUrl('chooseBq.html', {
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

        $scope.nextPage=function () {
            $state.go('goodKu02')

        }







    }


})();