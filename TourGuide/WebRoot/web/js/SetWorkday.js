$(document).ready(function()
{
	$("#selectDate").datepicker(
		{
			dateFormat:'yy-mm-dd',
			mode:'multiple',
			minDate:'今天',
			maxDate:'今天' + 3,
			showOn: "both", 			
			onSelect: function(selectedDate)
			{  
				selectedDate = " " + selectedDate;
                document.getElementById("alternate").value += selectedDate;			
            },  
		}
	);
});



function setWorkday()
{
	//$.cookie('LoginName')
	var data = {"phone":"3","days":document.getElementById("alternate").value};
	alert(data.days);
	alert(data.phone);
	var url = HOST+"/setGuideWorkday.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:data,
		datatype:"JSON",
		error:function()
		{
			alert("请假Request error!");
		},
		success:function(data)
		{
			alert("请假success!");
			alert(data);			
		}
	});
}
