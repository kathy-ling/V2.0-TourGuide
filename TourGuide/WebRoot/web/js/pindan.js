
//从登录界面获得游客的手机号即登录名
//1-15 datebox 时间无法获取
var scenicNo = GetUrlem("scenicNo");
var scenicName = GetUrlem("sname");
//vistPhone = '18191762572';

$(function($){	
	
	$("#panel2").hide();
	$("#orderTicketPanel").hide();
	
	if(scenicName == null || scenicName == ""){
		getconsistOrder();
	}else{
		chooseOrder();
	}
	
	addDate();	
	getInfofromFormer(scenicName);
		
});

//从服务器获取当前可拼单的订单（所有景区的拼单）
function getconsistOrder()
{	
	var url = HOST+"/getAllAvailableConsistOrder.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		datatype:"JSON",
		error:function()
		{
			alert("可拼拼单Request error!");
		},
		success:function(data)
		{		//JSON.stringify(data)=="[]"
			if(data.length==0){
				$("#pindan_ul_id").empty();
			}
			//动态加载div布局
			$("#pindan_ul_id").empty();
			UpdateConsistOrder(data);
			$("#pindan_ul_id").listview('refresh');
		}
	});
}

//根据用户选择的景区名称和日期,筛选可拼订单
function chooseOrder()
{
	var date1= $("#visitTime1").val();
	var visitNum = $("#chooseVisitNum").val();

	var name1 = document.getElementById("ScenicName1").innerText;
	var name2 = scenicName = $('#chooseScenicName1 option:selected').val();
	if(name1 ==""){
		scenicName = name2;
	}
	if(name2 ==""){
		scenicName = name1;
	}
	
	getTodayFee();
	
	if (date1=="") {
		date1="null";
	}
	
	if (scenicName=="") {
		scenicName="null";
	}
	if (visitNum=="") {
		visitNum="-1";
	}else if(!( /^\+?[1-9][0-9]*$/).test(visitNum)){
		alert("请输入正确的人数");
		$("#chooseVisitNum").val("");
		return false;
	}
	var url = HOST + "/getConsistOrderWithSelector.do";
	$.ajax({
		type : "post",
		url : url,
		async : true,
		data:{scenicName:scenicName,visitDate:date1,visitNum:visitNum},
		datatype : "JSON",
		success : function(data) {
			
			if(data.length==0){
				$("#pindan_ul_id").empty();
				$("#pindan_ul_id").html("<div data-role='main' class='ui-content'><p>没有符合条件的拼单信息</p></div>");
			}else
			{
				$("#pindan_ul_id").empty();
				UpdateConsistOrder(data);
			}
			
			$("#pindan_ul_id").listview('refresh');
		}
	});	
}

