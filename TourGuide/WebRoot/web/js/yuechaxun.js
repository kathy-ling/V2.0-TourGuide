
function tixian(){
	window.location.href="tixian.html";
}

$(function($){
	$(".treebox .level1>a").click(function(){
		if($(this).is('.current'))
		{
			$(this).removeClass('current').find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');
			return false;
		}
		else{
			$(this).addClass('current')   //给当前元素添加"current"样式
			.find('i').addClass('down')   //小箭头向下样式
			.parent().next().slideDown('slow','easeOutQuad')  //下一个元素显示
			.parent().siblings().children('a').removeClass('current')//父元素的兄弟元素的子元素去除"current"样式
			.find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');//隐藏
			return false; //阻止默认时间
		}
	});
	
	$("#lab_cancle").hide();
	
	guideInfo();
	getSalaryAmount();
	getSalaryRecord();
	getgetCancleOrders();
	getCash();
});

function getCash(){
	var Url = HOST + "/getCash.do";
	$.ajax({
		type: "get",
		url: Url,
		async: true,
		data: {
			guidePhone:vistPhone//'13165662195'
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("request error");
		},
		success: function(data) {
			if(JSON.stringify(data)!="{}"){
				$('#guideAccount').html(data.cashTotal + "元");
			}			
		}
	});
}

function guideInfo(){
	var Url = HOST + "/getDetailGuideInfoByPhone.do";

	$.ajax({
		type: "get",
		url: Url,
		async: true,
		data: {
			guidePhone:vistPhone//'13165662195'
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("request error");
		},
		success: function(data) {
			$.each(data, function(i, n) {
				$('#guideName').html(n.name);
			});
		}
	});
}

function detailInfo(){
	window.location.href="guideInfo.html?phone=" + '13165662195';
}

function getSalaryAmount(){
	var Url = HOST + "/getSalaryAmount.do";

	$.ajax({
		type: "get",
		url: Url,
		async: true,
		data: {
			guidePhone:vistPhone//'13165662195'
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("request error");
		},
		success: function(data) {
			if(JSON.stringify(data)!="{}"){
				$('#totalOrders').html(data.totalOrders);
				$('#totalMoney').html(data.totalMoney);
			}
		}
	});
}

function getSalaryRecord(){
	var Url = HOST + "/getSalaryRecord.do";

	$.ajax({
		type: "get",
		url: Url,
		async: true,
		data: {
			guidePhone:vistPhone//'13165662195'
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("request error");
		},
		success: function(data) {
			$.each(data, function(i, n) {

				var UlList = document.getElementById("order_ul");
				var LiListInfo = document.createElement("li");
				LiListInfo.className = "level1";
				UlList.appendChild(LiListInfo);
				
				var AList = document.createElement("a");
				AList.href = "#none";
				AList.setAttribute("data-ajax", false);
				
				var PList = document.createElement("p");
				
				var timeSpan = document.createElement("span");
				timeSpan.innerHTML = "日期时间：" + n.time + "<br/>" + "<br/>";
				
				var totalMoneySpan = document.createElement("span");
				totalMoneySpan.innerHTML = "团总金额：" + n.totalMoney + "<br/>";
				
				PList.appendChild(timeSpan);
				PList.appendChild(totalMoneySpan);
				
				var i = document.createElement("i");
				i.className = "down"; 
				
				AList.appendChild(PList);
				AList.appendChild(i);
				
				var detailUlList = document.createElement("ul");
				detailUlList.className = "level2";				
				
				LiListInfo.appendChild(AList);
				LiListInfo.appendChild(detailUlList);
				
				var detailLiList = document.createElement("li");
				
				detailUlList.appendChild(detailLiList);
				
				var SpanOrderId = document.createElement("span");
				SpanOrderId.innerHTML = "订单编号:"+ "<br/>" + n.orderId + "<br/>";
				
				var SpanScenicName = document.createElement("span");
				SpanScenicName.innerHTML = "景区名称：" + n.scenicName + "<br/>";
				
				var SpanVisitNum = document.createElement("span");
				SpanVisitNum.innerHTML = "带团人数：" + n.visitNum + "<br/>";
				
				//detailLiList.appendChild(SpanOrderId);
				detailLiList.appendChild(SpanScenicName);
				detailLiList.appendChild(SpanVisitNum);	
			});
			$("#order_ul").listview("refresh");
			myrefresh();
		}		
	});
}

function getgetCancleOrders(){
	var Url = HOST + "/getCancleOrderFee.do";

	$.ajax({
		type: "get",
		url: Url,
		async: true,
		data: {
			guidePhone:vistPhone//'13165662195'
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("request error");
		},
		success: function(data) {
			$.each(data, function(i, n) {
				if(data.length != 0){
					$("#lab_cancle").show();
				}

				var UlList = document.getElementById("cancle_order_ul");
				var LiListInfo = document.createElement("li");
				LiListInfo.className = "level1";
				UlList.appendChild(LiListInfo);								
				
				var AList = document.createElement("a");
				AList.href = "#none";
				AList.setAttribute("data-ajax", false);
				
				var PList = document.createElement("p");
				
				var timeSpan = document.createElement("span");
				timeSpan.innerHTML = "日期时间：" + n.time + "<br/>" + "<br/>";
				
				var totalMoneySpan = document.createElement("span");
				totalMoneySpan.innerHTML = "团总金额：" + n.totalMoney + "<br/>";
				
				PList.appendChild(timeSpan);
				PList.appendChild(totalMoneySpan);
				
				var i = document.createElement("i");
				i.className = "down"; 
				
				AList.appendChild(PList);
				AList.appendChild(i);
				
				var detailUlList = document.createElement("ul");
				detailUlList.className = "level2";				
				
				LiListInfo.appendChild(AList);
				LiListInfo.appendChild(detailUlList);
				
				var detailLiList = document.createElement("li");
				
				detailUlList.appendChild(detailLiList);
				
				var SpanOrderId = document.createElement("span");
				SpanOrderId.innerHTML = "订单编号:"+ "<br/>" + n.orderId + "<br/>";
				
				var SpanScenicName = document.createElement("span");
				SpanScenicName.innerHTML = "景区名称：" + n.scenicName + "<br/>";
				
				var SpanVisitNum = document.createElement("span");
				SpanVisitNum.innerHTML = "带团人数：" + n.visitNum + "<br/>";
				
				//detailLiList.appendChild(SpanOrderId);
				detailLiList.appendChild(SpanScenicName);
				detailLiList.appendChild(SpanVisitNum);	
			});
			$("#order_ul").listview("refresh");
			myrefresh();
		}		
	});
}

function myrefresh()
{
	$(".treebox .level1>a").click(function(){
	if($(this).is('.current'))
	{
		$(this).removeClass('current').find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');
		return false;
	}
	else{
	 		$(this).addClass('current')   //给当前元素添加"current"样式
			.find('i').addClass('down')   //小箭头向下样式
			.parent().next().slideDown('slow','easeOutQuad')  //下一个元素显示
			.parent().siblings().children('a').removeClass('current')//父元素的兄弟元素的子元素去除"current"样式
			.find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');//隐藏
			return false; //阻止默认时间
		}
	});
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