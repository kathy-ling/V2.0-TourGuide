var guidePhone = GetUrlem("guidePhone");
var visitDate = GetUrlem("visitDate");
var visitTime = GetUrlem("visitTime");
var visitNum = GetUrlem("visitNum");
var scenicName = GetUrlem("scenicName");
var contactPhone = GetUrlem("contactPhone");
var contactName = GetUrlem("contactName");
var str = GetUrlem("str");

var time = GetUrlem("time");
$(function(){
	
	setGuideInfo(); //设置讲解员信息
	
	setOrderInfo(); //设置预约信息
	
});

function setOrderInfo() {
	//设置预约信息
	
	if(time == null){
		$("#OrderTime").html(visitDate + " " + visitTime);
	}else{
		$("#OrderTime").html(time);
	}
		
	$("#OrderNum").html(visitNum);
	$("#GuideScenic1").html(scenicName);
	$("#ContactPhoneConfirm").html(contactPhone);
	$("#ContactNameConfirm").html(contactName);
}

//设置讲解员信息
function setGuideInfo() 
{
	$("#GuidePhone").html(guidePhone);
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
				$("#GuideName1").html(item.name);	
				$("#GuideHead").attr("src",HOST+item.image);
				$("#GuideSex1").html(item.sex);	
				$("#GuideLevel").html(item.guideLevel);
				$("#GuideNum").html(item.historyNum);
				$("#GuideFee").html(item.guideFee);
				$("#GuideLanguage").html(item.language);
				$("#GuideScenic").html(item.scenicName);
				$("#GuideAge").html(item.age);
				$("#ScenicName").html(item.scenicName);

				$("#GuideFee1").html(item.guideFee);
				
				if(item.sex == "男"){
					$("#GuideSex1").attr("class","sexMale");
				}else{
					$("#GuideSex1").attr("class","sexFemal");
				}
			});
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
			if(data != null) {
				var orderID = data;
				
				callpay(openId, postData.guideFee, orderID);
				
			} else {
				alert("支付订单失败！");
			}
		}
	});
}

//点击【去结算】，付款之后，该讲解员才可以被预约
function wechatPay(){
	if(str==null){
		str = visitDate+" "+visitTime;
	}
	var guideFee = $("#GuideFee1").html();
	var language = $("#GuideLanguage").html();
	var postData = {
		'scenicName': scenicName,
		'visitTime': str,
		'visitNum': visitNum,
		'visitorPhone': vistPhone,
		'guidePhone': guidePhone,
		'guideFee': guideFee,
		'contactPhone': contactPhone,
		'language':language,
		'visitorName':contactName
	};
	
	BookOrderWithGuide(postData);
}
