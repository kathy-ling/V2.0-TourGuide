$(function(){
	getData("/getMyBookedOrder.do", "OrderUl");
	getData("/getFinishedBookedOrder.do", "finishOrder");
	getData("/getUndoGuideOrder.do", "OrderPin");
	getData("/getFinishedGuideOrder.do", "finishPin");
});

function getData(Url,ulid){
	
	Url = HOST + Url;

	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{guidePhone:"15029319152"},
//		data:{guidePhone:vistPhone},
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
		
		//当前时间
		var nowTime = getNowFormatDate();
		
		var str = n.visitTime;													
		var tmp = str.split(':');
		var tmp1 = tmp[0]+":"+tmp[1];
		var tmp2 = tmp1.split("-");
		var time = tmp2[1]+"-"+tmp2[2];
									
		var str1 = str.split('.');
		var str3=str.split('-');
		//2017-06-10 11:00:00
		var time1 = str1[0];
		//时间差
		var leftTime = getTimeDiff(nowTime, getTime1ByIOS(time1));
		
		var str = '<div class="top"><div class="sName">'+
		'<span id="ScenicName" class="selector">'+n.scenicName+'</span></div>'+
		'<div class="vTime"><p class="visitTime">参观时间&nbsp;&nbsp;'+
		'<span>'+time+'</span></p></div></div><div class="orderInfo">'+
		'<div class="selector" style="width: 90px;'+
		'height: 90px; background-image: url(img/bluecircle.png);background-size: 100%;margin-top: 5px;text-align: center;float: left;">'+
		'<p style="color: #000000;font-size: 12px;margin-top: 28px;">'+
		'<span class="lTime">'+leftTime+'</span>小时</p><p class="ltime">剩余时间</p>'+
		'</div><div class="selector" style="width: calc(100% - 90px);height: 100%;float: left;">'+
		'<div class="detailInfoDiv"><a><img src="img/bt-xiangxin.png" class="detailInfoImg" orderId="'+n.orderID+'" type="'+n.type+'" onclick="detailInfo($(this))"/>'+
		'</a></div><div class="NumFee"><table class="selector" style="text-align: center;width: 100%;margin-top: 25px;">'+
		'<tr class="infoSpan"><td>&nbsp;参观人数&nbsp;</td>'+
		'<td>&nbsp;支付费用&nbsp;</td></tr><tr class="info">'+
		'<td><span>'+n.visitNum+'</span></td><td><span>'+n.guideFee+'</span></td>'+
		'</tr></table></div></div></div><div style="width: 100%;height: 10px;"></div>';
		
		$("#"+ulid).append(str);
	});
}

//点击详细信息
function detailInfo(This)
{
	var orderId = This.attr("orderId");
	var type = This.attr("type");
	window.location = "GuideOrdersDetailUI.html?orderId="+orderId+"&type="+type;
}

function getTime1ByIOS(time1)
{
	return time1.replace(/-/,"/").replace(/-/,"/");
}

//获取当前日期时间“yyyy-MM-dd HH:MM:SS”
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "/";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

//计算两个时间之间的差值，yyyy-MM-dd HH:MM:SS
function getTimeDiff(time1, time2){
	
	var d1 = new Date(time1).getTime();
	var d2 = new Date(time2).getTime();
	
	var t = (d2 - d1)/ 1000 / 60 /60;//两个时间相差的毫秒数
	
	if(parseInt(t) < 0){
		return 0;
	}
	return parseInt(t.toFixed(1));
}