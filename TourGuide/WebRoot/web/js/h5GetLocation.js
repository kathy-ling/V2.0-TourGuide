function getLocation(){ 
	if (navigator.geolocation){ 
		navigator.geolocation.getCurrentPosition(showPosition,showError); 
		}else{ 
			alert("浏览器不支持地理定位。"); 
		} 
	} 

function showError(error){ 
	switch(error.code) { 
	case error.PERMISSION_DENIED: 
		alert("定位失败,用户拒绝请求地理定位"); 
		break; 
	case error.POSITION_UNAVAILABLE: 
		alert("定位失败,位置信息是不可用"); 
		break; 
	case error.TIMEOUT: 
		alert("定位失败,请求获取用户位置超时"); 
		break; 
	case error.UNKNOWN_ERROR: 
		alert("定位失败,定位系统失效"); 
		break; 
	} 
} 


function showPosition(position){ 
	var x = position.coords.latitude; //纬度 
	var y = position.coords.longitude; //经度 
//	alert('纬度:'+x+',经度:'+y); 
	
	//配置Baidu Geocoding API 
	var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b" + 
	"&callback=renderReverse" + 
	"&location=" + x + "," + y + 
	"&output=json" + 
	"&pois=0"; 
	
	$.ajax({ 
		type: "GET", 
		dataType: "jsonp", 
		url: url, 
		success: function (json) { 
			if (json == null || typeof (json) == "undefined") { 
				return; 
			} 
			if (json.status != "0") { 
				return; 
			} 
			setAddress(json.result.addressComponent); 
		}, 
		error: function (XMLHttpRequest, textStatus, errorThrown) { 
			alert("[x:" + x + ",y:" + y + "]地址位置获取失败,请手动选择地址"); 
		} 
	}); 
} 


/** 
* 设置地址 
*/ 
function setAddress(json) { 
	var position = document.getElementById("location"); 
	//省 
	var province = json.province; 
	//市 
	var city = json.city; 
	//区 
	var district = json.district; 
	province = province.replace('市', ''); 
	position.value = province + "," + city + "," + district; 
	position.style.color = 'black'; 
	
	document.getElementById("demo").innerHTML = position.value;
	alert(province);
}