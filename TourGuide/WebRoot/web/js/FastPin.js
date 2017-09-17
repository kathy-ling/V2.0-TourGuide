
var scenicName = GetUrlem("scenicName");
var visitPhone = GetUrlem("visitPhone");

$(function($){
	
	getInfofromFormer(scenicName);
});

function getInfofromFormer(scenicName){
	//从前一个页面获取到了相应的值后，隐藏选择器，显示lable并赋值
	
	if(scenicName == "" || scenicName == "null" || scenicName == null){
		$("#ScenicName").hide();
		document.getElementById("chooseScenicNameDiv").style.display = "";
		
		addAllScenics();
	}else{	
		$("#ScenicName").show();
		document.getElementById("ScenicName").innerText = scenicName;
		document.getElementById("chooseScenicNameDiv").style.display = "none";
		getFee();
	}	
}

//选则景区后，显示该景区当日的讲解费
function getFee()
{
	$('#ul_fee').empty();
	var scenicName1 = $("#chooseScenicName").val();
	var scenicName2 = document.getElementById("ScenicName").innerText;

	var scenicName;
	if(scenicName1 == ''){
		scenicName = scenicName2;
	}
	if(scenicName2 == ''){
		scenicName = scenicName1;
	}

	if (scenicName=='') {
		alert('请选择景区');
		return;
	}

	var d = new Date();
	var str = d.getFullYear()+"-0"+(d.getMonth()+1)+"-"+d.getDate();
	var url = HOST+"/getIntroFee.do";
	var fee;
	
	$.ajax({
		type:"get",
		url:url,
		async:true,
		data:{scenicName:scenicName,date:str},
		success:function(data)
		{
			fee = data;
			var ul_feetext ="<li><a><h3>费用信息</h3><p>个人讲解费："+data+"元<br>";
			
			$("#ul_fee").append(ul_feetext);
			$("#ul_fee").listview("refresh");
			document.getElementById("guideFee").innerText = data;
		},
	});
}


//选则景区，输入人数，显示个人讲解费和总额
function getFee1()
{
	$('#ul_fee').empty();
	var scenicName1 = $("#chooseScenicName").val();
	var scenicName2 = document.getElementById("ScenicName").innerText;
	var scenicName;
	if(scenicName1 == ''){
		scenicName = scenicName2;
	}
	if(scenicName2 == ''){
		scenicName = scenicName1;
	}
	var num=$("#personNum").val();
	var d = new Date();
	var str = d.getFullYear()+"-0"+(d.getMonth()+1)+"-"+d.getDate();
	if (scenicName == '') {
		alert('请选择景区');
		$("#personNum").val("");
		return;
	}

	if (!( /^\+?[1-9][0-9]*$/).test(num)) {
		alert('请输入正确的人数!');
		return;
	}
	
	var url = HOST+"/getIntroFee.do";
	var fee;
	$.ajax({
		type:"get",
		url:url,
		async:true,
		data:{scenicName:scenicName,date:str},
		success:function(data)
		{
			var ul_feetext ="<li><a><h3>费用信息</h3><p>个人讲解费："+data+"元<br>"+"<p>拼团人数："+num+"人<br><p>总计："+data*num+"元<br>";
			
			$("#ul_fee").append(ul_feetext);
			$("#ul_fee").listview("refresh");						
		},
	});
}

function addAllScenics() {
	var url = HOST + "/getAllScenics.do";
	$.ajax({
		type : "post",
		url : url,
		async : true,
		datatype : "JSON",
		success : function(data) {
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
	// 这个只能在IE中有效
	obj.options.add(new Option(a, a));
}

//【支付】按钮的点击事件
function ProduceOrder()
{	
	var scenicName1 = $("#chooseScenicName").val();
	var scenicName2 = document.getElementById("ScenicName").innerText;
	var guideFee = document.getElementById("guideFee").innerText;
	var num = $("#personNum").val();
	var scenicName;
	
	if(scenicName1 == ''){
		scenicName = scenicName2;
	}
	if(scenicName2 == ''){
		scenicName = scenicName1;
	}
	if (scenicName=='') {
		alert('请选择景区，进行支付');
		return;
	}
	if (num=='') {
		alert("拼团人数不能为空！");
		return;
	}
	
	var data = {scenicName:scenicName,
		visitNum:num,
		guideFee:guideFee,
		visitorPhone:vistPhone
	};
	
	if(vistPhone == "null" || vistPhone == undefined || vistPhone == openId){
		alert("出错啦！");
		return;
	}else{
		alert(openId);
		alert(num*guideFee);
		callpay(openId, num*guideFee);
	}
}

/*function releaseFastOrder(data){
	var url=HOST+"/releaseFastOrder.do";
	
	$.ajax({
		type:"post",
		url:url,
		data:data,
		error:function()
		{
			alert('快捷拼团支付失败，请重新支付');
		},
		success:function(data)
		{
			if (data==1) {
				alert('支付成功，请进入订单详情进行生成二维码');
				window.location.href='orderFormList.html';
			} else{
				alert('快捷拼团支付失败，请重新支付');
			}
		}
	});
}*/

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