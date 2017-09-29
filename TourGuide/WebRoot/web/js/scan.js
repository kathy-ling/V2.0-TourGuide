

var guidePhone = getPhone();
var consistOrderID;

$(document).ready(function() {
	$("#orderdetail").hide();
	$("#pintuansuccess").hide();

	var url = window.location.href;
	var url11 = HOST + "/weixinScan.do";
	alert(url11)
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
				//			 alert(JSON.stringify(res));
			}
		});
	}); 

	/*getOrderInfoByID();*/
});


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

function getTime1ByIOS(time1)
{
	return time1.replace(/-/,"/").replace(/-/,"/");
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

//获取该讲解员的拼团的信息
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
	alert(JSON.stringify(data))
	$("#timeDiff").empty();
	$("#allNum").empty();
	$("#haveNum").empty();
	$("#todayFee").empty();
	
	$("#scenicName").html(data.scenicName);//讲解员所属的景区
	$("#orderID").html(data.orderID);//订单编号（讲解员的）
	
	var visitTime1 = data.visitTime;
	alert(visitTime1)
	var tmp = visitTime1.split(':');
	var tmp1 = tmp[0]+":"+tmp[1];
	var tmp2 = tmp1.split("-");
	var time = tmp2[1]+"-"+tmp2[2];
					
	var str1 = visitTime1.split('.');
	var str3=visitTime1.split('-');
	//2017-06-10 11:00:00
	var time1 = str1[0];
	var now = getNowFormatDate();
	alert(now);
	//时间差
	var diff = getTimeDiff(now, time1);
	
	$("#timeDiff").html(diff);//与参观时间相隔的时间
	$("#allNum").html(data.maxNum);//最大拼团人数
	$("#haveNum").html(data.visitNum);//已有拼团人数
	$("#todayFee").html(data.guideFee);//个人讲解费
}

//【开始扫码】的点击事件
function ScanResult()
{
	var guidePhone = getPhone();

	wx.scanQRCode({
		needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，  
		scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有  
		success: function(res) {
			var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果  
//			alert("扫描成功::扫描码=" + result);
			//游客的订单号
			consistOrderID = result;		

			$("#orderdetail").show(300);
			
			setData(consistOrderID);
			getNum();						
		}
	});
}

//游客的订单的相关信息
function setData(consistOrderID){
//	alert("into setData");
//	alert("consistOrderID"+consistOrderID);

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
			}				
		}
	});
}


function setNormalData(data){
	var visitTime = data.visitTime;
	var d = new Date();
	var dateStr = d.getFullYear()+"-0"+(d.getMonth()+1)+"-"+d.getDate();
	
	if(visitTime == undefined){
		$("#vistTime").html(dateStr);	
	}else{
		$("#vistTime").html(visitTime);
	}
	$("#Num").html(data.visitNum);
	$("#State").html(data.orderState);	
	$("#Name").html(data.scenicName);
}


//【加入我的团】按钮，加入前先判断
function takeFastOrder(){
	
	$("#orderdetail").hide(300);
	
	$("#allNum").html(data.maxNum);
	$("#haveNum").html(data.visitNum);
	
	var currentNum = $("#haveNum").html();//已有拼团人数
	var maxNum = $("#allNum").html();//最大拼团人数
	var visitNum = $("#Num").html(); //该单的参观人数
	
//	alert("currentNum="+currentNum + "  " +"maxNum="+maxNum+"  "+"visitNum="+visitNum);
//	alert("orderId"+orderId);

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
				$("#pintuansuccess").show(300);
//				alert("已成功加入我的团,等待游览!");
				window.location.href = "scan.html?guidePhone=" + guidePhone;
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


//点击【完成拼团】的处理事件
function finishScan(){
//	var num = $("#haveNum").html();
//	if(parseInt(num) == 0){
//		alert("现有拼团人数为0，不能完成拼单!");
//		return false;
//	}
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
				window.location.href = "";
			}else{
				alert("完成拼团，出现错误！");
			}
		}
	});
}



//时间判断函数
function dateCheck(){
	var nowdate = new Date();
	var visitdate=$("#visitTime").html();
	var vd = new Date(visitdate);

	if(nowdate.getDate()>vd.getDate())
	{
		return true;
	}
	else{
		return false;
	}
}

function scenicNameCheck(){
	var gsn = $("#scenicName").html().toString();
	var vsn = $("#cName").html().toString();
	
	if(gsn.toString()==vsn.toString())
	{
		return true;
	}
	else{
		return false;
	}
}