
var type = GetUrlem("type");
var orderId = GetUrlem("orderId");


$(function($){
//	alert(orderId);
	setData();
});

function setData(){

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
				
				if(data[0].guidePhone!=undefined)
				{
					setGuidegData(data[0].guidePhone);
				}				
			}				
		}
	});
}

//设置订单的景区名称、订单状态、参观时间、参观人数、支付费用、付款时间
function setNormalData(data){
	
	$("#scenicName").html(data.scenicName);
	
	if(data.orderState=="待评价"){
		$("#orderState").attr("src","img/icon-dpj.png");			
	}
	if(data.orderState=="已完成"){
		$("#orderState").attr("src","img/icon-ywc.png");
	}
	if(data.orderState=="待付款"){
		$("#orderState").attr("src","img/icon-dfk.png");
	}
	if(data.orderState=="待游览"){	
		$("#orderState").attr("src","img/icon-dyl.png");
	}
	
	var str = data.visitTime;
	var tmp = str.split(':');
	var tmp1 = tmp[0]+":"+tmp[1];
	var tmp2 = tmp1.split("-");
	//06-12 13:00
	var time = tmp2[1]+"-"+tmp2[2];
	$("#visitTime").html(time);
	
	var str1 = str.split('.');
	//2017-06-10 11:00:00
	var time1 = str1[0];
	
	var now = getNowFormatDate();
	//时间差
	var diff = getTimeDiff(now, time1);
	$("#timeDiff").html(diff);
	
	$("#visitNum").html(data.visitNum);
		
	$("#money").html(data.money);
	
	if(data.orderState=="待付款"){
		$("#payTime").html("未付款");
	}else{
		var tmp = data.payTime.split('.');
		var payTime = tmp[0];
		$("#payTime").html(payTime);
	}	
}

//获取讲解员的信息：姓名、性别、年龄、星级、语种、电话
function setGuidegData(guidePhone){
	var guideinfoUrl = HOST+"/getDetailGuideInfoByPhone.do?guidePhone="+guidePhone;
	
	$.get(guideinfoUrl,function(data,status){
		$("#guideName").html(data[0].name);
		$("#guideSex").html(data[0].sex);
		$("#guideAge").html(data[0].age);
		$("#guideLevel").html(data[0].guideLevel);
		$("#guideLanguage").html(data[0].language);
		$("#guidePhone").html(guidePhone);		
	});
}

//点击【生成二维码】
function produceQRCode()
{
	$("#qrcode").empty();
//	var orderId = GetUrlem("orderId");
	
	jQuery('#canavas').qrcode({width: 200,height: 200,correctLevel:0,text:utf16to8(orderId)});
	
	//获取网页中的canvas对象
    var mycanvas1 = document.getElementsByTagName('canvas')[0];

	//将转换后的img标签插入到html中
	var img = convertCanvasToImage(mycanvas1);
	
	$('#qrcode').append(img);//imagQrDiv表示你要插入的容器id
	$("#popupDialog").popup('open');
}

function convertCanvasToImage(canvas) {
    //新Image对象，可以理解为DOM
    var image = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
    // 指定格式 PNG
    image.src = canvas.toDataURL("image/png");
    return image;
}

//点击【取消订单】
function cancleOrder(){
	var str = "取消订单，将会扣除最高5%的费用作为手续费，您确定要取消么？"
	//弹出一个询问框，有确定和取消按钮 
	if(confirm(str)) {
		if(type == "预约单"){
			cancleBookOrder();
		}else if(type == "拼团单"){
			cancleConsistOrder();
		}      
   }  
}

function cancleBookOrder(){
	var url = HOST + "/cancleBookOrder.do";
	var fee = $("#money").html();
	
	$.ajax({
		type : "post",
		url : url,
		async : true,
		data:{orderId:orderId},
		datatype : "JSON",
		success : function(data) {
//			1--取消成功,-1--已经开始参观，不能取消,2--扣费1%,3--扣费5%
//			alert("data:"+JSON.stringify(data));
			if(data == -1){
				alert("已经开始参观，不能取消");
			}
			if(data == 1){
				alert("取消成功");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
			if(data == 2){
				alert("取消成功,扣费 " + fee*0.01 + " 元");
				alert("剩余的金额将在三到五个工作日内返还到您的账户！");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
			if(data == 3){
				alert("取消成功,扣费 " + fee*0.05 + " 元");
				alert("剩余的金额将在三到五个工作日内返还到您的账户！");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
		}
	});	
}

function cancleConsistOrder(){
	var url = HOST + "/cancleConsistOrder.do";
	var fee = $("#money").html();
	var num = $("#visitNum").html();
	
	$.ajax({
		type : "post",
		url : url,
		async : true,
		data:{orderId:orderId},
		datatype : "JSON",
		success : function(data) {
//			1--取消成功,-1--已经开始参观，不能取消,2--扣费1%,3--扣费5%，4--扣费2%
//			alert(JSON.stringify(data));
			if(data == -1){
				alert("已经开始参观，不能取消");
			}
			if(data == 1){
				alert("取消成功");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
			if(data == 2){
				alert("取消成功,扣费 " + fee*num*0.01 + " 元");
				alert("剩余的金额将在三到五个工作日内返还到您的账户！");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
			if(data == 3){
				alert("取消成功,扣费 " + fee*num*0.05 + " 元");
				alert("剩余的金额将在三到五个工作日内返还到您的账户！");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
			if(data == 4){
				alert("取消成功,扣费 " + fee*num*0.02 + " 元");
				alert("剩余的金额将在三到五个工作日内返还到您的账户！");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
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
	var d1 = new Date(time1);
	var d2 = new Date(time2);
	var t = (d2 - d1)/ 1000 / 60 /60;//两个时间相差的毫秒数
	
	if(parseInt(t) < 0){
		return 0;
	}
	return t.toFixed(1);
}

