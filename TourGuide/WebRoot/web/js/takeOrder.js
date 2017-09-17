//vistPhone = '18191762572';

window.onload = function(){
	
	//加载底部导航栏
	$("#bottom_navigation").load("bottomNavigation.html").trigger("create");

	
	getGuideLevel();
	getReleasedOrders();

}


function getGuideLevel(){

	var Url = HOST + "/getDetailGuideInfoByPhone.do";
	$.ajax({
		type: "get",
		url: Url,
		async: true,
		data: {
			guidePhone:vistPhone
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("request error");
		},
		success: function(data) {
			var guideLevel = data[0].guideLevel;

			if(parseInt(guideLevel) <= parseInt(2)){
				alert("您的级别达不到接单标准");
				window.location.href = "personalHome.html";
			}	
		}
	});
}


function getReleasedOrders(){
	//查看游客发布的预约订单（简要信息）,即可接单订单
    var url = HOST+"/getReleasedOrders.do";

	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{"guidePhone":vistPhone},
		error: function(data)
		{
			alert("可接单订单request error!");
		},
		success:function(data)
		{
			//alert(JSON.stringify(data));
			var num = data.length;
			$("#orderCount").html(num);
			$.each(data, function(i,n){
			var UlList = document.getElementById("takeOrders");
			var LiList = document.createElement("li");

			UlList.appendChild(LiList);
	
			var AList = document.createElement("a");
			AList.href = "DetailBeTakenOrder.html?Orderid="+n.bookOrderID;
			AList.target = "_top";
	
			LiList.appendChild(AList);
	
			var PList = document.createElement("p");
			AList.appendChild(PList);
	
			//添加订单号
			var SpanListOrderId = document.createElement("span");
			SpanListOrderId.className = "orderId";
			SpanListOrderId.innerHTML = "订单号："+n.bookOrderID+"<br/>";
	
			//添加景区名称
			var SpanListName = document.createElement("span");
			SpanListName.className = "scenicName";
			SpanListName.innerHTML = "景区名称："+n.scenicName+"<br/>";
	
			//添加时间
			var SpanListTime = document.createElement("span");
			SpanListTime.className = "vistTime";
			SpanListTime.innerHTML = "参观时间："+n.visitTime+"<br/>";
	
			//添加人数
			var SpanListNum = document.createElement("span");
			SpanListNum.className = "visitNum";
			SpanListNum.innerHTML = "参观人数："+n.visitNum+"&nbsp;&nbsp;&nbsp;&nbsp;";
	
			//添加价格
			var SpanListPrice = document.createElement("span");
			SpanListPrice.className = "price";
			SpanListPrice.innerHTML = "可接受价格："+n.priceRange+"<br/>";
	
			//添加讲解语言
			var SpanListLanguage = document.createElement("span");
			SpanListLanguage.className = "language";
			SpanListLanguage.innerHTML = "讲解语言："+getLanguage(n.language)+"&nbsp;&nbsp;&nbsp;&nbsp;";
	
			//添加讲解员性别
			var SpanListSex = document.createElement("span");
			SpanListSex.className = "sex";
			SpanListSex.innerHTML = "讲解员性别："+n.guideSex+"<br/>";
	
			PList.appendChild(SpanListOrderId)
			PList.appendChild(SpanListName)					
			PList.appendChild(SpanListTime)
			PList.appendChild(SpanListNum)
			PList.appendChild(SpanListPrice)
			PList.appendChild(SpanListLanguage)
			PList.appendChild(SpanListSex); 
			$("#takeOrders").listview('refresh');
			});			
		}	
	});
}