//筛选成功，更新列表
function UpdateConsistOrder(data)
{
	var visitNum = $("#chooseVisitNum").val();
	
	$("#pindan_ul_id").empty();
	
	$.each(data, function(i, n){
		
		var UlList = document.getElementById("pindan_ul_id");
		var LiListInfo = document.createElement("li");
		LiListInfo.className = "liStyle";
		UlList.appendChild(LiListInfo);

		var AList = document.createElement("a");
		AList.className = "aStyle";
		AList.href = "ConsistOrderList.html?" + "date=" + n.visitTime+"&PerNum="+n.num+"&Fee="
		+n.guideFee+"&OrderID="+n.orderID+"&visitNum="+visitNum;

		AList.setAttribute("data-ajax", false);

		LiListInfo.appendChild(AList);

		// 添加景区名称
		var SpanListName = document.createElement("span");
		SpanListName.className = "name";
		SpanListName.innerHTML = "景区名称：" + n.scenicName + "<br/>";

		// 添加浏览时间
		var SpanListTime = document.createElement("span");
		SpanListTime.className = "sex";
		SpanListTime.innerHTML = "浏览时间：" + n.visitTime + "<br/>";

		// 添加已有人数
		var SpanListCurrentName = document.createElement("span");
		SpanListCurrentName.className = "age";
		SpanListCurrentName.innerHTML = "已有人数：" + n.currentNum + "<br/>";

		// 添加可拼人数
		var SpanListNum = document.createElement("span");
		SpanListNum.className = "starLevel";
		SpanListNum.innerHTML = "可拼人数：" + n.num + "<br/>";

		// 添加讲解费
		var SpanListGuideFee = document.createElement("span");
		SpanListGuideFee.className = "language";
		SpanListGuideFee.innerHTML = "讲解费：" + n.guideFee + "<br/>";
		
		AList.appendChild(SpanListName);
		AList.appendChild(SpanListTime);
		AList.appendChild(SpanListCurrentName);
		AList.appendChild(SpanListNum);
		AList.appendChild(SpanListGuideFee);	
	});
	$("#order_guide_ul").listview('refresh');
		
		/*$.each(data, function(i,n){
		
			var htmlString="<li><a href='ConsistOrderList.html?date="+n.visitTime+
			"&PerNum="+n.num+"&Fee="+n.guideFee+"&OrderID="+n.orderID+"&visitNum="+visitNum+"'>" +
//			"<span>订单编号:"+n.orderID+"</span><br/>" +
			"<span>景区名称："+n.scenicName+"</span><br/>" +
			"<span>游览时间："+n.visitTime+"</span><br/>" +
			"<span>已有人数："+n.currentNum+"</span><br/>" +
			"<span>可拼人数："+n.num+"</span><br/>" +
			"<span>讲解费："+n.guideFee+"元/人</span><br/></a></li>";
			a = a + htmlString;
		
			});	
	$("#pindan_ul_id").html(a);*/	
}

//发起拼单，选则景区后，获取当日的拼单讲解费
function getTodayFee()
{
//	var scenicName = $('#chooseScenicName option:selected').val();
	var d = new Date();
	var dateStr = d.getFullYear()+"-0"+(d.getMonth()+1)+"-"+d.getDate();
	var url = HOST+"/getIntroFee.do";
	var fee;
	if(scenicName == null || scenicName == ""){
		scenicName = $('#chooseScenicName option:selected').val();
	}	
	
	$('#ul_fee').empty();

	$.ajax({
		type:"get",
		url:url,
		async:true,
		data:{scenicName:scenicName,date:dateStr},
		success:function(data)
		{
			fee=data;
			var ul_feetext ="<li><a><h3>今日费用信息</h3><p>讲解费："+data+"元/人<br>";
			
			$("#ul_fee").append(ul_feetext);
			$("#ul_fee").listview("refresh");
		},
	});
}


//发起拼单，选择日期后，获取选定日期的拼单讲解费
function getDateFee()
{
//	var scenicName = $('#chooseScenicName option:selected').val();
	var visitdate=$("#visitTime").val();
	var url = HOST+"/getIntroFee.do";
	var fee;
	var num = $("#visitorCount").val();
	if(scenicName == null || scenicName == ""){
		scenicName = $('#chooseScenicName option:selected').val();
	}

	$('#ul_fee').empty();

	if (scenicName=='') {
		alert('请先选择景区！');
		$("#visitTime").val("");
		return false;
	}
	
	$.ajax({
		type:"get",
		url:url,
		async:true,
		data:{scenicName:scenicName,date:visitdate},
		success:function(data)
		{
			fee = data;
			var ul_feetext ="<li><a><h3>当日费用信息</h3><p>讲解费："+data+"元/人<br>"+
			"<p>拼团人数："+num+"人<br><p>总计："+data*num+"元<br>";
			
			$("#ul_fee").append(ul_feetext);
			$("#ul_fee").listview("refresh");
		},
	});
}

//对输入的人数进行判断
function checkNum(){
	var visitNum = $("#visitorCount").val();
	
	if (visitNum=="") {
		alert("请填写游览人数，再进行确认");
		$("#visitorCount").val("");
		return false;		
	}else if(!( /^\+?[1-9][0-9]*$/).test(visitNum)){
		alert("请输入正确的人数");
		$("#visitorCount").val("");
		return false;
	}else{
		getDateFee();
	}
}

