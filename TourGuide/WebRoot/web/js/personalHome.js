var isGuider = false;
var Phone = vistPhone;
//Phone = '15029319152';

$(function($) {
	//根据手机号，从服务器获取游客的信息
	setperinfo(Phone);

	//当前订单
	currentOrder(Phone);

	$("#jiangjie").click(function() {
		//判断是否是讲解员，并设置信息
		isGuiderF(Phone);
	});
	//签到
	$("#signINbtn").click(function() {
		signIN(Phone);
	});
});

function loadMap(latitude, longitude) {
	var map = new BMap.Map("map"); //实例化地图控件
	var point = new BMap.Point(latitude, longitude);
	map.centerAndZoom(point, 16);
	var mkLoc = new BMap.Marker(point);
	//	mkLoc.enableDragging();
	map.addOverlay(mkLoc);
	map.panTo(mkLoc);

	var label = new BMap.Label("集合位置", {
		offset: new BMap.Size(20, -10)
	});
	mkLoc.setLabel(label);

}
//判断是否是讲解员
function isGuiderF(Phone) {
	var url = HOST + "/hasApplied.do";

	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: {
			phone: Phone
		},
		datatype: "JSON",
		error: function() {
			alert("显示讲解员信息Request error!");
		},
		success: function(data) {
			//是讲解员，并设置信息
			if(data ==true) {

				isGuider = true;

				setGuideInfo(Phone);

			}
			//不是讲解员
			else {
				$("#jiangJie").css('display', 'none');
				// alert("您还不是讲解员！");	
				$("#jg_img").html("<p style='background:url(img/stop.png) no-repeat;width:30px;height:30px;margin-left:90px;margin-top:5px;margin-right:5px;'></p>");
				$("#jg_alert").html("<p style='font-size:16px;margin-left:10px;margin-top:10px;'>您还不是讲解员！</p>");
				return false;
			}
		}
	});
}

//根据手机号和身份，从服务器获取游客的信息
function setperinfo(Phone) {
	var url = HOST + "/getVisitorInfoWithPhone.do";

	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: {
			phone: Phone
		},
		datatype: "JSON",
		error: function() {
			alert("显示个人信息Request error!");
		},
		success: function(data) {

			if(JSON.stringify(data) != "{}") {
				$("#person_info_name").html(data.name);
				//			//判断data.image是否为微信服务器上的数据，如不是，要修改为本服务器可以访问的地址
				var img = data.image;
				var patt1 = new RegExp("wx.qlogo.cn");
				if(!patt1.test(img)) {
					img = HOST + img;
				}

				$("#imgheight").attr("src", img);

			}
		}
	});
}

//签到
function signIN(Phone) {
	/*window.location.href = "GuideOrdersDetailUI.html?"+
	"sname="+GscenicName+"&vTime="+GtimeDay+"&lTime="+GleftTime+
	"&vNum="+GvisitNum+"&fee="+Gfee+"&orderId="+GorderId+
	"&phone="+Phone+"&type="+type;*/
	window.location.href = "GuideOrdersDetailUI.html?" +
		"orderId=" + GorderId +
		"&type=" + type;
}

function currentOrder(Phone) {
	var URL = HOST + "/getdaiyoulanorder.do";
	$.ajax({
		type: "post",
		url: URL,
		async: true,
		data: {
			visitorPhone: Phone
		},
		datatype: "JSON",
		error: function(data) {
			alert("获取待游览订单失败");
		},
		success: function(data) {
			if(JSON.stringify(data) != '0') {
				//参观时间
				var timeDay = data.vtime.substring(5, 16);
				//当前时间
				var nowTime = getNowFormatDate();
				//剩余时间
				var leftTime = getTimeDiff(nowTime, data.vtime);
				type = data.type;
				orderId = data.orderID;
				latitude = data.weidu;
				longitude = data.jingdu;

				$("#ScenicName").html(data.nsme);
				$("#VisitedTime").html(timeDay);
				$("#name").html(data.gname);
				$("#sex").html(data.gsex);
				$("#age").html(data.gage);
				$("#language").html(data.glanguage);
				$("#phone").html(data.gphone);
				$("#VisitedNum").html(data.vnum);
				$("#GuideFee").html(data.gfee);
				$("#leftTime").html(leftTime);

				//加载地图
				loadMap(latitude, longitude);
			} else {
				$("#sName").css('display', 'none');
				$("#sorry_img").html("<p style='background:url(img/kong.png) no-repeat;width:22px;height:20px;margin-left:85px;margin-top-2.5px;margin-right:5px;'></p>");
				$("#sorry_null").html("<p style='font-size:16px;margin-left:10px;margin-top:10px;'>您当前无待游览订单</p>");
			}

		}

	});
}
//点击【取消订单】
function cancleOrder(){
	// 点击确定之后 隐藏弹出框
	var mydd = document.getElementById('mymodaldd').style.display ="none";  

	// 判断订单类型
	if(type == "预约单"){
		cancleBookOrder();
	}else if(type == "拼团单"){
		cancleConsistOrder();
	}      
}

