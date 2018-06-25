
//获取订单类型
var type = GetUrlem("type");

var OrderID = GetUrlem("orderId");

var latitude;
var longitude;

$(function($){	
	//获取订单经纬度坐标
	getLocation();
//	loadMap("109.288417","34.391187");

});

function setLocation()
{
	alert(type);

	if(type == "拼团单"){
		uploadConsistLocation(longitude,latitude);
	}else if(type == "预约单"){	
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
			if(data == 1){
				alert("位置设置成功");
				window.location.href="GuideOrdersDetailSign.html?orderId="+OrderID+"&type="+type;
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
			alert(data);
			if(data == 1){
				alert("位置设置成功");		
				window.location.href="GuideOrdersDetailSign.html?orderId="+OrderID+"&type="+type;
			}
		}
	});
}

function getLocation()
{
	$.ajax({
		type:"post",
		url:HOST+"/getDetailOrderInfo.do",
		async:true,
		data:{orderID:OrderID},
		datatype:"JSON",
		error:function()
		{
			alert("Error:获取订单详情失败");
		},
		success:function(data)
		{ 
			if(JSON.stringify(data)!="[]"){
				longitude = data[0].longitude;
				latitude = data[0].latitude;			
				
				loadMap(longitude,latitude);			
			}			
		}
	});
}

function loadMap(longitude,latitude)
{
	var map = new BMap.Map("map");   //实例化地图控件
	var point = new BMap.Point(longitude,latitude);
	map.centerAndZoom(point,16);
	var mkLoc = new BMap.Marker(point);
	mkLoc.enableDragging();
	map.addOverlay(mkLoc);
	map.panTo(mkLoc);
					
	var label = new BMap.Label("拖动我可移动至指定位置哦",{offset:new BMap.Size(20,-10)});
	mkLoc.setLabel(label);
				  
	//给覆盖物注册拖拽事件
	mkLoc.addEventListener("dragend",markerClick);	
	function markerClick()
	{
		var p = mkLoc.getPosition();
		alert("位置坐标是" + p.lng + "," + p.lat);   
		longitude = p.lng;
		latitude = p.lat;
	}
}

/*//进行浏览器定位
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		var mk = new BMap.Marker(r.point);
		map.addOverlay(mk);
		map.panTo(r.point);
		
	},{enableHighAccuracy: true})*/
	
//添加地图点击事件
	//map.addEventListener("click",mapClick);
	
	//地图点击事件
	/*function mapClick(e){
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
		
	}*/