
var guidePhone = getPhone();

$(function(){
	getData();
	
});

function getData(){
	var url = HOST + "/getGuideDataInfoByPhone.do"
	$.ajax({
		type: "post",
		url: url,
		data: {
			guidePhone: guidePhone
		},
		error: function() {
			alert('该讲解员收入信息获取失败');
		},
		success: function(data) {
			$("#GuideName").html(data.name);	
			$("#GuideImg").attr("src", data.image);
			$("#Percent").html(data.range);
			$("#Grade").html(data.guideLevel);
			$("#OrderNum").html(data.historyTimes);
			$("#TotalMoney").html(data.cashTotal);
			$("#totalVisNum").html(data.historyNum);
			$("#monthOrderNum").html(data.orders);
			$("#monthMoney").html(data.monthFee);
			$("#currentGrade").html(data.guideLevel);
			$("#totalGrade").html(data.topLevel);
			$("#MonthOrderNum").html(data.orders);
			$("#LatMonthOrderNum").html(data.lastOrders);
			$("#MonthOrderFee").html(data.monthFee);
			$("#LastMonthOrderFee").html(data.lastMonthFee);
			
		}
	});
}
