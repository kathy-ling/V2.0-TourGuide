<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'guide.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
 	 <meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<title>讲解员信息管理</title>
 	 <meta name="description" content="这是一个 table 页面">
  	<meta name="keywords" content="table">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<meta name="renderer" content="webkit">
 	 <meta http-equiv="Cache-Control" content="no-siteapp" />
 	<link rel="stylesheet" href="<%=path%>/assets/css/ace.onpage-help.css" />
	<link rel="stylesheet" href="<%=path%>/docs/assets/js/themes/sunburst.css" />
  	<link rel="icon" type="image/png" href="<%=path %>/assets1/i/favicon.png">
  	<link rel="apple-touch-icon-precomposed" href="<%=path %>/assets1/i/app-icon72x72@2x.png">
  	<link rel="stylesheet" href="<%=path %>/assets1/css/amazeui.min.css"/>
  	<link rel="stylesheet" href="<%=path %>/assets1/css/admin.css">
  	<link rel="stylesheet" href="<%=path%>/assets/css/bootstrap.css" />
  	<link rel="stylesheet" href="<%=path%>/css/jquery.fancyspinbox.css" />
	<link rel="stylesheet" href="<%=path%>/css/dateSelect.css" />
	
	<script type="text/javascript" src="<%=path %>/assets/js/jquery.js"></script>
	<script type="text/javascript" src="<%=path %>/assets/js/bootstrap-paginator.min.js"></script>
	<script type="text/javascript" src="<%=path %>/js/jquery.fancyspinbox.js"></script>
  	<script type="text/javascript" src="<%=basePath %>/js/dateSelect.js"></script>
  	<script type="text/javascript" src="<%=basePath %>/js/jquery.PrintArea.min.js"></script>
  </head>
  
 <body>




  <!-- content start -->
  <div class="admin-content">
    <div class="admin-content-body">
      <div class="am-cf am-padding am-padding-bottom-0">
        <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">订单管理</strong> / <small>拼团信息管理</small></div>
      </div>

      <hr>

      <div class="am-g">
        <div class="am-u-sm-12 am-u-md-6">
          <div class="am-btn-toolbar">
            <div class="am-btn-group am-btn-group-xs">
              
            </div>
          </div>
        </div>
        
        <div  class="am-u-sm-12 am-u-md-3">
          <div class="am-input-group am-input-group-sm">
            <table>
            	<tr>
            		
            		<td><select id="my-menu" onchange="selectchange(this.value)" style="width:110px">
            			<option value="*"  >全部</option>
    					<option value="scenicID">景区编号</option>
    					<option value="visitTime">游览时间</option>
   				 		<option value="guidePhone">讲解员手机号</option>	
					</select></td>
					<td><input type="text"  id="querytxt" class="am-form-field" style="width:100px" readonly="true" ></td>
            		<td><button class="am-btn am-btn-default " type="button" onclick="search()">搜索</button></td>
            	</tr>
            </table>
          
          </div>
        </div>
      </div>

      <div class="am-g">
        <div class="am-u-sm-12">
          <form class="am-form">
            <table class="am-table am-table-striped am-table-hover table-main" style="border-collapse:separate; border-spacing:5px;">
              <thead>
              <tr>
              	<th style="text-align: center; width: 10%;">订单编号</th>
               <th style="text-align: center; width: 5%;">讲解员姓名</th>
               <th style="text-align: center; width: 5%;">游客姓名</th>
               <th style="text-align: center; width: 10%;">景区名称</th>
               <th style="text-align: center; width: 10%;">开始时间</th>
                <th style="text-align: center; width: 5%;">订单状态</th>
                <th style="text-align: center; width: 5%;">游客人数</th>
              	<th style="text-align: center; width: 20%;">操作</th>
              </tr>
              </thead>
              <tbody id="tby" >
              	
              </tbody>
            </table>
           <div style=" margin-bottom:10%; margin-left:40%;">
				<ul id="paginator" ></ul>
		   </div>
		  
          </form>
          
        </div>

      </div>
    </div>
</div>

