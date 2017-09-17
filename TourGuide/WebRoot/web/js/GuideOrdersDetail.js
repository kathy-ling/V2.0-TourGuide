
var OrderID = GetUrlem("Orderid");
var cancleFee = 0;

//拼单 
//OrderID = 'e44dcd884e964fd39bbd2a4578d42d2a';
//预约单
//OrderID = '0e41561e80794265b473e3ac37b71569';


$(function($){
	$(".treebox .level1>a").click(function(){
		if($(this).is('.current'))
		{
			$(this).removeClass('current').find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');
			return false;
		}
		else{
			$(this).addClass('current')   //给当前元素添加"current"样式
			.find('i').addClass('down')   //小箭头向下样式
			.parent().next().slideDown('slow','easeOutQuad')  //下一个元素显示
			.parent().siblings().children('a').removeClass('current')//父元素的兄弟元素的子元素去除"current"样式
			.find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');//隐藏
			return false; //阻止默认时间
		}
	});
	
	$("#bookOrderDiv").hide();
	$("#consistOrderDiv").hide();
	$("#signInBtn").hide();
	$("#startBtn").hide();
	$("#finishBtn").hide();
	$("#locationBtn").hide();
	$("#deleteBtn").hide();
	$("#isMine").hide();
	$("#notMine").hide();
	$("#reasonBtn").hide();
	$("#otherReason").hide();
	$("#scanBtn").hide();

	getGuideBookOrdersDetail();
	getGuideConsistOrderDetail();
		
});


//配置微信扫码
$(document).ready(function() {

	var url = window.location.href;
	var url11 = HOST + "/weixinScan.do";
	
	//ajax注入权限验证  
	$.ajax({
		url: url11,
		dataType: 'json',
		data: {
			"url": url
		},
		complete: function(XMLHttpRequest, textStatus) {

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("发生错误：" + errorThrown);
		},
		success: function(res) {
			var appId = res.appId;
			var noncestr = res.nonceStr;
			var jsapi_ticket = res.jsapi_ticket;
			var timestamp = res.timestamp;
			var signature = res.signature;

			wx.config({
				debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
				appId: appId, //必填，公众号的唯一标识  
				timestamp: timestamp, // 必填，生成签名的时间戳  
				nonceStr: noncestr, //必填，生成签名的随机串  
				signature: signature, // 必填，签名，见附录1  
				jsApiList: ['checkJsApi', 'scanQRCode'] //必填，需要使用的JS接口列表，所有JS接口列表 见附录2  
			});
		}
	});

	wx.error(function(res) {
		alert("出错了：" + res.errMsg);
	});

	//通过ready接口处理成功验证
	wx.ready(function() {
		wx.checkJsApi({
			jsApiList: ['scanQRCode'],
			success: function(res) {				
			}
		});
	}); 	
});

//根据订单编号，讲解员查看自己的预约单的详情
function getGuideBookOrdersDetail(){	
	var Url = HOST + "/getGuideBookOrdersDetail.do";
	
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{orderID:OrderID},
		datatype:"JSON",
		error:function()
		{
			alert("获取订单详情 Request error!");
		},
		success:function(data)
		{
//			alert("预约单"+JSON.stringify(data));
			if(JSON.stringify(data) != "{}"){
//				alert("into setBookOrderVisitorInfo");
				$("#type").html("——我的预约单");
				$("#bookOrderDiv").show();
				$("#consistOrderDiv").hide();
				
//				if(data.state == "待游览"){
//					$("#startBtn").show();
//					$("#finishBtn").hide();
//				}else{
//					$("#startBtn").hide();
//					$("#finishBtn").show();
//				}
//				alert(data.reason==" ");
//				alert(data.confirm);
				if(data.reason != "" || data.confirm != 0){
					$("#clickScan").html(1);
				}
				setOrderList(data);
				setBookOrderVisitorInfo(data);
			}			
		}
	});
}

