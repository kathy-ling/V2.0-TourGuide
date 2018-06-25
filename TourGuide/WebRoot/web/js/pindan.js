//从登录界面获得游客的手机号即登录名
//1-15 datebox 时间无法获取
var scenicNo = "";
var scenicName = "";
//vistPhone = '18191762572';

//获取讲解费和已拼团人数,订单编号
var fee = 0;
var yipinnum = 0;
var kporderid = "";
var sName = "";
var time = "";

$(function($) {


	$("#faqixian").hide();
	$("#faqipage").hide();
	$("#paypage").hide();

	//$("#fqrqradio").buttonset();

	//填充日期和景区
	addDate();
	addAllScenics();

	showVisitTime(0);

	getconsistOrder();
	
	

});

//动态生成列表项目
function fillkepinorderlist(n) {
	//	n.visitTime;
	//	n.num;//可拼
	//	n.guideFee;
	//	n.orderID;
	//	n.scenicName;
	var visittime = n.visitTime;
	var vt = visittime.substring(5, 7) + "." + visittime.substring(8, 16);
	var remaintime = settime(visittime);
	var orID = n.orderID;
	var s = '\"' + orID + '\"';

	//已拼人数
	var ynum = 20 - n.num;

	var item = "<div class='kepinorder' onclick='putmnn(" + n.guideFee + "," + ynum + "," + s + ",\"" + n.visitTime + "\",\"" + n.scenicName+"\")'><div class='orderlisttitle'>" +
		"<span>" + n.scenicName + "</span><span style='float:right'>" + vt + "</span></div><div class='remaintime'><p class='remaintime1'><span>" +
		remaintime + "</span>&nbsp;小时</p><p class='remaintime2'>剩余时间</p></div><div class='feediv'>" +
		"<table><tr class='feetitle'><td>讲解费(元)</td><td>拼团人数</td></tr><tr class='ordermnn'>" +
		"<td><span>" + n.guideFee + "</span>元/人</td><td><span style='font-size: 30px;'>" + ynum + "</span>/20</td>" +
		"</tr></table></div></div>";
	$("#pindan_ul_id").append(item);
}

function getconsistOrder() {

	var url = HOST + "/getAllAvailableConsistOrder.do";
	

	$.ajax({
		type: "post",
		url: url,
		async: false,
		datatype: "JSON",
		error: function() {
			alert("可拼拼单Request error!");
		},
		success: function(data) {
			if(data.length == 0) {
				$("#pindan_ul_id").empty();
				$("#pindan_ul_id").html("<p style='font-size:14px;'>抱歉，没有可拼订单</p>");
			} else {
				$("#pindan_ul_id").empty();
				fillkepinorder(data);
			}
		}
	});
}

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "/";
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

function fillkepinorder(data) {
	var now = getNowFormatDate();
	var a = "";
	$.each(data, function(i, item1) {
		var str = item1.visitTime;
		var tmp = str.split(':');
		var tmp1 = tmp[0] + ":" + tmp[1];
		var tmp2 = tmp1.split("-");
		var time = tmp2[1] + "-" + tmp2[2];

		var str1 = str.split('.');
		var str3 = str.split('-');
		//2017-06-10 11:00:00
		var time1 = str1[0];
		//		alert(now +" "+ getTime1ByIOS(time1))
		//时间差
		var diff = getTimeDiff(now, getTime1ByIOS(time1));

		var item = "<div class='kepinorder' onclick='putmnn(" + item1.guideFee + "," + item1.num + "," + item1.orderID + ",\"" + item1.visitTime + "\",\"" + item1.scenicName+"\")'><div class='orderlisttitle'>" +
			"<span>" + item1.scenicName + "</span><span style='float:right'>" + vt + "</span></div><div class='remaintime'><p class='remaintime1'><span>" +
			diff + "</span>&nbsp;小时</p><p class='remaintime2'>剩余时间</p></div><div class='feediv'>" +
			"<table><tr class='feetitle'><td>讲解费(元)</td><td>拼团人数</td></tr><tr class='ordermnn'>" +
			"<td><span>" + item1.guideFee + "</span>元/人</td><td><span style='font-size: 30px;'>" + item1.num + "</span>/20</td>" +
			"</tr></table></div></div>";
		a = a + item;
	});

	$("#pindan_ul_id").html(a);

}

