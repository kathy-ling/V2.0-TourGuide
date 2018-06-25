var guidePhone = GetUrlem("guidePhone");
//var guidePhone = "18629086366";
var scenicName;
var guideFee;
$(function() {
	
	document.getElementById("body").style.width=window.screen.width;
	
    $( "#radio" ).buttonset();
    
    var num = $("#VisitNum").val();
    $("#Minus").click(function(){
    	if(num > 0){
    		$("#VisitNum").val(--num);
    	} 
    	else{
    		alert("选择不合法");
    	}
    })
    $("#Plus").click(function(){
    	$("#VisitNum").val(++num);
    })
    
    //设置并获得讲解员信息
    setGuideInfo(guidePhone);
    //动态获取日期
    addDate();   
});
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
			$.each(data, function(i,item) {
				$("#GuideName").html(item.name);		
				$("#GuideHead").attr("src",HOST+item.image);
				$("#GuideSex").html(item.sex);
				$("#GuideLevel").html(item.guideLevel);
				$("#GuideAge").html(item.age);
				$("#GuideFee").html(item.guideFee);
				$("#GuideLanguage").html(item.language);
				$("#GuideScenic").html(item.scenicName);
				$("#GuideNum").html(item.historyTimes);
				scenicName = item.scenicName;
				guideFee = item.guideFee;
				if(item.sex == "男"){
					$("#GuideSex").attr("class","guideMaleSex");
				}else{
					$("#GuideSex").attr("class","guideFemalSex");
				}
			});
		}
	});
}
//设置日期格式，填充至下拉选择菜单
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
    var date1 = today0.substring(5,10);
    var date2 = tomorrow1.substring(5,10);
    var date3 = dayAfterTomo1.substring(5,10);
	
	$("#radio1").val(today1);
	$("#radio2").val(tomorrow1);
	$("#radio3").val(dayAfterTomo1);
	$("#radioLabel1").html(date1);
	$("#radioLabel2").html(date2);
	$("#radioLabel3").html(date3);
}
//动态改变参观时间
function showVisitTime()
{
	var myDate = new Date();
	var myDay = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()+1);
	var today0 = myDay.toISOString();
	var today1 = today0.substring(0,10);
	var mySelect = document.getElementById("SelectTime");
	if(today1 == $("input[name='radioDate']:checked").val())
	{
		var eight = new Date(today1+" 08:00:00");	
		var count = (myDate - eight)/60000 / 60 /0.5;	
		if(count>=19){count=19}
		for(i=0;i<count;i++){
			mySelect.options.remove(1);
		}
	}else{
		for(var i = 0; i < 20; i++){
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
//点击确认
function isOrder()
{
//	alert(scenicName+guideFee);
//	confirmOrderBefore();
	if(!$("input[name='radioDate']:checked").val()){
		alert("请选择参观日期！");
		return false;
	}
	
	if(!$("#SelectTime").val()){
		alert("请选择参观时间！");
		return false;
	}

	if(!$("#VisitNum").val()){
		alert("请选择参观人数！");
		return false;
	}
	if(!$("#ContactName").val()){
		alert("请输入联系人姓名！");
		return false;
	}
	if(!$("#ContactPhone").val()){
		alert("请输入联系人电话！");
		return false;
		
	}
	
	var visitDate = $("input[name='radioDate']:checked").val();
	var visitTime = $("#SelectTime").val();
	var time = visitDate + " " + visitTime;
	var visitNum = $("#VisitNum").val();
	var contactName = $("#ContactName").val();
	var contactPhone = $("#ContactPhone").val();
	
	var timeNow = getNowFormatDate();
	if(!timeCompare(time, timeNow)){
			return false;	
	}
	timeConflict(visitDate,visitTime,scenicName,visitNum,contactName,contactPhone);	
}
//判断讲解员的时间与预约时间是否冲突，True 冲突,false  不冲突
function timeConflict(visitDate,visitTime,scenicName,visitNum,contactName,contactPhone){
	var url = HOST + "/isTimeConflict.do";
	var time = visitDate + " " + visitTime;
	var contactPhone = $("#ContactPhone").val();
	var contactName = $("#ContactName").val();

	$.ajax({
		type : "post",
		url : url,
		async : true,
		data:{"guidePhone":guidePhone,"visitTime": time},
		datatype : "JSON",
		error:function()
		{
			alert("timeConflict Request error!");
			return false;
		},
		success : function(data) {
			if(data != false){
				alert("改讲解员时间发生冲突，请重新选择");
				window.location.href = "orderGuide.html";
			}else{
				window.location.href="confirmOrder.html?"+ "contactPhone=" +contactPhone+"&visitNum="+visitNum+"&visitDate="
				+visitDate+"&visitTime="+visitTime+"&scenicName="+scenicName+"&guidePhone="+guidePhone+"&contactName="+contactName;
			}			
		}
	});
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
//输入手机号后，验证手机号的有效性
function checkPhone(){
	//表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; 
	var phone = $("#ContactPhone").val()
	
	if(!reg.test(phone)){
		alert('请输入有效的手机号码！');
		$("#ContactPhone").val("");
    	return false;
	}
}