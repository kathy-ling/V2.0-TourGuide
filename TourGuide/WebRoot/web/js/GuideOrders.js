
//vistPhone = '15023692586';

$(function($) {
	$("#finishOrder").hide();
	$("#finishPin").hide();
	
	$("#beVisit").click(function() {
		$("#finishOrder").hide();
		$("#finishPin").hide();
		$("#OrderUl").show();
		$("#OrderPin").show();
	});
	$("#finish").click(function() {
		$("#OrderUl").hide();
		$("#OrderPin").hide();
		$("#finishOrder").show();
		$("#finishPin").show();
	});
});


window.onload = function(){	
		
	getData("/getMyBookedOrder.do", "OrderUl");
	getData("/getFinishedBookedOrder.do", "finishOrder");
	getData("/getUndoGuideOrder.do", "OrderPin");
	getData("/getFinishedGuideOrder.do", "finishPin");
}


function getData(Url,ulid){
	
	Url = HOST + Url;

	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{guidePhone:vistPhone},
		datatype:"JSON",
		error:function()
		{
			alert("全部订单Request error!");
		},
		success:function(data){
			setList(data,ulid);
		}
	});
}


function setList(data, ulid){
	
	$.each(data, function(i,n) {
		/*<li>
    		<a href="#" orderID="' + n.orderID + '" onclick="toDetail($(this))">
				<p>
					<span class="span_order" scenicNo="' + n.scenicNo + '">' + n.scenicName + '</span><br/>
					<span class="span_order">景区名称：秦始皇兵马俑</span></br>
					<span class="span_order">参观时间：2017-04-23 12:00:00</span></br>
					<span class="span_order">参观人数：3</span></br>
					<span class="guideFee">讲解费：180</span></br>
				</p>
			</a>
			<div class="sidebtn">
				<a  href="#" id="startBtn" orderID="' + n.orderID + '" onclick="applyit($(this))" class="ui-btn ui-mini ui-btn-raised clr-primary ui-btn-inline" >开始讲解</a>
			</div>
		</li>*/
		var a = '<li><a href="#" orderID="' + n.orderID + '" onclick="toDetail($(this))">';
		var str1 = '<p><span class="span_order">景区名称：' + n.scenicName + '</span></br>';
		var str2 = '<span class="span_order">参观时间：' + n.visitTime + '</span></br>';
		var str3 = '<span class="span_order">参观人数：' + n.visitNum + '</span></br>';
		var str4 = '<span class="guideFee">讲解费：' + n.guideFee + '</span></br></li>';
//		var div = '<div class="sidebtn"></div></li>';
//		var btn = '<a  href="#" id="startBtn" orderID="' + n.orderID + '" onclick="startVisit($(this))" class="ui-btn ui-mini ui-btn-raised clr-primary ui-btn-inline" >开始讲解</a></div></li>';
		
		$("#" + ulid).append(a+str1+str2+str3+str4);
	});
	$("#" + ulid).listview('refresh');		
}



function toDetail(This){
	
	var orderID = This.attr("orderID");
	
	window.location.href = "GuideOrdersDetail.html?Orderid="+orderID;
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



/*function setList(data, ulid){
	$.each(data, function(i,n) {
		var UlList = document.getElementById(ulid);
		var LiList = document.createElement("li");
		UlList.appendChild(LiList);
		
		//Orderid
		var AList = document.createElement("a");
		AList.href="DetailBeTakenOrder.html?Orderid="+n.orderID+"&fin=t";
		AList.setAttribute("target","_top");
		
		var PList = document.createElement("p");
		PList.className = "guideOrderPList";
		LiList.appendChild(AList);
		AList.appendChild(PList);		
		
		//添加景区名称
		var SpanListName = document.createElement("span");
		SpanListName.className = "span_order";
		SpanListName.innerHTML = "景区名称："+n.scenicName+"<br/>";
		
		//添加订单号
//		var SpanListOrderId = document.createElement("span");
//		SpanListName.className = "span_order";
//		SpanListOrderId.innerHTML = "订单号："+n.orderID+"<br/>";
	
		//添加时间
		var SpanListTime = document.createElement("span");
		SpanListTime.className = "span_order";
		SpanListTime.innerHTML = "参观时间："+n.visitTime+"<br/>";
		
		//添加人数
		var SpanListNum = document.createElement("span");
		SpanListNum.className = "span_order";
		SpanListNum.innerHTML = "参观人数："+n.visitNum+"<br/>";
		
		var SpanListFee = document.createElement("span");
		SpanListFee.className = "guideFee";
		SpanListFee.innerHTML = "讲解费："+n.guideFee+"<br/>";
		
		var startButton = document.createElement("button");
		startButton.className = "start mybtn";
		startButton.innerHTML = "开始讲解";
						
		var finishButton = document.createElement("button");
		finishButton.className = "finish ";
		finishButton.innerHTML = "结束讲解";
		
		PList.appendChild(SpanListName);
//		PList.appendChild(SpanListOrderId)		
		PList.appendChild(SpanListTime);
		PList.appendChild(SpanListNum);
		PList.appendChild(SpanListFee);
		LiList.appendChild(startButton); 
//		LiList.appendChild(finishButton);
		
		$(".start").click(function(){
			alert("start click");
			$(this).removeClass("start");
			$(this).addClass("finish");
			$(this).html("结束讲解");
		});
	});
	$("#" + ulid).listview('refresh');			
}*/