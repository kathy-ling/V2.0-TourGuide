function getPhoneByOpenId(){
	 
	 var Url = HOST+"/getInfobyOpenID.do";
	    $.ajax({
			type:"post",
			url:Url,
			async:true,
			data:{"openId":openId},
			datatype:"JSON",
			error:function()
			{
				alert("根据openId返回数据Request error!");
			},
			success:function(data)
			{				
				alert("getPhoneByOpenId:"+data.phone);				
				return data.phone;
			}
		});
    
}