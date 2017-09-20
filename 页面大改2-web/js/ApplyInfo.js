var Phone = GetUrlem("Phone");

$(document).ready(function() {
				
	$(window).bind('resize load', function() {
		$(".perheader").height($(window).width() * 0.5);
		$(".squareImg").width($(".squareImg").height());		
	});
	
	
//	vistPhone = '18191762572';
//	alert("vistPhone="+Phone);
	setperinfo(Phone);
		
		
//测试性别图片
	sex="男"
	var element = document.getElementById('seximg');

	if(sex=="男"){

		element.src="img/man.png";
	}
	else{
		element.src="img/woman.png";

	}
	
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
		success:function(data)
		{
//			alert(JSON.stringify(data));
			$.each(data, function(i, item) {
				$("#apply_name").html(item.name);
				$("#apply_tel").html(item.phone);
				//$("#apply_sex").html(item.sex);
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
				
//				alert(item.scenicName);
				if(item.scenicName == undefined && state != 0){
					$("#state").html("您还未选择景区，请在挂靠景区中申请！");
				}
				
				$("#applyDate").html(item.applyDate);
				$("#passDate").html(item.passDate);
			});			
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
    sex="男"
	var element = document.getElementById('seximg');

	if(sex=="男"){

		element.src="img/man.png";
	}
	else{
		element.src="img/woman.png";

	}
}
