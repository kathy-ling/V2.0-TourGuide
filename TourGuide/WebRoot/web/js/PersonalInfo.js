var Phone = getPhone();
$(function($){
	
	setperinfo(Phone);
	$("#signINbtn").click(function(){
		signIN(Phone);
	});
});
//签到
function signIN(Phone){
	var URL = HOST+"guideCheckIn.do?phone="+Phone;
	$.ajax({
		type:"get",
		url:URL,
		async:true,
		error:function(data){
			alert("requertError签到失败");
		},
		success:function(data){
			if(data=true)
			{
				alert("签到成功");
			}else{
				alert("签到失败");
			}
		}
	});
}
//是否签到
function ISsignIN(Phone){
	var URL = HOST+"whetherCheckIn.do?phone="+Phone;
	$.ajax({
		type:"get",
		url:URL,
		async:true,
		error:function(data){
			alert("requesterror获取签到状态失败");
		},
		success:function(data){
			if(data=true)
			{
				
			}else{
				
			}
		}
	});
}

function setperinfo(){
	var url = HOST+"/getVisitorInfoWithPhone.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{phone:Phone},
		datatype:"JSON",
		error:function()
		{
			alert("显示个人信息Request error!");
		},
		success:function(data)
		{
			//alert(JSON.stringify(data)!="{}");
			if(JSON.stringify(data)!="{}"){
				
			//alert("显示个人信息success!");
			document.getElementById("person_info_tel").value = data.phone;
			document.getElementById("person_info_name").value = data.name;
			$("#GuideHeadImg").attr("src",data.image);
			}
		}
	});
}
