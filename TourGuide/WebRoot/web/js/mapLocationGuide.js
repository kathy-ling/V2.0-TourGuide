
//获取订单类型
var type = GetUrlem("type");

var OrderID = GetUrlem("OrderID");
alert(OrderID);
//拼单 
//OrderID = '30232f874cd6471b8ab1c1e69329d02c';
//预约单
//OrderID = '63861cb688b64e19a1cfb98c513e6d50';


$(function($){
	var map = new BMap.Map("map");   //实例化地图控件
	var point = new BMap.Point(116.404,39.915);
	map.centerAndZoom(point,15);
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	
	//进行浏览器定位
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		var mk = new BMap.Marker(r.point);
		map.addOverlay(mk);
		map.panTo(r.point);
		
	},{enableHighAccuracy: true})
	
	//添加地图点击事件
	map.addEventListener("click",mapClick);
	
	//地图点击事件
	function mapClick(e){
		var mkLoc = new BMap.Marker(e.point);
		map.addOverlay(mkLoc);
		map.panTo(e.point);
		alert(e.point.lng + ", " + e.point.lat);
		mkLoc.enableDragging();
		
		map.removeEventListener("click", mapClick);
		
		var label = new BMap.Label("拖动我可移动至指定位置哦",{offset:new BMap.Size(20,-10)});
	    mkLoc.setLabel(label);
		//给覆盖物注册事件
		mkLoc.addEventListener("click",markerClick);
		var p = mkLoc.getPosition();  //获取marker的位置
		longitude = p.lng;
		latitude = p.lat;
		
		function markerClick()
		{		
		    alert("marker的位置是" + p.lng + "," + p.lat);   
		}
		
	}
});

function setLocation()
{
//	alert(type);
//	alert(longitude);alert(latitude);
	if(type == "——我的拼团单"){
		uploadConsistLocation(longitude,latitude);
	}else if(type == "——我的预约单"){
		uploadBookLocation(longitude,latitude);
	}
}

//设置预约订单的位置
function uploadBookLocation(longitude,latitude){
	var Url = HOST + "/uploadBookLocation.do";
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{orderId:OrderID,longitude:longitude,latitude:latitude},
		datatype:"JSON",
		error:function()
		{
			alert("签到Request error!");
		},
		success:function(data)
		{
			alert("上传位置成功！");
//			alert(data);
			if(data == 1){
				alert("位置设置成功");
				window.history.back();
			}
		}
	});
}

//设置拼单订单的位置
function uploadConsistLocation(longitude,latitude){
	var Url = HOST + "/uploadConsistLocation.do";
	
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{orderId:OrderID,longitude:longitude,latitude:latitude},
		datatype:"JSON",
		error:function()
		{
			alert("签到Request error!");
		},
		success:function(data)
		{
//			alert(data);
			if(data == 1){
				alert("位置设置成功");		
				window.history.back();
			}
		}
	});
}