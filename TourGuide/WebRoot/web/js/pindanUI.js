
//从登录界面获得游客的手机号即登录名
//1-15 datebox 时间无法获取
var scenicNo = GetUrlem("scenicNo");
var scenicName = GetUrlem("sname");
//vistPhone = '18191762572';

$(function($){	
	
//	$("#panel2").hide();
//	$("#orderTicketPanel").hide();
	
	$("#faqixian").hide();
	$("#faqipage").hide();
	
//	if(scenicName == null || scenicName == ""){
//		getconsistOrder();
//	}else{
//		chooseOrder();
//	}
	
/*	addDate();	
	getInfofromFormer(scenicName);
		*/
		
		
	$(".checkspan").bind("click",function(){
		var ul = $(this).siblings('ul')
		if(ul.is(":hidden")){
			ul.slideDown('400', function() {
				$(this).find("li").bind("click",function(){
					var selectLi=$(this).text();
					$("#select span").text(selectLi);
					$("#select ul").slideUp(400);
				});
				ul.mouseleave(function() {
					$('#select ul').slideUp(400)
				});
			});
		}else{
			$(this).siblings('ul').slideUp(400)
		}			
	});
});

window.onload = function(){
	height = window.outerHeight-99;
	$("#faqipage").css("height",height);
}   