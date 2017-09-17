var pname = document.getElementById("regis_tour_pname").value;
var sex = document.getElementById("regis_sex").value;
var name = document.getElementById("regis_tour_name").value;
var tel = document.getElementById("regis_tour_tel").value;
var password1 = document.getElementById("regis_tour_password").value;
var confirmpassword = document.getElementById("regis_tour_confirm_password").value;
var img = document.getElementById("regis_tour_image");
function Regist()
{
	check();
	var JSONObject=
	{
		"pname":pname,
		"sex":sex,
		"name":name,
		"tel":tel,
		"password1":password1,
		"confirmpassword":confirmpassword     		
	};
}

//检验输入是否合法
function check()
{

	
	if(tel == null || tel == "")
	{  
		alert("电话不能为空！");
		return false;
	}
     if(password1 == null || password1 == "")
	{
		alert("密码不能为空！");
		return false;
	}
	 if(confirmpassword == null || confirmpassword == "")
	{
		alert("确认密码不能为空！");
		return false;
	}
	if(password1 != confirmpassword)
	{
		alert("两次输入密码不一致，请重新输入！");
		return false;
	}
	if(password1.length < 3)
	{
		alert("密码长度不能少于3位，请重新输入！");
		return false;
	}
     if((document.getElementById("checkbox_id").checked) == true)
	{
		alert("注册成功！");
	}
	else
	{
		alert("请选择您接受相关条款服务！");
    } 
	
}

var image = "";
function selectImage(file)
{
	if(!file.files || !file.files[0])
	{
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt)
	{
		document.getElementById("regis_tour_image").src = evt.target.result;
		image = evt.target.result;
	}
	reader.readAsDataURL(file.files[0]);
}
//上传头像
function uploadImage()
{
	$.ajax({
		type:"post",
		url:"",
		data:{image:image},
		async:false,
		dataType:'json',
		success:function(data)
		{
			if(data.success)
			{
				alert("上传成功");
			}
			else
			{
				alert("上传失败");
			}
		}
	});
}


