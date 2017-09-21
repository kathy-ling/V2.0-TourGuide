
vistPhone = '18191762572';

$(function(){
	$( "#radio" ).buttonset();
	$( "#sex" ).buttonset();
	$( "#language" ).buttonset();
	
	var num = $("#VisitNum").val();
    $("#Minus").click(function(){
    	if(num > 0){
    		$("#VisitNum").val(--num);
    	} 
    	else{
    		alert("选择不合法");
    	}
    })
    $("#Plus").click(function(){
    	$("#VisitNum").val(++num);
    })
    
    addAllScenics();
    //动态获取日期
    addDate();   
});
function changeTab1()
{
	window.location.href = "orderGuides.html";
//	document.getElementById("OrderTab").className = "selected";
//	document.getElementById("ReleaseTab").className = "";
}
function changeTab2()
{
	document.getElementById("OrderTab").className = "";
	document.getElementById("ReleaseTab").className = "selected";
}
//发布订单：验证用户的输入信息，并进行订单的发布
function checkOrderForm() {	

	var time = $("input[name='radioDate']:checked").val()+" "+$("#SelectTime").val();
	var name = $("#SelectScenic").val();
//	var timeNow = getNowFormatDate();
	var num = $("#VisitNum").val();
	var phone = $("#ContactPhone").val();
	var fee = $("#Price").val();
	var sex = $("input[name='sex']:checked").val();
	var language = $("input[name='language']:checked").val();
	var otherRequest = $("#OtherCommand").val();
	var visitorName = $("#ContactName").val();

	if(!name){
		alert("请选择景区!");
		return false;
	}
	if (!$("input[name='radioDate']:checked").val()) {
		alert("请选择日期!");
		return false;
	}
	if (!$("#SelectTime").val()) {
		alert("请选择时间!");
		return false;
	}else if($("#SelectTime").val()=="请选择时间"){
		alert("时间出错，请重新选择!");
		return false;
	}
	if (!fee) {
		alert("请输入预期价格！");
		return false;
	}	
	if (!num || num < 1) {
		alert("请输入参观人数！");
		return false;
	}
	if (!phone) {
		alert("请输入电话号码！");
		return false;
	}
	if (!visitorName) {
		alert("请输入您的姓名！");
		return false;
	}

	var data = {
			scenicName : name,
			otherCommand : otherRequest,
			visitNum : num,
			priceRange : fee,
			guideSex : sex,		
			visitorPhone : vistPhone, //vistPhone全局变量，游客的手机号
			visitorName : visitorName,
			language : language,
			purchaseTicket : 2,
			halfPrice : 0,
			discoutPrice : 0,
			fullPrice : 0,
			visitTime : time,		
			contact : phone//contact,游客在发布订单界面填写的联系电话
		};
		//发布订单
		releaseOrder(data);
}

