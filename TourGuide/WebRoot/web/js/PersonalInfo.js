var Phone = getPhone();
//Phone = "18829027144";

$(function($){
	
	setperinfo(Phone);
	$("#signINbtn").click(function(){
		signIN(Phone);
	});
	
	$("#openId").val(openId);
//	$("#openId").val("o_tM3wI3bVTCR_hLp6PTGHtKuumY");
});


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
			//alert(JSON.stringify(data)!="{}");
			if(JSON.stringify(data)!="{}"){
		
			//alert("显示个人信息success!");
			document.getElementById("person_info_tel").value = data.phone;
			document.getElementById("person_info_name").value = data.name;
			$("#GuideHeadImg").attr("src",HOST+'/'+data.image);
			
			}
		}
	});
}

function selectPersonImg()
{
	document.getElementById("btn_file").click();
}
function selectImage(file)
{
//	$("#visithead").hide();
	
	if(!file.files || !file.files[0]) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		document.getElementById("GuideHeadImg").src = evt.target.result;
		image0 = evt.target.result;
		
	}
	reader.readAsDataURL(file.files[0]);
	
	image0 = $("#btn_file").val();
	
//	changePerHeadImg();
}
//用户根据openId修改自己的头像
function changePerHeadImg()
{
	var URL = HOST+"/putImg.do";

	$.ajaxFileUpload({
			url : URL,
			fileElementId:'btn_file',
			dataType : "jsonp",
			success: function(data,status,e){
				alert("成功"+e);
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
			error: function(data,status,e)
			{
				alert(e);
		  		alert("图片上传异常");
			}
	});	
}
//根据openID，修改处头像之外的其他信息
function editInfo(){
	var name = document.getElementById("person_info_name").value;
//	var name = document.getElementById("person_info_tel").value;
	
	var Url = HOST + "/changeInfo.do";	
	$.ajax({
		type:"get",
		url:Url,
		async:false,
		data:{openId:openId,name:name},
		datatype : "JSON",
		error:function(data){
			alert("修改用户信息失败！");
		},
		success:function(data){
			alert("修改用户信息成功！");
		}
	});
}