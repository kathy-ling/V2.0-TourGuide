$(function(){
	var colum = 1;
	var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop : false,
	// 如果需要分页器
   	pagination: '.swiper-pagination',
   	//向左滑动时触发
   	onSlideNextStart: function(swiper){
      colum++;
      if(colum == 1)
      {
//    	alert(colum);
      	$("#head1").attr("class","swiper-slide");
      	$("#head2").attr("class","swiper-slide");
      }
       if(colum == 2)
      {
      	//alert(colum);
      	$("#head1").attr("class","swiper-slide left");
        $("#head3").attr("class","swiper-slide middle");
      	$("#head2").attr("class","swiper-slide middle");
      }
      if(colum == 3)
      {
//    	alert(colum);
      	$("#head3").attr("class","swiper-slide middle");
      	$("#head2").attr("class","swiper-slide");
      }
    },
   	//向右滑动时触发
   	onSlidePrevStart: function(swiper){
      colum--;
      if(colum == 1)
      {
      	$("#head1").attr("class","swiper-slide swiper-slide-active");
      	$("#head2").attr("class","swiper-slide middle");
      }
       if(colum == 2)
      {
      	$("#head1").attr("class","swiper-slide left");
      	$("#head2").attr("class","swiper-slide middle");
      	$("#head3").attr("class","swiper-slide middle");
      }
      if(colum == 3)
      {
      	$("#head3").attr("class","swiper-slide");
      	$("#head2").attr("class","swiper-slide");
      }
    },

  })
	
	addAllScenics();
	
});


function changeTab1()
{
	document.getElementById("OrderTab").className = "selected";
	document.getElementById("ReleaseTab").className = "";
}
function changeTab2()
{
	window.location.href = "releaseOrder.html";
}
function orderGuide()
{
	window.location.href = "isOrder.html?guidePhone=15029319152";
}
function confirmButton()
{
	var scenicName = $('#chooseScenicName option:selected').val();
	window.location.href = "orderGuide.html?"+"scenicName="+scenicName;
}



//只输入景区时，进行的筛选
function getGuidesbyScenic()
{	
	var scenicName = $('#chooseScenicName option:selected').val();
	
	if(scenicName =="" ){
		scenicName = "null";
	}
	
	var data = {
		scenicName:scenicName,
		visitTime:"null",
		visitNum:"0"
	};
	alert(JSON.stringify(data));
	getAvailableGuides(data);
}


//从服务器端获取数据
function getAvailableGuides(data){
	var Url = HOST + "/getAvailableGuides.do";
	
	$.ajax({
		type : "post",
		url : Url,
		async : true,
		data : data,
		datatype : "JSON",
		error : function() {
			alert("筛选失败，请重新进行选择");
		},
		success : function(data) {
			
//			alert(JSON.stringify(data));
			
			if (jQuery.isEmptyObject(data)) {
				alert("没有符合条件的讲解员");
			}
			
			addlist(data);
		}
	});	
}

// 更新管理员列表
function addlist(data) {
	
	$.each(data, function(i, n) {
		
		alert(n.image);
		
		var mainDiv = document.getElementById("guideList");
		
		var div = document.createElement("div");
		div.className = "swiper-wrapper";
		div.style = "height: 100%;";
//		background: url(../img/5-7导游图.png) no-repeat;
		var str ='<div class="swiper-slide swiper-slide-active" style="height: 100%;">'+
		'<div class="guide"><div class="guideImg1" style="background: '+n.image+' no-repeat;"></div><div class="guideInfo">'+
		'<span>'+n.name+'</span><img src=""/><br/><div class="guideFee">'+
		'<p>讲解费</p><p id="GuideFee">'+n.guideFee+'</p></div><div class="guideGrade">'+
		'<p>讲解员星级</p><p id="GuideGrade">'+n.guideLevel+'</p></div><div class="guideNum">'+
		'<p>接待人次</p><p id="GuideNum">'+n.historyTimes+'</p></div><button '+
		'class="order" onclick="orderGuide()">立即<br/>预约</button></div></div></div>';
		
		div.innerHTML = str;
		mainDiv.appendChild(div);
		
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
	var obj = document.getElementById('chooseScenicName');
	// 这个只能在IE中有效
	obj.options.add(new Option(a, a));
}