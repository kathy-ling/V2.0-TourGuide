/*var sName = GetUrlem("sname");
var vTime = GetUrlem("vTime");
var lTime = GetUrlem("lTime");
var vNum = GetUrlem("vNum");
var fee = GetUrlem("fee");*/
var orderId = GetUrlem("orderId");
//var phone = GetUrlem("phone");
var type = GetUrlem("type");

$(function(){
	
	setData();
	
});

function setData(){

	$.ajax({
		type:"post",
		url:HOST+"/getDetailOrderInfo.do",
		async:true,
//		data:{orderID:"4dcc3bfd9ec847a3a184be9c0f93b930"},
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
			}else{
				alert("订单信息为空！");
				return false;
			}
			
		}
	});
}

//设置订单的景区名称、订单状态、参观时间、参观人数、支付费用、付款时间
function setNormalData(data){
	
	visittime = data.visitTime.substring(0,10);

	var vTime = data.visitTime.substring(5,16);
	
	//当前时间
	var nowTime = getNowFormatDate();
	//剩余时间
	var leftTime =getTimeDiff(nowTime,data.visitTime) ;

	$("#sname").html(data.scenicName);	
	$("#visitTime2").html(vTime);
	$("#remainingtime").html(leftTime);
	$("#gfee").html(data.money);
	$("#vnum").html(data.visitNum);
	
//	$("#orderID").html(orderId);
	$("#scenicName").html(data.scenicName);	
	$("#visitTime").html(vTime);
	$("#totalFee").html(data.money);
	$("#visitNum").html(data.visitNum);
	
	$("#Phone").html(data.visitorPhone);

	//根据游客手机号设置游客姓名
	var url = HOST+"/getVisitorInfoWithPhone.do";

	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{phone:data.visitorPhone},
		datatype:"JSON",
		error:function()
		{
			alert("显示游客信息Request error!");
		},
		success:function(data)
		{
			if(JSON.stringify(data)!="{}"){
			$("#Name").html(data.name);
			}
		}
	});
}

//订单签到
function sign()
{
	var currentdate = getNowFormatDate1();
	var visitTime = visittime;
	var patt = new RegExp(currentdate);

	//仅允许在当天签到
	if(patt.test(visitTime)){
		var URL = HOST+"/guideSignIn.do?orderId="+orderId;
		$.ajax({
			type:"get",
			url:URL,
			async:true,
			error:function(data){
				alert("requertError订单签到失败");
			},
			success:function(data){
				if(data=true)
				{
					alert("签到成功");
					window.location.href="mapLocationGuideUI.html?type="
					+type+"&orderId="+orderId;
				}else{
					alert("签到失败");
				}
			}
		});
	}else{
		alert("仅允许在当天签到");
	}
	
	
}

//生成订单的二维码
function produce()
{
	$("#qrcode").empty();
	
	jQuery('#qrcode').qrcode(utf16to8(orderId));
	$("#popupDialog").popup('open');
}

//"yyyy-mm-dd",获取当前的时间
function getNowFormatDate1() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
   
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;

    return currentdate;
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