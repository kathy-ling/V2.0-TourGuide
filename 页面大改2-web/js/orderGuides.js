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
	
});
function changeTab1()
{
	document.getElementById("OrderTab").className = "selected";
	document.getElementById("ReleaseTab").className = "";
}
function changeTab2()
{
	window.location.href = "releaseOrder.html";
//	document.getElementById("OrderTab").className = "";
//	document.getElementById("ReleaseTab").className = "selected";
}
function orderGuide()
{
	window.location.href = "isOrder.html";
}
function confirmButton()
{
	window.location.href = "orderGuidesAfterScenic.html";
}
