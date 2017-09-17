
window.onload = function() {

	getUserInfo();

	$("#visitor_img").click(function() {
		$("#btn_file").click();		
	});
}


//从服务端获取用户的部分信息，并显示在页面
function getUserInfo() {
	var url = HOST + "/getInfobyOpenID.do";
//	alert("openid="+openId);

	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: {
			openId: openId//'o8AUTxMhNb82uSM4DcIxesDyDZnY'//
		},
		datatype: "JSON",
		error: function() {
			alert("获取个人信息Request error!");
		},
		success: function(data) {
//			alert(JSON.stringify(data));
			if(JSON.stringify(data) != "{}") {
				$("#nickname").val(data.nickName);
				$("#visitor_img").attr("src", data.image);
			}
		}
	});
}


var image = "";
function selectImage(file) {
	if(!file.files || !file.files[0]) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		document.getElementById("visitor_img").src = evt.target.result;
		image = evt.target.result;
	}
	reader.readAsDataURL(file.files[0]);
}


//上传头像，并进行注册
function changePerHeadImg()
{
	var path = document.getElementById("visitor_img").src;	
	var patt1 = new RegExp("wx.qlogo.cn");
	
	if(check()){
		//如果是微信服务器的图片，则直接注册；否则先上传图片再注册
		if(patt1.test(path)){
			RegistwithImg();
		}else{
			var URL = HOST+"/putImg.do";
		
			$.ajaxFileUpload({
					url : URL,
					fileElementId:'btn_file',
					dataType : "json",
					success: function(data){
						if(data == true)					
						{
							Regist();
						}else
						{
							alert("图片上传失败");
						}				
					 },
					error: function(data)
					{
						alert("图片上传异常");
					}
			});	
		}
	}		
}


function Regist() {
	
//	if(check()) {
		var postdata = {
			"nickName": $("#nickname").val(),
			"sex": $("input:radio[name='guideSex']:checked").val(),
			"name": $("#name").val(),
			"phone": $("#tel").val(),
			"passwd": $("#password").val(),
			"openID": openId
		};

		var url = HOST + "/visitorRegister.do";
		$.ajax({
			type: "post",
			url: url,
			async: true,
			data: postdata,
			datatype: "JSON",
			error: function(data) {
				alert("注册Request error!");
			},
			success: function(data) {
				window.location = HOST + "/web/index.html?phone=" + postdata.phone;	
				sessionStorage.setItem("vistPhone", postdata.phone); 
			}
		});
//	}
}

function RegistwithImg() {
	
//	if(check()) {
		var img = document.getElementById("visitor_img").src;
		var postdata = {
			"nickName": $("#nickname").val(),
			"sex": $("input:radio[name='guideSex']:checked").val(),
			"name": $("#name").val(),
			"phone": $("#tel").val(),
			"passwd": $("#password").val(),
			"image": img,
			"openID": openId
		};

		var url = HOST + "/visitorRegisterWithImg.do";
		$.ajax({
			type: "post",
			url: url,
			async: true,
			data: postdata,
			datatype: "JSON",
			error: function(data) {
				alert("注册Request error!");
			},
			success: function(data) {
				window.location = HOST + "/web/index.html?phone=" + postdata.phone;	
				sessionStorage.setItem("vistPhone", postdata.phone);
			}
		});
//	}
}

//检验输入是否合法
function check() {
	//获取值
	var NickName = $("#nickname").val();
	var Sex = $("input:radio[name='guideSex']:checked").val();
	var Name = $("#name").val();
	var Tel = $("#tel").val();
	var Password = $("#password").val();
	var ConfirmPassword = $("#confirm_password").val();
	var FilePath = $("#btnFile").val();
	var reg = /^1[3|4|5|7|8][0-9]{9}$/;
	
	if(Sex == null || Sex == ""){
		alert("请选择性别!");
		return false;
	}
	if(Tel == null || Tel == "") {
		alert("电话不能为空！");
		return false;
	}
	if(!reg.test(Tel)){
		alert('请输入有效的手机号码！');
		$("#tel").val("");
    	return false;
	}
	if(Password == null || Password == "") {
		alert("密码不能为空！");
		return false;
	}
	if(ConfirmPassword == null || ConfirmPassword == "") {
		alert("确认密码不能为空！");
		return false;
	}
	if(Password != ConfirmPassword) {
		alert("两次输入密码不一致，请重新输入！");
		return false;
	}
	if(Password.length < 3) {
		alert("密码长度不能少于3位，请重新输入！");
		return false;
	}
	if(!(document.getElementById("agreeClause").checked)) {
		alert("请选择您接受相关条款服务！");
		return false;
	}
	return true;
}

//输入手机号后，验证手机号的有效性
function checkPhone(){
	//表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; 
	var phone = $("#tel").val();
	
	if(!reg.test(phone)){
		alert('请输入有效的手机号码！');
		$("#tel").val("");
    	return false;
	}
}