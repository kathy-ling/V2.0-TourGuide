
var guidePhone = GetUrlem('guidePhone');
var consistOrderID;
$(document).ready(function() {
	
	//通过config接口注入权限验证配置
	//wx.config({
	//	debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，
	//	//若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	//	appId: appId, // 必填，公众号的唯一标识
	//	timestamp: timestamp, // 必填，生成签名的时间戳
	//	nonceStr: nonceStr, // 必填，生成签名的随机串
	//	signature: signature, // 必填，签名，见附录1
	//	jsApiList: ['checkJsApi', 'scanQRCode'] // 必填，需要使用的JS接口列表
	//}); //end_config 

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

			//            alert(appId+"\n"+noncestr+"\n"+jsapi_ticket+"\n"+timestamp+"\n"+signature);

			//            $("#nonceStr").html(noncestr);
			//			$("#timestamp").html(timestamp);
			//			$("#signature").html(signature);
			//			$("#appId").html(appId);
			//			$("#jsapi_ticket").html(jsapi_ticket);

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
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
		//config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
		//则须把相关接口放在ready函数中调用来确保正确执行。
		//对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

		wx.checkJsApi({
			jsApiList: ['scanQRCode'],
			success: function(res) {
				//			 alert(JSON.stringify(res));
			}
		});

		//扫描二维码  
		/*document.querySelector('#scanQRCode').onclick = function() {
			wx.scanQRCode({
				needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，  
				scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有  
				success: function(res) {
					var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果  
					document.getElementById("wm_id").value = result; //将扫描的结果赋予到jsp对应值上  
					alert("扫描成功::扫描码=" + result);
				}
			});
		}; //end_document_scanQRCode */
	}); 

	getOrderInfoByID();
});

//获取该讲解员拼团的信息
function getOrderInfoByID() {
	
	if(guidePhone != null){
		var url = HOST + "/confirmBeforTake.do"
		$.ajax({
			type: "post",
			url: url,
			data: {
				guidePhone:guidePhone  
			},
			error: function() {
				alert('该讲解员信息获取失败');
			},
			success: function(data) {
//				alert(JSON.stringify(data));
				WriteOrderInfo(data);
			}
		});
	}	
}

function WriteOrderInfo(data) {
	$("#scenicName").empty();
	$("#orderID").empty();
	$("#maxnum").empty();
	$("#nowNum").empty();
	$("#fee").empty();
	$("#scenicName").html(data.scenicName);//讲解员所属的景区
	$("#orderID").html(data.orderID);//订单编号（讲解员的）
	$("#maxnum").html(data.maxNum);//最大拼团人数
	$("#nowNum").html(data.visitNum);//已有拼团人数
	$("#fee").html(data.guideFee);//个人讲解费
}

//点击【完成拼团】的处理事件
function finishScan(){
	var num = $("#nowNum").html();
	if(parseInt(num) == 0){
		alert("现有拼团人数为0，不能完成拼单!");
		return false;
	}
	var url = HOST + "/finishScan.do"
	$.ajax({
		type: "post",
		url: url,
		data: {
			guidePhone: guidePhone
		},
		error: function() {
			alert('该讲解员信息获取失败');
		},
		success: function(data) {
			if(data == 1){
				window.location.href = "GuideOrders.html";
			}else{
				alert("完成拼团，出现错误！");
			}
		}
	});
}


function ScanResult()
{
	var guidePhone = GetUrlem('guidePhone');

	wx.scanQRCode({
		needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，  
		scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有  
		success: function(res) {
			var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果  
//			alert("扫描成功::扫描码=" + result);
			consistOrderID = result;
			
			$(".orderFormId").html(result);//游客的订单号
			//扫码得到游客的订单号，查看订单的相关信息
			
//			alert("before myPopupDialog");
			$("#myPopupDialog").popup('open');
//			alert("after myPopupDialog");
			
			setData();
			getNum();						
		}
	});
}

