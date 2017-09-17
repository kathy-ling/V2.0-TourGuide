
//获取预约信息
var guidePhone = GetUrlem("guidePhone");
var visitDate = GetUrlem("visitDate");
var	visitTime = GetUrlem("visitTime");
var	scenicName = GetUrlem("scenicName");
var singleMax = GetUrlem("singleMax");
var	visitNum;

$(document).ready(function() {
	
	//动态添加日期
	addDate(); 
	//显示所有景点名称
	addAllScenics();
	//从前一个页面获取信息
	getInfofromFormer();	
	
	if(guidePhone != "null"){
		setGuideInfo(guidePhone);		
	}
	
	showVisitTime("#orderDate","orderDatetime");
});


//从前一个页面获取景点名称、日期、时间、人数
function getInfofromFormer(){
	//从前一个页面获取到了相应的值后，隐藏选择器，显示lable并赋值
	if(scenicName == ""){
		$("#scenicName0").hide();
		document.getElementById("orderChooseScenicNameDiv").style.display = "";
	}else{				
		$("#scenicName0").show();
		document.getElementById("scenicName0").innerText = scenicName;
		document.getElementById("orderChooseScenicNameDiv").style.display = "none";
	}	
	if(visitDate == ""){
		$("#orderChooseDateLabel").hide();
		document.getElementById("orderChooseDateDiv").style.display = "";
	}else{
		document.getElementById("orderChooseDateDiv").style.display = "none";
		$("#orderChooseDateLabel").show();
		document.getElementById("orderChooseDateLabel").innerText = visitDate;			
	}
	if(visitTime == "" || visitTime == "请选择时间"){
		$("#orderChooseTime0").hide();	
		document.getElementById("orderChooseTimeDiv").style.display = "";
	}else{		
		$("#orderChooseTime0").show();
		document.getElementById("orderChooseTime0").innerText = visitTime;	
		document.getElementById("orderChooseTimeDiv").style.display = "none";
	}
	
	//设置人数
//	$("#orderChooseVisitNum").attr("value",visitNum);
}

function addDate()
{
	var now = new Date();
	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
	var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+2);
	var dayAfterTomo = new Date(now.getFullYear(), now.getMonth(), now.getDate()+3);
	var today0 = today.toISOString();
	var today1 = today0.substring(0,10);
	var tomorrow0 = tomorrow.toISOString();
	var tomorrow1 = tomorrow0.substring(0,10);
    var SdayAfterTomo0 = dayAfterTomo.toISOString();
    var dayAfterTomo1 = SdayAfterTomo0.substring(0,10);
	
	//根据id获取select对象
	var dateSelect = document.getElementById("orderDate");
	dateSelect.options.add(new Option(today1,today1));
	dateSelect.options.add(new Option(tomorrow1,tomorrow1));
	dateSelect.options.add(new Option(dayAfterTomo1,dayAfterTomo1));	
}

//onclick="confirmOrder()">【确认】,使信息不为空
function confirmOrder()
{
	confirmOrderBefore();
	
	var contactName = $("#orderContactName").val();
	var contactPhone = $("#orderContactPhone").val();

	if(!scenicName)
	{
		alert("请选择景区！");
		return false;
	}
	if(!visitDate)
	{
		alert("请选择日期！");
		return false;
	}
	if(!visitTime || visitTime=="请选择时间")
	{
		alert("请选择时间！");
		return false;
	}
	if(!visitNum)
	{
		alert("请填写参观人数！");
		return false; 
	}
	if(!contactName)
	{
		alert("请填写联系人姓名！");
		return false;
	}
	if(!contactPhone)
	{
		alert("请填写联系人手机号！");
		return false;
	}		
	
	var time = visitDate + " " + visitTime;
	var timeNow = getNowFormatDate();
	if(!timeCompare(time, timeNow)){
			return false;	
	}

	timeConflict();	
}