// 发布订单
function releaseOrder(formdata) {
	var Url = HOST + "/releaseBookOrder.do";
	$.ajax({
		type : "post",
		url : Url,
		async : true,
		data : formdata,
		datatype : "JSON",
		error : function() {
			alert("发布订单Request error!");
		},
		success : function(data) {			
			
			if (data != "null") {
				window.location.href="releaseOrderConfirm.html?scenicName="+formdata.scenicName
				+"&orderTime="+formdata.visitTime
				+"&orderNum="+formdata.visitNum
				+"&contactName="+formdata.visitorName
				+"&contactPhone="+formdata.contact
				+"&otherCommand="+formdata.otherCommand
				+"&guideFee="+formdata.priceRange
				+"&orderID="+data;
			} else {
				alert("发布订单失败");
			}
		}
	});
}
//查询所有的景区名称
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
	var obj = document.getElementById('SelectScenic');
	// 这个只能在IE中有效
	obj.options.add(new Option(a, a));
}
//设置日期格式，填充至下拉选择菜单
function addDate()
{
	var now = new Date();
	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
	var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+2);
	var dayAfterTomo = new Date(now.getFullYear(), now.getMonth(), now.getDate()+3);
	var today0 = today.toISOString();
	var today1 = today0.substring(0,10);
	var tomorrow0 = tomorrow.toISOString();
	var tomorrow1 = tomorrow0.substring(0,10);
    var SdayAfterTomo0 = dayAfterTomo.toISOString();
    var dayAfterTomo1 = SdayAfterTomo0.substring(0,10);
    var date1 = today0.substring(5,10);
    var date2 = tomorrow1.substring(5,10);
    var date3 = dayAfterTomo1.substring(5,10);
	
	$("#radio1").val(today1);
	$("#radio2").val(tomorrow1);
	$("#radio3").val(dayAfterTomo1);
	$("#radioLabel1").html(date1);
	$("#radioLabel2").html(date2);
	$("#radioLabel3").html(date3);
}
//动态改变参观时间
function showVisitTime()
{
	var myDate = new Date();
	var myDay = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()+1);
	var today0 = myDay.toISOString();
	var today1 = today0.substring(0,10);
	var hour = myDate.getHours();
	var minute = myDate.getMinutes();
	var mySelect = document.getElementById("SelectTime");
	if(today1 == $("input[name='radioDate']:checked").val())
	{
		//alert("today");
		if(hour >= 8 && hour < 9 && minute < 30)
		{
			mySelect.options.remove(1);
		}
		if(hour >= 8 && hour < 9 && minute >= 30)
		{
			for(var i = 0; i < 2; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 9 && hour < 10 && minute < 30)
		{
			for(var i = 0; i < 3; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 9 && hour < 10 && minute >= 30)
		{
			for(var i = 0; i < 4; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 10 && hour < 11 && minute < 30)
		{
			for(var i = 0; i < 5; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 10 && hour < 11 && minute >= 30)
		{
			for(var i = 0; i < 6; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 11 && hour < 12 && minute < 30)
		{
			for(var i = 0; i < 7; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 11 && hour < 12 && minute >= 30)
		{
			for(var i = 0; i < 8; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 12 && hour < 13 && minute < 30)
		{
			for(var i = 0; i < 9; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 12 && hour < 13 && minute >= 30)
		{
			for(var i = 0; i < 10; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 13 && hour < 14 && minute < 30)
		{
			for(var i = 0; i < 11; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 13 && hour < 14 && minute >= 30)
		{
			for(var i = 0; i < 12; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 14 && hour < 15 && minute < 30)
		{
			for(var i = 0; i < 13; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 14 && hour < 15 && minute >= 30)
		{	
			for(var i = 0; i < 14; i++)
			{
				mySelect.options.remove(1);
			}
		}
		if(hour >= 15 && hour < 16 && minute < 30)
		{
			for(var i = 0; i < 15; i++)
			{
				mySelect.options.remove(1);
			}
		}	
		if(hour >= 15 && hour < 16 && minute >= 30)
		{
//			alert("15");
			for(var i = 0; i < 16; i++)
			{
				mySelect.options.remove(1);
			}
		}	
		if(hour >= 16)
		{
			for(var i = 0; i < 17; i++)
			{
				mySelect.options.remove(1);
			}
		}		
	}else{
		for(var i = 0; i < 17; i++){
				mySelect.options.remove(1);
			}
		mySelect.options.add(new Option("8:00","8:00"),1);
		mySelect.options.add(new Option("8:30","8:30"),2);
		mySelect.options.add(new Option("9:00","9:00"),3);
		mySelect.options.add(new Option("9:30","9:30"),4);
		mySelect.options.add(new Option("10:00","10:00"),5);
		mySelect.options.add(new Option("10:30","10:30"),6);
		mySelect.options.add(new Option("11:00","11:00"),7);
		mySelect.options.add(new Option("11:30","11:30"),8);
		mySelect.options.add(new Option("12:00","12:00"),9);
		mySelect.options.add(new Option("12:30","12:30"),10);
		mySelect.options.add(new Option("13:00","13:00"),11);
		mySelect.options.add(new Option("13:30","13:30"),12);
		mySelect.options.add(new Option("14:00","14:00"),13);
		mySelect.options.add(new Option("14:30","14:30"),14);
		mySelect.options.add(new Option("15:00","15:00"),15);
		mySelect.options.add(new Option("15:30","15:30"),16);
		mySelect.options.add(new Option("16:00","16:00"),17);
	}	
}