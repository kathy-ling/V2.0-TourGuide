$(".my-imgcard").height($(window).width() * 0.3);

$(window).bind('resize load', function() {
	//加载底部导航栏
	$("#bottom_navigation").load("bottomNavigation.html").trigger("create");
	$(".my-imgcard").height($(window).width() * 0.3);
});

$(function($) {
	$("#panel2").hide();
	$("#lable1").hide();
	$("#lable2").hide();

	setapotlist();
	setCurrentSpot();
	getCurrentApply();
	getHistoryAffiliation();
	
	var authorized = false;
	isAuthorized();
});

//填充景点列表
function setapotlist() {
	var url = HOST + "/getAllScenics.do";
	$.ajax({
		type: "post",
		url: url,
		async: true,
		datatype: "JSON",
		error: function() {
			alert("全部景点Request error!");
		},
		success: function(data) {
			$("#scenic_ul").empty();

			$.each(data, function(i, n) {
				var a = '<li><a href="#" scenicNo="' + n.scenicNo + '" onclick="toDetail($(this))">';
				var img = '<img src="' + HOST + n.scenicImagePath + '">';
				var span = '<p><span class="spotname" scenicNo="' + n.scenicNo + '">' + n.scenicName + '</span><br/></p>';
				var btn = '<div class="sidebtn"><a  href="#" scenicNo="' + n.scenicNo + '" onclick="applyit($(this))" class="ui-btn ui-mini ui-btn-raised clr-primary ui-btn-inline" >申请挂靠</a></div>';

				$("#scenic_ul").append(a + img + span + btn);
			});
			$("#scenic_ul").listview("refresh");
		}
	});
}

//查看挂靠记录
function getHistoryAffiliation() {

	var Url = HOST + "/getHistoryAffiliation.do";
	$.ajax({
		type: "post",
		url: Url,
		async: true,
		data: {
			guidePhone:vistPhone
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("Request error!");
		},
		success: function(data) {

			$("#history").empty();

			$.each(data, function(i, n) {
				var name = '<li><p>挂靠景区: <span>' + n.scenicName + '</span><br/>';
				var date1 = '申请时间: <span>' + n.applyDate + '</span><br/> ';
				var date2 = '挂靠时间: <span>' + n.passDate + '</span><br/> ';
				var date3 = '取消时间: <span>' + n.quitDate + '</span><br/></p></li> ';

				$("#history").append(name + date1 + date2 + date3);
			});
			$("#history").listview("refresh");
		}
	});
}

//填充当前挂靠景点
function setCurrentSpot() {
	var Url = HOST + "/getCurrentAffiliation.do";

	$.ajax({
		type: "get",
		url: Url,
		async: true,
		data: {
			guidePhone:vistPhone
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("false");
		},
		success: function(data) {
			$("#lable2").hide();
			if(JSON.stringify(data)!="{}"){
				$("#lable1").show();
				$("#lable1").html("我的挂靠"); 
				var p1 = '<li><p>挂靠景区：<span>' + data.scenicName + '</span><br/><br/>';
				var p2 = '申请时间：<span>' + data.applyDate + '</span><br/>';
				var p3 = '挂靠时间：<span>' + data.passDate + '</span><br/></p>';
				var div = '<div class="sidebtn"><a  href="#" scenicID="'+data.scenicID+'" onclick="cancle($(this))" class="ui-btn ui-mini ui-btn-raised clr-primary ui-btn-inline" >取消挂靠</a></div></li>';
				
				$("#current_ul").append(p1+p2+p3+div);
				$("#current_ul").listview("refresh");
			}else{	
				$("#lable1").html("您还未挂靠景点!");
				$("#lable1").show();				 
			}
		}
	});
}

//查看当前的挂靠申请
function getCurrentApply(){
	var Url = HOST + "/getCurrentApply.do";
	
	$.ajax({
		type: "get",
		url: Url,
		async: true,
		data: {
			guidePhone:vistPhone
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("false");
		},
		success: function(data) {
			$("#lable1").hide();
			if(JSON.stringify(data)!="{}"){
				$("#lable2").show();
				$("#lable2").html("我的挂靠申请"); 
				var p1 = '<li><p>景区名称：<span>' + data.scenicName + '</span><br/><br/>';
				var p2 = '申请时间：<span>' + data.applyDate + '</span><br/></p>';
//				var div = '<div class="sidebtn"><a  href="#" scenicNo="'+data.scenicID+'" onclick="cancle($(this))" class="ui-btn ui-mini ui-btn-raised clr-primary ui-btn-inline" >待处理</a></div></li>';
				var div = '<div class="sidebtn"><label style="text-align: end; font-size: larger; color:#008A00;">待处理</label></div></li>';
				
				$("#current_ul").append(p1+p2+div);
				$("#current_ul").listview("refresh");
			}			
		}
	});
}


//取消挂靠
function cancle(This){
	var scenicId = This.attr("scenicID");
	
	var URL = HOST+'/cancleAffiliation.do';

	$.ajax({
		type:"get",
		url:URL,
		async:true,
		data: {
			guidePhone:vistPhone,scenicID:scenicId
		}, //vistPhone
		datatype: "JSON",
		error:function(data){
			console.log(JSON.stringify(data));
		},
		success:function(data){		
			if(data == true){
				alert("取消成功！");
				setCurrentSpot();				
			}
			if(data == false){
				alert("您还有订单未处理，不能取消挂靠！");
			}
		}
	});
	window.location.href = "applyForAffiliation.html";
}


//申请挂靠景点
function applyit(This){
	var scenicId = This.attr("scenicNo");
	var URL = HOST+'/applyForAffiliation.do';
	
	if(authorized == false){
		alert("您暂未通过审核，不能使用此功能!");
		return false;
	}

	$.ajax({
		type:"get",
		url:URL,
		async:true,
		data: {
			guidePhone:vistPhone,scenicID:scenicId
		}, //vistPhone
		datatype: "JSON",
		error:function(data){
			console.log(JSON.stringify(data));
		},
		success:function(data){
//			alert("data="+JSON.stringify(data));
			//0--失败 ，1--成功，-1--申请失败。因为您有待处理的挂靠申请！，-2请先取消当前的挂靠，再进行申请,-3未通过审核，不能挂靠
			if(parseInt(data) == parseInt(-3)){
				alert("未通过审核，不能挂靠");
			}
			if(parseInt(data) == parseInt(-2)){
				alert("请先取消当前的挂靠，再进行申请!");
			}
			if(parseInt(data) == parseInt(-1)){
				alert("申请失败。因为您有待处理的挂靠申请!");
			}
			if(parseInt(data) == parseInt(1)){
				alert("申请成功，请耐心等待审核和通知!");
				$("#lable1").hide();
				$("#lable2").show();
				$("#lable2").html("我的挂靠申请"); 
				window.location.href = "applyForAffiliation.html";
			}
			if(parseInt(data) == parseInt(0)){
				alert("申请失败。发生未知错误!");
			}
		}
	});
}

function toDetail(This){
	
	var scenicNo = This.attr("scenicNo");
	window.location.href = "scenicSpot.html?scenicNo=" + scenicNo;
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

//判断导游是否通过审核
function isAuthorized(){
	var url = HOST + "/isAuthorized.do";
	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: {guidePhone: vistPhone},
		datatype: "JSON",
		error: function() {
			alert("Request error!");
		},
		success: function(data) {
			if(data == true){
				authorized = true;
			}else{
				authorized = false;
			}
		}
	});
}