function getTime1ByIOS(time1) {
	return time1.replace(/-/, "/").replace(/-/, "/");
}

function getTimeDiff(time1, time2) {

	var d1 = new Date(time1).getTime();
	var d2 = new Date(time2).getTime();
	var t = (d2 - d1) / 1000 / 60 / 60; //两个时间相差的毫秒数

	if(parseInt(t) < 0) {
		return 0;
	}
	return parseInt(t.toFixed(1));
}

function paypageoff() {
	$("#paypage").hide();

	$("#payguidefee").html("0");
}

function putmnn(m, n, s, p, q) {
	fee = m;
	yipinnum = n;
	kporderid = s;
	time=p;
	sName=q;
}

//设置剩余时间
function settime(vtime) {

	var vt = new Date(vtime);
	var now = new Date();

	var s = (vt - now) / 60000 / 60;

	s = parseInt(s);
	return s;
}

//拼单人数加减
function pdvnplus() {

	var vn = $("#pindanvisitnum").val();
	if(vn == "") {
		vn = 0;
	}

	if(vn < 0 || vn > (20 - yipinnum)) {
		alert("人数数量请输入大于0小于20的数字");
		$("#pindanvisitnum").val("");
	}
	if(vn == (20 - yipinnum)) {
		$("#pindanvisitnum").val(vn);
	} else {
		vn = parseInt(vn) + 1;
		$("#pindanvisitnum").val(vn);
	}

	var kpfee = parseInt(vn) * fee;
	$("#payguidefee").html(kpfee);
}

function pdvnminus() {
	var vn = $("#pindanvisitnum").val();
	if(vn == "") {
		vn = 0;
	}

	if(vn < 0 || vn > (20 - yipinnum)) {
		alert("人数数量请输入大于0小于20的数字");
		$("#pindanvisitnum").val("");
	}
	if(vn == 0) {
		$("#pindanvisitnum").val(vn);
	} else {
		vn = parseInt(vn) - 1;
		$("#pindanvisitnum").val(vn);
	}

	var kpfee = parseInt(vn) * fee;
	$("#payguidefee").html(kpfee);
}

//筛选订单人数加减
function cvnplus() {
	var vn = $("#chooseVisitNum").val();
	
	if(vn == "") {
		vn = 0;
	}

	if(vn < 0 || vn > (20)) {
		alert("人数数量请输入大于0小于20的数字");
		vn = 0;
		$("#chooseVisitNum").val("");
	}
	if(vn == (20)) {
		$("#chooseVisitNum").val(vn);
	} else {
		vn = parseInt(vn) + 1;
		$("#chooseVisitNum").val(vn);
	}

	chooseOrder(0);
}

function cvnminus() {
	var vn = $("#chooseVisitNum").val();
	if(vn == "") {
		vn = 0;

	}

	if(vn < 0 || vn > (20)) {
		alert("人数数量请输入大于0小于20的数字");
		vn = 0;
		$("#chooseVisitNum").val("");
	}
	if(vn == 0) {
		$("#chooseVisitNum").val(vn);
	} else {
		vn = parseInt(vn) - 1;
		$("#chooseVisitNum").val(vn);
	}

	chooseOrder(0);
}

//发起拼单人数加减
function fqplus() {
	var vn = $("#visitorCount").val();
	if(vn == "") {
		vn = 0;
	}

	if(vn < 0 || vn > (20)) {
		alert("人数数量请输入大于0小于20的数字");
		vn = 0;
		$("#visitorCount").val("");
	}
	if(vn == (20 - yipinnum)) {
		$("#visitorCount").val(vn);
	} else {
		vn = parseInt(vn) + 1;
		$("#visitorCount").val(vn);
	}
}

function fqminus() {
	var vn = $("#visitorCount").val();
	if(vn == "") {
		vn = 0;

	}

	if(vn < 0 || vn > (20)) {
		alert("人数数量请输入大于0小于20的数字");
		vn = 0;
		$("#visitorCount").val("");
	}
	if(vn == 0) {
		$("#visitorCount").val(vn);
	} else {
		vn = parseInt(vn) - 1;
		$("#visitorCount").val(vn);
	}
}



//【快捷拼单】按钮
function fastPin() {
	if(vistPhone == "undefined" || vistPhone == openId) {
		alert("您还未注册，请注册！");
		window.location.href = "register.html";
	} else {
		window.location.href = 'fastPinConfirm.html';
	}

}

