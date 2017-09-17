<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

<title>My JSP 'VisitorInfo.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>游客信息管理</title>
<meta name="description" content="这是一个 table 页面">
<meta name="keywords" content="table">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="renderer" content="webkit">
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="stylesheet"
	href="<%=basePath %>/assets/css/ace.onpage-help.css" />
<link rel="stylesheet"
	href="<%=basePath %>/docs/assets/js/themes/sunburst.css" />
<link rel="icon" type="image/png"
	href="<%=basePath %>/assets1/i/favicon.png">
<link rel="apple-touch-icon-precomposed"
	href="<%=basePath %>/assets1/i/app-icon72x72@2x.png">
<link rel="stylesheet" href="<%=basePath %>/assets1/css/amazeui.min.css" />
<link rel="stylesheet" href="<%=basePath %>/assets1/css/admin.css">
<link rel="stylesheet" href="<%=path%>/assets/css/bootstrap.css" />
<link rel="stylesheet" href="<%=path%>/assets/css/ace.onpage-help.css" />
<link rel="stylesheet"
	href="<%=path%>/docs/assets/js/themes/sunburst.css" />
<script type="text/javascript" src="<%=basePath %>/assets/js/jquery.js"></script>
<script type="text/javascript"
	src="<%=basePath %>/assets/js/jquery.min.js"></script>
<script type="text/javascript"
	src="<%=basePath %>/assets/js/bootstrap-paginator.min.js"></script>

</head>

