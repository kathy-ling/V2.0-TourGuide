$(document).on("pagecreate",function(){
	$(".treebox .level1>a").removeClass('current').find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');
});
	

$(function($) {
	
//	$("#bottom_navigation").load("bottomNavigation.html").trigger("create");
	
    $( "#tabs" ).tabs();
    
    $(".treebox .level1>a").click(function(){
		if($(this).is('.current'))
		{
			$(this).removeClass('current').find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');
			return false;
		}
		else{
			$(this).addClass('current')   //给当前元素添加"current"样式
			.find('i').addClass('down')   //小箭头向下样式
			.parent().next().slideDown('slow','easeOutQuad')  //下一个元素显示
			.parent().siblings().children('a').removeClass('current')//父元素的兄弟元素的子元素去除"current"样式
			.find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');//隐藏
			return false; //阻止默认时间
		}
	});
	
	getCash();
	getProcessing();
	getSuccessRecord();
});

//查询用户的总金额、可提现金额和已经提现的总额
function getCash(){
	var Url = HOST + "/getCash.do";
	$.ajax({
		type: "get",
		url: Url,
		async: true,
		data: {
			guidePhone:vistPhone//'13165662195'
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("request error");
		},
		success: function(data) {
			if(JSON.stringify(data)!="{}"){
				var cashTotal = data.cashTotal;//账户总金额
				var cashRaised = data.cashRaised;//已提现的金额
				var cashAvailable = data.cashAvailable;//账户余额
				$('#totalMoney').html(cashTotal);
				$('#withdrawMoney').html(cashRaised);
				$('#availableCash').html(cashAvailable);
			}			
		}
	});
}

//立即提现按钮的处理事件
function withdrawMoney(){
	var Url = HOST + "/withdrawMoney.do";
	var money = $('#inputCash').val();
	var cashAvailable = $('#availableCash').html();
	
	//对输入的提现金额进行判断
	if(!(/^\d+(\.\d{2})?$/.test(money))) {//
		alert("请输入正确的提现金额");
		return false;		
	}else if(money > cashAvailable){
		alert("提现金额大于可提现金额，请重新输入!");
	}
	
	if(vistPhone == undefined || vistPhone == openId || vistPhone == null){
		$.ajax({
			type: "get",
			url: Url,
			async: true,
			data: {
				guidePhone:vistPhone,money:money
			}, //vistPhone
			datatype: "JSON",
			error: function() {
				alert("request error");
			},
			success: function(data) {
				if(data == 1){
					getCash();
				}
			}
		});
	}	
}

//查看正在处理的提现申请
function getProcessing(){
	var Url = HOST + "/getProcessingWithdraw.do";

	$.ajax({
		type: "get",
		url: Url,
		async: true,
		data: {
			guidePhone:vistPhone//'13165662195'
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("request error");
		},
		success: function(data) {			
			$('#orderNum').html(data.length);
			$.each(data, function(i, n) {
				
				var UlList = document.getElementById("processing_ul");
				
				var LiListInfo = document.createElement("li");
				LiListInfo.className = "level1";
				UlList.appendChild(LiListInfo);
							
				var PList = document.createElement("p");
				
				var timeSpan = document.createElement("span");
				timeSpan.innerHTML = "提现日期：" + n.takeTime + "<br/>";
				
				var MoneySpan = document.createElement("span");
				MoneySpan.innerHTML = "提现金额：" + n.money + "<br/>";
				
				PList.appendChild(timeSpan);
				PList.appendChild(MoneySpan);
								
				LiListInfo.appendChild(PList);
				
			});
			$("#order_ul").listview("refresh");			
		}
	});
}


//查看已成功提现的记录
function getSuccessRecord(){
	var Url = HOST + "/getSuccessRecord.do";

	$.ajax({
		type: "get",
		url: Url,
		async: true,
		data: {
			guidePhone:vistPhone//'13165662195'
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("request error");
		},
		success: function(data) {
			$.each(data, function(i, n) {
				
				/*var str = '<li class="level1"><p>提现日期：<span>'+n.takeTime+'</span><br/>';
				var p = '提现金额：<span>'+n.money+'</span><br/></p></li>';
				
				$('#success_ul').append(str+p);*/
				
				var UlList = document.getElementById("success_ul");
				
				var LiListInfo = document.createElement("li");
				LiListInfo.className = "level1";
				UlList.appendChild(LiListInfo);
							
				var PList = document.createElement("p");
				
				var timeSpan = document.createElement("span");
				timeSpan.innerHTML = "提现日期：" + n.takeTime + "<br/>";
				
				var MoneySpan = document.createElement("span");
				MoneySpan.innerHTML = "提现金额：" + n.money + "<br/>";
				
				PList.appendChild(timeSpan);
				PList.appendChild(MoneySpan);
								
				LiListInfo.appendChild(PList);
				
			});
			$("#order_ul").listview("refresh");			
		}
	});
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