//window["HOST"]="http://localhost:8080/TourGuide";
window["HOST"]="http://cps.xaut.edu.cn/TourGuide";
//window["HOST"]="http://zhoudaoly.com/TourGuide";

window["vistPhone"] = getPhone();
window["openId"] = getOpenId();

if (vistPhone!=openId) {
	
	var Url = HOST + "/isBlackened.do";
	$.ajax({
		type:"post",
		url:Url,
		async:false,
		data:{phone:vistPhone},
		datatype:"JSON",
		error:function(data)
		{
			alert("判断是否加黑 Request error!");
		},
		success:function(data)
		{
			var a= JSON.stringify(data);
			if (a!="false") {
				return false;
			} 
		}
	});
	
} 

function changeImage(img){
	img.src="../web/img/1-2头像.png";
	img.onerror = null; 
}

// 筛选
function sceen()
{
	var val = document.getElementById('chooseScenicName');
	if (val == null) {
		alert('请选择景区');
	}
}

function isRegist()
{
	if(vistPhone == "undefined" || vistPhone == openId)
	{
		alert("您还未注册，请注册！");
		window.location.href = "register.html";
	}
}


function getOpenId(){
	 var id = getSession(sessionStorage.openId);
	 if(id!=null){
		 return id;
	 }else{
		 id = GetUrlem("openId");
		sessionStorage.openId  = id;
		return id;
	 }
}

function getPhone(){
	 var Phone=getSession(sessionStorage.vistPhone);
	 if(Phone!=null){
		return Phone;
	 }else{		
		Phone = GetUrlem("vistPhone");
		sessionStorage.vistPhone  = Phone;
		return Phone;			
	 }	 
}

function getSession(name){
	if(name)
	{
		return name;
	}
	return null;
}
  


function GetUrlem(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  decodeURI(r[2]); return null;
}