//填充景区列表
function addAllScenics() {
	var url = HOST + "/getAllScenics.do";
	$.ajax({
		type: "post",
		url: url,
		async: true,
		datatype: "JSON",
		success: function(data) {
			addSelect(data);
		}
	});
}

function addSelect(a) {
	$.each(a, function(index, value) {
		addOption(value.scenicName);
	});

}

function addOption(a) {

	// 根据id查找对象，

	var obj = document.getElementById('chooseScenicName');
	var obj1 = document.getElementById('chooseScenicName1');
	// 这个只能在IE中有效
	obj.options.add(new Option(a, a));
	obj1.options.add(new Option(a, a));
}

//填充 日期单选框
function addDate() {
	var td = new Date();

	var todayyear = td.getFullYear();
	var todaymonth = td.getMonth() + 1;
	todaymonth = todaymonth < 10 ? "0" + todaymonth : todaymonth;
	var todaydate = td.getDate();
	todaydate = todaydate < 10 ? "0" + todaydate : todaydate;

	$("#kptoday").val(todayyear + "-" + todaymonth + "-" + todaydate);
	$("#skptoday").html(todaymonth + "." + todaydate);
	$("#fqtoday").val(todayyear + "-" + todaymonth + "-" + todaydate);
	$("#sfqtoday").html(todaymonth + "." + todaydate);

	var tm = new Date();
	tm.setDate(tm.getDate() + 1);
	var tomoyear = tm.getFullYear();
	var tomomonth = tm.getMonth() + 1;
	tomomonth = tomomonth < 10 ? "0" + tomomonth : tomomonth;
	var tomodate = tm.getDate();
	tomodate = tomodate < 10 ? "0" + tomodate : tomodate;

	$("#kptomo").val(tomoyear + "-" + tomomonth + "-" + tomodate);
	$("#skptomo").html(tomomonth + "." + tomodate);
	$("#fqtomo").val(tomoyear + "-" + tomomonth + "-" + tomodate);
	$("#sfqtomo").html(tomomonth + "." + tomodate);

	var dat = new Date();
	dat.setDate(dat.getDate() + 2);
	var datyear = dat.getFullYear();
	var datmonth = dat.getMonth() + 1;
	datmonth = datmonth < 10 ? "0" + datmonth : datmonth;
	var datdate = dat.getDate();
	datdate = datdate < 10 ? "0" + datdate : datdate;

	$("#kpdat").val(datyear + "-" + datmonth + "-" + datdate);
	$("#skpdat").html(datmonth + "." + datdate);
	$("#fqdat").val(datyear + "-" + datmonth + "-" + datdate);
	$("#sfqdat").html(datmonth + "." + datdate);

}

//可拼订单去支付
function consistOrder() {
	//		if(vistPhone == "undefined" || vistPhone == openId || vistPhone==null)
	//		{
	//			alert("您还未注册，请注册！");
	//			window.location.href = "register.html";
	//		}
	//		else{
	var phone = $("#kpvisitphone").val();
	var num = $("#pindanvisitnum").val();
	var name = $("#kpvisitname").val()
	var oid = kporderid;
	var kppaymoney = $("#payguidefee").html();

	if(num == "") {
		alert("请填写人数");
		return;
	}

	if(phone == "") {
		alert("请填写联系方式");
		return;
	}
	if(name == "") {
		alert("请填写姓名");
		return;
	}
	alert(kporderid);
	window.location.href = "ConsistOrderList.html?OrderID=" +
		kporderid + "&visitname=" + name + "&visitorPhone=" +
		phone + "&visitNum=" + num + "&time=" + time + "&scenicName=" + sName;
}

function consistWithconsistOrderID(data) {
	var url = HOST + "/consistWithconsistOrderID.do";
	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: data,
		datatype: "JSON",
		error: function() {
			alert("拼单Request error!");
		},
		success: function(data) {
			alert("拼单success!");
			window.location.href = "orderFormList.html";
		}
	});
}

