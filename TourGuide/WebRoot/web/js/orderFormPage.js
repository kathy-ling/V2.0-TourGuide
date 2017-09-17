
var guideFee1;

/*$('#confirmOrderPage').bind('pageshow', function(event, ui) {

	setGuideInfo(); //设置讲解员信息返回讲解费
	setOrderInfo(); //设置预约信息

	$("#gopay").bind("click", function() {
		putOrder();
	});
});*/

var contactName = GetUrlem("contactName");


$(document).ready(function() {
	//加载底部导航栏
	$("#bottom_navigation").load("bottomNavigation.html").trigger("create");
	setGuideInfo(); //设置讲解员信息返回讲解费
	setOrderInfo(); //设置预约信息
	
});


//获取session值
function setOrderInfo() {
	var visitDate = GetUrlem("visitDate");
	var visitTime = GetUrlem("visitTime");
	var visitNum = GetUrlem("visitNum");
	var scenicName = GetUrlem("scenicName");
	var contactPhone = GetUrlem("contactPhone");

	$(".orderTime").html(visitDate + " " + visitTime);
	$(".visitorCount").html(visitNum);
	$("#scenicName").html(scenicName);
	$("#contactPhone").html(contactPhone);
}


//设置讲解员信息返回讲解费
function setGuideInfo() 
{
	var guidePhone = GetUrlem("guidePhone");
	var Url = HOST + "/getDetailGuideInfoByPhone.do";
	
	$.ajax({
		type: "post",
		url: Url,
		async: true,
		data: {
			"guidePhone": guidePhone
		},
		datatype: "JSON",
		error: function() {
			alert("导游详细信息Request error!");
		},
		success: function(data) {
			$.each(data, function(i, item) {
				$(".ui-page-active").find("#name").html(item.name);
				$(".ui-page-active").find("#sex").html(item.sex);

				var language = getLanguage(item.language);
				$(".ui-page-active").find("#language").html(language);
				$("#setguideMoney").html(item.guideFee);
				setChargeInfo(item.guideFee); //设置门票信息
			});
		}
	});
}

//点击【去支付】按钮
function putOrder() {
	var scenicName=GetUrlem("scenicName");
	var visitDate = GetUrlem("visitDate");
	var visitTime = GetUrlem("visitTime");
	var visitNum = GetUrlem("visitNum");
	var guidephone = GetUrlem("guidePhone");
	var contactPhone = GetUrlem("contactPhone");
	var language = $("#language").html();
	
	var postData = {
		'scenicName': scenicName,
		'visitTime': visitDate+" "+visitTime,
		'visitNum': visitNum,
		'visitorPhone': vistPhone,
		'guidePhone': guidephone,
		'guideFee': guideFee1,
		'contactPhone': contactPhone,
		'language':language,
		'visitorName':contactName
	};
	
	if(vistPhone == "null" || vistPhone == "" ){	
		alert("发生错误啦！");	
	}
	else{
		timeConflict(guidephone,visitDate,visitTime,postData);	
	}	
}

//判断讲解员的时间与预约时间是否冲突，True 冲突,false  不冲突
function timeConflict(guidephone,visitDate,visitTime,postData){
	var url = HOST + "/isTimeConflict.do";
	var time = visitDate + " " + visitTime;	

	$.ajax({
		type : "post",
		url : url,
		async : true,
		data:{"guidePhone":guidephone,"visitTime": time},
		datatype : "JSON",
		error:function()
		{
			alert("timeConflict Request error!");
		},
		success : function(data) {
			if(data != false){
				alert("改讲解员时间发生冲突，请重新选择");								
				return false;
			}else{
				BookOrderWithGuide(postData);
			}
		}
	});
}

function BookOrderWithGuide(postData){
	var Url = HOST + "/BookOrderWithGuide.do";	
	
	$.ajax({
		type: "post",
		url: Url,
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

function setChargeInfo(guideMoney) {
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