<div class="modal fade" id="lookmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" >
				
				<div  class="modal-content">
					<div class="model-header">
						
						<h4 class="modal-title" id="myModalLabel" style="text-align:center;">
							订单详情
						</h4>
					</div>
					<div id="printArea"   class="modal-body">
					<table style="border-collapse:separate; border-spacing:10px; margin:auto;">
						<tr ><td>订单编号：</td>
						<td><input type="text" id="look_orderID" name="look_orderID"  readonly="readonly"/></td>
						</tr>
						<tr><td >景区名称：</td>
						<td><input  type="text" id="look_scenicName" name="look_scenicName" readonly="readonly" /></td>
						</tr>
						<tr><td>游览时间:</td>
						<td><input  type="text"  id="look_visitTime" name="look_visitTime"  readonly="readonly"/></td></tr>
						<tr><td>游客手机号:</td>
						<td><input  type="text"  id="look_visitorPhone" name="look_visitorPhone"  readonly="readonly"/></td></tr>
						<tr><td>游客姓名:</td>
						<td><input  type="text"  id="look_visitorName" name="look_visitorName"  readonly="readonly"/></td></tr>
						<tr><td>讲解员手机号:</td>
						<td><input  type="text"  id="look_guidePhone" name="look_guidePhone"  readonly="readonly"/></td></tr>
						<tr><td>讲解员姓名:</td>
						<td><input  type="text"  id="look_guideName" name="look_guideName"  readonly="readonly"/></td></tr>
						<tr><td>讲解语言:</td>
						<td><input  type="text"  id="look_language" name="look_language"  readonly="readonly"/></td></tr>
						<tr><td>订单总额:</td>
						<td><input  type="text"  id="look_totalMoney" name="look_totalMoney"  readonly="readonly"/></td></tr>
						<tr><td>订单状态:</td>
						<td><input  type="text"  id="look_orderState" name="look_orderState"  readonly="readonly"/></td></tr>
						<tr><td>游览人数:</td>
						<td><input  type="text"  id="look_visitNum" name="look_visitNum"  readonly="readonly"/></td></tr>
						
						</table>
					</div>
					<div>
					<button class="close" data-dismiss="modal" aria-hidden="true">Return</button>
					
					</div>
				</div>
			</div>
</div>


