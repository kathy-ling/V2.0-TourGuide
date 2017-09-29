/*//解析服务端返回的数据
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURI(r[2]);
	return null;
}

//获取服务端返回的数据
var appId = getQueryString("appid");
var timeStamp = getQueryString("timeStamp");
var nonceStr = getQueryString("nonceStr");
var packageValue = getQueryString("package");
var paySign = getQueryString("sign");

alert("appId："+appId +" timeStamp："+timeStamp+"nonceStr:"+nonceStr+"packageValue:"+packageValue+"paySign:"+paySign);
*/
//js向servlet传参数
/*function dispatchServlet(openId,money){  
	var tmp = document.createElement("form"); 
	var action = "http://www.zhoudaoly.com/TourGuide/TopayServlet?+
	"openId="+openId+"&money="+money+"";
	
	tmp.action = action; 
	tmp.method = "post"; 
	document.body.appendChild(tmp); 
	tmp.submit(); 
	return tmp; 
	callpay();
} */

var appId = "";
var timeStamp = "";
var nonceStr = "";
var packageValue = "";
var paySign = "";

function callpay(openId,money,orderID){
	$.ajax({
		type:"post",
		url:"http://www.zhoudaoly.com/TourGuide/TopayServlet?openId="+openId+"&money="+money+"&orderID="+orderID+"",
		async:false,
		datatype: "JSON",
		error:function(data)
		{
			alert('支付出错，请重新支付');
			window.location.href=HOST+'/web/orderFormListUI.html';
		},
		success:function(data)
		{	
            if(data != null){  			 	
               appId = data.appId;
               timeStamp = data.timeStamp;    
               nonceStr = data.nonceStr;  
               packageValue = data.packageValue;
               paySign = data.sign;
               
               pay(orderID);
            }
		}
	});
}

///////////////////////////////////////////////////////////////////
//唤起微信支付  
function pay(orderID){    
    if (typeof WeixinJSBridge == "undefined"){    
       if( document.addEventListener ){    
           document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);    
       }else if (document.attachEvent){    
           document.attachEvent('WeixinJSBridgeReady', onBridgeReady);     
           document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);    
       }    
    }else{    
       onBridgeReady(orderID);    
    }     
        
}    
  
//开始支付  
function onBridgeReady(orderID){    
    WeixinJSBridge.invoke(    
        'getBrandWCPayRequest', {    
            "appId" : appId,
	  		"timeStamp" : timeStamp, 
	  		"nonceStr" : nonceStr, 
	  		"package" : packageValue,
	  		"signType" : "MD5", 
	  		"paySign" : paySign
        },    
            
        function(res){         
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {  
            	updatePayInfo(orderID);
            }else if (res.err_msg == "get_brand_wcpay_request:cancel")  {  
                alert("支付过程中用户取消");
                window.location.href=HOST+'/web/orderFormListUI.html';
            }else{
               alert("支付失败");
               window.location.href=HOST+'/web/orderFormListUI.html';
            }       
        }    
    );     
 } 
 
 //支付成功，更新订单相关的信息
 function updatePayInfo(orderID){
 	var url=HOST+"/updatePayInfo.do";
	
	$.ajax({
		type:"post",
		async:false,
		url:url,
		data:{orderID:orderID},
		error:function()
		{
			alert('订单支付失败，请重新支付');
			 window.location.href=HOST+'/web/orderFormListUI.html';
		},
		success:function(data)
		{
			alert("支付信息更新结果="+data);
			window.location.href=HOST+'/web/orderFormListUI.html';
		}
	});
 }
