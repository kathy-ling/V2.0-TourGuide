var orderId = GetUrlem("orderId");
var type = GetUrlem("type");

$(function(){
	
	$("#notMine").hide();
	$("#isMine").hide();
	
	
	setOrderInfo();
});

$(document).ready(function() {

	var url = window.location.href;
	var url11 = HOST + "/weixinScan.do";
	
	//ajax注入权限验证  
	$.ajax({
		url: url11,
		dataType: 'json',
		data: {
			"url": url
		},
		complete: function(XMLHttpRequest, textStatus) {

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("发生错误：" + errorThrown);
		},
		success: function(res) {
			var appId = res.appId;
			var noncestr = res.nonceStr;
			var jsapi_ticket = res.jsapi_ticket;
			var timestamp = res.timestamp;
			var signature = res.signature;

			wx.config({
				debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
				appId: appId, //必填，公众号的唯一标识  
				timestamp: timestamp, // 必填，生成签名的时间戳  
				nonceStr: noncestr, //必填，生成签名的随机串  
				signature: signature, // 必填，签名，见附录1  
				jsApiList: ['checkJsApi', 'scanQRCode'] //必填，需要使用的JS接口列表，所有JS接口列表 见附录2  
			});
		}
	});

	wx.error(function(res) {
		alert("出错了：" + res.errMsg);
	});

	//通过ready接口处理成功验证
	wx.ready(function() {
		wx.checkJsApi({
			jsApiList: ['scanQRCode'],
			success: function(res) {	
				alert("sucess2");
			}
		});
	}); 	
});

function setOrderInfo()
{
	$.ajax({
		type:"post",
		url:HOST+"/getDetailOrderInfo.do",
		async:true,
		data:{orderID:orderId},
		datatype:"JSON",
		error:function()
		{
			alert("Error:获取订单详情失败");
		},
		success:function(data)
		{ 
			if(JSON.stringify(data)!="[]"){
				//参观时间
				timeDay = data[0].visitTime.substring(5,16);
				//当前时间
				var nowTime = getNowFormatDate();
				//剩余时间
				leftTime =getTimeDiff(nowTime,data[0].visitTime);
				
				$("#sname").html(data[0].scenicName);
				$("#vTime").html(timeDay);
				$("#lTime").html(leftTime);
				$("#vNum").html(data[0].visitNum);
				$("#gFee").html(data[0].money);
				
				$("#type").html(type);
				
				$("#Osname").html(data[0].scenicName);
				$("#OvTime").html(timeDay);
				$("#OlTime").html(leftTime);
				$("#OvNum").html(data[0].visitNum);
				$("#OgFee").html(data[0].money);
				$("#Ostatue").html(data[0].orderState);
				
				$("#vPhone").html(data[0].visitorPhone);
				
				//根据游客手机号设置游客姓名
				var url = HOST+"/getVisitorInfoWithPhone.do";

				$.ajax({
					type:"post",
					url:url,
					async:true,
					data:{phone:data[0].visitorPhone},
					datatype:"JSON",
					error:function()
					{
						alert("显示游客信息Request error!");
					},
					success:function(data)
					{
						if(JSON.stringify(data)!="{}"){
							$("#vName").html(data.name);
						}
					}
				});
			}
			
		}
	});
}

//扫码确认
function scanConfirm()
{
//	$("#myPopupDialog").popup('open');
	wx.scanQRCode({
		needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，  
		scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有  
		success: function(res) {
			var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果  
			alert("扫描成功::扫描码=" + result);
//			consistOrderID = result;
			
			$(".orderFormId").html(result);//游客的订单号
			//扫码得到游客的订单号，查看订单的相关信息
			
//			alert("before myPopupDialog");
			$("#myPopupDialog").popup('open');
//			alert("after myPopupDialog");
			
			setData();						
		}
	});
}

//游客的订单的相关信息
function setData(){
	  
	//是我的单
	isMyOrder();
	//$("#result").html("主人，终于找到你啦！");	
	$("#isMine").show();
	
	var orderID = $(".orderFormId").html();//游客的订单号
	
	if(orderID == orderId){
		//是我的单
		isMyOrder();
//		$("#result").html("主人，终于找到你啦！");	
		$("#isMine").show();
	}else{
		notMyOrder();
//		$("#result").html("对不起，您找错人啦！");
		$("#notMine").show();
	}
}


//【yes】是我的订单
function isMyOrder(){
//	var orderId = $("#orderID").html();
	$.ajax({
		type:"post",
		url:HOST+"/doConfirm.do",
		async:true,
		data:{orderId:orderId},
		datatype:"JSON",
		error:function()
		{
			alert("Error:发生未知错误！");
		},
		success:function(data)
		{ 
			if(data == 1){
				$("#confirm").html("已确认");
				alert("订单信息确认成功!");				
				$("#myPopupDialog").popup("close");
				window.location.href="GuideOrdersDetailStart.html?orderId="+orderId+"&type="+type;
			}else{
				alert("订单信息确认失败，请稍后再试！");
			}			
		}
	});	
}

function notMyOrder(){
	$("#myPopupDialog").popup("close");
}

//生成订单的二维码
function produce()
{
	$("#qrcode").empty();
	
	jQuery('#qrcode').qrcode(utf16to8(orderId));
	$("#popupDialog").popup('open');
}

//获取当前日期时间“yyyy-MM-dd HH:MM:SS”
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}


//计算两个时间之间的差值，yyyy-MM-dd HH:MM:SS
function getTimeDiff(time1, time2){
	
	var d1 = new Date(time1).getTime();
	var d2 = new Date(time2).getTime();
	
	var t = (d2 - d1)/ 1000 / 60 /60;//两个时间相差的毫秒数
	
	if(parseInt(t) < 0){
		return 0;
	}
	return parseInt(t.toFixed(1));
}