<script src="<%=path %>/assets1/js/amazeui.min.js"></script>
<script src="<%=path %>/assets1/js/app.js"></script>
<script type="text/javascript">
	var id=1;
	var OrderInfo="";
	var currentPage=1;
	var pageRows=5;
	var GlobalIndex;
	var selectValue;
	$(document).ready(function()
  	{
  			loadOrderInfo();
  	});
  	
  	function loadOrderInfo()
  	{
  		var url="<%=basePath%>bookorder/getBookorderInfo.action";
  		
  		$.ajax(
  		{
  			url:url,
  			type:"POST",
  			datatype: "json",
  			data:{currentPage:1,pageRows:pageRows},
  			success: function(data)
  					{
  					    if(data!=null){
  					    OrderInfo = data.jsonStr;
  					    initTable(data.jsonStr,data.page);	
  					       // 获取currentPage 请求页面
						var currentPage = data.page;
						// 获取totalPages 总页面
						var totalPages = data.total;
						// 获取numberofPages 显示的页面
						var numberofPages = totalPages > 10 ? 10 : totalPages;
						
						var options = {
							bootstrapMajorVersion: 3,
		                    currentPage: currentPage,       // 当前页
		                    totalPages: totalPages,      	// 总页数
		                    numberofPages: numberofPages,   // 显示的页数
		                    itemTexts: function (type, page, current) {
		                        switch (type) {
		                            case "first":
		                                return "首页";
		                                break;
		                            case "prev":
		                                return "上一页";
		                                break;
		                            case "next":
		                                return "下一页";
		                                break;
		                            case "last":
		                                return "末页";
		                                break;
		                            case "page":
		                                return page;
		                                break;
		                        }
		                    },
		                    onPageClicked: function (event, originalEvent, type, page) {
		                        $.ajax({
									url: url,
									type: "POST",
									datatype: "json",
									data:{currentPage:page,pageRows:5},
									success: function(data) {
										OrderInfo = data.jsonStr;
  					   					initTable(data.jsonStr,page);	
						            }
						        });
						     }  					
						};					
						$("#paginator").bootstrapPaginator(options);
  					    }
  					},	
  		});
  		
  	}
  	
  	function initTable(jsonStr,currentPage)
  	{
  		
  		$("#tby").html("");
  		$.each(JSON.parse(jsonStr),function(index,value)
  			{
  				var t0="<tr>";
              	var t1="<td style='text-align: center; width: 8%;'>"+value.bookOrderID+"</td>";
              	var t2="<td style='text-align: center; width: 8%;'>"+value.guideName+"</td>";
              	var t3="<td style='text-align: center; width: 8%;'>"+value.name+"</td>";
              	var t4="<td style='text-align: center; width: 8%;'>"+value.scenicName+"</td>";
              	var t5="<td style='text-align: center; width: 15%;'>"+value.time+"</td>";
              	var t6="<td style='text-align: center; width: 8%;'>"+value.orderState+"</td>";
              	var t7="<td style='text-align: center; width: 8%;'>"+value.visitNum+"</td>";
              	var t8="<td style='text-align: center; '> <div class='am-btn-toolbar'>"+
	              	"<div style='text-align: center;float: none' class='am-btn-group am-btn-group-xs'>"+
	              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='LookBookOrderInfo("+index+")'>"+"<span class='am-icon-pencil-square-o'></span> 查看</button>";		
                var t9="</div></div> </td></tr>";
               
                $("#tby").append(t0).append(t1).append(t2).append(t3).append(t4).append(t5).append(t6).append(t7).append(t8).append(t9);
  			});
  	}
 	
 	
 	function LookBookOrderInfo(index)
 	{
 		
 		var a="中文";
 		var b=JSON.parse(OrderInfo);
 		$("#look_orderID").val(b[index].bookOrderID);
 		$("#look_scenicName").val(b[index].scenicName);
 		$("#look_visitTime").val(b[index].time);
 		$("#look_visitorPhone").val(b[index].visitorPhone);
 		$("#look_visitorName").val(b[index].name);
 		$("#look_guidePhone").val(b[index].guidePhone1);
 		$("#look_orderState").val(b[index].orderState);
 		if(b[index].language==1) a="英语";
 		$("#look_language").val(a);
 		$("#look_totalMoney").val(b[index].totalMoney);
 		$("#look_visitNum").val(b[index].visitNum);
 		$("#look_guideName").val(b[index].guideName);
 		$("#lookmodal").modal('show');
 	}
 	
 	function selectchange(s)
		{
			$("#querytxt").val("");
			if(s=="*")
			{
				document.getElementById("querytxt").readOnly = true;
				loadOrderInfo();
				$("#querytxt").val();
			}else if(s=="visitTime")
			{
				selectValue=s;
				document.getElementById("querytxt").readOnly = false;
				$("#querytxt").dateSelect();
			}
			else
			{
				selectValue=s;
				document.getElementById("querytxt").readOnly = false;
			}
			
		}
		
	function search()
  	{
  			var a=selectValue;
  			var b=$("#querytxt").val();
  			var url="<%=basePath%>bookorder/getBookorderBySearch.action";
  			alert(a+" "+b);
  		$.ajax(
  		{
  			url:url,
  			type:"POST",
  			datatype: "json",
  			data:{currentPage:1,pageRows:pageRows,word:a,value:b},
  			success: function(data)
  					{
  					    if(data!=null){
  					    OrderInfo = data.jsonStr;
  					    initTable(data.jsonStr,data.page);	
  					       // 获取currentPage 请求页面
						var currentPage = data.page;
						// 获取totalPages 总页面
						var totalPages = data.total;
						// 获取numberofPages 显示的页面
						var numberofPages = totalPages > 10 ? 10 : totalPages;
						
						var options = {
							bootstrapMajorVersion: 3,
		                    currentPage: currentPage,       // 当前页
		                    totalPages: totalPages,      	// 总页数
		                    numberofPages: numberofPages,   // 显示的页数
		                    itemTexts: function (type, page, current) {
		                        switch (type) {
		                            case "first":
		                                return "首页";
		                                break;
		                            case "prev":
		                                return "上一页";
		                                break;
		                            case "next":
		                                return "下一页";
		                                break;
		                            case "last":
		                                return "末页";
		                                break;
		                            case "page":
		                                return page;
		                                break;
		                        }
		                    },
		                    onPageClicked: function (event, originalEvent, type, page) {
		                        $.ajax({
									url: url,
									type: "POST",
									datatype: "json",
									data:{currentPage:1,pageRows:pageRows,word:a,value:b},
									success: function(data) {
										OrderInfo = data.jsonStr;
  					   					initTable(data.jsonStr,page);	
						            }
						        });
						     }  					
						};					
						$("#paginator").bootstrapPaginator(options);
  					    }
  					},	
  		});
  			$("#querytxt").val();
  		}	
  		
  		
  		
</script>
	<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='<%=path%>/assets/js/jquery.mobile.custom.js'>"+"<"+"/script>");
	</script>
	<script>
$('#my-menu').fancyspinbox();
</script>
	<script src="<%=path %>/assets/js/bootstrap.js"></script>

</body>
</html>
