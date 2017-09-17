<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'operateUser.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
 	 <meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<title>运营人员信息管理</title>
 	 <meta name="description" content="这是一个 table 页面">
  	<meta name="keywords" content="table">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<meta name="renderer" content="webkit">
 	 <meta http-equiv="Cache-Control" content="no-siteapp" />
 	 <link rel="stylesheet" href="<%=basePath %>/assets/css/ace.onpage-help.css" />
	<link rel="stylesheet" href="<%=basePath %>/docs/assets/js/themes/sunburst.css" />
  	<link rel="icon" type="image/png" href="<%=basePath %>/assets1/i/favicon.png">
  	<link rel="apple-touch-icon-precomposed" href="<%=basePath %>/assets1/i/app-icon72x72@2x.png">
  	<link rel="stylesheet" href="<%=basePath %>/assets1/css/amazeui.min.css"/>
  	<link rel="stylesheet" href="<%=basePath %>/assets1/css/admin.css">
  	<link rel="stylesheet" href="<%=path%>/assets/css/bootstrap.css" />
	<script type="text/javascript" src="<%=basePath %>/assets/js/jquery.js"></script>
	<script type="text/javascript" src="<%=basePath %>/assets/js/bootstrap-paginator.min.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/bootstrap.min.js"></script>
  </head>
  
 <body>


<!-- <header class="am-topbar am-topbar-inverse admin-header">
  <div class="am-topbar-brand">
    <strong>运营人员信息管理</strong> 
  </div>
</header> -->


  <!-- content start -->
  <div class="admin-content">
    <div class="admin-content-body">
      <div class="am-cf am-padding am-padding-bottom-0">
        <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">运营人员管理</strong> / <small>运营人员信息管理</small></div>
      </div>

      <hr>

      <div class="am-g">
        <div class="am-u-sm-12 am-u-md-6">
          <div class="am-btn-toolbar">
            <div class="am-btn-group am-btn-group-xs">
              
            </div>
          </div>
        </div>
        
        <div class="am-u-sm-12 am-u-md-3">
          <div class="am-input-group am-input-group-sm">
            
           <input type="text" id="searchText" class="am-form-field" placeholder="账号">
          <span class="am-input-group-btn">
            <button class="am-btn am-btn-default"  id="searchText" type="button" onclick="serach()">搜索</button>
          </span>
          
          </div>
        </div>
      </div>

      <div class="am-g">
        <div class="am-u-sm-12">
          <form class="am-form">
            <table  class="am-table am-table-striped am-table-hover table-main" style="border-collapse:separate; border-spacing:5px; " >
              <thead>
              <tr>
                <th  style="text-align:center; width: 10%;">姓名</th>
                <th  style="text-align:center; width: 10%;">账号</th>
                <th style="text-align:center; width: 10%;">角色</th>
                <th style="text-align:center; width: 10%;">手机号</th>
                <th style="text-align:center; width: 10%;">操作</th>
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


  
<div class="modal fade" id="SearchModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
			<div class="modal-dialog" >
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
	                    <h4 class="modal-title" id="myModalLabel" style="text-align:center;">
							搜索结果
						</h4>
					</div>
					<div class="modal-body">
					<table style="border-collapse:separate; border-spacing:10px; margin:auto;">
						<tr ><td >姓名：</td>
						<td><input id="SearchName" style="text-align:center; " readonly= "true " /></td>
						</tr>
						<tr><td>账号：</td>
						<td><input id="SearchAccount" style="text-align:center;" readonly= "true "/></td>
						</tr>
						<tr><td>角色：</td>
						<td><input id="SearchRole" style="text-align:center;" readonly="true" /></td></tr>
						<tr><td>手机号：</td>
						<td><input id="SearchPhone" style="text-align:center;" readonly="true" /></td></tr>						
						<tr><td>所属景区编号：</td>
						<td><input id="SearchscenicID" style="text-align:center;" readonly="true" /></td></tr>
						<tr><td colspan="2" style="text-align:center;"><button class="close" data-dismiss="modal" aria-hidden="true" >确定</button></td></tr>
					</table>
					
									
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
	var OperateUseInfo="";
	var currentPage=1;
	var pageRows=5;
	var forbidIndex;
	$(document).ready(function()
  	{
  		loadGuideInfo();
  	});
  	function loadGuideInfo()
  	{
  		var url="<%=basePath%>operate/GetOperateUserByRole.action";
  		$.ajax(
  		{
  			url:url,
  			type:"POST",
  			datatype: "json",
  			data:{currentPage:1,pageRows:pageRows},
  			success: function(data)
  					{
  					    if(data!=null){
  					    OperateUseInfo = data.jsonStr;
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
  		OperateUseInfo=JSON.parse(jsonStr);
  		$.each(OperateUseInfo,function(index,value)
  			{
  				var t0="<tr>";
  				var t2="<td style='width: 10%; text-align:center;'>"+value.Operateper_name+"</td>";
              	var t3="<td style='width: 10%; text-align:center;'>"+value.Operateper_account+"</td>";
              	var t4="<td style='width: 10%; text-align:center;'>"+value.operateper_role+"</td>";
              	var t5="<td style='width: 10%; text-align:center;'>"+value.Operateper_phone+"</td>";
              	
              	
              	
              
              	var t6="<td align='center' style=' width: 15%; '> <div class='am-btn-toolbar'>"+
              	"<div style='float: none' class='am-btn-group am-btn-group-xs'>"+
              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='EditOperate("+index+")'>"+"<span class='am-icon-pencil-square-o'></span>查看</button>";
                  "</div></div> </td>";
                 				
                var t7="</tr>";
                $("#tby").append(t0).append(t2).append(t3).append(t4).append(t5).append(t6).append(t7);
  			});
  	}
 	function serach()
 	{
 		var url = "<%=basePath%>operate/SearchOperateUser.action";
 		var a = $("#searchText").val();
 		$.ajax( {
 			url:url,
 			type:"POST",
 			datatype:"json",
 			data:{sql:a},
 			success:function(data) {
 				if (data.jsonStr == "[]") {
 					alert("没有搜索到任何信息，请重新搜索!");
	 			}
		 		else {
					SearchSuccess(data.jsonStr);
		 		};
 			}
 		});
 	}
 	
 	function SearchSuccess(jsonStr) {
 			$.each(JSON.parse(jsonStr),function(index,value){
 			$("#SearchName").val(value.Operateper_name);
 			$("#SearchAccount").val(value.Operateper_account);
 			$("#SearchRole").val(value.operateper_role);
 			$("#SearchPhone").val(value.Operateper_phone);
 			$("#SearchscenicID").val(value.Operateper_scenic);
 		});
 		$("#SearchModal").modal('show');
 	}
</script>

	<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='<%=path%>/assets/js/jquery.mobile.custom.js'>"+"<"+"/script>");
	</script>
	<script src="<%=path%>/assets/js/bootstrap.js"></script>
	<!-- page specific plugin scripts -->
	
</body>
</html>
