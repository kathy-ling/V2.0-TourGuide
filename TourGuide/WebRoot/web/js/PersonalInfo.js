
	
$(function($){
	var Phone = vistPhone;
//	Phone = '18191762572';
	setperinfo(Phone);
});

//根据手机号，从服务器获取用户的信息
function setperinfo(Phone){
	var url = HOST+"/getVisitorInfoWithPhone.do";

	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{phone:Phone},
		datatype:"JSON",
		error:function()
		{
			alert("显示个人信息Request error!");
		},
		success:function(data)
		{
			if(JSON.stringify(data)!="{}"){
			document.getElementById("person_info_tel").value = data.phone;
			document.getElementById("person_info_nickname").value = data.nickName;
			document.getElementById("person_info_name").value = data.name;
			document.getElementById("person_info_sex").value = data.sex;
			//判断data.image是否为微信服务器上的数据，如不是，要修改为本服务器可以访问的地址
			var img = data.image;
			var patt1 = new RegExp("wx.qlogo.cn");
			if(!patt1.test(img)){
				img = HOST + img;
			}
			
			$("#visithead").attr("src",img);
			$("#visitheadBG").attr("src",img);
			}
		}
	});
}

function selectPersonImg()
{
	document.getElementById("btn_file").click();
}

var image0 = "";
function selectImage(file)
{
	if(!file.files || !file.files[0]) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		document.getElementById("visithead").src = evt.target.result;
		document.getElementById("visitheadBG").src = evt.target.result;
		image0 = evt.target.result;
		
	}
	reader.readAsDataURL(file.files[0]);
	image0 = $("#btn_file").val();
	
	changePerHeadImg();
}

//用户根据openId修改自己的头像
function changePerHeadImg()
{
	var URL = HOST+"/putImg.do";
	
	$.ajaxFileUpload({
			url : URL,
			fileElementId:'btn_file',
			dataType : "json",
			success: function(data){
				if(data == true)
				{
					var Url = HOST+"/changeImg.do";
					$.ajax({
						type:"get",
						url:Url,
						async:false,
						data:{openId:openId},
						datatype : "JSON",
						error:function(data){
							alert("request error 修改用户头像失败！");
						},
						success:function(data){
						}
					});
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

//根据openID，修改处头像之外的其他信息
function editInfo(){
	var nick = document.getElementById("person_info_nickname").value;
	var name = document.getElementById("person_info_name").value;
	var sex = document.getElementById("person_info_sex").value;
	
	var Url = HOST + "/changeInfo.do";	
	$.ajax({
		type:"get",
		url:Url,
		async:false,
		data:{openId:openId,name:name,nickName:nick,sex:sex},
		datatype : "JSON",
		error:function(data){
			alert("修改用户信息失败！");
		},
		success:function(data){
			alert("修改用户信息成功！");
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

//签到
function signIN(Phone){
	var URL = HOST+"guideCheckIn.do?phone="+Phone;
	$.ajax({
		type:"get",
		url:URL,
		async:true,
		error:function(data){
			alert("requertError签到失败");
		},
		success:function(data){
			if(data=true)
			{
				alert("签到成功");
			}else{
				alert("签到失败");
			}
		}
	});
}
//是否签到
function ISsignIN(Phone){
	var URL = HOST+"whetherCheckIn.do?phone="+Phone;
	$.ajax({
		type:"get",
		url:URL,
		async:true,
		error:function(data){
			alert("requesterror获取签到状态失败");
		},
		success:function(data){
			if(data=true)
			{
				
			}else{
				
			}
		}
	});
}