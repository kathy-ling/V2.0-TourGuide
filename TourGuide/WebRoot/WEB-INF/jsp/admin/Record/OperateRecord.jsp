<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'VisitorInfo.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="这是一个 table 页面">
<meta name="keywords" content="table">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="renderer" content="webkit">
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="stylesheet" href="<%=basePath %>/assets/css/ace.onpage-help.css" />
<link rel="stylesheet" href="<%=basePath %>/docs/assets/js/themes/sunburst.css" />
<link rel="stylesheet" href="<%=basePath %>/assets1/css/amazeui.min.css" />
<link rel="stylesheet" href="<%=basePath %>/assets1/css/admin.css">
<link rel="stylesheet" href="<%=path%>/assets/css/bootstrap.css" />
<link rel="stylesheet" href="<%=path%>/assets/css/ace.onpage-help.css" />
<link rel="stylesheet" href="<%=path%>/docs/assets/js/themes/sunburst.css" />
<link rel="stylesheet" href="<%=path%>/css/dateSelect.css" />
<script type="text/javascript" src="<%=basePath %>/assets/js/jquery.js"></script>
<script type="text/javascript"
	src="<%=basePath %>/assets/js/bootstrap-paginator.min.js"></script>
<script type="text/javascript" src="<%=basePath %>/js/dateSelect.js"></script>
</head>

<body>





	<!-- content start -->
	<div class="admin-content">
		<div class="admin-content-body">
			<div class="am-cf am-padding am-padding-bottom-0">
				<div class="am-fl am-cf">
					<strong class="am-text-primary am-text-lg">记录管理</strong> / <small>操作日志记录管理</small>
				</div>
			</div>

			<hr>

			<div class="am-g">
        <div class="am-u-sm-12 am-u-md-6">
          
        </div> 
        <div class="am-u-sm-12 am-u-md-3">
        
          <div class="am-input-group am-input-group-sm">
            <table>
            	<tr>
            	<td><input type="text" class="am-form-field" id="date" style="width:150px"></td>
            	<td>to</td>
            	<td><input type="text" class="am-form-field" id="date1" style="width:150px"></td>
            	</tr>
            </table>
            
          <span class="am-input-group-btn">
            
            <button class="am-btn am-btn-default"  id="button1" type="button" onclick="searchOfTime()">记录时间搜索</button>
          </span>
          </div>
        </div>
        
        <div class="am-u-sm-12 am-u-md-3">
          <div class="am-input-group am-input-group-sm">
            
            <input type="text" id="searchText" class="am-form-field" placeholder="景区名称">
          <span class="am-input-group-btn">
            <button class="am-btn am-btn-default"  id="searchText" type="button" onclick="search()">搜索</button>
            
            <button class="am-btn am-btn-default btn-warning"  id="searchText" type="button" onclick="loadOperateRecord()">全部记录</button>
          </span>
          </div>
        </div>
      </div>

			<div class="am-g">
				<div class="am-u-sm-12">
					<form class="am-form">
						<table  class="am-table am-table-striped am-table-hover table-main"
							style="border-collapse:separate; border-spacing:15px;  ">
							<thead>
								<tr>
									<th style="text-align: center; width: 5%;">操作人员账号</th>
									<th style="text-align: center; width: 5%;">角色</th>
									<th style="text-align: center; width: 5%;">所属景区</th>
									<th style="text-align: center; width: 10%;">详细信息</th>
									<th style="text-align: center; width: 5%;">操作日期</th>
								</tr>
							</thead>
							<tbody id="tby">

							</tbody>
						</table>
						<div style=" margin-bottom:10%; margin-left:40%;">
							<ul id="paginator"></ul>
						</div>

					</form>
				</div>

			</div>
		</div>
	</div>



	<!--[if (gte IE 9)|!(IE)]><!-->
	<!--<![endif]-->
	<script src="<%=basePath %>/assets1/js/amazeui.min.js"></script>
	<script src="<%=basePath %>/assets1/js/app.js"></script>
	<script type="text/javascript">
	var id=1;
	var currentPage=1;
	var pageRows=5;
	var OperateRecord;
	$(document).ready(function()
  	{
  		
  		loadOperateRecord();
  	});
  	function loadOperateRecord()
  	{
  	
  		var url="<%=basePath%>OperateRecord/getOperateRecord.action";
  		$.ajax(
  		{
  			url:url,
  			type:"post",
  			datatype: "json",
  			data:{currentPage:1,pageRows:pageRows},
  			success: function(data)
  					{
  					    if(data!=null){
  					    OperateRecord = data.jsonStr;
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
									type: "post",
									datatype: "json",
									data:{currentPage:page,pageRows:5},
									success: function(data) {
										OperateRecord = data.jsonStr;
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
  				var t0="<tr >";
  				var t1="<td style='text-align: center; '>"+value.operateAccount+"</td>";
              	var t2="<td style='text-align: center; '>"+value.operateRole+"</td>";
              	var t3="<td style='text-align: center;'>"+value.operateScenic+"</td>";
              	var t4="<td style='text-align: center;'>"+value.operateMessage+"</td>";
              	var t5="<td style='text-align: center;'>"+value.operateDate+"</td>";	
                var t6="</tr>";
               $("#tby").append(t0).append(t1).append(t2).append(t3).append(t4).append(t5).append(t6);
  			});
  	}
 	
 	
 	function search()
 	{
 		var url = "<%=basePath%>OperateRecord/getOperateRecordByscenic.action";
 		var a = $("#searchText").val();
 		$.ajax(
  		{
  			url:url,
  			type:"post",
  			datatype: "json",
  			data:{scenic:a,currentPage:currentPage,pageRows:pageRows},
  			success: function(data)
  					{
  					    if(data.jsonStr!="[]"){
  					    scenicFeeInfo = data.jsonStr;
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
									type: "post",
									datatype: "json",
  									data:{scenic:a,currentPage:currentPage,pageRows:pageRows},
									success: function(data) {
										scenicFeeInfo = data.jsonStr;
  					   					initTable(data.jsonStr,page);	
						            }
						        });
						     }  					
						};					
						$("#paginator").bootstrapPaginator(options);
  					    }else
  					    {
  					    	alert("没有搜索到消息");
  					    }
  					},
  				
  		});
 	
 	}
 
	function searchOfTime()
 	{
 		var a=$("#date").val();
 		var b=$("#date1").val();
 		var url = "<%=basePath%>OperateRecord/getOperateRecordBydate.action";
 		if(a==""|| b=="")
 		{
 			alert("请重新选择日期");
 			return;
 		}
 		$.ajax(
  		{
  			url:url,
  			type:"post",
  			datatype: "json",
  			data:{date1:a,date2:b,currentPage:currentPage,pageRows:pageRows},
  			success: function(data)
  					{
  					    if(data.jsonStr!="[]"){
  					    scenicFeeInfo = data.jsonStr;
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
									type: "post",
									datatype: "json",
  									data:{date1:a,date2:b,currentPage:currentPage,pageRows:pageRows},
									success: function(data) {
										scenicFeeInfo = data.jsonStr;
  					   					initTable(data.jsonStr,page);	
						            }
						        });
						     }  					
						};					
						$("#paginator").bootstrapPaginator(options);
  					    }else
  					    {
  					    	alert("没有搜索到消息");
  					    }
  					},
  				
  		});
 	}
 	
 	