//输入手机号后，验证手机号的有效性
function checkPhone() {
	//表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
	var reg = /^1[3|4|5|7|8][0-9]{9}$/;
	var phone = $("#kpvisitphone").val();
	if(!reg.test(phone)) {
		alert('请输入有效的手机号码！');
		$("#kpvisitphone").val("");
		return false;
	}
}
//输入手机号后，验证手机号的有效性
function checkPhone1() {
	//表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
	var reg = /^1[3|4|5|7|8][0-9]{9}$/;
	var phone = $("#fqvisitphone").val();
	if(!reg.test(phone)) {
		alert('请输入有效的手机号码！');
		$("#fqvisitphone").val("");
		return false;
	}
}

//获取全部景区
function getconsistOrder() {
	var url = HOST + "/getAllAvailableConsistOrder.do";
	$.ajax({
		type: "post",
		url: url,
		async: true,
		datatype: "JSON",
		error: function() {
			alert("可拼拼单Request error!");
		},
		success: function(data) { //JSON.stringify(data)=="[]"

			if(data.length == 0) {
				$("#pindan_ul_id").empty();
			}
			//动态加载div布局
			$("#pindan_ul_id").empty();
			UpdateConsistOrder(data);
			$(".kepinorder").bind("click", function(event) {
				$("#pindanvisitnum").val("");
				$("#kpvisitname").val("");
				$("#kpvisitphone")
				$("#paypage").show();
			});

		}
	});
}

//筛选成功，更新列表
function UpdateConsistOrder(data) {
	var visitNum = $("#chooseVisitNum").val();
	$("#pindan_ul_id").empty();

	$.each(data, function(i, n) {
		fillkepinorderlist(n);
		$(".kepinorder").bind("click", function(event) {
			$("#pindanvisitnum").val("");
			$("#kpvisitname").val("");
			$("#kpvisitphone")
			$("#paypage").show();
		});
	});
}

//从前一个页面获取景点名称
function getInfofromFormer(scenicName) {
	//从前一个页面获取到了相应的值后，隐藏选择器，显示lable并赋值
	if(scenicName == "" || scenicName == "null" || scenicName == null) {
		$("#ScenicName").hide();
		document.getElementById("chooseScenicNameDiv").style.display = "";
		$("#ScenicName1").hide();
		document.getElementById("chooseScenicNameDiv1").style.display = "";
		addAllScenics();
	} else {
		$("#ScenicName").show();
		document.getElementById("ScenicName").innerText = scenicName;
		document.getElementById("chooseScenicNameDiv").style.display = "none";
		$("#ScenicName1").show();
		document.getElementById("ScenicName1").innerText = scenicName;
		document.getElementById("chooseScenicNameDiv1").style.display = "none";
	}
}

//景区筛选
function chooseOrder(n) {
	//alert("n="+n);
	//alert(1);
	//var date1= $("#visitTime1").val();
	var date1 = ""

	if(n == 0) {
		var date1 = $("input[name='rdokp']:checked").val();
		if(date1 == undefined) {
			date1 = "null";
		}
	}

	if(n == "1" || n == "2" || n == "3") {
		if($('#chooseScenicName1 option:selected').val() == "请选择景区") {
			alert("请先选择景区，再选择日期");
			return false;
		} else {
			var td = new Date();
			if(n == "1") {}
			if(n == "2") {
				td.setDate(td.getDate() + 1);
			}
			if(n == "3") {
				td.setDate(td.getDate() + 2);
			}
			date1 = getyyyymmdd(td);
		}
	}

	var visitNum = $("#chooseVisitNum").val();

	scenicName = $('#chooseScenicName1 option:selected').val();

	//getTodayFee();

	if(scenicName == "请选择景区") {
		scenicName = "null";
	}

	if(visitNum == "") {
		visitNum = "-1";
	}

	// if(visitNum <= 0 || visitNum > 20) {
	// 	alert("人数数量请输入大于0小于20的数字");
	// 	$("#chooseVisitNum").val("");
	// 	return false;
	// }

	var url = HOST + "/getConsistOrderWithSelector.do";
	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: {
			scenicName: scenicName,
			visitDate: date1,
			visitNum: visitNum
		},
		datatype: "JSON",
		success: function(data) {

			if(data.length == 0) {
				$("#pindan_ul_id").empty();
				$("#pindan_ul_id").html("<p style='font-size:14px;'>抱歉，没有可拼订单</p>");
			} else {
				$("#pindan_ul_id").empty();
				UpdateConsistOrder(data);
			}

		}
	});
}

