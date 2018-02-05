<?php
    $weChat_Login_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx23062c6be91741d3&redirect_uri=http://www.jdhn.top/pay/demo.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    //$weChat_Login_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx23062c6be91741d3&redirect_uri=http://www.jdhn.top/pay/demo.php&response_type=code&scope=snsapi_userbase&state=STATE#wechat_redirect";
    if ($_GET)
    {
        // echo '<pre>';
        // var_dump($_GET);
		// exit('123');
		$url= 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx23062c6be91741d3&secret=daf069242a144526f9f6c485e891ea9a&code='.$_GET['code'].'&grant_type=authorization_code';
		$res = json_decode(file_get_contents($url),true);
		$userInfo_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$res['access_token'].'&openid='.$res['openid'].'&lang=zh_CN';
		// echo "<pre>";
		// var_dump($res);exit();
		$user_Info = json_decode(file_get_contents($userInfo_url),true);
		echo '<pre>';
		var_dump($user_Info);
		exit();
    }else{
			header("Location:$weChat_Login_url");
	}
	
