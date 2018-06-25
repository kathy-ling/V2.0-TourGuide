var visitPhone = getPhone();
//var visitPhone = "15029319152";

$(function(){
	//加载挂靠历史记录
	getHistoryAffiliation();
});
function changeTab1()
{
	window.location.href = "attachScenic.html?date="+Math.random();
}
function changeTab2()
{
	window.location.href = "";
}
//查看挂靠记录
function getHistoryAffiliation() {

	var Url = HOST + "/getHistoryAffiliation.do";
	$.ajax({
		type: "post",
		url: Url,
		async: true,
		data: {
			guidePhone:visitPhone
		}, //vistPhone
		datatype: "JSON",
		error: function() {
			alert("Request error!");
		},
		success: function(data) {
			
			$("#list").empty();
			
			// alert(JSON.stringify(data));
			
			$.each(data, function(i, n) {
				var list = document.getElementById("list");
				list.className = "list";
				
				var listItem = document.createElement("div");
				listItem.className = "histroyListItem";
				
				var str = '<div class="HistroyscenicImg">'+
				'<img class="histroyScenicImg" src='+HOST+n.scenicImagePath+'>'+
				'</div><div class="histroyInfo">'+
				'<div class="name1"><span>'+ n.scenicName +'</span>'+
				'</div><div class="time1"><span class="applyTime">'+
				'申请时间</span><span>' + n.applyDate + '</span></div>'+
				'<div class="time2"><span class="cancelTime">'+
				'取消时间</span><span>' + n.quitDate + '</span></div></div>';
				
				listItem.innerHTML = str;
				list.appendChild(listItem);
			});			
		}
	});
}