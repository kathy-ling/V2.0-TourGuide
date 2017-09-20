$(function(){
	var num = $("#VisitNum").val();
    $("#Minus").click(function(){
    	if(num > 0){
    		$("#VisitNum").val(--num);
    	} 
    	else{
    		alert("选择不合法");
    	}
    })
    $("#Plus").click(function(){
    	$("#VisitNum").val(++num);
    })
});