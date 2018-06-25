var scenicName = GetUrlem("scenicName");
var visitNum = GetUrlem("visitNum");
var orderId = GetUrlem("orderId");

$(function(){	

    //根据景区名称获取讲解费
    getFee();
    
    if(scenicName != null && visitNum != null){
    	$("#chooseScenicName").html(scenicName);	
		$("#VisitNum").html(visitNum);
	}
});


//根据景区名称获取当日讲解费
function getFee()
{
	$('#TodayFee').empty();

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
			
			var guideFee = document.getElementById("TodayFee").innerText;
			$("#totalFee").html(parseInt(visitNum) * guideFee);
		},
	});
}

//【去结算】按钮的点击事件
function payOnclick()
{	
	var guideFee = document.getElementById("TodayFee").innerText;
	
	$("#totalFee").html(parseInt(visitNum) * guideFee);
	
//	alert(vistPhone);
//	alert(openId);
//	alert(num*guideFee);

	var data = {scenicName:scenicName,
		visitNum:visitNum,
		guideFee:guideFee,
		visitorPhone:vistPhone
	};
	
	if(vistPhone == "null" || vistPhone == undefined || vistPhone == openId){
		alert("出错啦！");
		return;
	}else{
		callpay(openId, visitNum*guideFee, orderId);
	}
}
