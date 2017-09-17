
var Phone = GetUrlem("phone");
var ScenicNo = GetUrlem("scenicNo");
var scenicName = GetUrlem("sname");
var visitTime = "null";
//vistPhone = '18191762572';

window.onload = function() {
	
	$("#chosePanel").show();
	$("#releaseDiv").hide();
	
	$("#panel2Btn").bind("click", function(event){		
		isRegistOrder();
		$("#chosePanel").hide();
		$("#releaseDiv").show();
	});
	
	$("#panel1Btn").bind("click", function(event){
		
		$("#chosePanel").show();
		$("#releaseDiv").hide();
		
	});
	
	addDate();

	getInfofromFormer(scenicName);
		
	//动态显示参观时间
	showVisitTime("#chooseDate","orderDatetime123");
	showVisitTime("#orderDate","orderDatetime");
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
		getAvailableGuides1();

	}else{	
		$("#ScenicName").show();
		document.getElementById("ScenicName").innerText = scenicName;
		document.getElementById("chooseScenicNameDiv").style.display = "none";
		$("#ScenicName1").show();
		document.getElementById("ScenicName1").innerText = scenicName;
		document.getElementById("chooseScenicNameDiv1").style.display = "none";
		getAvailableGuides1();
	}	
}

//从服务器获取所有的景区名称，并填充到下拉选择菜单
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
	obj.options.add(new Option(a, a)); // 这个兼容IE与firefox
	obj1.options.add(new Option(a, a));
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
	
	//根据id获取select对象
	var dateSelect = document.getElementById("chooseDate");
	var dateSelect1 = document.getElementById("orderDate");
	dateSelect.options.add(new Option(today1,today1));
	dateSelect.options.add(new Option(tomorrow1,tomorrow1));
	dateSelect.options.add(new Option(dayAfterTomo1,dayAfterTomo1));
	
	dateSelect1.options.add(new Option(today1,today1));
	dateSelect1.options.add(new Option(tomorrow1,tomorrow1));
	dateSelect1.options.add(new Option(dayAfterTomo1,dayAfterTomo1));
}

//点击【筛选】，必须选定景区
function select(){
	
	var name1 = document.getElementById("ScenicName").innerText;
	var name2 = scenicName = $('#chooseScenicName option:selected').val();
	if(name1 ==""){
		scenicName = name2;
	}
	if(name2 ==""){
		scenicName = name1;
	}
	
	if(name1 =="" && name2 ==""){
		alert("请选择景区!");
		return false;
	}else{
		$( "#myPanel" ).panel("open");
	}
}

//只输入景区时，进行的筛选
function getAvailableGuides1()
{	
	var name1 = document.getElementById("ScenicName").innerText;
	var name2 = scenicName = $('#chooseScenicName option:selected').val();
	if(name1 ==""){
		scenicName = name2;
	}
	if(name2 ==""){
		scenicName = name1;
	}
	if(name1 =="" && name2 ==""){
		scenicName = "null";
	}
	var timeNow = getNowFormatDate();
	var date1= $("#chooseDate").val();
	var time1=$("#orderDatetime123").val();

	if(date1 != "" && time1 != ""){
		visitTime =  date1 + " " + time1;		
	}
	var data = {
		scenicName:scenicName,
		visitTime:visitTime,
		visitNum:"0"
	};
//	alert(JSON.stringify(data));
	getAvailableGuides(data);
}


//从服务器端获取数据
function getAvailableGuides(data){
	var Url = HOST + "/getAvailableGuides.do";
	
	$.ajax({
		type : "post",
		url : Url,
		async : true,
		data : data,
		datatype : "JSON",
		error : function() {
			alert("筛选失败，请重新进行选择");
		},
		success : function(data) {
			if (jQuery.isEmptyObject(data)) {
				alert("没有符合条件的讲解员");
			}
			addlist(data);
		}
	});	
}

