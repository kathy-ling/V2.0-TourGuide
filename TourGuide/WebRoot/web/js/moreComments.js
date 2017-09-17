var guidePhone = GetUrlem("guidePhone");

$(function($) {
	
	setGuideComment();
	
});

//获取导游的历史评价记录
function setGuideComment(){

var Url = HOST+"/getComments.do";
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{"guidePhone":guidePhone},
		datatype:"JSON",
		error:function()
		{
			alert("导游评价Request error!");
		},
		success:function(data)
		{
			var num = data.length;
			$("#commentNum").html(num);
			
			$.each(data,function(i,item){				
				var commentStr = "<li><a><span>"+item.nickName+"</span><span>("+item.evaluateTime+")</span><br>";			
				commentStr += "</br><span class='commentText'>"+item.evaluateContext+"</span><hr>";
				$("#commentList").append(commentStr);												
			});
			$("#commentList").listview('refresh');			
		}
	});
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