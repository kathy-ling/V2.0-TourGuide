
var vistPhone = getPhone();
window.onload = function(){
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
			
			if(num == 0){
				
				$("#takeOrders").append("<div style='margin: auto;margin-top: 60px;text-align: center;'>暂无可接订单！</div>");
				
			}
			else{
				
				$.each(data, function(i,n){
				fillorderitem(n);
			});
			}
						
		}	
	});
}

function fillorderitem(n){
//	n.bookOrderID
//	n.scenicName
//	n.visitTime
//	n.visitNum
//	n.priceRange
	
	
	//var time = n.visitTime;
	var time = "2013-09-24 10:00:00";
	
	//var name = "兵马俑";
	var vtime = time.substring(5,7)+"."+time.substring(8,16);
	var etime = settime(time);
	//var num = n.visitNum;
	//var fee = n.priceRange
	//var id = "sdlfjla";
	
	
	
	
	
	var item = "<div class='orderitem'><div class='orderitemtop'><div class='orderscenicname'><span>"
	+n.scenicName+"</span></div><div class='ordervisittime'><p>参观时间：<span>"
	+vtime+"</span></p></div></div><div class='orderitembottom'><div class='orderremaintime'><p><span>"
	+etime+"</span>&nbsp;小时<br/>剩余时间</p></div><div class='orderitembtntable'><div class='orderitembtdiv'>"
	+"<a href = 'DetailBeTakenOrder.html?Orderid="+n.bookOrderID+"'><div class='orderitembt'><p>详细<br/>信息</p></div></a></div><div class='orderitemtable'><table>"
	+"<tr class='orderitemtabletr1'><td>&nbsp;参观人数&nbsp;</td><td>&nbsp;可接受价格&nbsp;</td></tr><tr><td><span>"
	+n.visitNum+"</span></td><td><span>"+n.priceRange+"</span></td></tr></table></div></div></div></div><div style='width: 100%;height: 10px;'></div>";
	
	$("#takeOrders").append(item);
	
	//
}


function settime(vtime){
	var vt = new Date(vtime);
	var now = new Date();
	
	var s = (vt-now)/60000/60;
	
	s = parseInt(s);

	if(vt > now){
		return s;
	}
	else{
		return 0;
	}
	
}