
var type = GetUrlem("type");
var orderId = GetUrlem("orderId");
//var orderId = "0c8ae8b8eda54facbd804fa2a19ceb7d";
var other;
var totalMoney;
var longitude;
var latitude;

var vName;

$(function($){
	setData();
});

function setData(){
	
	$.ajax({
		type:"post",
		url:HOST+"/getDetailOrderInfo.do",
		async:true,
//		data:{orderID:"0c8ae8b8eda54facbd804fa2a19ceb7d"},
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
				}else{
					$("#guideName").html("待分配");
					$(".hide1").css('display','none');
				}
			}				
		}
	});
}

//设置订单的景区名称、订单状态、参观时间、参观人数、支付费用、付款时间
function setNormalData(data){
	
	$("#scenicName").html(data.scenicName);
	
	var str = data.visitTime;
	var tmp = str.split(':');
	var tmp1 = tmp[0]+":"+tmp[1];
	var tmp2 = tmp1.split("-");
	//06-12 13:00
	var time = tmp2[1]+"-"+tmp2[2];
	$("#visitTime").html(time);
	
	var tmp = str.split(':');
	tmp1 = tmp[0]+":"+tmp[1];
	tmp2 = tmp1.split("-");
	time = tmp2[1]+"-"+tmp2[2];
					
	var str1 = str.split('.');
	var str3=str.split('-');
	//2017-06-10 11:00:00
	var time1 = str1[0];
	var now = getNowFormatDate();
	//时间差
	var diff = getTimeDiff(now, getTime1ByIOS(time1));
	$("#timeDiff").html(diff);
	
	$("#visitNum").html(data.visitNum);
		
	$("#money").html(data.money);
	
	//根据游客手机号获取游客姓名
	var url = HOST+"/getVisitorInfoWithPhone.do";
	$.ajax({
		type:"post",
		url:url,
		async:false,
		data:{phone:data.visitorPhone},
		datatype:"JSON",
		error:function()
		{
			alert("显示个人信息Request error!");
		},
		success:function(data)
		{
//			alert(JSON.stringify(data)!="{}");
			if(JSON.stringify(data)!="{}"){				
				vName = data.name;
			}
		}
	});
	
	if(data.orderState=="待付款"){
		$("#payTime").html("未付款");
	}else{
		var tmp = data.payTime.split('.');
		var payTime = tmp[0];
		$("#payTime").html(payTime);
	}	
	
	//经纬度
	longitude = data.longitude;
	latitude = data.latitude;
	
	if(data.orderState=="待评价"){
		$("#orderState").attr("src","img/icon-dpj.png");
		$("#bottomInfo").css('display','none');
		var str = '<div><button class="button" visitNum="'+data.visitNum+'" guidePhone="'+data.guidePhone+'" time="'+time+'" scenicName="'+data.scenicName+'" contactPhone="'+data.visitorPhone+'" contactName="'+vName+'" onclick="goPing($(this))">去评价</button></div>';
		$("#to").append(str);
	}
	if(data.orderState=="已完成"){
		$("#orderState").attr("src","img/icon-ywc.png");
		$("#bottomInfo").css('display','none');
	}
	if(data.orderState=="待付款"){
		other =  data.otherCommand;
		totalMoney = data.totalMoney;
		orderId = data.orderId;
		$("#orderState").attr("src","img/icon-dfk.png");
		$("#bottomInfo").css('display','none');
		
		var str = '<div><button class="button" visitNum="'+data.visitNum+'" guidePhone="'+data.guidePhone+'" time="'+time+'" scenicName="'+data.scenicName+'" contactPhone="'+data.visitorPhone+'" contactName="'+vName+'" str="'+str+'" onclick="goPay($(this))">去付款</button></div>';
		$("#to").append(str);
	}
	if(data.orderState=="待游览"){	
		$("#orderState").attr("src","img/icon-dyl.png");
	}
	
	

}