//输入手机号后，验证手机号的有效性
function checkPhone(){
	//表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; 
	var phone = $("#visitorPhone").val();
	
	if(!reg.test(phone)){
		alert('请输入有效的手机号码！');
		$("#visitorPhone").val("");
    	return false;
	}
}

//发起拼单-【确定】按钮的处理事件
function paySubmit(){
//	var scenicName = $("#chooseScenicName").val();
	var visitdate=$("#visitTime").val();
	var visitTime=$("#chooseDatetime").val();
	var visitorPhone=$("#visitorPhone").val();
	var visitNum=$("#visitorCount").val();
	
	if(scenicName == null || scenicName == ""){
		scenicName = $('#chooseScenicName option:selected').val();
	}
	if (scenicName=="") {
		alert("请选择景区，再进行确认");
		return false;
	}
	
	if (visitdate=="") {
		alert("请选择日期，再进行确认");
		return false;
	}
	if(visitdate != "" && visitTime != ""){
		var time =  visitdate + " " + visitTime;

		var timeNow = getNowFormatDate();
		if(!timeCompare(time, timeNow)){
			return false;
		}
	}

	if (visitNum=="") {
		alert("请填写游览人数，再进行确认");
		return false;		
	}
	
	if (visitorPhone=="") {
		alert("请填写游览人的联系方式，再进行确认");
		return false;
	}
			
	window.location.href = "consistOrder.html?" + "visitorPhone=" + visitorPhone+"&visitNum="+visitNum+"&visitDate="
	+visitdate+"&visitTime="+visitTime+"&scenicName="+scenicName;
}



//从前一个页面获取景点名称
function getInfofromFormer(scenicName){
	//从前一个页面获取到了相应的值后，隐藏选择器，显示lable并赋值
	if(scenicName == "" || scenicName == "null" || scenicName == null){
		$("#ScenicName").hide();
		document.getElementById("chooseScenicNameDiv").style.display = "";
		$("#ScenicName1").hide();
		document.getElementById("chooseScenicNameDiv1").style.display = "";
		addAllScenics();
	}else{	
		$("#ScenicName").show();
		document.getElementById("ScenicName").innerText = scenicName;
		document.getElementById("chooseScenicNameDiv").style.display = "none";
		$("#ScenicName1").show();
		document.getElementById("ScenicName1").innerText = scenicName;
		document.getElementById("chooseScenicNameDiv1").style.display = "none";
	}	
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
	var dateSelect = document.getElementById("visitTime");
	var dateSelect1 = document.getElementById("visitTime1");

	dateSelect.options.add(new Option(today1,today1));
	dateSelect.options.add(new Option(tomorrow1,tomorrow1));
	dateSelect.options.add(new Option(dayAfterTomo1,dayAfterTomo1));
	
	dateSelect1.options.add(new Option(today1,today1));
	dateSelect1.options.add(new Option(tomorrow1,tomorrow1));
	dateSelect1.options.add(new Option(dayAfterTomo1,dayAfterTomo1));
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
	var obj = document.getElementById('chooseScenicName');
	var obj1 = document.getElementById('chooseScenicName1');
	// 这个只能在IE中有效
	obj.options.add(new Option(a, a));
	obj1.options.add(new Option(a, a)); 
}


function goOrder()
{
	window.location.href = "ConsistOrderList.html";
}


