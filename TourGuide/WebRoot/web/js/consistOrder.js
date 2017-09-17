

$(document).ready(function() {
	
	//加载底部导航栏
	$("#bottom_navigation").load("bottomNavigation.html").trigger("create");
	
	setOrderInfo(); //设置预约信息	
	getFee();
});


//获取session值
function setOrderInfo() {
	var visitDate = GetUrlem("visitDate");
	var visitTime = GetUrlem("visitTime");
	var visitNum = GetUrlem("visitNum");
	var scenicName=GetUrlem("scenicName");
	var visitorPhone=GetUrlem("visitorPhone");
	$(".orderTime").html(visitDate + " " + visitTime);
	$(".visitorCount").html(visitNum);
	$("#scenicName").html(scenicName);	
	$("#visitorPhone").html(visitorPhone);
}


function getFee()
{
	var visitDate = GetUrlem("visitDate");
	var scenicName=GetUrlem("scenicName");
	var visitNum = GetUrlem("visitNum");
	var url = HOST+"/getIntroFee.do";
	var fee;
	$.ajax({
		type:"get",
		url:url,
		async:true,
		data:{scenicName:scenicName,date:visitDate},
		success:function(data)
		{
			var fee;
			if (data*visitNum=="") {
				fee=0;
			} else{
				fee=data*visitNum;
			}
			
			$("#setguideMoney").html(data + "元/人");
			$("#setsumMoney").html(fee + "元");
		},
	});
}

function putOrder() {
	
	var visitDate = GetUrlem("visitDate");
	var visitTime = GetUrlem("visitTime");
	var visitNum = GetUrlem("visitNum");
	var scenicName=GetUrlem("scenicName");
	var visitorPhone=GetUrlem("visitorPhone");
		
	var postData = {
		'scenicName': scenicName,
		'visitTime': visitDate+" "+visitTime,
		'visitNum': visitNum,
		'visitorPhone':vistPhone ,
		'contact':visitorPhone
	};
	alert(JSON.stringify(postData));
	if(vistPhone == "null" || vistPhone == undefined || vistPhone == openId){
		alert("出错啦！");
		return;
	}else{
		releaseConsistOrder(postData);
	}
}

function releaseConsistOrder(postData){
	var url = HOST+"/releaseConsistOrder.do";
	
	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: postData,
		datatype: "JSON",
		error: function() {
			alert("支付订单失败！");
			return false;
		},
		success: function(data) {
			if(data == 1) {
				alert("支付订单成功！");
				window.location.href = "orderFormList.html";
			} else {
				alert("支付订单失败！");
			}
		}
	});
}
	
	
	
	
//function putOrder() {
//	var scenicName=GetUrlem("scenicName");
//	/*var pur = GetUrlem("purchaseTicket");
//	var half = GetUrlem("halfPrice");
//	var disc = GetUrlem("discoutPrice");
//	var full = GetUrlem("fullPrice");*/
//	var visitDate = GetUrlem("visitDate");
//	var visitTime = GetUrlem("visitTime");
//	var visitNum = GetUrlem("visitNum");
//	var guidephone = GetUrlem("phone");
//	var postData = {
//		'scenicName': scenicName,
//		'visitTime': visitDate+" "+visitTime,
//		'visitNum': visitNum,
//		'visitorPhone': vistPhone,
//		'guidePhone': guidephone,
//		'guideFee': guideFee1
//	};
//	var Url = HOST + "/BookOrderWithGuide.do";
//	//alert(JSON.stringify(postData));
//	$.ajax({
//		type: "post",
//		url: Url,
//		async: true,
//		data: postData,
//		datatype: "JSON",
//		error: function() {
//			alert("支付订单失败！");
//			return false;
//		},
//		success: function(data) {
//			if(data == 1) {
//				alert("支付订单成功！");
//				window.location.href = "orderFormList.html";
//			} else {
//				alert("支付订单失败！");
//			}
//		}
//	});
//}


/*function setChargeInfo(guideMoney) {
guideFee1=guideMoney;
$(".guideMoney").html(guideMoney);
var pur = GetUrlem("purchaseTicket");
var TicketM = 0;
var ticm = "<br/>";

var half = GetUrlem("halfPrice");
var disc = GetUrlem("discoutPrice");
var full = GetUrlem("fullPrice");

var secnicNo = getSession(sessionStorage.scenicNo);
if(!secnicNo) {
	return false;
}
var url = HOST + "/geTicketsByScenicNo.do";
$.ajax({
	type: "post",
	url: url,
	async: true,
	data: {
		"scenicNo": secnicNo
	},
	datatype: "JSON",
	error: function() {
		alert("获取门票费用Request error!");
		return false;
	},
	success: function(data) {
		//alert(JSON.stringify(data));
		if(pur == 1) {

			if(full != 0) {
				ticm += "<p>全价票" + full + "*" + data.fullPrice + "元</p>";
			}
			if(half != 0) {
				ticm += "<p>半价票" + half + "*" + data.halfPrice + "元</p>";
			}
			if(disc != 0) {
				ticm += "<p>折扣票" + disc + "*" + data.discoutPrice + "元</p>";
			}
		}
		if(pur == 1) {
			TicketM = parseInt(full) * parseInt(data.fullPrice) + parseInt(half) * parseInt(data.halfPrice) + parseInt(disc) * parseInt(data.discoutPrice);
		}
		$("#setsumMoney").html(TicketM + parseInt(guideMoney));
		$("#setticketMoney").html(ticm);
	}
});
}
*/