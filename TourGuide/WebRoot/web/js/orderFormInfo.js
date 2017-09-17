var payTime;
var num;
var totalFee;
var name;

var type = GetUrlem("type");
var orderId = GetUrlem("orderId");

//type="拼团单";
//orderId='dbc1b2653d184a98adb8ec843be0c8ac';

$(function($){
	
	setData();
	
	initMap();

	$("#deleteBtn").hide();
	$("#cancleFee").hide();
//	$("#QrcodeBtn").hide();
	
});

function initMap()
{
	var map = new BMap.Map("mapGet");   //实例化地图控件
	var point = new BMap.Point(116.404,39.915);
	map.centerAndZoom(point,15);
	map.enableScrollWheelZoom(true);
	//进行浏览器定位
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			longitudeMy = r.point.lng;
		    latitudeMy = r.point.lat;
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})
}

function setData(){
//	var orderId = GetUrlem("orderId");
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
				
				if(data[0].guidePhone!=undefined)
				{
					setGuidegData(data[0].guidePhone);
				}else{
					$("#MoneyInfo").hide();
				}
				/*if(data[0].money!=0){
					setTickData(data[0]);}*/
				//判断下单时间是否存在
				if(data[0].takeOrderTime!=undefined)
				{
					$(".takeOrderTime1").html(data[0].takeOrderTime);
				}else
				{
					$("#takeOrderTime1").hide();
				}
				//判断付款时间是否存在
				if(data[0].payTime!=undefined)
				{
					$(".payTime1").html(data[0].payTime);
					payTime = data[0].payTime;
				}else
				{
					$("#payTime1").hide();
				}
				//判断结束时间是否存在
				if(data[0].endTime!=undefined)
				{
					$(".finishTime1").html(data[0].endTime);
				}else
				{
					$("#finishTime1").hide();
				}
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
	
	$(".orderTime").html(data.produceTime);
	$(".vistTime").html(data.visitTime);
	$(".vistorNum").html(data.visitNum);
	$(".totalMoney").html(data.money);
	$("#MoneyInfo").append(data.money);
	$(".viewState").html(data.orderState);
	$(".totalMoney1").html(data.money);
	
	$("#longitude").html(data.longitude);
	$("#latitude").html(data.latitude);
	
	longitudeData = data.longitude;
	latitudeData = data.latitude;
	
	/*if(longitudeData==null || latitude==null || longitudeData=="null" || latitude=="null"){
		alert("位置信息为空");
		$("#locationA").hide();
	}*/
	
	num = data.visitNum;
	totalFee = data.money;
	
	if(data.orderState == "已取消" || data.orderState == "待评价"){
		$("#cancleBtn").hide();
		$("#locationA").hide();
		$("#deleteBtn").show();
		if(data.orderState == "已取消"){
			$("#cancleFee").show();
			$("#fee").html(data.cancleFee);
			$("#QrcodeBtn").hide();
		}
	}
}

//设置景区名称
function setSenicData(data){
		
	$("#scenicNameId").html(data.scenicName);
	name = data.scenicName;		
}
	
//设置导游的信息	
function setGuidegData(guidePhone){
	guideinfoUrl = HOST+"/getDetailGuideInfoByPhone.do?guidePhone="+guidePhone;
	
	$.get(guideinfoUrl,function(data,status){
		var guideif = '<img class="guideHead" src="'+HOST+data[0].image+'"><p>讲解员：'+data[0].name;
		guideif+='<br>性别：'+data[0].sex+'<br>年龄：'+data[0].age;
		var language = getLanguage(data[0].language);
		guideif+='<br>语种:'+language+'<br>联系方式：'+guidePhone+'</p>';
		$("#guideInfo").html(guideif);
		$("#infolist").listview('refresh');
	});
	
}

//生成二维码
function produce()
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

//【获取位置】，从服务器端获取经纬度坐标，并进行导航
function getLocationVisitor()
{
	if(longitudeData==null || latitude==null || longitudeData=="null" || latitude=="null"){
		alert("暂无位置信息，请稍候查看！");		
	}else{
		var A = document.getElementById("locationA");
		A.href = "http://api.map.baidu.com/direction?origin=latlng:"+latitudeMy+","+longitudeMy+"|name:我的位置&destination=latlng:"+latitudeData+","+longitudeData+"|name:集合位置&mode=driving&region=西安&output=html&src=yourCompanyName|yourAppName";
	}	
}

//点击【取消订单】
function cancleOrder(){
	var str = "取消订单，将会扣除最高5%的费用作为手续费，您确定要取消么？"
	//弹出一个询问框，有确定和取消按钮 
	if(confirm(str)) {
//		alert(type);
//		alert(type== "预约单");
		if(type == "预约单"){
//			alert('into');
			cancleBookOrder();
		}else if(type == "拼团单"){
			cancleConsistOrder();
		}      
   }  
}

function cancleBookOrder(){
	var url = HOST + "/cancleBookOrder.do";
	var fee = $(".totalMoney").html();
	
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
	var fee = $(".totalMoney").html();
	var num = $(".vistorNum").html();
	
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

function deleteOrder(){
	var str = "确定删除？";
	if(confirm(str)){
		deleteOrderbyVisitor();
	}
}

function deleteOrderbyVisitor(){
	var Url = HOST + "/deleteOrderbyVisitor.do";
	$.ajax({
		type:"get",
		url:Url,
		async:true,
		data:{orderId:orderId},
		error:function()
		{
			alert('出错啦，请稍后再试！');
		},
		success:function(data)
		{
			if(data == true){
				alert("删除成功");
				window.location.href = "orderFormList.html";
			}else{
				alert("出错啦，请稍后再试！");
			}
		}
	});
}
 

function isRegist()
{
	if(vistPhone == undefined || vistPhone == openId)
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


/*function setTickData(data){
	var url = HOST+"/geTicketsByScenicNo.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{"scenicNo":data.scenicID},
		datatype:"JSON",
		error:function()
		{
			alert("获取门票费用Request error!");
			return false;
		},
		success:function(Tdata){
			//alert(JSON.stringify(data));
			var ticm = "";
			if(data.fullPrice!=0)
			{
			ticm +="<p>全价票"+data.fullPrice+"*"+Tdata.fullPrice+"元</p>";
			}
			if(data.halfPrice!=0)
			{
			ticm+="<p>半价票"+data.halfPrice+"*"+Tdata.halfPrice+"元</p>";
			}
			if(data.discoutPrice!=0)
			{
			ticm += "<p>折扣票"+data.discoutPrice+"*"+Tdata.discoutPrice+"元</p>";
			}
			ticm +="<p>门票合计"+data.totalTicket+"元</p>";
			$("#MoneyInfo").prepend(ticm);
		}
});
}*/