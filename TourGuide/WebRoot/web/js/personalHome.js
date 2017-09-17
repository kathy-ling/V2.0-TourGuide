
//vistPhone='18191762572';

$(function($) {
	//加载底部导航栏
	$("#bottom_navigation").load("bottomNavigation.html").trigger("create");

	$("#header").height($("#header").width() * 0.5);
	$(".personalHomeHead").width($(".personalHomeHead").height());

	$(window).bind('resize load', function() {
		$("#header").height($("#header").width() * 0.5);
		$(".personalHomeHead").width($(".personalHomeHead").height());
		var myorder = $(".myorder").find("a.my-ui-block");
		myorder.height(myorder.width());
		var ImGuide = $(".ImGuide").find("a.my-ui-block");
		ImGuide.height(ImGuide.width());
	});

	$(".orderFormLink").click(function(event) {
		/*URL = "orderFormList.html?hide=" + $(this).children('span').html();
		$.mobile.changePage(URL);*/
		window.location.href = "orderFormList.html?hide=" + $(this).children('span').html();
	});
	
	setperinfo();
	
	
	var authorized = false;
	isAuthorized();
});

function getAllOrders(){
	window.location.href = "orderFormList.html";
}

function setperinfo() {
	var url = HOST + "/getVisitorInfoWithPhone.do";
	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: {
			phone: vistPhone
		},
		datatype: "JSON",
		error: function() {
			alert("显示个人信息Request error!");
		},
		success: function(data) {
			if(JSON.stringify(data) != "{}") {
				$("#guideHeadername").html(data.nickName);
				
				var img = data.image;
				var patt1 = new RegExp("wx.qlogo.cn");
				if(!patt1.test(img)){
					img = HOST + img;
				}
				//$(".perhead").attr("src", img);		
				}
			}
		});
}

function guideApply(){
	//true--已经申请， false--未申请		
	var url = HOST + "/hasApplied.do";
	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: {
			phone: vistPhone
		},
		datatype: "JSON",
		error: function() {
			alert("显示个人信息Request error!");
		},
		success: function(data) {	
//			alert("data"+data);
			if(data == true){				
				window.location.href = "ApplyInfo.html?Phone="+vistPhone;
			}else{
				window.location.href = "guideApply.html";
			}
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

//点击【抢单】
function takeOrder(){
	
	if(authorized){
		window.location.href = "takeOrder.html";
	}else{
		alert("您暂未通过审核，不能使用此功能!");
	}
}

//点击【扫一扫】
function weiXin(){
	
	if(authorized){
		var Phone = vistPhone;
		window.location.href = "QRcodeScan.html?guidePhone="+Phone;
	}else{
		alert("您暂未通过审核，不能使用此功能!");
	}			
}