</script>
	<script type="text/javascript">
		$("#date").dateSelect();
	</script>
	<script type="text/javascript">
		$("#date1").dateSelect();
	</script>
	<script src="<%=path%>/assets/js/distpicker.data.js"></script>
	<script src="<%=path%>/assets/js/distpicker.js"></script>
	<script src="<%=path%>/assets/js/main.js"></script>
	<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='<%=path%>/assets/js/jquery.mobile.custom.js'>"+"<"+"/script>");
	</script>
	<script src="<%=path%>/assets/js/bootstrap.js"></script>
	<!-- page specific plugin scripts -->
	<script src="<%=path%>/assets/js/dataTables/jquery.dataTables.js"></script>
	<script
		src="<%=path%>/assets/js/dataTables/jquery.dataTables.bootstrap.js"></script>
	<script
		src="<%=path%>/assets/js/dataTables/extensions/buttons/dataTables.buttons.js"></script>
	<script
		src="<%=path%>/assets/js/dataTables/extensions/buttons/buttons.flash.js"></script>
	<script
		src="<%=path%>/assets/js/dataTables/extensions/buttons/buttons.html5.js"></script>
	<script
		src="<%=path%>/assets/js/dataTables/extensions/buttons/buttons.print.js"></script>
	<script
		src="<%=path%>/assets/js/dataTables/extensions/buttons/buttons.colVis.js"></script>
	<script
		src="<%=path%>/assets/js/dataTables/extensions/select/dataTables.select.js"></script>
	<!-- ace scripts -->
	<script src="<%=path%>/assets/js/ace/elements.scroller.js"></script>
	<script src="<%=path%>/assets/js/ace/elements.colorpicker.js"></script>
	<script src="<%=path%>/assets/js/ace/elements.fileinput.js"></script>
	<script src="<%=path%>/assets/js/ace/elements.typeahead.js"></script>
	<script src="<%=path%>/assets/js/ace/elements.wysiwyg.js"></script>
	<script src="<%=path%>/assets/js/ace/elements.spinner.js"></script>
	<script src="<%=path%>/assets/js/ace/elements.treeview.js"></script>
	<script src="<%=path%>/assets/js/ace/elements.wizard.js"></script>
	<script src="<%=path%>/assets/js/ace/elements.aside.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.ajax-content.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.touch-drag.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.sidebar.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.sidebar-scroll-1.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.submenu-hover.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.widget-box.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.settings.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.settings-rtl.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.settings-skin.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.widget-on-reload.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.searchbox-autocomplete.js"></script>



	<!-- the following scripts are used in demo only for onpage help and you don't need them -->
	<script type="text/javascript">
		ace.vars['base'] = '..';
	</script>
	<script src="<%=path%>/assets/js/ace/elements.onpage-help.js"></script>
	<script src="<%=path%>/assets/js/ace/ace.onpage-help.js"></script>
	<script src="<%=path%>/docs/assets/js/rainbow.js"></script>
	<script src="<%=path%>/docs/assets/js/language/generic.js"></script>
	<script src="<%=path%>/docs/assets/js/language/html.js"></script>
	<script src="<%=path%>/docs/assets/js/language/css.js"></script>
	<script src="<%=path%>/docs/assets/js/language/javascript.js"></script>
</body>
</html>
