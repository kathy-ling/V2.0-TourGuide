
var OrderID = GetUrlem("Orderid");


window.onload = function(){

var url = HOST+"/getDetailedReleasedOrders.do";
//var OrderID = GetUrlem("Orderid");
$.ajax({
	type:"post",
	url:url,
	async:true,
	data:{orderID:OrderID},
	datatype:"JSON",
	error:function()
	{
		alert("获取可接单订单的详情 Request error!");
	},
	success:function(data)
	{
		$.each(data, function(i,n)
		{
			$("#orderID").html(n.bookOrderID);
			$("#scenicName").html(n.scenicName);
			$("#visitTime").html(n.visitTime);
			$("#visitNum").html(n.visitNum);
			$("#language").html(getLanguage(n.language));
			$("#sex").html(n.guideSex);
			$("#price").html(n.priceRange);
			$("#visitorName").html(n.visitorName);
			$("#visitorPhone").html(n.visitorPhone);
			$("#otherCommand").html(n.otherCommand);
			
			
			$("#remaintime").html(settime(n.visitTime));
			
			$("#visittimerighttop").html(n.visitTime.substring(5,7)+"."+n.visitTime.substring(8,16));
//			if(n.totalTicket!=0){
//				var ticm = "<h3>代购门票</h3>";
//				if(n.fullPrice!=0){
//					ticm +="<p>全价票："+n.fullPrice+"张<br>";
//				}
//				if(n.halfPrice!=0){
//					ticm += "半价票："+n.halfPrice+"张<br>";
//				}
//				if(n.discoutPrice!=0){
//					ticm +="折扣票："+n.discoutPrice+"张<br>";
//				}
//				ticm += "总额："+n.totalTicket+"元</p>";
//				$("#ticket").html(ticm);
//			}else{
//				$("#ticket").hide();
//			}
		});
	}

});
}

function takeorder(){
	
	var url = HOST+"/takeReleasedOrderByGuide.do";
	
	$.ajax({
		type:"post",
		url:url,
		async:true,
		datatype:"JSON",
		data:{orderID:OrderID,guidePhone:vistPhone},
		error:function()
		{
			alert("抢单 Request error!");
		},
		success:function(data)
		{
			if(data == true){
				alert("抢单成功！");
				window.location.href="GuideOrders.html";
			}else{
				alert("抢单失败！");
			}			
		}
	});
}

//设置剩余时间
function settime(vtime) {

	var vt = new Date(vtime);
	var now = new Date();

	var s = (vt - now) / 60000 / 60;

	s = parseInt(s);
	return s;
}