//根据订单编号，讲解员查看自己的拼单订单的详情
function getGuideConsistOrderDetail(){	
	var Url = HOST + "/getGuideConsistOrderDetail.do";
	
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{orderID:OrderID},
		datatype:"JSON",
		error:function()
		{
			alert("获取订单详情 Request error!");
		},
		success:function(data)
		{
//			alert("拼单"+JSON.stringify(data));
			if(JSON.stringify(data) != "{}"){
//				alert("into getConsistVisitorInfo");
				//alert(data.isFastPin == 0);
				if(data.isFastPin == 1){
					$("#type").html("——我的快捷拼团");
					$("#scanBtn").hide();
				}else{
					$("#type").html("——我的拼团单");
				}
				
				$("#bookOrderDiv").hide();
				$("#consistOrderDiv").show();
				
				//0--未讲解
//				if(data.state == 0){
//					$("#startBtn").show();
//					$("#finishBtn").hide();
////					$("#signInBtn").show();
//				}else{
//					$("#startBtn").hide();
//					$("#finishBtn").show();
//				}
				
				
				getConsistVisitorInfo();
				setOrderList(data);
			}			
		}
	});
}

//讲解员查看自己的拼团订单中的游客的信息
function getConsistVisitorInfo(){
	var Url = HOST + "/getConsistVisitorInfo.do";
	
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{orderID:OrderID},
		datatype:"JSON",
		error:function()
		{
			alert("获取订单详情 Request error!");
		},
		success:function(data)
		{
			setConsistOrderVisitorInfoList(data);
		}
	});
}

function startVisit(){
	var Url = HOST + "/startVisit.do";
	
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{orderId:OrderID},
		datatype:"JSON",
		error:function()
		{
			alert("开始讲解Request error!");
		},
		success:function(data)
		{
			if(data == true){
				alert("一切就绪，开始讲解吧!");
			}else{
				alert("发生错误，请稍后再试!");
			}
		}
	});
}

function finishConsistOrder(){
	var Url = HOST + "/finishConsistOrderByGuide.do";
	
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{orderId:OrderID},
		datatype:"JSON",
		error:function()
		{
			alert("签到Request error!");
		},
		success:function(data)
		{
			if(data == 1){
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
		data:{orderId:OrderID},
		datatype:"JSON",
		error:function()
		{
			alert("完成订单Request error!");
		},
		success:function(data)
		{
			if(data == 1){
				return true;
			}else{
				return false;
			}
		}
	});
}

function deleteOrderbyGuide(){
	var Url = HOST + "/deleteOrderbyGuide.do";
	$.ajax({
		type:"get",
		url:Url,
		async:true,
		data:{orderId:OrderID},
		error:function()
		{
			alert('出错啦，请稍后再试！');
		},
		success:function(data)
		{
			if(data == true){
				alert("删除成功");
				window.location.href = "GuideOrders.html";
			}else{
				alert("出错啦，请稍后再试！");
			}
		}
	});
}


//设置只能在参观时间当天进行签到
function checkSignInBtn(){	
	var currentdate = getNowFormatDate();
	var visitTime = $("#visitTime").html();
	var patt = new RegExp(currentdate);
	var sign = $("#clickSign").html();//1--讲解员已经签到，0--未签到
	
	if(patt.test(visitTime) && sign == 0){//只能在当天未签到时进行签到
		$("#signInBtn").show();	
	}else{
		$("#signInBtn").hide();			
	}
}

//
function checkScanBtn(){
//	alert($("#type").html());
//	var sign = $("#clickSign").html();
	var loc = $("#clickLocation").html();
	var scan = $("#clickScan").html();
	
//	alert(loc);
//	alert("checkScanBtn:"+scan);
	
//	if(loc != "" && sign != 0){
//		$("#scanBtn").show();
//	}
	if($("#type").html() == "我的快捷拼团"){
		$("#scanBtn").hide();
	}
	
	if(loc != ""){
		if(scan == 0){
			$("#scanBtn").show();
		}else{
			$("#scanBtn").hide();
		}
	}else{
		$("#scanBtn").hide();
	}
}