//当时间选定后触发的事件
function setTime(){
	visitTime = $('#orderChooseTime option:selected').val();
//	alert("setTime visitTime" + visitTime);
}

//如果从前一页面没有取到值，则从选择器中选择
function confirmOrderBefore()
{
	if(!scenicName)
	{
		scenicName = $('#orderChooseScenicName option:selected').val();
	}
	
	if(!visitDate)
	{
		visitDate = $("#orderDate option:selected").val();
	}
	
	if(!visitTime && visitTime != "请选择时间")
	{
		visitTime = $('#orderChooseTime option:selected').val();
	}

	if(!visitNum)
	{
		visitNum = $("#orderChooseVisitNum").val();
	}		
}

//判断讲解员的时间与预约时间是否冲突，True 冲突,false  不冲突
function timeConflict(){
	var url = HOST + "/isTimeConflict.do";
	var time = visitDate + " " + visitTime;
	var contactPhone = $("#orderContactPhone").val();
	var contactName = $("#orderContactName").val();

	$.ajax({
		type : "post",
		url : url,
		async : true,
		data:{"guidePhone":guidePhone,"visitTime": time},
		datatype : "JSON",
		error:function()
		{
			alert("timeConflict Request error!");
		},
		success : function(data) {
			if(data != false){
				alert("改讲解员时间发生冲突，请重新选择");
				window.location.href = "orderGuide.html";
			}else{
				window.location.href="orderFormPage.html?"+ "contactPhone=" +contactPhone+"&visitNum="+visitNum+"&visitDate="
				+visitDate+"&visitTime="+visitTime+"&scenicName="+scenicName+"&guidePhone="+guidePhone+"&contactName="+contactName;
			}			
		}
	});
}

//获取并设置导游信息
function setGuideInfo(phone){
	var Url = HOST+"/getDetailGuideInfoByPhone.do";
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{"guidePhone":phone},
		datatype:"JSON",
		error:function()
		{
			alert("导游详细信息Request error!");
		},
		success:function(data)
		{
//			alert(JSON.stringify(data));
			$.each(data, function(i,item) {				
				singleMax = item.singleMax;				
			});
		}
	});
}

function restrictNum(){
	
	var num = $("#orderChooseVisitNum").val();

	if (num == "") {
		alert("请填写游览人数");
		$("#orderChooseVisitNum").val("");
		return false;		
	}else if(!( /^\+?[1-9][0-9]*$/).test(num)){
		alert("请输入正确的人数");
		$("#orderChooseVisitNum").val("");
		return false;
	}
	
	if(parseInt(num) > parseInt(singleMax)){
		alert("超过讲解员带团的最大人数限制");
		$("#orderChooseVisitNum").val("");
		return false;
	}	
}

//输入手机号后，验证手机号的有效性
function checkPhone(){
	//表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; 
	var phone = $("#orderContactPhone").val()
	
	if(!reg.test(phone)){
		alert('请输入有效的手机号码！');
		$("#orderContactPhone").val("");
    	return false;
	}
}

//比较两个时间的大小
function timeCompare(endTime, beginTime){
	
	var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
	if(a < 0){
		alert("您选择的时间在当前时间之前，请重新选择!");
		return false;
	}else{
		return true;	
	}
}

//"yyyy-mm-dd hh:mm",获取当前的时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var minute = date.getMinutes();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + minute;

    return currentdate;
}

