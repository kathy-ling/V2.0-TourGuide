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
	
	alert("into callpay");
	
	$.ajax({
		type:"post",
		url:"http://www.zhoudaoly.com/TourGuide/TopayServlet?openId="+openId+"&money="+money+"&orderID="+orderID+"",
		async:false,
		datatype: "JSON",
		error:function(data)
		{
			alert(JSON.stringify(data));
			alert('支付出错，请重新支付');
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
	
	/*WeixinJSBridge.invoke('getBrandWCPayRequest',{
	 	"appId" : appId,
  		 "timeStamp" : timeStamp, 
  		 "nonceStr" : nonceStr, 
  		 "package" : packageValue,
  		 "signType" : "MD5", 
  		 "paySign" : paySign
	},function(res){
		WeixinJSBridge.log(res.err_msg);
        if(res.err_msg == "get_brand_wcpay_request:ok"){  
            alert("微信支付成功!");  
        }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
            alert("用户取消支付!");  
        }else{  
           alert("支付失败!");  
        }  
	})*/
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
                alert("支付成功");  // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。                  
            }else if (res.err_msg == "get_brand_wcpay_request:cancel")  {  
                alert("支付过程中用户取消");  
            }else{  
               //支付失败  
               alert(res.err_msg)  
            }       
        }    
    );     
 } 
 
 //支付成功，更新订单相关的信息
 function updatePayInfo(orderID){
 	var url=HOST+"/updatePayInfo.do";
	
	$.ajax({
		type:"post",
		url:url,
		data:orderID,
		error:function()
		{
			alert('快捷拼团支付失败，请重新支付');
		},
		success:function(data)
		{
			alert("支付信息更新结果="+data);
			
		}
	});
 }
