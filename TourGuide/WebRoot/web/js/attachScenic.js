var visitPhone = getPhone();
// var visitPhone = "15029319152";

$(function(){
	//填充当前挂靠景点
	setCurrentSpot();
	
	var authorized = false;
	isAuthorized();
});
function changeTab1()
{
	document.getElementById("Attach").className = "selected";
	document.getElementById("AttachHistroy").className = "";
}
function changeTab2()
{
	window.location.href = "attachHistroy.html?date="+Math.random();
}

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
			$.each(data, function(i, n) {
				var list = document.getElementById("allList");
				list.className = "list";
				
				var listItem = document.createElement("div");
				listItem.className = "listItem";
		
				var str = '<div class="scenicImg">'+
					'<img class="ScenicImg" src='+HOST+n.scenicImagePath+'></div>'+
					'<div class="detailInfo"><div class="name">'+
					'<span>'+n.scenicName+'</span></div>'+
					'<div class="all_con"><div class="th_con">导游费:<span></span></div>'+
					'<div class="th_con">导游人数:<span></span></div>'+
					'<div class="th_con">客流量:<span>人/年</span></div></div>'+
					'<div class="applyAttachDiv">'+
					'<button class="applyAttach" scenicID="'+n.scenicNo+'" onclick="applyit($(this))">申请<br/>挂靠'+
					'</button></div>';	
				listItem.innerHTML = str;
				list.appendChild(listItem);				
			});					
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
			guidePhone:visitPhone
		}, 
		datatype: "JSON",
		error: function() {
			alert("false");
		},
		success: function(data) {
			$("#currentList").empty();
			if(JSON.stringify(data) !="{}"){
//				$("#lable1").html("我的挂靠");
				var list = document.getElementById("currentList");
				list.className = "list";
				var listItem = document.createElement("div");
				listItem.className = "listCurrent";
				if(data.passDate==1){
					buttonString = '<button class="cancelAttach" disabled="true" scenicID="'+data.scenicID+'" onclick="cancle($(this))">等待<br/>审核';
				}else{
					buttonString = '<button class="cancelAttach" scenicID="'+data.scenicID+'" onclick="cancle($(this))">取消<br/>挂靠'
				}
				var str = '<div class="scenicImg">'+
						'<img class="ScenicImg" src='+HOST+data.scenicImagePath+'></div>'+
						'<div class="detailInfo"><div class="name">'+
						'<span>'+data.scenicName+'</span></div>'+
						'<div class="all_con"><div class="th_con">导游费:<span></span></div>'+
					'<div class="th_con">导游人数:<span></span></div>'+
					'<div class="th_con">容流量:<span>人/年</span></div></div>'+
					'<div class="applyAttachDiv">'+buttonString+'</button></div>';	
							
				listItem.innerHTML = str;
				list.appendChild(listItem);
			}
			else{
				$("#currentList").hide();
				
			}
			
			setapotlist();
		}			
	});
}

//判断导游是否通过审核
function isAuthorized(){
	var url = HOST + "/isAuthorized.do";
	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: {guidePhone: visitPhone},
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
//申请挂靠景点
function applyit(This){
	var scenicId = This.attr("scenicID");
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
			guidePhone:visitPhone,scenicID:scenicId
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
				location.reload();
			}
			if(parseInt(data) == parseInt(0)){
				alert("申请失败。发生未知错误!");
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
			guidePhone:visitPhone,scenicID:scenicId
		}, //vistPhone
		datatype: "JSON",
		error:function(data){
			alert("请求error");
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
	window.location.href = "attachScenic.html";
}