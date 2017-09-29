//AList.href = "ConsistOrderList.html?" + "date=" + n.visitTime+"&PerNum="+n.num+"&Fee="
//		+n.guideFee+"&OrderID="+n.orderID+"&visitNum="+visitNum;
//visitname="+name+"&visitphone="+phone+"&pdnum"

var visitname = GetUrlem("visitname");
var visitorPhone = GetUrlem("visitorPhone");
var visitNum = GetUrlem("visitNum"); 
var visitDate= GetUrlem("visitDate"); 
var Time=GetUrlem("visitTime"); 
var scenicName=GetUrlem("scenicName"); 
var guideFee1;
var totalguideFee;
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

function getTimeDiff(time1, time2){
	
	var d1 = new Date(time1).getTime();
	var d2 = new Date(time2).getTime();
	var t = (d2 - d1)/ 1000 / 60 /60;//两个时间相差的毫秒数
	
	if(parseInt(t) < 0){
		return 0;
	}
	return parseInt(t.toFixed(1));
}
				
$(function($){
	
	var now=getNowFormatDate();
	var str=visitDate+" "+Time+":"+5;
	var tmp = str.split(':');
	var tmp1 = tmp[0]+":"+tmp[1];
	var tmp2 = tmp1.split("-");
	var time = tmp2[1]+"-"+tmp2[2];
					
	var str1 = str.split('.');
	var str3=str.split('-');
	//2017-06-10 11:00:00
	var time1 = str1[0];
	//时间差
	var diff = getTimeDiff(now, getTime1ByIOS(time1));
	getFee();
	$("#Hour").html(diff);
	$("#pintuanNum").html("拼团人数:"+visitNum+"/20");
	$("#scenicName").html(scenicName);
	$("#pintuanNum1").html(visitNum);
	$("#visitTime").html(visitDate.substring(5,10)+" "+Time);
	$("#visitname").html(visitname);
	$("#phone").html(visitorPhone);
});

function getFee()
{
	
	var url = HOST+"/getIntroFee.do";
	var fee;
	$.ajax({
		type:"get",
		url:url,
		async:true,
		data:{scenicName:scenicName,date:visitDate},
		success:function(data)
		{
			if (data*visitNum=="") {
				fee=0;
			} else{
				totalguideFee=data*visitNum;
			}
			guideFee1=data;
			$("#guideFee").html(data);
			alert(totalguideFee);
			$("#totalGuideFee").html(totalguideFee);
		},
	});
}

function wechatPay(){
	
	
	var postData = {
		'scenicName': scenicName,
		'visitTime': visitDate+" "+Time,
		'visitNum': visitNum,
		'visitorPhone':vistPhone ,
		'contact':visitorPhone
	};
	
	releaseConsistOrder(postData);
}



function releaseConsistOrder(postData){
	var url = HOST+"/releaseConsistOrder.do";
	
	$.ajax({
		type: "post",
		url: url,
		async: false,
		data: postData,
		datatype: "JSON",
		error: function() {
			alert("支付订单失败！");
			return false;
		},
		success: function(data) {
			if(data != null) {
				
				var orderID = data;
				alert(orderID );
				alert(totalguideFee);
				alert(openId);
				callpay(openId, totalguideFee, orderID);
			} else {
				alert("支付订单失败！");
			}
		}
	});
}



//点击去支付，先判断用户是否注册
function consistOrder(){
	
		var phone=$("#contact").val();
		var num=$("#visitorNum").val();
	
		if(num == "")
		{
			alert("请填写人数");
			return;
		}
		if(phone == ""){
			alert("请填写联系方式");
			return;
		}
		
		var data =
		{
			orderID:OrderID,
			visitNum:num,
			visitorPhone:vistPhone,
			contact:phone
		};
	
		consistWithconsistOrderID(data);
	
}


function consistWithconsistOrderID(data){
	var url = HOST+"/consistWithconsistOrderID.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:data,
		datatype:"JSON",
		error:function()
		{
			alert("拼单Request error!");
		},
		success:function(data)
		{
			alert("拼单success!");
			window.location.href = "orderFormList.html";
		}
	});
}

//对输入的人数进行判断
function checkNum(){
	var visitNum = $("#visitorNum").val();

	if (visitNum=="") {
		alert("请填写游览人数");
		$("#visitorNum").val("");
		return;		
	}else if(!( /^\+?[1-9][0-9]*$/).test(visitNum)){
		alert("请输入正确的人数");
		$("#visitorNum").val("");
		return;
	}else{
		
		if(parseInt(visitNum) > parseInt(perNum))
		{
			alert("填写人数超过了可拼单人数");
			window.location.href = "pindan.html";
		}
		$("#list_pindan_guide_num").html(visitNum);
		$("#list_pindan_total_money").html(guideFee*visitNum+"元");
	}
}

//输入手机号后，验证手机号的有效性
function checkPhone(){
	//表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; 
	var phone=$("#contact").val();
	
	if(!reg.test(phone)){
		alert('请输入有效的手机号码！');
		$("#contact").val("");
    	return false;
	}else{
		$("#list_pindan_guide_phone").html(phone);
	}
}


function isRegist()
{
	if(vistPhone == "undefined" || vistPhone == openId)
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
