$(function(){
	$( "#radio" ).buttonset();
	$( "#sex" ).buttonset();
	$( "#language" ).buttonset();
	
	var num = $("#VisitNum").val();
    $("#Minus").click(function(){
    	if(num > 0){
    		$("#VisitNum").val(num--);
    	} 
    	else{
    		alert("选择不合法");
    	}
    })
    $("#Plus").click(function(){
    	$("#VisitNum").val(num++);
    })
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