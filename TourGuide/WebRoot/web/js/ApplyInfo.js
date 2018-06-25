var Phone = getPhone();

$(document).ready(function() {
				
	$(window).bind('resize load', function() {
		$(".perheader").height($(window).width() * 0.5);
		$(".squareImg").width($(".squareImg").height());		
	});
	setperinfo(Phone);
	
});			

function setperinfo(Phone){
	var url = HOST+"/getGuideApplyInfoByPhone.do";
	
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{guidePhone:Phone},
		datatype:"JSON",
		error:function()
		{
			alert("显示个人信息Request error!");
		},
		success:function(item)
		{
			$("#guide_info_name").html(item.name);
			$("#apply_tel").html(item.phone);
			addsex(item.sex);
			$("#apply_age").html(item.age);
			$("#apply_workAge").html(item.workAge);
			$("#apply_language").html(item.language);
			$("#apply_scenic").html(item.scenicName);
			$("#apply_self_info").html(item.selfIntro);
			var img = item.image;
			var patt1 = new RegExp("wx.qlogo.cn");
			if(!patt1.test(img)){
				img = HOST + img;
			}
			$("#visitor_img").attr("src", img);
			//0-未审核  2-挂靠景区未审核 1-已审核
			var state = item.authorized;
			if(state == 1){
				$("#state").html("已审核通过");
			}else if(state == 0 ){
				$("#state").html("还未审核，请耐心等待");
			}else if(state == 2){
				$("#state").html("审核中，请耐心等待");
			}
			
			$("#applyDate").html(item.applyDate);	
		}
	});
}


function isRegist() {
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

function addsex(sex){
 
	var element = document.getElementById('seximg');

	if(sex=="男"){

		element.src="img/man.png";
	}
	else{
		element.src="img/woman.png";

	}
}
