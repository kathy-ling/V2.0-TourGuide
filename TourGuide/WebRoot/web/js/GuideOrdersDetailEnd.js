var orderId = GetUrlem("orderId");
var type = GetUrlem("type");

$(function(){
	
});

//点击结束讲解
function finish()
{
	if(type == "拼团单"){
		finishConsistOrder();
	}else if(type == "预约单"){
		finishBookOrder();
	}
}
function finishConsistOrder(){
	var Url = HOST + "/finishConsistOrderByGuide.do";
	
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{orderId:orderId},
		datatype:"JSON",
		error:function()
		{
			alert("签到Request error!");
		},
		success:function(data)
		{
			if(data == 1){
				alert("订单已结束");
				return true;
			}else{
				return false;
			}
		}
	});
}

function finishBookOrder(){
	var Url = HOST + "/finishOrderByGuide.do";
	
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{orderId:orderId},
		datatype:"JSON",
		error:function()
		{
			alert("签到Request error!");
		},
		success:function(data)
		{
			if(data == 1){
				alert("订单已结束");
				return true;
				window.location.href="orderFormListUI.html";
			}else{
				return false;
			}
		}
	});
}