
var province;
var defaultProvince = "陕西省";
//vistPhone = '13119275866';

//var openId = GetUrlem("openId");

$(function($) {

	$(document).bind("mobileinit", function() {
		$.mobile.page.prototype.options.addBackBtn = true;
	});
});


window.onload = function() {
	
	getPromotion();	
	
	isBlackened();
		
	getScenicByProvince(defaultProvince);
	
//	geolocation.getLocation(showPosition, showErr, options);
}


//根据用户当前所在省份进行景区推荐
function getScenicByProvince(province)
{	
//	alert(province);
	var url1 = HOST + "/getScenicByLocation.do";
	$.ajax({
		type : "post",
		url : url1,
		async: false,
		data : {
			province : province
		},
		datatype : "JSON",
		error : function() {
			alert("推荐景点Request error!");
		},
		success : function(data) {
//			alert(JSON.stringify(data));
			var UlList = document.getElementById("index_scenic_ul_id");
			freshList(data, UlList);
		}
	});
}

//获取首页的活动信息
function getPromotion()
{
	var url = HOST + "/getPromotions.do";
	$.ajax({
		url : url,
		datatype : "JSON",
		async: false,
		type : "GET",
		error : function(data) {
			alert("活动信息request error!");
			console.log(JSON.stringify(data));
		},
		success : function(data) {
			//				alert("活动信息success!");
			$.each(data, function(i, item) {
				var UlList = document.getElementById("index_ul_id");
				var LiList = document.createElement("li");
				UlList.appendChild(LiList);

				var AList = document.createElement("a");

				AList.setAttribute("href", item.promotionLinks);

				LiList.appendChild(AList);

				var ImgList = document.createElement("img");
				ImgList.setAttribute("src", item.promotionImage);
				ImgList.setAttribute("alt", item.promotionTitle);
				AList.appendChild(ImgList);
			});
			$(".slider").yxMobileSlider({
				width : 640,
				height : 320,
				during : 3000
			});//轮播图片初始化
		}
	});
}


//填充景区列表
function freshList(data, UlList) {
	$.each(data, function(i, item) {
		var LiList = document.createElement("li");
		UlList.appendChild(LiList);

		var DivList = document.createElement("div");
		DivList.className = "imglist-box";
		LiList.appendChild(DivList);

		var AList = document.createElement("a");
		AList.setAttribute("data-ajax",false)
		AList.href = "scenicSpot.html?" + "scenicNo=" + item.scenicNo;
		
		DivList.appendChild(AList);

		var ImgList = document.createElement("img");
		ImgList.setAttribute("src", HOST + item.scenicImagePath);
		var Plist = document.createElement("p");
		Plist.className = "imgbar";
		Plist.innerHTML = item.scenicName;
		AList.appendChild(ImgList);
		AList.appendChild(Plist);
	});
	$(".imglist-box").height($(document).width() * 0.25);
}


//搜索按钮的处理事件
function scenicsrch(){
	if($("#mySearchInput").val()==""){
			alert("请输入景区名称");
		}
		else{			
			sessionStorage.searchText = $("#mySearchInput").val();
			window.location.href = "scenicsearchresult.html";
		}
}

//点击【更多】景点的处理事件
function moreScenic(){
	window.location.href = "morescenic.html";
}

function isRegist()
{
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

////////////////////////////////////////腾讯定位////////////////////////////////////////////////

var geolocation = new qq.maps.Geolocation("OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77", "myapp");
var positionNum = 0;
var options = {timeout: 8000};

function showPosition(position) {
//    alert(position.province);
	province = position.province;
	
	alert(province);
	
	if(province != defaultProvince){
		getScenicByProvince(province);
	}
	
};

function showErr() {
    alert("定位失败");
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////  HTML5定位  ////////////////////////////////////////////
//function getLocation() {
//
//	if (navigator.geolocation) {
//
//		navigator.geolocation.getCurrentPosition(showPosition, showError);
//	} else {
//		alert("浏览器不支持地理定位。");
//	}
//}
//
//function showError(error) {
//	switch (error.code) {
//	case error.PERMISSION_DENIED:
//		alert("定位失败,用户拒绝请求地理定位");
//		break;
//	case error.POSITION_UNAVAILABLE:
//		alert("定位失败,位置信息是不可用");
//		break;
//	case error.TIMEOUT:
//		alert("定位失败,请求获取用户位置超时");
//		break;
//	case error.UNKNOWN_ERROR:
//		alert("定位失败,定位系统失效");
//		break;
//	}
//}
//
//function showPosition(position) {
//	var x = position.coords.latitude; //纬度 
//	var y = position.coords.longitude; //经度 
//	alert('纬度:' + x + ',经度:' + y);
//
//	//配置Baidu Geocoding API 
//	var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b"
//			+ "&callback=renderReverse"
//			+ "&location="
//			+ x
//			+ ","
//			+ y
//			+ "&output=json" + "&pois=0";
//
//	$.ajax({
//		type : "GET",
//		async: false,
//		dataType : "jsonp",
//		url : url,
//		success : function(json) {
//			if (json == null || typeof (json) == "undefined") {
//				return;
//			}
//			if (json.status != "0") {
//				return;
//			}
//			setAddress(json.result.addressComponent);
//		},
//		error : function(XMLHttpRequest, textStatus, errorThrown) {
//			alert("[x:" + x + ",y:" + y + "]地址位置获取失败,请手动选择地址");
//		}
//	});
//}
//
///** 
// * 设置地址 
// */
//function setAddress(json) {
//	var position = document.getElementById("location");
//	//省 
//	province = json.province;
//	//市 
//	var city = json.city;
//	//区 
//	var district = json.district;
//	province = province.replace('市', '');
//	position.value = province + "," + city + "," + district;
//	position.style.color = 'black';
//	
////	alert(province);
//	//从服务端获取推荐景点信息(获取当前省份的热门景点)
//	getScenicByProvince();
//}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


