
//alert(scenicName);
$(function(){
	//获得所有景区名称
	addAllScenics();
	//只输入景区名称时进行的筛选
	getGuidesbyScenic();
	
	$("#panel2").hide();
	$("#panel1").show();
	
	
});
function changeTab1()
{
	document.getElementById("OrderTab").className = "selected";
	document.getElementById("ReleaseTab").className = "";
}
function changeTab2()
{
	window.location.href = "releaseOrder.html";
}

//点击立即预约
function orderGuide(phone)
{
	window.location.href = "isOrder.html?guidePhone="+phone;
}
//点击筛选按钮
function screenButton()
{
	if(!($('#chooseScenicName option:selected').val())){
		alert("请先选择景区");
	}else{
		$("#panel1").hide();
		$("#panel2").show();
	}
}

//只输入景区时，进行的筛选
function getGuidesbyScenic()
{	
	$("#guideList").empty();
	var scenicName = $('#chooseScenicName option:selected').val();
	
	if(scenicName =="" ){
		scenicName = "null";
	}
	
	var data = {
		scenicName:scenicName,
		visitTime:"null",
		visitNum:"0"
	};
//	alert(scenicName);
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
			
		},
		success : function(data) {
			
//			alert(JSON.stringify(data));
//			alert(data);
			if (jQuery.isEmptyObject(data)) {
				alert("没有符合条件的讲解员");
			}
			
			addlist(data);
		}
	});	
}
// 更新管理员列表
function addlist(data) {
	
	$.each(data, function(i, n) {
		
		var list = document.getElementById("guideList");
		
		var listItem = document.createElement("div");
		listItem.className = "listItem";
		
		var str1 = '<div class="head">'+'<img onclick="guideDetailInfo('+n.phone+')" src='+HOST+n.image+' onerror="changeImage(this)"></div><div class="detailInfo">'+
		'<div class="name"><span>'+n.name+'</span>';
		
		var str2;
		
		var str3='</div><div class="guideFee"><img class="leftIcon" src="img/4-6导游费图标.png"/>'+
		'<span class="spanText" >导游费：</span><span class="spanInfo1" >'+n.guideFee+'<span>'+
		'</div><div class="guideLevel"><img class="leftIcon" src="img/4-7导游级别图标.png"/>'+
		'<span class="spanText">导游级别:</span><span class="spanInfo">'+n.guideLevel+'</span></div>'+
		'<div class="guideNum"><img class="leftIcon" src="img/4-8接待人次图标.png"/>'+
		'<span class="spanText">接待人次:</span><span class="spanInfo">'+n.historyTimes+'</span>'+
		'</div></div><div class="isOrder"><button class="order" onclick="orderGuide('+n.phone+')">立即<br/>预约</button></div>';
		
		if(n.sex == "女"){		
			str2 = '<span class="GuideSexFemale">'+n.sex+'</span>';
		}else{
			str2 = '<span class="GuideSexMale">'+n.sex+'</span>';
		}
		var str = str1+str2+str3;
		listItem.innerHTML = str;
		list.appendChild(listItem);
		
	});
	
}


function changeImage(img){
	img.src="../web/img/1-2头像.png";
	img.onerror = null; 
}

function guideDetailInfo(phone)
{
	window.location.href = "guideDetailInfo.html?guidePhone="+phone;
}

//查询所有的景区名称
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
	// 这个只能在IE中有效
	obj.options.add(new Option(a, a));
}

//按筛选条件进行的筛选
function getAvailableGuidesWithSelector(visitTime,
			sex,age,language,star)
{
	$("#guideList").empty();
	var scenicName = $('#chooseScenicName option:selected').val();
	data = {
		"scenicName" : scenicName,
		"visitTime" : visitTime,
		"visitNum" : "0",
		"sex" : sex,
		"age" : age,
		"level" : star,
		"language" : language
	}; 

	var Url = HOST + "/getAvailableGuidesWithSelector.do";
	$.ajax({
		type : "post",
		url : Url,
		async : true,
		data : data,
		datatype : "JSON",
		error : function() {
			
		},
		success : function(data) {
			if (jQuery.isEmptyObject(data)) {
				alert("没有符合条件的讲解员");
				return false;
			}
			addlist(data);
		}
	});	
}
//点击确认按钮
function confirmOrder()
{
	var dateSelect = $("input[name='radioDate']:checked").val();
	var timeSelect = $("#SelectTime").val();
	var sex = $("input[name='sex']:checked").val();
	var age = $("input[name='age']:checked").val();
	var language = $("input[name='language']:checked").val();
	var star = $("#starLevel").raty('getScore');
	var visitTime = dateSelect + " " + timeSelect;
	
	if(!dateSelect && !timeSelect){
		alert("请选择游览日期和日期，否则系统将为您设置默认时间");
		visitTime = "null";		
	}

	if (sex == undefined){
		sex = "null";
	} 
	if (age == undefined) {
		age = "null";
	} 
	if (language == undefined) {
		language = "null";
	}
	
	getAvailableGuidesWithSelector(visitTime,
			sex,age,language,star);
	$("#panel2").hide();
	$("#panel1").show();		
}