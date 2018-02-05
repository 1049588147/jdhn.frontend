<?php
include 'Wxpay.php';
$wxpay = new Wxpay();

//获得openid
//$openId = $wxpay->GetOpenid();
$openId = 'oUHwiwVNoxAr5tgpHWDEGUnGxS-g';
//设置商品描述
$wxpay->SetBody('设置商品描述');
//设置附加数据
$wxpay->SetAttach('附加数据');
//设置订单号
$wxpay->SetOut_trade_no(Wxpay::param['MCHID'].date('YmdHis'));
//设置订单总金额
$wxpay->SetTotal_fee(1);
//设置订单开始时间
$wxpay->SetTime_start(date("YmdHis"));
//设置订单结束时间
$wxpay->SetTime_expire(date("YmdHis", time() + 600));
//设置商品标记
$wxpay->SetGoods_tag("商品标记");
//设置接收微信支付异步通知回调地址
$wxpay->SetNotify_url("http://paysdk.weixin.qq.com/example/notify.php");
//设置支付方式
$wxpay->SetTrade_type("JSAPI");
//设置用户openID
//$openId = 'oUHwiwZm34VAIS6fzqVKDFH2kN18';
$wxpay->SetOpenid($openId);

$order = Wxpay::unifiedOrder($wxpay);

//获取jsapi参数
$jsapi = new Wxpay();
$jsApiParameters = $jsapi->GetJsApiParameters($order);
exit(json_encode(array('code'=>'1','data'=>$jsApiParameters)));