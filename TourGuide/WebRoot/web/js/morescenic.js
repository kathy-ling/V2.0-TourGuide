
$(function(){
	
	getAllScenics();
});

//
function getAllScenics(){
	var url = HOST + "/getAllScenics.do";
		$.ajax({
			type : "post",
			url : url,
			async : true,
			datatype : "JSON",
			error : function() {
				alert("全部景点Request error!");
			},
			success : function(data) {
				var UlList = document.getElementById("more_ul");
				freshList(data, UlList);
			}
		});
}

function ssearch(){
	if($("#mySearchInput").val()==""){
			alert("请输入景区名称");
	}
	else{		
		sessionStorage.searchText = $("#mySearchInput").val();
		window.location.href = "scenicsearchresult.html";
	}
}

function freshList(data, UlList) {
	$.each(data, function(i, item) {
		var LiList = document.createElement("li");
		UlList.appendChild(LiList);

		var DivList = document.createElement("div");
		DivList.className = "imglist-box";
		LiList.appendChild(DivList);

		var AList = document.createElement("a");
//		AList.href = "scenicSpot.html?" + "scenicNo=" + item.scenicName;
		AList.setAttribute("data-ajax",false)
		AList.href = "scenicSpot.html?" + "scenicNo=" + item.scenicNo;
		
		DivList.appendChild(AList);

		var ImgList = document.createElement("img");
		ImgList.setAttribute("src", HOST + item.scenicImagePath);
		var Plist = document.createElement("p");
		Plist.className = "imgbar";
		Plist.innerHTML = item.scenicName;
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