function checkStartBtn(){
//	var sign = $("#clickSign").html();
//	var state = $("#state").html();
//	var loc = $("#clickLocation").html();
	var confirm = $("#clickScan").html();
	var startTime = $("#clickStart").html();
	var state = $("#state").html();
//	alert("checkStartBtn:" + confirm);
//	alert("startTime:" + startTime);
	
	if(startTime != ""){
		$("#startBtn").hide();
		$("#finishBtn").show();
	}else{
		if(confirm == 1){
			$("#startBtn").show();
		}else{			
			$("#startBtn").hide();
		}
	}
}

//若订单已完成讲解，则开始讲解按钮、结束讲解按钮、位置按钮都不可见
function checkFinishBtn(){
	var sign = $("#clickSign").html();
	var state = $("#state").html();
	var loc = $("#clickLocation").html();
	var startTime = $("#clickStart").html();
	var endTime = $("#clickFinish").html();

	if(startTime != ""){
		$("#startBtn").hide();
		$("#finishBtn").show();
	}else{
//		if(sign == 0){
//			$("#startBtn").hide();
//		}else{
//			if(loc != ""){
//				$("#startBtn").show();
//			}else{
//				$("#startBtn").hide();
//			}			
//		}		
		$("#finishBtn").hide();
	}
	if(endTime != ""){
		$("#finishBtn").hide();
		$("#bookOrderDiv").hide();
		$("#consistOrderDiv").hide();
	}
	if(state == "待评价"){
		$("#deleteBtn").show();
	}
}

function checkLocationBtn(){
	var sign = $("#clickSign").html();
	var loc = $("#clickLocation").html();
//	var startTime = $("#clickStart").html();
	
	if(loc != ""){
		$("#locationBtn").hide();
	}else{
		if(sign == 0){
			$("#locationBtn").hide();
		}else{
			$("#locationBtn").show();
		}
	}
}

//生成订单的二维码
function produce()
{
	var id = $("#orderID").html();
	
	$("#qrcode").empty();
	
	jQuery('#qrcode').qrcode(utf16to8(id));
	$("#popupDialog").popup('open');
}

//点击【签到】
function signIn(){	
	var Url = HOST + "/guideSignIn.do";
	
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{orderId:OrderID},
		datatype:"JSON",
		error:function()
		{
			alert("签到Request error!");
		},
		success:function(data)
		{
			if(data == true){
				alert("签到成功");
				$("#clickSign").html(1);
				$("#signInBtn").hide();
//				$("#startBtn").hide();
//				$("#finishBtn").hide();				
				$("#locationBtn").show();								
			}
		}
	});
}

//点击【扫码确认】
function scanQRcode(){
	wx.scanQRCode({
		needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，  
		scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有  
		success: function(res) {
			var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果  
//			alert("扫描成功::扫描码=" + result);
//			consistOrderID = result;
			
			$(".orderFormId").html(result);//游客的订单号
			//扫码得到游客的订单号，查看订单的相关信息
			
//			alert("before myPopupDialog");
			$("#myPopupDialog").popup('open');
//			alert("after myPopupDialog");
			
			setData();						
		}
	});
}

//根据游客订单的相关信息判断是否为该讲解员的单
function setData(){

	var orderId = $(".orderFormId").html();//游客的订单号
	var id = $("#orderID").html();
	
	if(orderId == id){
		$("#result").html("主人，终于找到你啦！");	
		$("#isMine").show();
	}else{
		$("#result").html("对不起，您找错人啦！");
		$("#notMine").show();
	}
}

//【yes】是我的订单，导游确认游客身份。并与服务器交互
function isMyOrder(){
	var orderId = $("#orderID").html();
	$.ajax({
		type:"post",
		url:HOST+"/doConfirm.do",
		async:true,
		data:{orderId:orderId},
		datatype:"JSON",
		error:function()
		{
			alert("Error:发生未知错误！");
		},
		success:function(data)
		{ 
			if(data == 1){
				$("#confirm").html("已确认");
				$("#scanBtn").hide();
				alert("订单信息确认成功!");				
				$("#myPopupDialog").popup("close");
			}else{
				alert("订单信息确认失败，请稍后再试！");
			}			
		}
	});	
}

function notMyOrder(){
	$("#myPopupDialog").popup("close");
}