//【快捷拼单】按钮
function fastPin(){
	if(vistPhone == undefined || vistPhone == openId)
	{
		alert("您还未注册，请注册！");
		window.location.href = "register.html";
	}else{
		var black = sessionStorage.getItem("isBlackened");

		if(black == "false"){
			window.location.href = "FastPin.html?scenicName="+scenicName;
		}else{
			alert("您已被系统管理员拉黑!");
			return;
		}
	}	
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

//点击【请选择时间】
function checkDateSelect(dateId,timeId){
	var getDate = $(dateId).val();
	
	if(getDate == ""){
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
//			alert("15");
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
	getDateFee();

}

/*function consistOrder()
{
	var HalfPrice=0;
	var FullPrice=0;
	var DiscoutPrice=0;
	if($("input[name='pindan_orderTicket']:checked").val() == 1)
	{
		if($("#halfPriceTicketNum").val())
		{HalfPrice = $("#halfPriceTicketNum").val();}
		if($("#fullPriceTicketNum").val())
		{FullPrice = $("#fullPriceTicketNum").val();}
		if($("#discountTicketNum").val())
		{DiscoutPrice = $("#discountTicketNum").val();}
	}
	var data = 
	{
		scenicID:scenicNo,
		visitTime:$("#visitTime").val()+" "+$("#chooseDatetime").val(),
		visitNum:$("#visitorCount").val(),
		visitorPhone:getPhoneByOpenId(),
		purchaseTicket:$("input[name='pindan_orderTicket']:checked").val(),
		halfPrice:HalfPrice,
		discoutPrice:DiscoutPrice,
		fullPrice:FullPrice
	};
	
	
	var url = HOST+"/releaseConsistOrder.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:data,
		datatype:"JSON",
		error:function()
		{
			alert("发起拼单Request error!");
		},
		success:function(data)
		{
			alert("发起拼单success!");	
		}
	});
}*/



/*function setFeeform(){
	var url1 = HOST+"/getIntroFee.do";
	$.ajax({
		type:"post",
		url:url1,
		async:true,
		data:{'scenicID':scenicNo,'date':$("#visitTime").val()},
		datatype:"JSON",
		error:function()
		{
			alert("返回讲解费Request error!");
		},
		success:function(data)
		{
			//alert("返回讲解费Request success!");
			//alert(data);
			alert(data);
			var ul_feetext ="<li><a><h3>费用信息</h3><p>讲解费："+data+"<br>";
			var HalfPrice = sessionStorage.halfPrice;
			var FullPrice = sessionStorage.fullPrice;
			var DiscoutPrice = sessionStorage.discoutPrice;
			var Hal=0;
			var Ful=0;
			var Dis=0;
			var order = $("input[name='pindan_orderTicket']:checked").val();
			var ticketPrice = 0;
			var TotalMoney = 0;
			if(order==1){
				var TicketPrice ="";
				Hal = $("#halfPriceTicketNum").val();
				Ful = $("#fullPriceTicketNum").val();
				Dis = $("#discountTicketNum").val();		
				ticketPrice = Ful* FullPrice			
							+Hal* HalfPrice
							+Dis* DiscoutPrice;
				TotalMoney = ticketPrice + data;
				if(Ful!=0){
				TicketPrice+=Ful + "*" + FullPrice;
				if(Dis!=0||Hal!=0){
					TicketPrice+="+";
				}
			}
			if(Hal!=0){
				TicketPrice+=Hal + "*" + HalfPrice;
				if(Dis!=0){
					TicketPrice+="+";
				}
			}
			if(Dis!=0){
				TicketPrice+=Dis + "*" + DiscoutPrice;
			}
			ul_feetext+="门票："+TicketPrice+"<br>";
			}
				
			ul_feetext+="合计：<span>"+TotalMoney+"</span>";
			
			$("#ul_fee").append(ul_feetext);
			$("#ul_fee").listview("refresh");
		}
	});
}*/


/*function getFee()
{
	var scenicName = $("#chooseScenicName").val();
	var date1=$("#visitTime").val();
	var url = HOST+"/getIntroFee.do";
	var fee;
	$.ajax({
		type:"get",
		url:url,
		async:true,
		data:{scenicName:scenicName,date:date1},
		success:function(data)
		{
			var ul_feetext ="<li><a><h3>费用信息</h3><p>个人讲解费："+data+"元<br>";
			var ticketPrice = 0;
			
			$("#ul_fee").append(ul_feetext);
			$("#ul_fee").listview("refresh");
		},
	});
	$("#fee").innerHTML=fee;
}*/