// 点击取消订单显示弹框
function xsdd()
{
	var mydd = document.getElementById('mymodaldd').style.display ="block";  
}

// 点击八叉和取消隐藏div弹框
function nodd()
{
	var mydd = document.getElementById('mymodaldd').style.display ="none";  
}

function cancleBookOrder() {
	var url = HOST + "/cancleBookOrder.do";
	var fee = $("#GuideFee").html();

	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: {
			orderId: orderId
		},
		datatype: "JSON",
		success: function(data) {
			//			1--取消成功,-1--已经开始参观，不能取消,2--扣费1%,3--扣费5%
			//			alert("data:"+JSON.stringify(data));
			if(data == -1) {
				alert("已经开始参观，不能取消");
			}
			if(data == 1) {
				alert("取消成功");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
			if(data == 2) {
				alert("取消成功,扣费 " + fee * 0.01 + " 元");
				alert("剩余的金额将在三到五个工作日内返还到您的账户！");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
			if(data == 3) {
				alert("取消成功,扣费 " + fee * 0.05 + " 元");
				alert("剩余的金额将在三到五个工作日内返还到您的账户！");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
		}
	});
}

function cancleConsistOrder() {
	var url = HOST + "/cancleConsistOrder.do";
	var fee = $("#GuideFee").html();
	var num = $("#VisitedNum").html();

	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: {
			orderId: orderId
		},
		datatype: "JSON",
		success: function(data) {
			//			1--取消成功,-1--已经开始参观，不能取消,2--扣费1%,3--扣费5%，4--扣费2%
			//			alert(JSON.stringify(data));
			if(data == -1) {
				alert("已经开始参观，不能取消");
			}
			if(data == 1) {
				alert("取消成功");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
			if(data == 2) {
				alert("取消成功,扣费 " + fee * num * 0.01 + " 元");
				alert("剩余的金额将在三到五个工作日内返还到您的账户！");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
			if(data == 3) {
				alert("取消成功,扣费 " + fee * num * 0.05 + " 元");
				alert("剩余的金额将在三到五个工作日内返还到您的账户！");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
			if(data == 4) {
				alert("取消成功,扣费 " + fee * num * 0.02 + " 元");
				alert("剩余的金额将在三到五个工作日内返还到您的账户！");
				window.location.href = "orderFormInfo.html?orderId=" + orderId;
			}
		}
	});
}

//点击【生成二维码】
function produceQRCode()
{
	$("#qrcode").empty();
//	var orderId = GetUrlem("orderId");
	
	jQuery('#canavas').qrcode({width: 200,height: 200,correctLevel:0,text:utf16to8(orderId)});
	
	//获取网页中的canvas对象
    var mycanvas1 = document.getElementsByTagName('canvas')[0];

	//将转换后的img标签插入到html中
	var img = convertCanvasToImage(mycanvas1);
	
	$('#qrcode').append(img);//imagQrDiv表示你要插入的容器id
	$("#popupDialog").popup('open');
}

// 点击【生成二维码】显示弹框
function xs()
{
	var mychar = document.getElementById('mymodal').style.display ="block";  
}

// 点击八叉和取消隐藏div弹框
function no()
{
	var mychar = document.getElementById('mymodal').style.display ="none";  
}

function convertCanvasToImage(canvas) {
	//新Image对象，可以理解为DOM
	var image = new Image();
	// canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
	// 指定格式 PNG
	image.src = canvas.toDataURL("image/png");
	return image;
}

//限制游客点击
function permit(num) {
	//点击挂靠景区
	if(num == 0) {
		if(isGuider == false) {
			alert("您不是讲解员，不能使用该功能！");
			return false;
		} else {
			window.location.href = 'attachScenic.html';
		}
	}
	//点击订单管理
	if(num == 1) {
		if(isGuider == false) {
			alert("您不是讲解员，不能使用该功能！");
			return false;
		} else {
			window.location.href = 'GuideOrdersUI.html';
		}
	}
	//点击数据中心
	if(num == 2) {
		if(isGuider == false) {
			alert("您不是讲解员，不能使用该功能！");
			return false;
		} else {
			window.location.href = 'dataInfo.html';
		}
	}
	//点击抢单
	if(num == 3) {
		if(isGuider == false) {
			alert("您不是讲解员，不能使用该功能！");
			return false;
		} else {
			window.location.href = 'takeOrderUI.html';
		}
	}
	//点击日程表
	if(num == 4) {
		if(isGuider == false) {
			alert("您不是讲解员，不能使用该功能！");
			return false;
		} else {
			window.location.href = 'calendar.html';
		}
	}
	//点击拼团
	if(num == 5) {
		if(isGuider == false) {
			alert("您不是讲解员，不能使用该功能！");
			return false;
		} else {
			window.location.href = 'scan.html';
		}
	}
	//点击立即预约
	if(num == 7) {
		if(isGuider == false) {
			alert("您不是讲解员，不能使用该功能！");
			return false;
		} else {
		
			
			
		}
	}

	if(num == 6) {
		var url = HOST + "/hasApplied.do";
		$.ajax({
			type: "post",
			url: url,
			async: true,
			data: {
				phone: Phone
			},
			datatype: "JSON",
			error: function() {
				alert("跳转页面失败");
			},
			success: function(data) {
				if(data == false) {
					window.location.href = 'guideApply.html'
				} else {
					window.location.href = "ApplyInfoUI.html";
				}
			}
		});
	}
}

//获取当前日期时间“yyyy-MM-dd HH:MM:SS”
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + date.getHours() + seperator2 + date.getMinutes() +
		seperator2 + date.getSeconds();
	return currentdate;
}

//计算两个时间之间的差值，yyyy-MM-dd HH:MM:SS
function getTimeDiff(time1, time2) {

	var d1 = new Date(time1).getTime();
	var d2 = new Date(time2).getTime();

	var t = (d2 - d1) / 1000 / 60 / 60; //两个时间相差的毫秒数

	if(parseInt(t) < 0) {
		return 0;
	}
	return parseInt(t.toFixed(1));
}

//根据手机号和身份，从服务器获取讲解员的信息
function setGuideInfo(Phone) {
	var url = HOST + "/getdaiyoulanOrderbyGuidePhone.do";

	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: {
			guidePhone: Phone
		},
		datatype: "JSON",
		error: function() {
			alert("显示讲解员订单信息Request error!");
		},
		success: function(data) {
			
			if(JSON.stringify(data) != '0') {
				//参观时间
				GtimeDay = data.vtime.substring(5, 16);
				//当前时间
				var nowTime = getNowFormatDate();
				//剩余时间
				GleftTime = getTimeDiff(nowTime, data.vtime);
				GorderId = data.orderId;
				type = data.type;

				$("#GScenicName").html(data.sname);
				$("#GVisitTime").html(GtimeDay);
				$("#GVisitNum").html(data.vnum);
				$("#GFee").html(data.gfee);
				$("#GLeftTime").html(GleftTime);

				GvisitNum = data.vnum;
				Gfee = data.gfee;
				GscenicName = data.sname;
			} else {
				$("#jiangJie").css('display', 'none');
				$("#sorry_img1").html("<p style='background:url(img/kong.png) no-repeat;width:22px;height:20px;margin-left:90px;margin-top-2.5px;margin-right:5px;'></p>");
				$("#sorry_null1").html("<p style='font-size:16px;margin-left:10px;margin-top:10px;'>您当前无待游览订单</p>");
			}

		}
	});
}