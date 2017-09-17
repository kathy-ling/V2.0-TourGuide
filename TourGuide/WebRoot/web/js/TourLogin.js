function setCookie(LoginName,Value)
{
	//对字符串进行编码，使计算机能够识别
	
	alert(Value);
	var LoginName = escape(LoginName);
	var Value = escape(Value);
	
	document.cookie = LoginName + "=" + Value;
	
}
function UserLogin()
{
	//简单验证
	var LoginName = document.getElementById("tour_id").value;
	if(LoginName == "" || LoginName == null)
	{
		alert("用户名不能为空，请输入用户名：");
	}
	var PassWord = document.getElementById("tour_password_id").value;
	if(PassWord == "" || LoginName == null)
	{
		alert("密码不能为空，请输入密码：");
	}	
	
	var data = {username:$("#tour_id").val(),
	            password:$("#tour_password_id").val()};
	var url = HOST+"/login.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:data,
		datatype:"JSON",
		error:function()
		{
			alert("登录Request error!");
		},
		success:function(data)
		{
			alert("登录success!");
			if(data == 0)
			{
				alert("登录失败！");
				return false;
			}
			if(data == 1)
			{
				alert("游客被禁用！");
				return false;
			}
			if(data == 2)
			{
				alert("登录成功！");
				//添加cookie
				setCookie("LoginName",LoginName);	
				window.location.href = "personalHome.html";
			}
			
		}
	});
}

function regist()
{
	window.location.href = "Tour_Regist.html";
}

