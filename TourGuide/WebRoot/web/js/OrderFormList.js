
vistPhone='18191762572';

$(document).ready(function()
{	
//	$("#bottom_navigation").load("bottomNavigation.html").trigger("create");
    getUrlhideChar();
  	getOrderList();
  	
  	//隐藏未选中的订单
  	$(".navList").click(function(juagechar){
		var juagechar = $(this).html();
		hideOtherLi(juagechar);
   });
});

 function orderinfo(obj){
  		var state = obj.find("span.viewState").html();
  		var orderId = obj.find("span.orderFormId").find("span").html();
  		var type = obj.find("span.orderType").find("span").html();
  		
  		window.location = "orderFormInfo.html?state="+state+"&orderId="+orderId+"&type="+type;
  }
 
 function goComment(obj){
 	var orderId = obj.parents("li").children("a.orderinfo").find("span.orderFormId").find("span").html();
 	window.location = "comment.html?orderId="+orderId;
 }
 
   /*实现订单筛选*/
function hideOtherLi(juagechar){
	juagechar = arguments[0] ? arguments[0]:null;
    if(juagechar){
        $(".viewState").parents("li").show();//显示全部订单
         if(juagechar!="全部")
       {
            $(".viewState").each(function() {//隐藏未选中的
           if($(this).html()!=juagechar)
            {
                $(this).parents("li").hide();
            }
            });
        }
    }
}

function getUrlhideChar(){
    var murl = window.location.search;
    var hidechar = GetUrlem("hide");
    if(hidechar)
    {
        var hidechar = GetUrlem("hide");
//      alert(hidechar);
        return hidechar;
    }
    else
    {
        return null;
    }
}
  
//获取用户的所有订单 
function getOrderList()
{

    var url = HOST+"/getAllOrders.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{visitorPhone:vistPhone},
		datatype:"JSON",
		error:function()
		{
			alert("全部订单Request error!");
		},
		success:function(data)
		{
			
			$.each(data, function(i,n) {
				var UlList = document.getElementById("OrderStateUl");
				var LiList = document.createElement("li");
//				LiList.setAttribute("data-icon",false);
				UlList.appendChild(LiList);
				
				var AList = document.createElement("a");
				//AList.target = "_top";
				AList.className = "orderinfo";
				AList.href = "JavaScript:void(0)";
				AList.setAttribute("onclick","orderinfo($(this))");
				LiList.appendChild(AList);
				
				var PList = document.createElement("p");
				AList.appendChild(PList);
				
				//添加景区名称
				var SpanListName = document.createElement("span");
				SpanListName.className = "scenicName";
				SpanListName.innerHTML = "景区名称："+n.scenicName+"<br/>";
				
				//添加订单号
				var SpanListOrderId = document.createElement("span");
				SpanListOrderId.className = "orderFormId";
				SpanListOrderId.innerHTML = "订单号：<span>"+n.OrderID+"</span><br/>";
				  //添加订单状态
				var SpanListOrderState = document.createElement("span");
				SpanListOrderState.className = "viewState";
				SpanListOrderState.innerHTML = n.orderState;
				if(n.orderState=="待评价"){
					var div = document.createElement("div");
					div.className = "libtn";
					div.innerHTML = '<a href="JavaScript:void(0)" onclick="goComment($(this))" class="abtn goComment">去评价</a>';
					LiList.appendChild(div);
				}

				//添加时间
				var SpanListTime = document.createElement("span");
				SpanListTime.className = "vistTime";
				if(n.visitTime == undefined){
					var d = new Date();
					var dateStr = d.getFullYear()+"-0"+(d.getMonth()+1)+"-"+d.getDate();
					SpanListTime.innerHTML = "时间："+ dateStr +"<br/>";
					
				}else{
					SpanListTime.innerHTML = "时间："+n.visitTime+"<br/>";
				}				
				
				//添加人数
				var SpanListNum = document.createElement("span");
				SpanListNum.className = "existedVisitor";
				SpanListNum.innerHTML = "人数："+n.visitNum+"<br/>";
				
				//添加价格
				var SpanListPrice = document.createElement("span");
				SpanListPrice.innerHTML = "价格："+n.totalMoney+"<br/>";
				
				var SpanListType = document.createElement("span");
				SpanListType.className = 'orderType';
				SpanListType.innerHTML = "订单类型：<span>"+n.type+"</span><br/>";	
				
				PList.appendChild(SpanListName)
				PList.appendChild(SpanListOrderId)
				PList.appendChild(SpanListOrderState);
				PList.appendChild(SpanListTime)
				PList.appendChild(SpanListNum)
				PList.appendChild(SpanListPrice);	
				PList.appendChild(SpanListType);
			});
			$("#OrderStateUl").listview('refresh');
			hideOtherLi(getUrlhideChar());
		}
		//景区图片暂时不显示在列表
	});	
}

function isRegist()
{
	if(vistPhone == "undefined" || vistPhone == openId)
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