$(function(){
	
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
//点击立即预约
function orderGuide()
{
	window.location.href = "isOrder.html";
}
//点击筛选按钮
function screenButton()
{
	window.location.href = "screen.html";
}
