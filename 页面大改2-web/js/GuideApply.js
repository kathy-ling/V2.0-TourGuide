

$(document).ready(function() {
				
	$(window).bind('resize load', function() {
		$(".perheader").height($(window).width() * 0.5);
		$(".squareImg").width($(".squareImg").height());		
	});
	
	var Phone = vistPhone;
//	alert("Phone"+Phone);
//	Phone = '18191762572';
	setperinfo(Phone);
	addAllScenics();		
			
	$("#visitor_img").click(function() {
		$("#btn_file").click();		
	});
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
			if(JSON.stringify(data)!="{}"){
				$("#apply_tel").val(data.phone);
				$("#apply_name").val(data.name);
			}
		}
	});
}

var image = "";
function selectImage(file) {
	if(!file.files || !file.files[0]) {
		return;
	}
	var f = file.files[0];
	 if (f.type != 'image/jpeg') {
        alert('图片类型错误!');
        return false;
    }
	if(f.size > 1024*1024){
		alert('图片大小超过限制!');
        return false;
	}	
	
	var reader = new FileReader();
	reader.onload = function(evt) {
		document.getElementById("visitor_img").src = evt.target.result;
		image = evt.target.result;
	}
	reader.readAsDataURL(file.files[0]);
}

/*function selectPersonImg(){
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
		image0 = evt.target.result;		
	}
	reader.readAsDataURL(file.files[0]);	
}*/

function upLoadImg()
{
	var src = document.getElementById("visitor_img").src;
	var patt1 = new RegExp("visitor");
	if(patt1.test(src)){
		alert("请选择照片！");
		return;
	}
	
	var URL = HOST+"/upLoadImg.do";
	
	$.ajaxFileUpload({
			url : URL,
			fileElementId:'btn_file',
			dataType : "json",
			type:'json',
			success: function(data){
//				alert(JSON.stringify(data));
//				alert(data == true);
//				alert(data == "true");
				if(data == true)					
				{
					checkAuthentication();
				}else
				{
					alert("图片上传失败");
				}				
			 },
			error: function(data)
			{			
//				alert(JSON.stringify(data));
				alert("error---图片上传异常");
			}
	});	
}

function checkAuthentication(){
	var phone = document.getElementById("apply_tel").value;
	var name = document.getElementById("apply_name").value;
	var sex = $("input[name='guideSex']:checked").val();
	var language = $("#apply_guideLanguage option:selected").val();
	var selfIntro = document.getElementById("apply_self_info").value;
	var age = document.getElementById("apply_age").value;
	var workAge = $("#apply_workAge").val();
	var ScenicName = $("#chooseScenicName").val();
	
	if(name == ""){
		alert("姓名不能为空!");
		return false;
	}
	if(sex == ""){
		alert("性别不能为空!");
		return false;
	}
	if(age == ""){
		alert("年龄不能为空!");
		return false;
	}
	if(workAge == "请选择时间" || workAge == ""){
		alert("从业时间不能为空!");
		return false;
	}
	if(phone == ""){
		alert("手机号不能为空!");
		return false;
	}else{
		checkPhone();
	}
	if(ScenicName == "" || ScenicName =="请选择景区"){
		alert("景区不能为空!");
		return false;
	}
	if(selfIntro == ""){
		alert("自我介绍不能为空!");
		return false;
	}
	
	var data = {
		"phone":phone,
		"name":name,
		"sex":sex,
		"language":language,
		"selfIntro":selfIntro,
		"age":age,
		"workAge":workAge,
		"scenic":ScenicName
	};
//	alert(JSON.stringify(data));
	guideAuthentication(data);
}

function guideAuthentication(data){	
	var url = HOST+"/getGuideAuthentication.do";
	
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:data,
		datatype:"JSON",
		error:function()
		{
			alert("导游申请认证Request error!");
		},
		success:function(data)
		{			
			if(data == -1)
			{
				alert("您申请的账号已存在！");
			}
			if(data == 1){
				alert("导游申请成功，系统审核后将会以短信的方式通知您，请耐心等待!");
				window.location.href = "personalHome.html";
			}
			if(data == 0){
				alert("导游申请认证Request error!");
			}
		}
	});
}


function checkAge(){
	var age = $("#apply_age").val();

	if(age == ""){
		alert("请输入年龄!");
		$("#apply_age").val("");
	}else if (parseInt(age)>60 || parseInt(age)<15){
		alert("请输入正确的年龄");
		return false;
	}
}

//输入手机号后，验证手机号的有效性
function checkPhone(){
	//表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; 
	var phone = $("#apply_tel").val();//document.getElementById("apply_tel").value;
	
	if(!reg.test(phone)){
		alert('请输入有效的手机号码！');
    	return false;
	}
}

function addAllScenics() {
	var url = HOST + "/getAllScenics.do";
	$.ajax({
		type : "post",
		url : url,
		async : true,
		datatype : "JSON",
		success : function(data) {
			addSelect(data);
		}
	});
}

function addSelect(a) {
	$.each(a, function(index, value) {
		addOption(value.scenicName);
	});
}

function addOption(a) {

	// 根据id查找对象，
	var obj = document.getElementById('chooseScenicName');
	// 这个只能在IE中有效
	obj.options.add(new Option(a, a));
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

window.onload = function(){
	h1=document.getElementById("mPage").offsetHeight;
	h1=h1-80;
	$("#mMain").css("height",h1);
}