// 【确定】筛选 onclick="selectAvailableGuides()",根据详细筛选条件显示导游
function selectAvailableGuides() {
	var date1 = $("#chooseDate").val();
	var time1 = $("#orderDatetime123").val();	
	var visitTime =  date1 + " " + time1;
	var sex; // 转换性别
	var issex = $("input:radio[name='sex']:checked").val();	
	var visitNum = $("#chooseVisitNum").val();
	var starlevel = $("#starleve").val();
	var age; // 转换年龄
	var isage = $("input:radio[name='age']:checked").val();
	var language; // 转换语种
	var islanguage = $("input:radio[name='language']:checked").val();
	var data;
		
	if(date1 =="" && time1 =="请选择时间"){
		alert("请选择游览时间和日期，否则系统将为您设置默认时间");
		visitTime = "null";
	}
	if(starlevel == 0)
	{
		starlevel = "null";
	}
	if (issex == undefined){
		sex = "null";
	} else {
		sex = issex;
	}
	if (isage == undefined) {
		age = "null";
	} else {
		age = isage;
	}
	if (islanguage == undefined) {
		language = "null";
	} else {
		language = islanguage;
	}
	
//	alert("scenicName="+scenicName+"  date1="+date1+"  time1"+time1+"  visitNum"+visitNum);

	data = {
		"scenicName" : scenicName,
		"visitTime" : visitTime,
		"visitNum" : "0",
		"sex" : sex,
		"age" : age,
		"level" : starlevel,
		"language" : language
	};
	getAvailableGuidesWithSelector(data);			
}


// 从数据库返回符合详细筛选条件的导游(要求用户输入参观信息)
function getAvailableGuidesWithSelector(data){
	var url = HOST + "/getAvailableGuidesWithSelector.do"
	
	$.ajax({
		type : "post",
		url : url,
		async : true,
		data : data,
		datatype : "JSON",
		error : function() {
			alert("筛选Request error!");
		},
		success : function(data) {
//			 alert("筛选success!");
			if (jQuery.isEmptyObject(data)) {
				alert("没有符合条件的讲解员");
			}
			addlist(data);
		}
	});
}

// 更新管理员列表
function addlist(data) {
	var visitDate =  $("#chooseDate").val();
	var visitTime=$("#orderDatetime123").val();
	var visitNum = $("#chooseVisitNum").val();

	if(scenicName == "" || scenicName == null){
		scenicName = $('#chooseScenicName option:selected').val();
	}
	$("#order_guide_ul").empty();
	
	$.each(data, function(i, n) {
		var UlList = document.getElementById("order_guide_ul");
		var LiListInfo = document.createElement("li");
		LiListInfo.setAttribute("data-icon",false);
		LiListInfo.className = "liStyle";		
		UlList.appendChild(LiListInfo);

		var AList = document.createElement("a");
		AList.className = "aStyle";
		AList.href = "guideInfo.html?" + "phone=" + n.phone+"&visitDate="
		+visitDate+"&visitTime="+visitTime+"&scenicName="+n.scenicName;

		AList.setAttribute("data-ajax", false);

		var ImgList = document.createElement("img");
		ImgList.src = HOST + n.image;
		AList.appendChild(ImgList);
		var PList = document.createElement("p");
		PList.className = "pStyle";

		AList.appendChild(PList);

		// 添加姓名
		var SpanListName = document.createElement("span");
		SpanListName.className = "name";
		SpanListName.innerHTML = "姓名：" + n.name + "<br/>";

		// 添加性别
		var SpanListSex = document.createElement("span");
		SpanListSex.className = "sex";
		SpanListSex.innerHTML = "性别：" + n.sex + "<br/>";

		// 添加年龄
		var SpanListAge = document.createElement("span");
		SpanListAge.className = "age";
		SpanListAge.innerHTML = "年龄：" + n.age + "<br/>";

		// 添加等级
		var SpanListLevel = document.createElement("span");
		SpanListLevel.className = "starLevel";
		SpanListLevel.innerHTML = "等级：" + n.guideLevel + "<br/>";

		// 添加语言
		var SpanListLanguage = document.createElement("span");
		SpanListLanguage.className = "language";
		SpanListLanguage.innerHTML = "讲解语言：" + n.language + "<br/>";
		
		PList.appendChild(SpanListName);
		PList.appendChild(SpanListSex);
		PList.appendChild(SpanListAge);
		PList.appendChild(SpanListLevel);
		PList.appendChild(SpanListLanguage);
		
		// 添加立即预约链接
		var divList = document.createElement("div");
		divList.className = "shuli";
		
		var A1List = document.createElement("a");
		A1List.setAttribute("data-icon",false);
		A1List.innerHTML = "立即预约";
		if(vistPhone != undefined && vistPhone != "null" && vistPhone != openId){
			A1List.href = "confirmOrderInfo.html?"+ "guidePhone=" + n.phone+"&visitDate="
			+visitDate+"&visitTime="+visitTime+"&scenicName="+n.scenicName;
		}else{
			A1List.href = "register.html";
		}
		A1List.setAttribute("Phone", n.phone);
		A1List.setAttribute("data-ajax", false);
		A1List.setAttribute("data-position-to", "window");
		
		divList.appendChild(A1List);
		LiListInfo.appendChild(divList);		
		LiListInfo.appendChild(AList);
	});
	$("#order_guide_ul").listview('refresh');
	myrefresh();
}

