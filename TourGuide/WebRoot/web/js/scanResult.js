
var num;
var totalFee;
var name;

var Phone = GetUrlem("Phone");
var orderId = GetUrlem("orderId");

//alert(orderId);
//alert("Phone=" + Phone);

$(function($){
	setData();
	getNum();	
});


function setData(){
	
	$(".orderFormId").html(orderId);
	
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
				
				setNormalData(data[0]);
				setSenicData(data[0]);								
			}				
		}
	});
}


//设置订单的下单时间、参观时间、参观人数、支付费用、订单状态
function setNormalData(data){
	var visitTime = data.visitTime;
	var d = new Date();
	var dateStr = d.getFullYear()+"-0"+(d.getMonth()+1)+"-"+d.getDate();
	
	if(visitTime == undefined){
		$(".vistTime").html(dateStr);	
	}else{
		$(".vistTime").html(visitTime);
	}
	$(".vistorNum").html(data.visitNum);
	$(".totalMoney").html(data.money);
	$(".viewState").html(data.orderState);
	$(".vistTime").html(data.visitTime);	
	$(".produceTime").html(data.produceTime);

	num = data.visitNum;
	totalFee = data.money;
}

//设置景区名称
function setSenicData(data){
		
	$("#scenicNameId").html(data.scenicName);
	name = data.scenicName;		
}

//获取此次拼团的最大人数和已有人数
function getNum() {
	
	var url = HOST + "/confirmBeforTake.do"
	$.ajax({
		type: "post",
		url: url,
		data: {
			guidePhone: Phone
		},
		error: function() {
			alert('该讲解员信息获取失败');
		},
		success: function(data) {
			$("#maxNum").html(data.maxNum);
			$("#currentNum").html(data.visitNum);
		}
	});
}

function takeFastOrder(){
	
	var Url = HOST + "/takeFastOrder.do";
	var orderId = GetUrlem("orderId");
	var currentNum = $("#currentNum").html();
	var maxNum = $("#maxNum").html();
	var visitNum = $(".vistorNum").html(); 
	
//	alert("currentNum="+currentNum + "  " +"maxNum="+maxNum+"  "+"visitNum="+visitNum);
//	alert("orderId"+orderId);

	//游客的参观人数不能大于可拼单的人数
	if(parseInt(visitNum) <= (parseInt(maxNum) - parseInt(currentNum))){
		$.ajax({
			type:"get",
			url:Url,
			async:true,
			data:{consistOrderID:orderId,guidePhone:Phone},
			error:function()
			{
				alert('加入团时出错');
			},
			success:function(data)
			{
//				alert("data = "+JSON.stringify(data));
				if(data == 1){
					alert("已成功加入我的团!");
					window.location.href = "QRcodeScan.html?guidePhone=" + Phone;
				}
			}
		});
	}else{
		alert("该单的参观人数大于可拼单人数，不能拼单!");
	}
}

function isRegist()
{
	if(Phone == undefined || Phone == openId || Phone == null)
	{
		alert("您还未注册，请注册！");
		window.location.href = "register.html";
	}else{
		var black = sessionStorage.getItem("isBlackened");

		if(black == "false"){
			window.location.href = "personalHome.html";
		}else{
			alert("您已被系统管理员拉黑!");
		}
	}
}