$(function(){
	//获得所有景区名称
	addAllScenics();
});
function sceen()
{
	 var city=$("#chooseScenicName").val(); 

	 // alert(city);
	 if (city == "") {
	 	alert('请选择景区');
	 }else{
	 	window.location.href='orderGuide.html';
	 }
}