function myrefresh() {

	$(".DirectOrderBtn").bind("click", function() {
		var guidephone = $(this).attr("phone");
		$("#DirectorderTicketSub").attr("phone", guidephone);
		$.mobile.changePage("#orderTicketPop", "pop", false, false);
	});
}

function checkNum(){
	var num = $("#visitorCount").val();

	if (num == "") {
		alert("请填写游览人数");
		$("#visitorCount").val("");
		return;		
	}else if(!( /^\+?[1-9][0-9]*$/).test(num)){
		alert("请输入正确的人数");
		$("#visitorCount").val("");
		return;
	}
}

//输入手机号后，验证手机号的有效性
function checkPhone(){
	//表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; 
	var phone = $("#visitorPhone").val()
	
	if(!reg.test(phone)){
		alert('请输入有效的手机号码！');
		$("#visitorPhone").val("");
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

//发布订单：验证用户的输入信息，并进行订单的发布
function checkOrderForm() {	

	var time = $("#orderDate").val() + " " + $("#orderDatetime").val();
	var timeNow = getNowFormatDate();
	var num = $("#visitorCount").val();
	var phone = $("#visitorPhone").val();
	var fee = $('#chooseFee option:selected').val();
	var sex = $("input[name='guideSex']:checked").val();
	var language = $("#guideLanguage option:selected").val();
	var otherRequest = $("#otherRequest").val();
	var visitorName = $("#visitorName").val();
	var name1 = document.getElementById("ScenicName1").innerText;
	var name2 = scenicName = $('#chooseScenicName1 option:selected').val();
	if(name1 ==""){
		scenicName = name2;
	}
	if(name2 ==""){
		scenicName = name1;
	}
	if(name1 =="" && name2 ==""){
		alert("请选择景区!");
		return false;
	}
	if (!$("#orderDate").val()) {
		alert("请选择日期!");
		return false;
	}
	if (!$("#orderDatetime").val()) {
		alert("请选择时间!");
		return false;
	}else if($("#orderDatetime").val()=="请选择时间"){
		alert("时间出错，请重新选择!");
		return false;
	}
	if (!fee) {
		alert("请输入预期价格！");
		return false;
	}	
	if (!num || num < 1) {
		alert("请输入参观人数！");
		return false;
	}
	if (!phone) {
		alert("请输入电话号码！");
		return false;
	}
	if (!$("#visitorName").val()) {
		alert("请输入您的姓名！");
		return false;
	}
	if(!timeCompare(time, timeNow)){
			return false;	
	}	

	var Url = "confirmBookRelease.html?scenicName=" + 
	scenicName+"&visitTime="+time+"&visitNum="+num+
	"&priceRange="+fee+"&guideSex="+sex+"&visitorName="+visitorName+"&language="+
	language+"&contact="+phone+"&otherRequest="+otherRequest;

	window.open(Url);	
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

function isRegistOrder()
{
	if(vistPhone == "undefined" || vistPhone == openId)
	{
		alert("您还未注册，请注册！");
		window.location.href = "register.html";
	}else{
		var black = sessionStorage.getItem("isBlackened");

		if(black == "true"){
			alert("您已被系统管理员拉黑!");
			return false;
		}
	}
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
}

//$('#OrderguidePage').bind('pagecreate', function(event, ui) {
//	var ScenicNo = GetUrlem("scenicNo");
//	sname = GetUrlem("sname");
//	addAllScenics();
//	addPopularGuides();
//
//	//$("#bottom_navigation").load("bottomNavigation.html").trigger("create");
//	
//	if (ScenicNo != null) {
//		sessionStorage.scenicNo = ScenicNo;
//	}
//	if (sname != null) {
//		$("#chooseScenicName").val(sname);
//	}
//	//若等级为0，则传空值
//	
//	$("#selectAvailableGuides").click(function() {
//		selectAvailableGuides();
//	});
//	// 查看推荐
//	$("#getAvailableGuides").click(function() {
//		getAvailableGuides();
//	});
//	// 提交订单
//	$("#submitOrderForm").click(function() {
//		checkOrderForm();// 检查表单正确后，调用提交方法
//	});
//});


/*// 查看推荐显示的导游
function getAvailableGuides() {
	var scenicName = $("#chooseScenicName").val();
	var visitTime = $("#chooseDate").val();
	var visitNum = $("#chooseVisitNum").val();

	sessionStorage.directVisitTime = visitTime;
	sessionStorage.directVisitNum = visitNum;

	var url = HOST + "/getNameSimilarScenics.do";
	$.ajax({
		type : "post",
		url : url,
		async : true,
		data : {
			"scenicName" : scenicName
		},
		datatype : "JSON",
		error : function() {
			alert("搜索景区名称Request error!");
		},
		success : function(data) {
			// alert("搜索景区名称Request success!");
			if (data == null) {
				alert("您输入的名称有误，请重新输入！");
			}
			$.each(data, function(i, item) {
				var scenicNo = item.scenicNo;
				sessionStorage.scenicNo = scenicNo;
//				alert(item.scenicName);
				sessionStorage.directScenicName = item.scenicName;
				// $.cookie("scenicFullName",item.scenicName);
				var dataGuide = {
					"scenicName" : item.scenicName,
					"visitTime" : visitTime1,
					"visitNum" : visitNum
				};
				var url = HOST + "/getAvailableGuides.do";
				$.ajax({
					type : "post",
					url : url,
					async : true,
					data : dataGuide,
					datatype : "JSON",
					error : function() {
						alert("推荐讲解员Request error!");
					},
					success : function(data) {
						addlist(data);
					}
				});
			});
		}
	});
}*/


//	var HalfPrice = 0;
//	var DiscoutPrice = 0;
//	var FullPrice = 0;
//	var PurchaseTicket = 2;
//	var PurchaseTicket = $("input[name='orderTicket']:checked").val();
//	if (PurchaseTicket != null) {
//		if (PurchaseTicket)// 购票
//		{
//			FullPrice = $("#fullPriceTicketNum").val();
//			HalfPrice = $("#halfPriceTicketNum").val();
//			DiscoutPrice = $("#discountTicketNum").val();
//		}
//	} else {
//		alert("请选择是否代购门票！");
//		return false;
//	}


//当用户输入日期时，
function getAvailableGuides2()
{	
	if(scenicName == "" || scenicName == null){
		scenicName = $('#chooseScenicName option:selected').val();
	}
	var date1= $("#chooseDate").val();
	var time1=$("#orderDatetime123").val();
	var visitTime = "null";
	
	if(scenicName == "" || scenicName == "请选择景区"){
		
		alert("请选择景区！");
		$("#chooseDate option").eq(0).attr("selected",true);
		return false;
	}

	if(date1 != "" && time1 != ""){
		visitTime =  date1 + " " + time1;
		var timeNow = getNowFormatDate();
		if(!timeCompare(visitTime, timeNow)){
			return false;	
		}
	}
	
	var data = {
		scenicName:scenicName,
		visitTime: visitTime,
		visitNum:"0"
	};
		
	getAvailableGuides(data);
}

//当用户输入时间时，
function getAvailableGuides3()
{	
	if(scenicName == "" || scenicName == null){
		scenicName = $('#chooseScenicName option:selected').val();
	}
	var date1= $("#chooseDate").val();
	var time1=$("#orderDatetime123").val();
	var visitTime = "null";
	
	if(scenicName == "" || scenicName == "请选择景区"){
		
		alert("请选择景区和日期！");
//		$("#chooseDate option").eq(0).attr("selected",true);
		document.getElementById("chooseDate")[0].selected = true;
		return false;
	}
	
	if(date1 == "" || date1 == "请选择日期"){
		
		alert("请选择日期！");
		document.getElementById("orderDatetime123")[0].selected=true;
//		$("#orderDatetime123 option").eq(0).attr("selected",true);		
		return false;
	}

	if(date1 != "" && time1 != ""){
		visitTime =  date1 + " " + time1;

		var timeNow = getNowFormatDate();
		if(!timeCompare(visitTime, timeNow)){
			return false;	
		}
	}

	var data = {
		scenicName:scenicName,
		visitTime: visitTime,
		visitNum:"0"
	};
	
	getAvailableGuides(data);
}

//当人数发生改变onblur="getAvailableGuides()"
function getAvailableGuides4()
{
	if(scenicName == "" || scenicName == null){
		scenicName = $('#chooseScenicName option:selected').val();
	}
	var date1= $("#chooseDate").val();
	var time1=$("#orderDatetime123").val();
	var visitTime =  date1 + " " + time1;
	var visitNum = $("#chooseVisitNum").val();
	$("#chooseVisitNum").empty();
	
	if (visitNum=="") {
		alert("请输入游览人数");
		return;
	}else if(!( /^\+?[1-9][0-9]*$/).test(visitNum)){
		alert("请输入正确的人数");
		$("#chooseVisitNum").val("");
		return;
	}
	if (scenicName=="") {
		alert("请选择景区，再进行筛选");
		return false;
	}	
	if (date1=="") {
		alert("请选择游览日期，再进行筛选");
		return;
	}
	if (time1=="") {
		alert("请选择游览时间，再进行筛选");
		return;
	}	
	
	
	var data = {
		scenicName:scenicName,
		visitTime:visitTime,
		visitNum:visitNum
	};
	
	getAvailableGuides(data);
}

//从服务端获取系统中最受欢迎的讲解员
function addPopularGuides() {
	var url = HOST + "/getPopularGuides.do";
	$.ajax({
		type : "post",
		url : url,
		async : true,
		datatype : "JSON",
		error : function() {
			alert("获取讲解员Request error!");
		},
		success : function(data) {
			addlist(data);
		}
	});
}

//用户不输入参观信息，只对讲解员进行筛选查看
function getGuidesWithSelector(data){
	var url = HOST + "/getGuidesWithSelector.do"
	
	$.ajax({
		type : "post",
		url : url,
		async : true,
		data : data,
		datatype : "JSON",
		error : function() {
			alert("筛选Request error!");
		},
		success : function(data) {
			 alert("筛选success!");
			if (jQuery.isEmptyObject(data)) {
				alert("没有符合条件的讲解员");
			}
			addlist(data);
		}
	});
}


