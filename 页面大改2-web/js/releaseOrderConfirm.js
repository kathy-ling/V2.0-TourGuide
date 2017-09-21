var scenicName = GetUrlem("scenicName");
var orderTime = GetUrlem("orderTime");
var orderNum = GetUrlem("orderNum");
var contactName = GetUrlem("contactName");
var contactPhone = GetUrlem("contactPhone");
var otherCommand = GetUrlem("otherCommand");
var guideFee = GetUrlem("guideFee");
var orderID = GetUrlem("orderID");

//alert(orderID);

$(function(){
	//设置发布订单信息
	setOrderConfirmInfo();
});

function setOrderConfirmInfo()
{
	$("#ScenicName").html(scenicName);
	$("#OrderTime").html(orderTime);
	$("#OrderNum").html(orderNum);
	$("#ContactNameConfirm").html(contactName);
	$("#ContactPhoneConfirm").html(contactPhone);
	$("#OtherCommandConfirm").html(otherCommand);
	$("#GuideFee1").html(guideFee);
}

function topay()
{
	callpay(openId, guideFee, orderID);
}