//点击【位置】
function setLocation(){
	
	var type = $("#type").html();
	
	window.location.href = "mapLocationGuide.html?"+"type="+type+"&OrderID="+OrderID;
}

//点击【开始讲解】
function start(){
	
//	if($("#type").html() == "我的预约单"){
//		if($("#reason").html() != undefined ||
//			$("#confirmResult").html() != "未确认"){
				startVisit();
//			}
//	}
			
	$("#startBtn").hide();
	$("#finishBtn").show();
	$("#locationBtn").hide();
		
}

//点击【结束讲解】
function finish(){
	var type = $("#type").html();
	
	if(type == "——我的拼团单"){
		finishConsistOrder();
	}else if(type == "——我的预约单"){
		finishBookOrder();
	}
	
	$("#finishBtn").hide();
	$("#locationBtn").hide();
	$("#bookOrderDiv").hide();
	$("#consistOrderDiv").hide();
	$("#deleteBtn").show();
}

//【删除订单】
function deleteOrder(){
	var str = "确定删除？";
	if(confirm(str)){
		deleteOrderbyGuide();
	}
}

//点击【填写未确认原因】
function reasonBtn(){
	$("#reasonPopupDialog").popup('open');		
	
	$(".radio").click(function () {
		var reason = $('input:radio:checked').val(); 
		if(reason == "其他"){
			$("#otherReason").show();	
			reason = $("#otherReason").val();
		}else{
			$("#otherReason").hide();
		}		
    });
       
	//填写其他原因，设置字数限制
	$("#otherReason").keydown(function(){       
        var maxCount = 30;
        var curLength = $("#otherReason").val().length;
        if(curLength > maxCount){
            var num = $("#otherReason").val().substr(0,30);
            $("#otherReason").val(num);
            alert("超过字数限制啦!" );
        }
    });
    
    //点击弹出框中的【提交】按钮
    $("#choose").click(function (){
    	var reason = $('input:radio:checked').val();
		if(reason == "其他"){
			$("#otherReason").show();	
			reason = $("#otherReason").val();
		}else{
			$("#otherReason").hide();
		}
// 		if($("#type").html() == "我的预约单"){
			writeBookOrderReason(reason);
//		}else{
//			writeConsitOrderReason(reason, visitorPhone);
//		}  	
    });
   
   
}

function consistOrderReasonBtn(visitorPhone){
	$("#reasonPopupDialog").popup('open');		
	
	$(".radio").click(function () {
		var reason = $('input:radio:checked').val(); 
		if(reason == "其他"){
			$("#otherReason").show();	
			reason = $("#otherReason").val();
		}else{
			$("#otherReason").hide();
		}		
   });
       
	//填写其他原因，设置字数限制
	$("#otherReason").keydown(function(){       
        var maxCount = 30;
        var curLength = $("#otherReason").val().length;
        if(curLength > maxCount){
            var num = $("#otherReason").val().substr(0,30);
            $("#otherReason").val(num);
            alert("超过字数限制啦!" );
        }
  	}); 
   
    //点击弹出框中的【提交】按钮
    $("#choose").click (function (){
    	
    	var reason = $('input:radio:checked').val();
		if(reason == "其他"){
			$("#otherReason").show();	
			reason = $("#otherReason").val();
		}else{
			$("#otherReason").hide();
		}
	
//  	alert(reason);
//  	alert(visitorPhone);
// 		if($("#type").html() == "我的预约单"){
//			writeBookOrderReason(reason);
//		}else{
			writeConsitOrderReason(reason,visitorPhone);
			$(visitorPhone).innerHTML = reason;
//		}  	
  	});
}

//选择原因，并提交给服务器
function writeConsitOrderReason(reason,visitorPhone){
	
	var orderId = $("#orderID").html();

	$.ajax({
		type:"post",
		url:HOST+"/writeConsitOrderReason.do",
		async:true,
		data:{orderId:orderId,reason:reason,visitorPhone:visitorPhone},
		datatype:"JSON",
		error:function()
		{
			alert("Error:发生未知错误！");
		},
		success:function(data)
		{ 
			if(data == 1){
				alert("提交成功!");
				
				$("#reasonPopupDialog").popup("close");
			}else{
				alert("提交失败，请稍后再试！");
			}			
		}
	});
}

