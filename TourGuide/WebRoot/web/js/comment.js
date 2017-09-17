
var orderId = GetUrlem("orderId");
//orderId='527833d4f478460b8966488bce0c32a9';

$(function($){
	
	//加载底部导航栏
	$("#bottom_navigation").load("bottomNavigation.html").trigger("create");
	
    $('#star1').raty({ path:'img', score: 0,width:200});
    $('#star2').raty({ path:'img', score: 0,width:200});
    $('#star3').raty({ path:'img', score: 0,width:200});
    
    $("#evalueContext").keydown(function(){       
        var maxCount = 200;
        var curLength = $("#evalueContext").val().length;
        if(curLength > maxCount){
            var num = $("#evalueContext").val().substr(0,4);
            $("#evalueContext").val(num);
            alert("超过字数限制啦!" );
        }
        else{
            $("#textCount").text(maxCount-$("#evalueContext").val().length + "字")
        }
    });	             
});

//点击【提交】，发布评论
function commentSub(){
	
	var star1 =  $('#star1').raty('score');
    var star2 =  $('#star2').raty('score');
    var star3 =  $('#star3').raty('score');
    var evalueText = $("#evalueContext").val();   
    var isanonymous = 0;
    
    if($("input:checkbox[name='anonymous']").get(0).checked)
    {
        isanonymous = 1;
    }
    
    if(star1==undefined || star2==undefined || star3==undefined){
    	alert("请为每一项打分!");
    	return false;
    }
    if(evalueText == ""){
    	alert("评论内容不能为空");
    	return false;
    }
        
    var postData={
        "orderID":orderId,//动态获取
        "evaluateContext":evalueText,
        "isAnonymous":isanonymous,
        "star1":star1,
        "star2":star2,
        "star3":star3
    };

    commentByVisitor(postData);
}

//
function commentByVisitor(postData){
	var postUrl = HOST+"/commentByVisitor.do";
    
    $.ajax({
    	type:"post",
    	url:postUrl,
    	async:true,
    	data:postData,
		datatype:"JSON",
		error:function()
		{
		alert("Error:评论失败！");
		},
		success:function(data)
		{ 
			alert("data="+data);
			if(data == 1){
				alert("评论成功");
				location.href = "orderFormInfo.html?orderId="+orderId;
			}else if(data == -1){
				alert("已评论过，不能再次评论");
				$("#evalueContext").val("");
			}else{
				alert("发生错误，请稍后再试！");
			}
		}
    });
}


function isRegist()
{
	if(vistPhone == undefined || vistPhone == openId)
	{
		alert("您还未注册，请注册！");
		window.location.href = "register.html";
	}else{
		var black = sessionStorage.getItem("isBlackened");

		if(black == "false"){
			window.location.href = "personalHome.html";
		}else{
			alert("您已被系统管理员拉黑!");
		}
	}
}