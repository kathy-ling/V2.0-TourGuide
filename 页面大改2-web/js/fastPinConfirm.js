$(function(){
	   
    addAllScenics();
});


//选则景区后，显示该景区当日的讲解费
function getFee()
{
	$('#TodayFee').empty();
	var scenicName = $("#chooseScenicName").val();

	if (scenicName=='') {
		alert('请选择景区');
		return;
	}

	var d = new Date();
	var str = d.getFullYear()+"-0"+(d.getMonth()+1)+"-"+d.getDate();
	
	var url = HOST+"/getIntroFee.do";
	var fee;
	
	$.ajax({
		type:"get",
		url:url,
		async:true,
		data:{scenicName:scenicName,date:str},
		success:function(data)
		{			
			$("#TodayFee").html(data);
		},
	});
}

//点击减人数按钮
function setMinusVisitNum(){
	var num = $("#VisitNum").val();
	var guideFee = $("#TodayFee").html();

	if(num > 0){
		$("#VisitNum").val(--num);
		
		$("#totalFee").html(parseInt(num) * guideFee);
	} 
	else{
		alert("选择不合法");
	} 
}

//点击加人数按钮
function setPlusVisitNum(){
	var num = $("#VisitNum").val();
	var guideFee = $("#TodayFee").html();
	
	$("#VisitNum").val(++num);
    $("#totalFee").html(num * guideFee);
}

//【去结算】按钮的点击事件
function payOnclick()
{	
	var scenicName = $("#chooseScenicName").val();	
	var guideFee = document.getElementById("TodayFee").innerText;
	var num = $("#VisitNum").val();	
	
	$("#totalFee").html(parseInt(num) * guideFee);
	
//	alert(vistPhone);
//	alert(openId);
//	alert(num*guideFee);
	
	if (scenicName=='') {
		alert('请选择景区，进行支付');
		return;
	}
	if (num=='') {
		alert("拼团人数不能为空！");
		return;
	}
	
	var data = {scenicName:scenicName,
		visitNum:num,
		guideFee:guideFee,
		visitorPhone:vistPhone
	};
	
	if(vistPhone == "null" || vistPhone == undefined || vistPhone == openId){
		alert("出错啦！");
		return;
	}else{
		
		releaseFastOrder(data);
	}
}

function releaseFastOrder(data){
	
	var guideFee = document.getElementById("TodayFee").innerText;
	var num = $("#VisitNum").val();	
	
	var url=HOST+"/releaseFastOrder.do";
	
	$.ajax({
		type:"post",
		url:url,
		data:data,
		error:function()
		{
			alert('快捷拼团失败，请重新拼团');
		},
		success:function(data)
		{
			if(data != null){
				var orderID = data;
//				alert(orderID);
				callpay(openId, num*guideFee, orderID);
			}					
		}
	});
}

//查询所有的景区名称
function addAllScenics() {
	var url = HOST + "/getAllScenics.do";
	$.ajax({
		type : "post",
		url : url,
		async : true,
		datatype : "JSON",
		success : function(data) {
			addSelect(data);
		}
	});
}

function addSelect(a) {
	$.each(a, function(index, value) {
		addOption(value.scenicName);
	});
}

function addOption(a) {

	// 根据id查找对象，
	var obj = document.getElementById('chooseScenicName');
	// 这个只能在IE中有效
	obj.options.add(new Option(a, a));
}