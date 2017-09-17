
var scenicName = GetUrlem("scenicName");
var visitTime = GetUrlem("visitTime");
var visitNum = GetUrlem("visitNum");
var otherRequest = GetUrlem("otherRequest");
var guideFee = GetUrlem("priceRange");
var guideSex = GetUrlem("guideSex");
var visitorName = GetUrlem("visitorName");
var language = GetUrlem("language");
var contact = GetUrlem("contact");


$(document).ready(function() {
	//加载底部导航栏
	$("#bottom_navigation").load("bottomNavigation.html").trigger("create");
	
	setOrderInfo(); //设置预约信息
	
});


//获取session值
function setOrderInfo() {
		
	$("#scenicName").html(scenicName);
	$("#orderTime").html(visitTime);	
	$("#visitorCount").html(visitNum);
	$("#otherCommand").html(otherRequest);
	$("#guideMoney").html(guideFee);
	$("#sex").html(guideSex);
	$("#contactName").html(visitorName);
	$("#language").html(language);
	$("#contactPhone").html(contact);
}


function putOrder() {
	
	var data = {
		scenicName : scenicName,
		otherCommand : otherRequest,
		visitNum : visitNum,
		priceRange : guideFee,
		guideSex : guideSex,		
		visitorPhone : vistPhone, //vistPhone全局变量，游客的手机号
		visitorName : visitorName,
		language : language,
		purchaseTicket : 2,
		halfPrice : 0,
		discoutPrice : 0,
		fullPrice : 0,
		visitTime : visitTime,		
		contact : contact//contact,游客在发布订单界面填写的联系电话
	};
	
	if(vistPhone != "null"){
		releaseOrder(data);
	}
}


// 发布订单
function releaseOrder(formdata) {
	var Url = HOST + "/releaseBookOrder.do";
	$.ajax({
		type : "post",
		url : Url,
		async : true,
		data : formdata,
		datatype : "JSON",
		error : function() {
			alert("发布订单Request error!");
		},
		success : function(data) {
			if (data == true) {
				alert("发布订单成功！");
				window.location.href="orderFormList.html";
			} else {
				alert("发布订单失败");
			}
		}
	});
}