//去付款
function goPay(This)
{
	var guidePhone = This.attr("guidePhone");
	var time = This.attr("time");
	var scenicName = This.attr("scenicName");
	var contactPhone = This.attr("contactPhone");
	var contactName = This.attr("contactName");
	var visitNum = This.attr("visitNum");
	var str = This.attr("str");
	
	if(type == "拼团单"){
		window.location.href = "pinConfirm.html?scenicName="+scenicName+
		"&visitNum="+visitNum+"&orderId="+orderId+"&str="+str;
	}else if(type == "预约单"){
		window.location.href = "confirmOrder.html?guidePhone="+guidePhone+
	"&time="+time+"&scenicName="+scenicName+"&contactPhone="+contactPhone+
	"&contactName="+contactName+"&visitNum="+visitNum+"&type="+type+"&str="+str;
	}else if(type == "预约发布单"){
		
		window.location.href="releaseOrderConfirm.html?scenicName="+scenicName
				+"&orderTime="+time
				+"&orderNum="+visitNum
				+"&contactName="+contactName
				+"&contactPhone="+contactPhone
				+"&otherCommand="+other
				+"&guideFee="+totalMoney
				+"&orderID="+orderId;
	}
	
}

//去评价
function goPing(This)
{
	window.location.href = "comment.html?orderId="+orderId;
}

function getTime1ByIOS(time1)
{
	return time1.replace(/-/,"/").replace(/-/,"/");
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

// 点击【生成二维码】显示弹框
function xs()
{
	var mychar = document.getElementById('mymodal').style.display ="block";  
}

// 点击八叉和取消隐藏div弹框
function no()
{
	var mychar = document.getElementById('mymodal').style.display ="none";  
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
	// 点击确定之后 隐藏弹出框
	var mydd = document.getElementById('mymodaldd').style.display ="none";  

	// 判断订单类型
	if(type == "预约单"){
		cancleBookOrder();
	}else if(type == "拼团单"){
		cancleConsistOrder();
	}      
}

// 点击取消订单显示弹框
function xsdd()
{
	var mydd = document.getElementById('mymodaldd').style.display ="block";  
}

// 点击八叉和取消隐藏div弹框
function nodd()
{
	var mydd = document.getElementById('mymodaldd').style.display ="none";  
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
				window.location.href = "orderFormInfoUI.html?orderId=" + orderId;
			}
			if(data == 2){
				alert("取消成功,扣费 " + fee*0.01 + " 元");
				alert("剩余的金额将在三到五个工作日内返还到您的账户！");
				window.location.href = "orderFormInfoUI.html?orderId=" + orderId;
			}
			if(data == 3){
				alert("取消成功,扣费 " + fee*0.05 + " 元");
				alert("剩余的金额将在三到五个工作日内返还到您的账户！");
				window.location.href = "orderFormInfoUI.html?orderId=" + orderId;
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

//获取位置
function getLocation()
{
	if(longitude==null || latitude==null || longitude=="null" || latitude=="null"){
		alert("暂无位置信息，请稍候查看！");	
		return;
	}else{
		var map = new BMap.Map("map");   //实例化地图控件
		var point = new BMap.Point(longitude,latitude);
		map.centerAndZoom(point,16);
		var mkLoc = new BMap.Marker(point);
	//	mkLoc.enableDragging();
		map.addOverlay(mkLoc);
		map.panTo(mkLoc);
	
		var label = new BMap.Label("集合位置",{offset:new BMap.Size(20,-10)});
		mkLoc.setLabel(label);
		//A.href = "http://api.map.baidu.com/direction?origin=latlng:"+latitudeMy+","+longitudeMy+"|name:我的位置&destination=latlng:"+latitudeData+","+longitudeData+"|name:集合位置&mode=driving&region=西安&output=html&src=yourCompanyName|yourAppName";
	}	
}

//获取当前日期时间“yyyy-MM-dd HH:MM:SS”
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "/";
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



