$(document).ready(function()
{
	//var ScenicNo = GetUrlem("scenicNo");
	ScenicNo = "19743";	
	refreshPage(ScenicNo);	
	
});

function refreshPage(ScenicNo){
	
	sessionStorage.ScenicNo = ScenicNo;
	setscenicInfo(ScenicNo);
	
	geTicketsByScenicNo(ScenicNo);
	
	getOnlineGuide(ScenicNo);
	getConsistNum(ScenicNo);
	getConsistFee(ScenicNo);
}

//从服务器端获取景区详细信息,名称、图片、历史参观人数、景区介绍
function setscenicInfo(ScenicNo){
	var urlScenicInfo = HOST+"/getDetailScenicByScenicID.do"
	
	$.ajax({
		type:"post",
		url:urlScenicInfo,
		async:true,
		data:{"scenicID":ScenicNo},
		datatype:"JSON",
		error:function()
		{
			alert("景区详细信息Request error!");
		},
		success:function(data)
		{
			//alert("景区详细信息request success!");
			$.each(data, function(i,item) {
				//设置显示名称
				$("#ScenicName").html(item.scenicName);
				//设置显示图片
				$("#ScenicImg").attr("src", item.scenicImagePath);				
				//设置显示简介
				$("#ScenicIntro").html(item.scenicIntro);
				//设置显示历史参观人数
				$("#VisitedNum").html(item.totalVisits);									
			});			
		}
	});
}

//获取该景区的门票信息
function geTicketsByScenicNo(ScenicNo)
{
	var urlScenicTicket = HOST+"/geTicketsByScenicNo.do"
	
	$.ajax({
		type:"post",
		url:urlScenicTicket,
		async:true,
		data:{"scenicNo":ScenicNo},
		datatype:"JSON",
		error:function()
		{
			alert("景区门票信息Request error!");
		},
		success:function(data)
		{						
			$("#ScenicPrice").html(data.fullPrice);
		}
	});
}

//获取该景区当前的拼团费用
function getConsistFee(ScenicNo)
{
	var urlIntroFee = HOST+"/getConsistFee.do"
	
	$.ajax({
		type:"post",
		url:urlIntroFee,
		async:true,
		data:{"scenicNo":ScenicNo},
		datatype:"JSON",
		error:function()
		{
			alert("景区拼团费用信息Request error!");
		},
		success:function(data)
		{	
			$("#PinFee").html(data);
		}
	});
}

//获取该景区当前在线的导游人数
function getOnlineGuide(ScenicNo){
	var urlIntroFee = HOST+"/getOnlineGuide.do"
	
	$.ajax({
		type:"post",
		url:urlIntroFee,
		async:true,
		data:{"scenicNo":ScenicNo},
		datatype:"JSON",
		error:function()
		{
			alert("景区当前在线导游信息Request error!");
		},
		success:function(data)
		{	
			$("#OnlineTour").html(data);
		}
	});
}

//获取该景区当前的拼团数
function getConsistNum(ScenicNo){	
	var urlIntroFee = HOST+"/getConsistNum.do"
	
	$.ajax({
		type:"post",
		url:urlIntroFee,
		async:true,
		data:{"scenicNo":ScenicNo},
		datatype:"JSON",
		error:function()
		{
			alert("景区当前的可拼团数信息Request error!");
		},
		success:function(data)
		{	
			$("#PinNum").html(data);
		}
	});
}
