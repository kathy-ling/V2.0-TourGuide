

$(document).ready(function()
{
	var ScenicNo = GetUrlem("scenicNo");
	
	//ScenicNo = '197865';
	
	refreshPage(ScenicNo);	
	getPromotion(ScenicNo);
	
	$("#promotions").hide();
});

function refreshPage(ScenicNo){
	
	sessionStorage.ScenicNo = ScenicNo;
	setscenicInfo(ScenicNo);
//	setTickMoney(ScenicNo);
	
	
}

//从服务器端获取景区详细信息
function setscenicInfo(ScenicNo){
	var url2 = HOST+"/getDetailScenicByScenicID.do"
	
	$.ajax({
		type:"post",
		url:url2,
		async:true,
		data:{"scenicID":ScenicNo},
		datatype:"JSON",
		error:function()
		{
			alert("景区详细信息Request error!");
		},
		success:function(data)
		{
			//alert("景区详细信息request success!");
			$.each(data, function(i,item) {
				//设置显示名称
				$("#scenic_title").html(item.scenicName);
				//设置显示图片
				$("#scenic_img").attr("src", HOST + item.scenicImagePath);				
				//设置显示简介
				$("#scenic_info").html(item.scenicIntro);
				//设置显示历史参观人数
				$("#scenic_total_visit").html(item.totalVisits);
				
				var tmp = item.city;
				var city = tmp.replace("市", "");				
				setweather(city);
				
				$("#orderGuideBtn").attr("href","orderGuide.html?scenicNo="+ScenicNo+"&sname="+item.scenicName);
				$("#pinGuideBtn").attr("href","pindan.html?scenicNo="+ScenicNo+"&sname="+item.scenicName);
//				$("#fastOrderBtn").attr("href","FastPin.html?scenicNo="+ScenicNo+"&sname="+item.scenicName);
			});			
		}
	});
}
	
	
//从服务器端获取今日天气
function setweather(City){
	var url = HOST+"/getWeatherByCity.do";
	  $.ajax({
		type:"post",
		url:url,
		async:true,
		data:{city:City},
		datatype:"JSON",
		error:function()
		{
			alert("今日天气Request error!");
		},
		success:function(data)
		{
			if(data!=null){
				var weather = data.weather;
				var temperature = data.temprature;
				var wind = data.wind;
				var img1 = data.image1;
				var img2 = data.image2;
				if(weather.length>2)
				{
					$("#weather").text(weather);
					$("#img1").attr("src",img1);
					$("#img2").attr("src",img2);
					$("#temperature").text(temperature);
					$("#wind").text(wind);
				}
				else
				{
					$("#weather").text(weather);
					$("#img1").attr("src",img1);
					$("#temperature").text(temperature);
					$("#wind").text(wind);
					}			
				}				
			}
		});
}


function clickFastPin(){
	var scenicName = $("#scenic_title").html();
	
	if(vistPhone == undefined || vistPhone == openId)
	{
		alert("您还未注册，请注册！");
		window.location.href = "register.html";
	}else{
		var black = sessionStorage.getItem("isBlackened");

		if(black == "false"){
			window.location.href = "FastPin.html?scenicName="+scenicName;
		}else{
			alert("您已被系统管理员拉黑!");
			return;
		}
	}
}

//获取首页的活动信息
function getPromotion(ScenicNo)
{
	var url = HOST + "/getScenicPromotions.do";
	$.ajax({
		url : url,
		datatype : "JSON",
		async: false,
		data:{scenicNo:ScenicNo},
		type : "GET",
		error : function(data) {
			alert("活动信息request error!");
			console.log(JSON.stringify(data));
		},
		success : function(data) {
			
			$.each(data, function(i, item) {
				if(data.length != 0){
					$("#promotions").show();
					//alert(JSON.stringify(data));
					$("act").show();
				}
				
				var UlList = document.getElementById("more_ul");
				freshList(data, UlList);
				
				/*var UlList = document.getElementById("index_ul_id");
				var LiList = document.createElement("li");
				UlList.appendChild(LiList);								

				var AList = document.createElement("a");

				AList.setAttribute("href", item.promotionLinks);
				
				//alert(item.promotionLinks);

				LiList.appendChild(AList);

				var ImgList = document.createElement("img");
				ImgList.setAttribute("src", "img/visitor.png");
//				alert("item.promotionImage:" + item.promotionImage);
				ImgList.setAttribute("alt", item.promotionTitle);
				AList.appendChild(ImgList);*/
			});
			/*$(".slider").yxMobileSlider({
				width : 640,
				height : 320,
				during : 3000
			});//轮播图片初始化*/
		}
	});
}

function freshList(data, UlList) {
	$.each(data, function(i, item) {
		var LiList = document.createElement("li");
		UlList.appendChild(LiList);

		var DivList = document.createElement("div");
		DivList.className = "imglist-box";
		LiList.appendChild(DivList);

		var AList = document.createElement("a");
		AList.setAttribute("data-ajax",false)
		AList.href = item.promotionLinks;
		
		DivList.appendChild(AList);

		var ImgList = document.createElement("img");
		ImgList.setAttribute("src", item.promotionImage);
		var Plist = document.createElement("p");
		Plist.className = "imgbar";
		Plist.innerHTML = item.promotionTitle;
		AList.appendChild(ImgList);
		AList.appendChild(Plist);
	});
	$(".imglist-box").height($(document).width() * 0.25);
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
  
//从服务器端获取票价
/*function setTickMoney(ScenicNo){
	var url1 = HOST+"/geTicketsByScenicNo.do"
	$.ajax({
		type:"post",
		url:url1,
		async:true,
		data:{scenicNo:ScenicNo},
		datatype:"JSON",
		error:function()
		{
			alert("获取门票Request error!");
		},
		success:function(data)
		{
			
			$("#full_price").html(data.fullPrice);
			sessionStorage.fullPrice=data.fullPrice;
			sessionStorage.halfPrice=data.halfPrice;
			sessionStorage.discoutPrice=data.discoutPrice;
		}
	});
}*/