<body>
	<!-- content start -->
	<div class="admin-content">
		<div class="admin-content-body">
			<div class="am-cf am-padding am-padding-bottom-0">
				<div class="am-fl am-cf">
					<strong class="am-text-primary am-text-lg">景区活动管理</strong> / <small>景区活动管理</small>
				</div>
			</div>

			<hr>

			<div class="am-g">
				<div class="am-u-sm-12 am-u-md-6"></div>

				<div class="am-u-sm-12 am-u-md-3">
					<div class="am-input-group am-input-group-sm">

						<input type="text" id="searchText" class="am-form-field"
							placeholder="景区编号"> <span class="am-input-group-btn">
							<button class="am-btn am-btn-default" id="searchText"
								type="button" onclick="loadscenicProByscenicNo()">搜索</button>
							<button class="am-btn am-btn-default btn-warning" id="searchText"
								type="button" onclick="loadscenicPro()">全部记录</button>
						</span>
					</div>
				</div>
			</div>

			<div class="am-g">
				<div class="am-u-sm-12">
					<form class="am-form">
						<table class="am-table am-table-striped am-table-hover table-main"
							style="border-collapse:separate; border-spacing:5px; ">
							<thead>
								<tr>
									<th style="text-align: center; width: 5%;">景区编号</th>
									<th style="text-align: center; width: 10%;">景区名称</th>
									<th style="text-align: center; width: 10%;">活动标题</th>
									<th style="text-align: center; width: 10%;">活动链接</th>
									<th style="text-align: center; width: 10%;">发布时间</th>
									<th style="text-align: center; width: 10%;">首页展示</th>
									<th style="text-align: center; width: 10%;">通过美工</th>
									<th style="text-align: center; width: 20%;">操作</th>
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

			<div class="modal fade" id="querymodal" tabindex="-1" role="dialog"
				aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="model-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">
								<span class="blue">X</span>
							</button>
							<h4 class="modal-title" id="myModalLabel"
								style="text-align:center;">景区活动信息详情</h4>
						</div>
						<div class="modal-body">
							<table
								style="border-collapse:separate; border-spacing:10px; margin:auto;">
								<tr>
									<td>活动图片：</td>
									<td><img style="width: 100px;height: 100px"
										id="query_headimg" name="edit_headimg" src="" /></td>
								</tr>
								<tr>
									<td>景区编号：</td>
									<td><input type="text" id="query_scenicNo"
										name="query_scenicNo" readonly="true" /></td>
								</tr>
								<tr>
									<td>景区名称：</td>
									<td><input type="text" id="query_scenicName"
										name="query_scenicName" readonly="true" /></td>
								</tr>
								<tr>
									<td>景区标题：</td>
									<td><input type="text" id="query_proTitle"
										name="query_proTitle" readonly="true" /></td>
								</tr>
								<tr>
									<td>活动链接:</td>
									<td><input type="text" id="query_proLink"
										name="query_proLink" readonly="true" /></td>
								</tr>
								<tr>
									<td>活动发布时间:</td>
									<td><input type="text" id="query_proRealse"
										name="query_proRealse" readonly="true" /></td>
								</tr>
								<tr>
									<td>活动开始时间：</td>
									<td><input type="text" id="query_proStart"
										name="query_proStart" readonly="true" /></td>
								</tr>
								<tr>
									<td>活动结束时间：</td>
									<td><input type="text" id="query_proEnd"
										name="query_proEnd" readonly="true" /></td>
								</tr>
								<tr>
									<td>活动内容：</td>
									<td><textarea rows="3" cols="22" id="query_proText"
											name="query_proText" readonly="true"></textarea></td>
								</tr>
								<tr>
									<td>首页是否展示:</td>
									<td><input type="text" id="query_proMain"
										name="query_proMain" readonly="true" /></td>
								</tr>
								<tr>
									<td>是否经过美工:</td>
									<td><input type="text" id="query_proAdmin"
										name="query_proAdmin" readonly="true" /></td>
								</tr>
								<tr>
									<td colspan="2" style="text-align:center;"><button
											class="close" data-dismiss="modal" aria-hidden="true">确定</button></td>
								</tr>

							</table>
						</div>
					</div>
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
	var scenicPro;
	var pageRows=5;
	var queryindex;
	$(document).ready(function()
  	{
  		
  		loadscenicPro();
  	});
  	function loadscenicPro()
  	{
  	
  		var url="<%=basePath%>PromotionInfo/getPromotionInfo.action";
  		$.ajax(
  		{
  			url:url,
  			type:"post",
  			datatype: "json",
  			data:{currentPage:1,pageRows:pageRows},
  			success: function(data)
  					{
  						
  					    if(data!=null){
  					    scenicPro = data.jsonStr;
  					    scenicPro = JSON.parse(scenicPro);
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
										scenicPro = data.jsonStr;
  					    				scenicPro = JSON.parse(scenicPro);
  					    				initTable(data.jsonStr,data.page);	
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
  				var a; 
  				var t0="<tr>";
  				var t1="<td style='text-align: center; width: 10%;'>"+value.scenicNo+"</td>";
              	var t2="<td style='text-align: center; width: 10%;'>"+value.scenicName+"</td>";
              	var t3="<td style='text-align: center;width: 10%;'>"+value.proTitle+"</td>";
              	var t4="<td style='text-align: center; width: 10%;'>"+value.proLink+"</td>";
              	var t5="<td style='text-align: center; width: 10%;'>"+value.ProProduceTime+"</td>";
              	if(value.isMainShow=='是')
              	{
              		a='取消首页展示';
              		
              	}else
              	{
              		a='首页展示';
              	}
              	
              	var t6="<td style='text-align: center; width: 10%;'>"+value.isMainShow+"</td>";
              	
              	var t7="<td style='text-align: center; width: 10%;'>"+value.isAdmin+"</td>";
              	var t8;
              	if(value.isAdmin=='是')
              	{
              		t8="<td align='center'> <div class='am-btn-toolbar'>"+
              	"<div  style='text-align: center;float: none' class='am-btn-group am-btn-group-xs'>"+
              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='queryPro("+index+")'>查看</button>"+
              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='PromainShow("+index+")'>"+a+"</button>"
                  +"</div></div> </td>";
              	}else
              	{
              		t8="<td align='center'> <div class='am-btn-toolbar'>"+
              	"<div  style='text-align: center;float: none' class='am-btn-group am-btn-group-xs'>"+
              	"<button  class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='queryPro("+index+")'>查看</button>"+
              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='PromainShow("+index+")'>"+a+"</button>"+
                  "<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='editTicket("+index+")'>"+'美工'+"</button>"
                  +"</div></div> </td>";
              	}
              			
                var t9="</tr>";
               $("#tby").append(t0).append(t1).append(t2).append(t3).append(t4).append(t5).append(t6).append(t7).append(t8).append(t9);
  			});
  	}
  	
  	
  	function loadscenicProByscenicNo()
  	{
  		var scenicNo=$("#searchText").val();
  		var url="<%=basePath%>PromotionInfo/getPromotionInfoByscenicNo.action";
  		$.ajax(
  		{
  			url:url,
  			type:"post",
  			datatype: "json",
  			data:{currentPage:1,pageRows:pageRows,scenicNo:scenicNo},
  			success: function(data)
  					{
  					    if(data!=null){
  					    scenicPro = data.jsonStr;
  					    scenicPro = JSON.parse(scenicPro);
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
									data:{currentPage:page,pageRows:pageRows,scenicNo:scenicNo},
									success: function(data) {
										scenicPro = data.jsonStr;
  					    				scenicPro = JSON.parse(scenicPro);
  					    				initTable(data.jsonStr,data.page);	
						            }
						        });
						     }  					
						};					
						$("#paginator").bootstrapPaginator(options);
  					    }
  					},
  				
  		});
  		
  	}
  	
  	
  	function queryPro(index)
  	{
  		var a=scenicPro[index];
  		var f="<%=basePath%>"+a.proImage;
  		alert(f);
  		document.getElementById("query_headimg").src=f;
  		$("#query_headimg").src=f;
  		$("#query_scenicNo").val(a.scenicNo);
  		$("#query_scenicName").val(a.scenicName);
  		$("#query_proTitle").val(a.proTitle);
  		$("#query_proLink").val(a.proLink);
  		$("#query_proRealse").val(a.ProProduceTime);
  		$("#query_proStart").val(a.proStartTime);
  		$("#query_proEnd").val(a.ProEndTime);
  		$("#query_proText").val(a.ProContext);
  		$("#query_proMain").val(a.isMainShow);
  		$("#query_proAdmin").val(a.isAdmin);
  		$("#querymodal").modal('show');
  	}
 	
 	
 	function PromainShow(index)
 	{
 		var url="<%=basePath%>PromotionInfo/UpdateMainShow.action";
 		var a=scenicPro[index];
 		$.ajax({
		type: "post",
		url: url,
		data: {
			mainShow:a.isMainShow,proID:a.proID
		},
		error: function() {
			alert('操作失败');
		},
		success: function(data) {
			if(data==1){alert('操作成功');loadscenicPro();}
			else{alert('操作失败');loadscenicPro();}
		}
	});
 	}
 	
</script>
	<script src="<%=basePath%>assets/js/amazeui.min.js"></script>
	<script src="<%=path%>/assets/js/distpicker.data.js"></script>
	<script src="<%=path%>/assets/js/distpicker.js"></script>
	<script src="<%=path%>/assets/js/main.js"></script>
	<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='<%=path%>/assets/js/jquery.mobile.custom.js'>"
							+ "<"+"/script>");
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