//选择原因，并提交给服务器
function writeBookOrderReason(reason){
	
	var orderId = $("#orderID").html();

	$.ajax({
		type:"post",
		url:HOST+"/writeBookOrderReason.do",
		async:true,
		data:{orderId:orderId,reason:reason},
		datatype:"JSON",
		error:function()
		{
			alert("Error:发生未知错误！");
		},
		success:function(data)
		{ 
			if(data == 1){
				alert("提交成功!");
				
				$("#reasonPopupDialog").popup("close");
				$("#reason").html(reason);
				$("#reasonBtn").hide();
			}else{
				alert("提交失败，请稍后再试！");
			}			
		}
	});
}

/*//【提交】，选择原因
function chooseReason(){
	
	var reason = $('input:radio:checked').val();
	if(reason == "其他"){
		$("#otherReason").show();	
		reason = $("#otherReason").val();
	}else{
		$("#otherReason").hide();
	}
	
	if($("#type").html() == "我的预约单"){
		writeBookOrderReason(reason);
	}else{
		writeConsitOrderReason(reason, visitorPhone);
	}   
}*/

function setOrderList(data){
	$("#orderID").html(data.orderID);
	$("#scenicName").html(data.scenicName);
	$("#visitTime").html(data.visitTime);
	$("#visitNum").html(data.visitNum);	
	$("#totalFee").html(data.money);
	if(data.state == 1){
		$("#state").html("待评价");
	}else if(data.state == 0){
		$("#state").html("待游览");
	}else{
		$("#state").html(data.state);
	}
	
	//订单是否签到
	$("#clickSign").html(data.signIn);
	//订单是否开始讲解
	$("#clickStart").html(data.startTime);
	//订单是否设置了位置
	$("#clickLocation").html(data.longitude);
	//订单是否结束了
	$("#clickFinish").html(data.endTime);
	
	if($("#state").html()=="已取消"){
		$("#totalFee").html(data.cancleFee);
		$("#startBtn").hide();
		$("#finishBtn").hide();
		$("#locationBtn").hide();
		$("#bookOrderDiv").hide();
		$("#consistOrderDiv").hide();
		$("#deleteBtn").show();
		return false;
	}	
}

function setBookOrderVisitorInfo(data){
	
	$("#Name").html(data.visitorName);

	if(data.confirm == 1){
		$("#clickScan").html("1");
		$("#confirmResult").html("已确认");
		$("#reasonBtn").hide();
		$("#scanBtn").hide();
	}else if(data.confirm == 0){
		$("#confirmResult").html("未确认");
		if(data.reason == "" || data.reason == undefined){
			$("#reasonBtn").show();
		}else {
			$("#reason").html("未确认原因："+data.reason);
			$("#clickScan").html("1");			
			$("#scanBtn").hide();
		}		
	}
	
	$("#Phone").html(data.contact);
	var a = document.getElementById("forPhone");
	a.href = "tel:" + data.contact;
	a.setAttribute("data-ajax", false);
	
	checkSignInBtn();
	checkScanBtn();
	checkStartBtn();
	checkFinishBtn();
	checkLocationBtn();
}