function addAllScenics() {
	var url = HOST + "/getAllScenics.do";
	$.ajax({
		type : "post",
		url : url,
		async : true,
		datatype : "JSON",
		success : function(data) {
			addSelect(data);
		}
	});
}
function addSelect(a) {
	$.each(a, function(index, value) {
		addOption(value.scenicName);
	});
}
function addOption(a) {
	// 根据id查找对象，
	var obj = document.getElementById('orderChooseScenicName');
	// 这个只能在IE中有效
	obj.options.add(new Option(a, a)); // 这个兼容IE与firefox
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

//点击【请选择时间】
function checkDateSelect(dateId,timeId){
	
	visitTime = $('#orderDatetime option:selected').val();
	
	var getDate = $(dateId).val();
	if(getDate == "" && visitDate == ""){
		alert("请先选择日期，再选择时间");	
		$(timeId).val("请选择时间");
		return false;
	}
}

//动态改变参观时间
function showVisitTime(dateId,timeId)
{
	var myDate = new Date();
	var myDay = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()+1);
	var today0 = myDay.toISOString();
	var today1 = today0.substring(5,10);
//	var getDate = $("#chooseDate").val();
	var getDate = $(dateId).val();
	var getDate0 = getDate.substring(5,10);
	var hour = myDate.getHours();
	var minute = myDate.getMinutes();
	
//	var mySelect = document.getElementById("orderDatetime123");
	var mySelect = document.getElementById(timeId);
	if(today1 == getDate0)
	{
		if(hour >= 8 && hour < 9 && minute < 30)
		{
			mySelect.options.remove(1);
		}
		if(hour >= 8 && hour < 9 && minute >= 30)
		{
			for(var i = 0; i < 2; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 9 && hour < 10 && minute < 30)
		{
			for(var i = 0; i < 3; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 9 && hour < 10 && minute >= 30)
		{
			for(var i = 0; i < 4; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 10 && hour < 11 && minute < 30)
		{
			for(var i = 0; i < 5; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 10 && hour < 11 && minute >= 30)
		{
			for(var i = 0; i < 6; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 11 && hour < 12 && minute < 30)
		{
			for(var i = 0; i < 7; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 11 && hour < 12 && minute >= 30)
		{
			for(var i = 0; i < 8; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 12 && hour < 13 && minute < 30)
		{
			for(var i = 0; i < 9; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 12 && hour < 13 && minute >= 30)
		{
			for(var i = 0; i < 10; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 13 && hour < 14 && minute < 30)
		{
			for(var i = 0; i < 11; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 13 && hour < 14 && minute >= 30)
		{
			for(var i = 0; i < 12; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 14 && hour < 15 && minute < 30)
		{
			for(var i = 0; i < 13; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 14 && hour < 15 && minute >= 30)
		{	
			for(var i = 0; i < 14; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 15 && hour < 16 && minute < 30)
		{
			for(var i = 0; i < 15; i++)
			{
				mySelect.options.remove(1);
			}
		}	
		if(hour >= 15 && hour < 16 && minute >= 30)
		{
			alert("15");
			for(var i = 0; i < 16; i++)
			{
				mySelect.options.remove(1);
			}
		}	
		if(hour >= 16)
		{
			for(var i = 0; i < 17; i++)
			{
				mySelect.options.remove(1);
			}
		}		
	}else{
		for(var i = 0; i < 17; i++){
				mySelect.options.remove(1);
			}
		mySelect.options.add(new Option("8:00","8:00"),1);
		mySelect.options.add(new Option("8:30","8:30"),2);
		mySelect.options.add(new Option("9:00","9:00"),3);
		mySelect.options.add(new Option("9:30","9:30"),4);
		mySelect.options.add(new Option("10:00","10:00"),5);
		mySelect.options.add(new Option("10:30","10:30"),6);
		mySelect.options.add(new Option("11:00","11:00"),7);
		mySelect.options.add(new Option("11:30","11:30"),8);
		mySelect.options.add(new Option("12:00","12:00"),9);
		mySelect.options.add(new Option("12:30","12:30"),10);
		mySelect.options.add(new Option("13:00","13:00"),11);
		mySelect.options.add(new Option("13:30","13:30"),12);
		mySelect.options.add(new Option("14:00","14:00"),13);
		mySelect.options.add(new Option("14:30","14:30"),14);
		mySelect.options.add(new Option("15:00","15:00"),15);
		mySelect.options.add(new Option("15:30","15:30"),16);
		mySelect.options.add(new Option("16:00","16:00"),17);
	}	
}