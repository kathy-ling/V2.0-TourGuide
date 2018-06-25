var orderId = GetUrlem("orderId");

$(function(){
	var oStar = document.getElementById("star");
	var aLi = oStar.getElementsByTagName("li");
	var oUl = oStar.getElementsByTagName("ul")[0];
	var oSpan = oStar.getElementsByTagName("span")[1];
	var oP = oStar.getElementsByTagName("p")[0];
	var i = iScore = iStar = 0;
	var aMsg = [
				"很不满意|差得太离谱，非常不满",
				"不满意|导游不称职，不满意",
				"一般|服务一般，没有描述的那么好",
				"满意|服务不错，与描述的基本一致，还是挺满意的",
				"非常满意|服务非常好，与描述的完全一致，非常满意"
				]
	for (i = 1; i <= aLi.length; i++){
		aLi[i - 1].index = i;
		//鼠标移过显示分数
		aLi[i - 1].onmouseover = function (){
			fnPoint(this.index);
			//浮动层显示
			oP.style.display = "block";
			//计算浮动层位置
			oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";
			//匹配浮动层文字内容
			oP.innerHTML = "<em><b>" + this.index + "</b> 分 " + aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>" + aMsg[this.index - 1].match(/\|(.+)/)[1]
		};

		//鼠标离开后恢复上次评分
		aLi[i - 1].onmouseout = function (){
			fnPoint();
			//关闭浮动层
			oP.style.display = "none"
		};

		//点击后进行评分处理
		aLi[i - 1].onclick = function (){
			iStar = this.index;
			oP.style.display = "none";
			oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1].match(/\|(.+)/)[1] + ")"
		}
	}

	//评分处理
	function fnPoint(iArg){
		//分数赋值
		iScore = iArg || iStar;
		for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";	
	}
});

function poot()
{
	 var a = document.getElementsByClassName('on').length;
//	 alert(a);
	 if (a == 0) {
	 	alert("请选择评价星级");
		return false;
	 }
	 
	var commDetail = document.getElementById("i").value;
	 
	var postData={
        "orderID":orderId,//动态获取
        "evaluateContext":commDetail,
        "isAnonymous":"1",
        "star1":a,
        "star2":"0",
        "star3":"0"
    };

    commentByVisitor(postData);
}

function commentByVisitor(postData){
	
	var postUrl = HOST+"/commentByVisitor.do";
    
    jQuery.ajax({
    	type:"post",
    	url:postUrl,
    	async:false,
    	data:postData,
		datatype:"JSON",
		error:function()
		{
			alert("Error:评论失败！");
		},
		success:function(data)
		{ 
			if(data == 1){
				alert("评论成功");
				location.href = "orderFormInfoUI.html?orderId="+orderId;
			}else if(data == -1){
				alert("已评论过，不能再次评论");
				$("#evalueContext").val("");
			}else{
				alert("发生错误，请稍后再试！");
			}
		}
    });
  
}