$(function($){
	
	var sname = sessionStorage.searchText;
	
	bindsearch();	
	
	$('#recommondDiv').hide();
});

function ssearch(){
	if($("#mySearchInput").val()==""){
			alert("请输入景区名称");
	}
	else{		
		sessionStorage.searchText = $("#mySearchInput").val();
		window.location.href = "scenicsearchresult.html";
	}
}

//搜索结果绑定
function bindsearch(){
	$("#sceniclist").empty();		
	if(sessionStorage.searchText)
	{
		$('.search').val(sessionStorage.searchText);		
		
		getNameSimilarScenics();
		getScenicRelatesByName();
	}
}

//搜索景点
function getNameSimilarScenics(){
	var url = HOST + "/getNameSimilarScenics.do";
	
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data : {
			scenicName : sessionStorage.searchText
		},
		datatype : "JSON",
		error : function() {
				alert("出错");
		},
		success : function(data) {
			if(JSON.stringify(data) != "{}"){
				fillsrl(data);
			}
			
		}
	});
}

//获取推荐景点
function getScenicRelatesByName(){		
	var url = HOST + "/getScenicRelatesByName.do";
	
	$.ajax({
		type : "post",
		url : url,
		async : true,
		data : {
			"scenicName" : sessionStorage.searchText
		},
		datatype : "JSON",
		error : function() {
			alert("相关推荐景点Request error!");
		},
		success : function(data) {

			if(JSON.stringify(data) == "[]"){
				$('#recommondDiv').hide();
			}else{
				$('#recommondDiv').show();
				var UlList = document.getElementById("search_ul");
				freshList(data, UlList);
			}			
		}
	});
}

function fillsrl(data)
{
	if(data.length == 0 ){
		$("#sceniclist").append("<div data-role='main' class='ui-content'><p>对不起！未查询到该景区信息！</p></div>");
	}
	else{	
		eachfillsrl(data);
	}
}

function eachfillsrl(data)
{
	$.each(data,function(i,n){
		var sname = n.scenicNo;
		
		var url = HOST + "/getDetailScenicByScenicID.do";
		$.ajax({
			type:"post",
			url:url,
			async:true,
			data : {
				scenicID : sname
			},
			datatype : "JSON",
			error : function(){
				$("#sceniclist").empty();
				$("#sceniclist").html("<p>对不起，未查到景区信息</p>");
				$('#recommondDiv').hide();
			},
			success : function(data){												
				idfillscenic(data);
				//alert(JSON.stringify(data));
			}
		});
	});	
}


function idfillscenic(data){
	        
	var UlList = document.getElementById("result_ul");
	
	
	$("#result_ul").append("<li><div><div class='searchResultImg ui-block-a'><a id='imgA' href='scenicSpot.html?scenicNo="
	+data[0].scenicNo+"' target='_top' ><img src='"
	+HOST + data[0].scenicImagePath+"' id='search_img'></a></div><div class='searchResultDis ui-block-b'><p>"
	+data[0].scenicName+"</p><p>景点等级：<span class='spotlevel' id='search_starlevel'>"
	+data[0].scenicLevel+"</span></p><p>景点地址：<span class='spotAddr' id='earch_address'>"
	+data[0].province + data[0].city+ data[0].scenicLocation+"</span></p></div></div><br> <div style='height: 10px;'></div></li>");
	
	return false;
}


//填充景区列表
function freshList(data, UlList) {
	$.each(data, function(i, item) {
		var LiList = document.createElement("li");
		UlList.appendChild(LiList);

		var DivList = document.createElement("div");
		DivList.className = "imglist-box";
		LiList.appendChild(DivList);

		var AList = document.createElement("a");
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