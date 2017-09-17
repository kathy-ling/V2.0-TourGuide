//AList.href = "ConsistOrderList.html?" + "date=" + n.visitTime+"&PerNum="+n.num+"&Fee="
//		+n.guideFee+"&OrderID="+n.orderID+"&visitNum="+visitNum;

OrderID = GetUrlem("OrderID");
perNum = GetUrlem("PerNum");
guideFee = GetUrlem("Fee");

				
$(function($){
	
	if(guideFee != null){
		$("#list_pindan_guide_money").html(guideFee+"元/每人");
	}
	
});


//点击去支付，先判断用户是否注册
function consistOrder(){
	
	if(vistPhone == "undefined" || vistPhone == openId || vistPhone==null)
	{
		alert("您还未注册，请注册！");
		window.location.href = "register.html";
	}
	else{
		var phone=$("#contact").val();
		var num=$("#visitorNum").val();
	
		if(num == "")
		{
			alert("请填写人数");
			return;
		}
		if(phone == ""){
			alert("请填写联系方式");
			return;
		}
		
		var data =
		{
			orderID:OrderID,
			visitNum:num,
			visitorPhone:vistPhone,
			contact:phone
		};
	
		consistWithconsistOrderID(data);
	}
}


function consistWithconsistOrderID(data){
	var url = HOST+"/consistWithconsistOrderID.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:data,
		datatype:"JSON",
		error:function()
		{
			alert("拼单Request error!");
		},
		success:function(data)
		{
			alert("拼单success!");
			window.location.href = "orderFormList.html";
		}
	});
}

//对输入的人数进行判断
function checkNum(){
	var visitNum = $("#visitorNum").val();

	if (visitNum=="") {
		alert("请填写游览人数");
		$("#visitorNum").val("");
		return;		
	}else if(!( /^\+?[1-9][0-9]*$/).test(visitNum)){
		alert("请输入正确的人数");
		$("#visitorNum").val("");
		return;
	}else{
		
		if(parseInt(visitNum) > parseInt(perNum))
		{
			alert("填写人数超过了可拼单人数");
			window.location.href = "pindan.html";
		}
		$("#list_pindan_guide_num").html(visitNum);
		$("#list_pindan_total_money").html(guideFee*visitNum+"元");
	}
}

//输入手机号后，验证手机号的有效性
function checkPhone(){
	//表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; 
	var phone=$("#contact").val();
	
	if(!reg.test(phone)){
		alert('请输入有效的手机号码！');
		$("#contact").val("");
    	return false;
	}else{
		$("#list_pindan_guide_phone").html(phone);
	}
}


function isRegist()
{
	if(vistPhone == "undefined" || vistPhone == openId)
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

/*$("#orderTicketRadio").bind('click', function(event) {
	
	if($("#orderTicketRadio").attr("data-cacheval")=="false")
    {
        $("#orderTicketPanel").show('200', function() {
        });
    }else{
        $("#orderTicketPanel").hide('200', function() {
        });
    }
});*/

/*function getNum(){
	var num = GetUrlem("PerNum");//可拼人数
	var visitNum = GetUrlem("visitNum");//用户输入的参观人数
	
	if(!visitNum || visitNum != ""){
		$("#visitorNum").val(visitNum);
	}
}*/