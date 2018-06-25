//var vistPhone = "18829027144";
$(function(){
	//判断是否加黑
	isBlackened();
});

//查看用户是否被加黑，false --没有拉黑，true---拉黑
function isBlackened(){
	var Url = HOST + "/isBlackened.do";
	
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{phone:vistPhone},
		datatype:"JSON",
		error:function()
		{
			alert("判断是否加黑 Request error!");
		},
		success:function(data)
		{
//			alert("data="+data);
			if(data == true){
				sessionStorage.setItem("isBlackened", "true"); 
			}else{
				sessionStorage.setItem("isBlackened", "false");
			}
			
		}
	});
}

function isRegist1(n) {
	if(vistPhone == undefined || vistPhone == openId) {
		alert("您还未注册，请注册！");
		window.location.href = "register.html";
	} else {
		var black = sessionStorage.getItem("isBlackened");

		if(black == "false") {
			if(n == 0) {
				window.location.href = 'orderGuides.html';
			} else if(n == 1) {
				window.location.href = 'pinIndex.html';
			} else if(n == 2) {
				window.location.href = 'personalHome.html';
			} else if(n == 3) {

			}

		} else {
			alert("您已被系统管理员拉黑!");
		}
	}
}