//传入时间日期格式，返回yyyy-mm-dd字符串
function getyyyymmdd(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = month < 10 ? "0" + month : month;
	var day = date.getDate();
	day = day < 10 ? "0" + day : day;

	return year + "-" + month + "-" + day;
}

//////////////////////////////////////////////////////////////////////////
///发起拼单页面/////////
/////////////////////////////////



function showVisitTime(t) {
	var myDate = new Date();
	var today = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
	var mySelect = document.getElementById("SelectTime");
	if(t == 0) {
		var eight = new Date(today + " 08:00:00");
		var count = (myDate - eight) / 60000 / 60 / 0.5;
		if(count >= 19) {
			count = 19
		}
		for(i = 0; i < count; i++) {
			mySelect.options.remove(1);
		}

	} else {
		for(var i = 0; i < 19; i++) {
			mySelect.options.remove(1);
		}
		mySelect.options.add(new Option("8:00", "8:00"), 1);
		mySelect.options.add(new Option("8:30", "8:30"), 2);
		mySelect.options.add(new Option("9:00", "9:00"), 3);
		mySelect.options.add(new Option("9:30", "9:30"), 4);
		mySelect.options.add(new Option("10:00", "10:00"), 5);
		mySelect.options.add(new Option("10:30", "10:30"), 6);
		mySelect.options.add(new Option("11:00", "11:00"), 7);
		mySelect.options.add(new Option("11:30", "11:30"), 8);
		mySelect.options.add(new Option("12:00", "12:00"), 9);
		mySelect.options.add(new Option("12:30", "12:30"), 10);
		mySelect.options.add(new Option("13:00", "13:00"), 11);
		mySelect.options.add(new Option("13:30", "13:30"), 12);
		mySelect.options.add(new Option("14:00", "14:00"), 13);
		mySelect.options.add(new Option("14:30", "14:30"), 14);
		mySelect.options.add(new Option("15:00", "15:00"), 15);
		mySelect.options.add(new Option("15:30", "15:30"), 16);
		mySelect.options.add(new Option("16:00", "16:00"), 17);
		mySelect.options.add(new Option("16:30", "16:30"), 18);
		mySelect.options.add(new Option("17:00", "17:00"), 19);
	}
}

//发起拼单-提交订单
function paySubmit() {
	var visitscience = $("#chooseScenicName").val();
	if(visitscience == "") {
		alert("请选择景区，再进行提交");
		return false;
	}

	var visitdate = $("input:radio[name='rdofq']:checked").val();

	var visittime = $("#SelectTime").val();
	if(visittime == "") {
		alert("请选择时间，再进行提交");
		return false;
	}

	var visitnum = $("#visitorCount").val();
	var visitname = $("#fqvisitname").val();
	var visitphone = $("#fqvisitphone").val();

	if(visitnum == "") {
		alert("请填写人数，再进行提交");
		return false;
	}
	if(visitname == "" || visitname.length > 16) {
		alert("请填写姓名，再进行提交");
		return false;
	}
	var a = visitdate + " " + visittime;

	window.location.href = "ConsistOrderList.html?" + "visitorPhone=" + visitphone + "&visitNum=" + visitnum + "&visitDate=" +
		visitdate + "&visitTime=" + visittime + "&scenicName=" + visitscience + "&visitname=" + visitname;

}

//获取当日拼团价格
function getTodayFee() {
	var d = new Date();
	var dateStr = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate();
	var url = HOST + "/getIntroFee.do";
	var fee;
	if(scenicName == null || scenicName == "") {
		scenicName = $('#chooseScenicName option:selected').val();
	}

	$("#fqguidefee").html("");

	$.ajax({
		type: "get",
		url: url,
		async: true,
		data: {
			scenicName: scenicName,
			date: dateStr
		},
		success: function(data) {
			fee = data;
			$("#fqguidefee").html(fee);
		},
	});
}

function getkptotalFee() {

	var vn = $("#pindanvisitnum").val();
	var kpfee = parseInt(vn) * fee;
	
	$("#payguidefee").html(kpfee);
}

//发起拼单 人数筛选
function checkkpnum() {
	var vnum = $("#visitorCount").val();

	if(vnum <= 0 || vnumm >= 20) {
		alert("请输入大于0小于20的数字");
		vnum = $("#visitorCount").val("");
		return false;
	}

}

