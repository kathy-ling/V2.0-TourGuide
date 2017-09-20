window["HOST"]="http://localhost/TourGuide";
//window["HOST"]="http://cps.xaut.edu.cn/TourGuide";
//window["HOST"]="http://zhoudaoly.com/TourGuide";

window["vistPhone"] = getPhone();
window["openId"] = getOpenId();

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
//	 alert("Phone=getSession(sessionStorage.vistPhone)"+Phone);
	 if(Phone!=null){
		return Phone;
	 }else{		
		Phone = GetUrlem("vistPhone");
//		alert(Phone+ "GetUrlem(vistPhone);");
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