var vistPhone = getPhone();
$(document).ready(function()
{	
	
	getOrderList();
});

$(function($) {
	
	$("#btqb").addClass("hdxz");
		
	var height = document.body.offsetHeight;
	height=height-110;
	$("#mMain").css("height",height);
	
});

$('.bgw').click(function() {
	$('.bgw').removeClass('hdxz');
	$(this).addClass('hdxz');

	//		var id = $(this).attr('id');
	//		alert(id);
});

function qbon() {
	$(".orderywc").show(300);
	$(".orderdyl").show(300);
	$(".orderdfk").show(300);
	$(".orderdpj").show(300);
}

function ywcon() {
	$(".orderywc").show(300);
	$(".orderdyl").hide(300);
	$(".orderdfk").hide(300);
	$(".orderdpj").hide(300);
}

function dylon() {
	$(".orderywc").hide(300);
	$(".orderdyl").show(300);
	$(".orderdfk").hide(300);
	$(".orderdpj").hide(300);
}

function yfkon() {
	$(".orderywc").hide(300);
	$(".orderdyl").hide(300);
	$(".orderdfk").show(300);
	$(".orderdpj").hide(300);
}

function dpjon() {
	$(".orderywc").hide(300);
	$(".orderdyl").hide(300);
	$(".orderdfk").hide(300);
	$(".orderdpj").show(300);
}

//获取用户的所有订单
function getOrderList()
{

    var url = HOST+"/getAllOrders.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{visitorPhone:vistPhone},
		datatype:"JSON",
		error:function()
		{
			alert("全部订单Request error!");
		},
		success:function(data)
		{
			var now = getNowFormatDate();

			$.each(data, function(i,n) {			
				
				var str = n.visitTime;
				
				if(str != undefined){									
					var tmp = str.split(':');
					var tmp1 = tmp[0]+":"+tmp[1];
					var tmp2 = tmp1.split("-");
					var time = tmp2[1]+"-"+tmp2[2];
									
					var str1 = str.split('.');
					var str3=str.split('-');
					//2017-06-10 11:00:00
					var time1 = str1[0];
					//时间差
					var diff = getTimeDiff(now, getTime1ByIOS(time1));
					
					var mainDiv = document.getElementById("mMain");
					
			
					var div = '<div class="orderinfocontent"><div  class="orderinfosurplus">'+
					'<p><span>'+diff+'</span>&nbsp;小时<br/>剩余时间</p></div><div class="orderinforight">'+
					'<div class="orderinfo_bt"><p  orderId="'+n.OrderID+'"  Type="'+n.type+'" onclick="detailOrderInfo($(this))">'+
					'详细<br/>信息</p></div><div class="orderinfotable"><table><tr class="tr1">'+
					'<td>&nbsp;参观人数&nbsp;</td><td>&nbsp;支付费用&nbsp;</td></tr><tr class="tr2">'+
					'<td><span>'+n.visitNum+'</span></td><td><span>'+n.totalMoney+'</span></td></tr></table></div></div></div>';
					
					var div1 = document.createElement("div");
					if(n.orderState=="待评价"){
						div1.className = "orderinfo orderdpj";
						div1.innerHTML = '<div class="orderinfotitle">'+
						'<div class="orderinfoname"><span>'+n.scenicName+'</span></div>'+
						'<div class="orderinfotime"><p>参观时间：<span>'+time+'</span></p>'+
						'<img src="img/icon-dpj.png"/></div></div></div>'+div+'';
					}
					if(n.orderState=="已完成"){
						div1.className = "orderinfo orderywc";
						div1.innerHTML = '<div class="orderinfotitle">'+
						'<div class="orderinfoname"><span>'+n.scenicName+'</span></div>'+
						'<div class="orderinfotime"><p>参观时间：<span>'+time+'</span></p>'+
						'<img src="img/icon-ywc.png"/></div></div></div>'+div+'';
					}
					if(n.orderState=="待付款"){
						div1.className = "orderinfo orderdfk";
						div1.innerHTML = '<div class="orderinfotitle">'+
						'<div class="orderinfoname"><span>'+n.scenicName+'</span></div>'+
						'<div class="orderinfotime"><p>参观时间：<span>'+time+'</span></p>'+
						'<img src="img/icon-dfk.png"/></div></div></div>'+div+'';
					}
					if(n.orderState=="待游览"){
						div1.className = "orderinfo orderdyl";
						div1.innerHTML = '<div class="orderinfotitle">'+
						'<div class="orderinfoname"><span>'+n.scenicName+'</span></div>'+
						'<div class="orderinfotime"><p>参观时间：<span>'+time+'</span></p>'+
						'<img src="img/icon-dyl.png"/></div></div></div>'+div+'';
					}
					
					mainDiv.appendChild(div1);
				}												
			});
		}
	});	
}

function getTime1ByIOS(time1)
{
	return time1.replace(/-/,"/").replace(/-/,"/");
}

//查看订单的详细信息
function detailOrderInfo(This){
	var orderId = This.attr("orderId");
	var type = This.attr("Type");
	window.location = "orderFormInfoUI.html?orderId="+orderId+"&type="+type;
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