//【加入我的团】按钮，加入前先判断
function takeFastOrder(){	
	
	var currentNum = $("#currentNum").html();
	var maxNum = $("#maxNum").html();
	var visitNum = $(".vistorNum").html(); 
	
//	alert("currentNum="+currentNum + "  " +"maxNum="+maxNum+"  "+"visitNum="+visitNum);
//	alert("orderId"+orderId);

//	alert("dateCheck()" + dateCheck());
	if(dateCheck()){
		alert("游客参观时间已过期");
    	return false;
	}
	if(!scenicNameCheck()){
		alert("该游客选择的景区不是本景区！")
    	return false;
	}
	//游客的参观人数不能大于可拼单的人数
	if(parseInt(visitNum) <= (parseInt(maxNum) - parseInt(currentNum))){
		takeOrder();
	}else{
		alert("该单的参观人数大于可拼单人数，不能拼单!");
	}
}

//与服务器交互
function takeOrder(){
	
	var Url = HOST + "/takeFastOrder.do";
	$.ajax({
		type:"get",
		url:Url,
		async:true,
		data:{consistOrderID:consistOrderID,guidePhone:guidePhone},
		error:function()
		{
			alert('加入团时出错');
		},
		success:function(data)
		{
//				alert("data = "+JSON.stringify(data));
			if(data == 1){
				alert("已成功加入我的团,等待游览!");
				window.location.href = "QRcodeScan.html?guidePhone=" + guidePhone;
			}else if(data == -1)
			{
				alert('拼团失败，此订单已经被接单');
			}
			else
			{
				alert('拼团失败，请重新扫描');
			}
		}
	});
}


//游客的订单的相关信息
function setData(){
//	alert("into setData");
//	alert("consistOrderID"+consistOrderID);
	var orderId = $(".orderFormId").html();//游客的订单号
//	alert("orderId"+orderId);
	$.ajax({
		type:"post",
		url:HOST+"/getDetailOrderInfo.do",
		async:true,
		data:{orderID:consistOrderID},
		datatype:"JSON",
		error:function()
		{
			alert("Error:获取订单详情失败");
		},
		success:function(data)
		{ 
//			alert(JSON.stringify(data));
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
			guidePhone: guidePhone
		},
		error: function() {
			alert('该讲解员信息获取失败');
		},
		success: function(data) {
			$("#maxNum").html(data.maxNum);
			$("#currentNum").html(data.visitNum);
//			alert("maxNum" + data.maxNum);
		}
	});
}

function isRegist()
{
	if(guidePhone == undefined || guidePhone == openId || guidePhone == null)
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

///时间判断函数
function dateCheck(){
	var nowdate = new Date();
//	alert(nowdate);
	var visitdate=$(".vistTime").html();
	var vd = new Date(visitdate);
//	alert(vd);
	if(nowdate.getDate()>vd.getDate())
	{
//		alert("true");
		return true;
	}
	else{
//		alert("false");
		return false;
	}
}

function scenicNameCheck(){
	var gsn=$("#scenicName").html().toString();
	var vsn=$("#scenicNameId").html().toString();
//	alert(gsn.toString());
//	alert(vsn.toString());
	
	if(gsn.toString()==vsn.toString())
	{
//		alert("true");
		return true;
	}
	else{
//		alert("false");
		return false;
	}
}


/*function JoinTeam()
{
	alert("into JoinTeam");
//	var consistOrderID = $(".orderFormId").html();
	var url = HOST+"/takeFastOrder.do";
	alert("consistOrderID"+consistOrderID);
	$.ajax(
	{
		type: "post",
		url:url,
		data: {
			consistOrderID:consistOrderID,guidePhone:guidePhone
		},
		error: function() {
			alert('加入失败');
		},
		success: function(data) {
			if(data==1)
			{
				alert('拼团成功，等待游览');
			}
			else if(data==-1)
			{
				alert('拼团失败，此订单已经被接单');
			}
			else
			{
				alert('拼团失败，请重新扫描');
			}
		}			
	});
}*/