function setConsistOrderVisitorInfoList(data){
//alert(JSON.stringify(data));
	var len = data.length;
	var num = 0;
	$.each(data, function(i,n) {
		
		var str = "";
		if(n.confirm == 1){
			str = "已确认";
			num = parseInt(num)+1;
		}
		if(n.confirm == 0){
			str = "未确认";
		}
		
		var UlList = document.getElementById("visitorInfo_ul");
		var LiListInfo = document.createElement("li");
		LiListInfo.className = "level1";
		UlList.appendChild(LiListInfo);
		
		var AList = document.createElement("a");
		AList.href = "#none";
		AList.setAttribute("data-ajax", false);
		
		var PList = document.createElement("p");
		
		var visitorNameSpan = document.createElement("span");
		visitorNameSpan.innerHTML = "游客姓名：" + n.visitorName + "&nbsp;&nbsp;&nbsp;&nbsp;";
		
		var confirmResultSpan = document.createElement("span");
		confirmResultSpan.style.color='red'; 
		confirmResultSpan.innerHTML =  str + "<br/>" + "<br/>";
		
		var visitNumSpan = document.createElement("span");
		visitNumSpan.innerHTML = "游客人数：" + n.visitNum + "<br/>";
		
		PList.appendChild(visitorNameSpan);
		PList.appendChild(confirmResultSpan);
		PList.appendChild(visitNumSpan);		
		
		var i = document.createElement("i");
		i.className = "down"; 
		
		AList.appendChild(PList);
		AList.appendChild(i);
		
		var phoneUlList = document.createElement("ul");
		phoneUlList.className = "level2";				
		
		LiListInfo.appendChild(AList);
		LiListInfo.appendChild(phoneUlList);
		
		var phoneLiList = document.createElement("li");
		phoneUlList.appendChild(phoneLiList);
		
		var PList2 = document.createElement("p");
		
		var visitorPhoneSpan = document.createElement("span");
		visitorPhoneSpan.innerHTML = "游客手机号：" + n.visitorPhone;
		
		var a = document.createElement("a");
		a.href = "tel:" + n.visitorPhone;
		a.setAttribute("data-ajax", false);
		
		var phoneBtn = document.createElement("button");
		phoneBtn.className = "phone";
		phoneBtn.innerHTML = "一键拨号";
		
		var reasonButton = document.createElement("button");		
		reasonButton.innerHTML = "填写未确认原因";
		reasonButton.onclick = function(){
			consistOrderReasonBtn(n.visitorPhone);			
		}
		
		var reasonSpan = document.createElement("span");
		reasonSpan.className = n.visitorPhone;
		reasonSpan.innerHTML = "未确认原因:" + n.reason;
		
		PList2.appendChild(visitorPhoneSpan);
		PList2.appendChild(a);
		if(n.confirm == 0 && n.reason != " "){
			PList2.appendChild(reasonSpan);
			num = parseInt(num)+1;
		}
		if(n.confirm == 0 && n.reason == " "){
			PList2.appendChild(reasonButton);
		}
//		PList2.appendChild(reasonButton);
//		PList2.appendChild(reasonSpan);
		a.appendChild(phoneBtn);
		phoneLiList.appendChild(PList2);				
	});
	$("#visitorInfo_ul").listview('refresh');
	myrefresh();
	if(len == num){
		$("#clickScan").html(1);
		$("#scanBtn").hide();
		$("#startBtn").show();
	}
	
	checkSignInBtn();
	checkScanBtn();
	checkStartBtn();
	checkFinishBtn();
	checkLocationBtn();
}


function myrefresh()
{
	$(".treebox .level1>a").click(function(){
	if($(this).is('.current'))
	{
		$(this).removeClass('current').find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');
		return false;
	}
	else{
	 		$(this).addClass('current')   //给当前元素添加"current"样式
			.find('i').addClass('down')   //小箭头向下样式
			.parent().next().slideDown('slow','easeOutQuad')  //下一个元素显示
			.parent().siblings().children('a').removeClass('current')//父元素的兄弟元素的子元素去除"current"样式
			.find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');//隐藏
			return false; //阻止默认时间
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

//"yyyy-mm-dd",获取当前的时间
function getNowFormatDate() {
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

/*$.each(data, function(i,n) {
		
		var s1 = '<li class="level1"><a href="#none">';
		var s2 = '<p><span id="visitorName">游客姓名：' + n.visitorName + '</span></br></br>';
		var s3 = '<span id="num">游客人数：' + n.visitNum + '</span></br></p>';
		var s4 = '<i class="down"></i></a><ul class="level2" data-icon="false" data-role="listview">';
		var s5 = '<li><p><span id="visitorPhone">游客手机号：' + n.visitorPhone + '</span>';
		var s6 = '<button type="button" data-inline="ture">一键拨号</button></p></li></ul></li>';
		
		$("#visitorInfo_ul").append(s1 +s2 +s3 +s4 +s5 +s6);
	});
	$("#visitorInfo_ul").listview('refresh');*/
	
