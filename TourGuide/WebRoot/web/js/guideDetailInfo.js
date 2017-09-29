//phone从前一个页面获取
var phone = GetUrlem("guidePhone")
var scenicNo = "";

$(function(){
	setGuideInfo(phone);
	setGuideComment(phone);
});

function allJudge()
{
	$(".hide").attr("class","");
}


//获取并设置导游信息
function setGuideInfo(phone){
	var Url = HOST+"/getDetailGuideInfoByPhone.do";
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{"guidePhone":phone},
		datatype:"JSON",
		error:function()
		{
			alert("导游详细信息Request error!");
		},
		success:function(data)
		{
			$.each(data, function(i,item) {
				$("#GuideImg").attr("src",HOST+item.scenicImagePath);
				$("#GuideHead").attr("src",HOST+item.image);
				$("#GuideName1").html(item.name);
				$("#GuideSex1").html(item.sex);
				$("#GuideScenic1").html(item.scenicName);
				$("#GuideFee").html(item.guideFee);
				$("#GuideLevel").html(item.guideLevel);				
				$("#GuideAge").html(item.age);	
				$("#GuideLanguage").html(item.language);
				$("#GuideNum").html(item.historyTimes);
				$("#guideIntro").html(item.selfIntro);	
				
				scenicNo = item.scenicBelong;
			});
		}
	});
}


//获取导游的历史评价记录
function setGuideComment(phone){

var Url = HOST+"/getComments.do";
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{"guidePhone":phone},
		datatype:"JSON",
		error:function()
		{
			alert("导游评价Request error!");
		},
		success:function(data)
		{
			var num = data.length;

			$("#JudgeNum").html(num);
			$("#JudgeAllNum").html(num);
			
			if(parseInt(num) > 4){
				$("#allJudgeA").show();
			}
			
			$.each(data,function(i,item){
				
				var str = item.evaluateTime.split(" ");
				var date = str[0];				
				
				var str1 = "";					
				var str2;				
				
				if(i < 4){	
					str1 = '<li><div class="visitorNickName"><span>'+item.nickName+'</span>'+'</div>'+
					'<div class="visitorDate"><span>'+date+'</span></div>'+
					'<p class="visitorJudge">'+item.evaluateContext+'</p></li>';
					
					$("#commentList").append(str1);
				}else{
					str2 = '<li class="hide"><span class="visitorNickName">'+item.nickName+'</span>'+
					'<span class="visitorDate">'+date+'</span>'+
					'<p class="visitorJudge">'+item.evaluateContext+'</p></li>';
					
					$("#commentList").append(str1 + str2);
				}
			});		
		}
	});
}

function enterScenic(){
	window.location = "scenicDetailInfo.html?scenicNo="+scenicNo+"";
}
