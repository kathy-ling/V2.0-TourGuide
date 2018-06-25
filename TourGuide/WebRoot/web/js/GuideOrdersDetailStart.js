var orderId = GetUrlem("orderId");
var type = GetUrlem("type");

$(function(){
	setOrderInfo();
});

//设置订单信息
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
				
				$("#Osname").html(data[0].scenicName);
				$("#OvTime").html(data[0].visitTime.substring(0,16));
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
//点击开始讲解
function start()
{
	var Url = HOST + "/startVisit.do";
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{orderId:orderId},
		datatype:"JSON",
		error:function()
		{
			alert("开始讲解Request error!");
		},
		success:function(data)
		{
			if(data == true){
				alert("一切就绪，开始讲解吧!");
				window.location.href="GuideOrdersDetailEnd.html?orderId="+orderId;
			}else{
				alert("发生错误，请稍后再试!");
			}
		}
	});
}
