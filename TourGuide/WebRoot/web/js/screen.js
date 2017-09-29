$(function(){
	$( "#radio" ).buttonset();
	$( "#sex" ).buttonset();
	$( "#language" ).buttonset();
	$( "#age" ).buttonset();
	
	//星级
	$("#starLevel").raty({
		number:7,
        starOn : 'img/star-on.png',  
        starOff : 'img/star-off.png',
		readOnly:false,
		size:36,
		score:2,
		hints:['50','100','150','200','250','300','350'],
	});
	
	//动态获取日期
    addDate();  
});
//设置日期格式，填充至下拉选择菜单
function addDate()
{
	var now = new Date();
	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
	var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+2);
	var dayAfterTomo = new Date(now.getFullYear(), now.getMonth(), now.getDate()+3);
	var today0 = today.toISOString();
	var today1 = today0.substring(0,10);
	var tomorrow0 = tomorrow.toISOString();
	var tomorrow1 = tomorrow0.substring(0,10);
    var SdayAfterTomo0 = dayAfterTomo.toISOString();
    var dayAfterTomo1 = SdayAfterTomo0.substring(0,10);
    var date1 = today0.substring(5,10);
    var date2 = tomorrow1.substring(5,10);
    var date3 = dayAfterTomo1.substring(5,10);
	
	$("#radio1").val(today1);
	$("#radio2").val(tomorrow1);
	$("#radio3").val(dayAfterTomo1);
	$("#radioLabel1").html(date1);
	$("#radioLabel2").html(date2);
	$("#radioLabel3").html(date3);
}
//动态改变参观时间
function showVisitTime()
{
	var myDate = new Date();
	var myDay = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()+1);
	var today0 = myDay.toISOString();
	var today1 = today0.substring(0,10);
	var mySelect = document.getElementById("SelectTime");
	if(today1 == $("input[name='radioDate']:checked").val())
	{
		var eight = new Date(today1+" 08:00:00");	
		var count = (myDate - eight)/60000 / 60 /0.5;	
		if(count>=19){count=19}
		for(i=0;i<count;i++){
			mySelect.options.remove(1);
		}
	}else{
		for(var i = 0; i < 20; i++){
				mySelect.options.remove(1);
			}
		mySelect.options.add(new Option("8:00","8:00"),1);
		mySelect.options.add(new Option("8:30","8:30"),2);
		mySelect.options.add(new Option("9:00","9:00"),3);
		mySelect.options.add(new Option("9:30","9:30"),4);
		mySelect.options.add(new Option("10:00","10:00"),5);
		mySelect.options.add(new Option("10:30","10:30"),6);
		mySelect.options.add(new Option("11:00","11:00"),7);
		mySelect.options.add(new Option("11:30","11:30"),8);
		mySelect.options.add(new Option("12:00","12:00"),9);
		mySelect.options.add(new Option("12:30","12:30"),10);
		mySelect.options.add(new Option("13:00","13:00"),11);
		mySelect.options.add(new Option("13:30","13:30"),12);
		mySelect.options.add(new Option("14:00","14:00"),13);
		mySelect.options.add(new Option("14:30","14:30"),14);
		mySelect.options.add(new Option("15:00","15:00"),15);
		mySelect.options.add(new Option("15:30","15:30"),16);
		mySelect.options.add(new Option("16:00","16:00"),17);
		mySelect.options.add(new Option("16:30","16:30"),18);
		mySelect.options.add(new Option("17:00","17:00"),19);
	}	
}
//点击确认按钮
//function confirmOrder()
//{
//	var dateSelect = $("input[name='radioDate']:checked").val();
//	var timeSelect = $("#SelectTime").val();
//	var sex = $("input[name='sex']:checked").val();
//	var age = $("input[name='age']:checked").val();
//	var language = $("input[name='language']:checked").val();
//	var star = $("#starLevel").raty('getScore');
//	
//	if(!dateSelect){
//		alert("请选择游览日期，否则系统将为您设置默认日期");
//		dateSelect = "null";
//	}
//	if(!timeSelect){
//		alert("请选择游览时间，否则系统将为您设置默认时间");
//		timeSelect = "null";
//	}
//	if (sex == undefined){
//		sex = "null";
//	} 
//	if (age == undefined) {
//		age = "null";
//	} 
//	if (language == undefined) {
//		language = "null";
//	}
//	window.location.href = "orderGuidesAfterScenic.html?date="+dateSelect+
//							"&time="+timeSelect+"&sex="+sex+
//							"&age="+age+"&language="+language+
//							"&star="+star+"";
//}
