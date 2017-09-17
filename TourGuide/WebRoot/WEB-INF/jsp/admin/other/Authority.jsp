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
  	<title>游客信息管理</title>
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
  	<link rel="stylesheet" href="<%=path%>/assets/css/ace.onpage-help.css" />
	<link rel="stylesheet" href="<%=path%>/docs/assets/js/themes/sunburst.css" />
	<script type="text/javascript" src="<%=basePath %>/assets/js/jquery.js"></script>
	<script type="text/javascript" src="<%=basePath %>/assets/js/jquery.min.js"></script>
	<script type="text/javascript" src="<%=basePath %>/assets/js/bootstrap-paginator.min.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/echarts.js"></script>
  </head>
  
 <body>





  <!-- content start -->
  <div class="admin-content">
    <div class="admin-content-body">
      <div class="am-cf am-padding am-padding-bottom-0">
        <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">权限管理</strong> / <small>后台人员权限设置</small></div>
      </div>

      <hr>

      <div class="am-g">
        <div class="am-u-sm-12 am-u-md-6">
          
        </div> 
        
        <div class="am-u-sm-12 am-u-md-3">
          
            
            
          
            
          
      </div>

      <div class="am-g">
        <div class="am-u-sm-12">
          <form class="am-form">
            <table  class="am-table am-table-striped am-table-hover table-main" style="border-collapse:separate; border-spacing:5px; " >
              <thead>
              <tr>
                <th  style="text-align: center; width: 10%;">角色</th>
                <th  style="text-align: center; width: 10%;">微信平台管理</th>
                <th style="text-align: center; width: 10%;">运营人员管理</th>
                <th style="text-align: center; width: 10%;">讲解员管理</th>
                <th style="text-align: center; width: 10%;">游客管理</th>
                <th style="text-align: center; width: 10%;">订单管理</th>
                <th style="text-align: center; width: 10%;">景区管理</th>
                <th style="text-align: center; width: 10%;">收入管理</th>
                <th style="text-align: center; width: 10%;">操作</th>
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
<div class="modal fade" id="editmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:30%">
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
						<h4 class="modal-title" id="myModalLabel" style="text-align:center;">
							编辑人员权限
						</h4>
					</div>
 					<div class="modal-body">
						<table align="center" valign="middle" style="border-collapse:separate; border-spacing:10px;">
						<tr ><td >角色：</td>
						<td align="center">
						<input  type="text" id="edit_role" name="edit_role"  readonly="true"/>
						</td >
						</tr>
						<tr><td>微信平台：</td>
						<td align="center">
						<input type="radio" value="1" name="edit_wei">具备
						<input type="radio" value="0" name="edit_wei">不具备
						</td>
						</tr>
						<tr><td>运营管理:</td>
						<td align="center">
						<input type="radio" value="1" name="edit_ope">具备
						<input type="radio" value="0" name="edit_ope">不具备
						</td>
						</tr>	
						<tr><td>讲解员管理:</td>
						<td align="center">
						<input type="radio" value="1" name="edit_guide">具备
						<input type="radio" value="0" name="edit_guide">不具备
						</td></tr>
						<tr><td>游客管理:</td>
						<td align="center">
						<input type="radio" value="1" name="edit_visitor">具备
						<input type="radio" value="0" name="edit_visitor">不具备
						</td></tr>
						<tr><td>订单管理:</td>
						<td align="center"><input type="radio" value="1" name="edit_order">具备
						<input type="radio" value="0" name="edit_order">不具备
						</td></tr>
						<tr><td>景区管理:</td>
						<td align="center">
						<input type="radio" value="1" name="edit_scenic">具备
						<input type="radio" value="0" name="edit_scenic">不具备
						</td></tr>
						<tr><td>收入管理:</td>
						<td align="center">
						<input type="radio" value="1" name="edit_money">具备
						<input type="radio" value="0" name="edit_money">不具备
						</td></tr>
						
						<tr><td colspan="2" style="text-align:center;"><button class="btn btn-danger" onclick="EditGuideInfo()">修改</button><button class="close" data-dismiss="modal" aria-hidden="true">返回</button></td></tr>
					
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
	var currentPage=1;
	var pageRows=5;
	var AuthorInfo;
	$(document).ready(function()
  	{
  		loadAuthor();
  	});
  	function loadAuthor()
  	{
  	
  		var url="<%=basePath%>Menu/getAuthor.action";
  		$.ajax(
  		{
  			url:url,
  			type:"post",
  			datatype: "json",
  			success: function(data)
  					{
  						initTable(data);
  					    AuthorInfo=data;			
  					}
  		});
  		
  	}
  	
  	function initTable(jsonStr)
  	{
  		$("#tby").html("");
  		$.each(jsonStr,function(index,value)
  			{
  				var a=value.authvalue;
  				var b=a.split("");
  				var c;
  				var t0="<tr>";
  				var t1="<td style='text-align: center; width: 10%;'>"+value.role+"</td>";
  				if(b[0]==1){c="√";}else{c="X";}
              	var t2="<td style='text-align: center; width: 10%;'>"+c+"</td>";
              	if(b[1]==1){c="√";}else{c="X";}
              	var t3="<td style='text-align: center;width: 10%;'>"+c+"</td>";
              	if(b[2]==1){c="√";}else{c="X";}
              	var t4="<td style='text-align: center; width: 10%;'>"+c+"</td>";
              	if(b[3]==1){c="√";}else{c="X";}
              	var t5="<td style='text-align: center; width: 10%;'>"+c+"</td>";
              	if(b[4]==1){c="√";}else{c="X";}
              	var t6="<td style='text-align: center; width: 10%;'>"+c+"</td>";
              	if(b[5]==1){c="√";}else{c="X";}
              	var t7="<td style='text-align: center; width: 10%;'>"+c+"</td>";
              	if(b[6]==1){c="√";}else{c="X";}
              	var t8="<td style='text-align: center; width: 10%;'>"+c+"</td>";
              	var t9="<td align='center'> <div class='am-btn-toolbar'>"+
              	"<div  style='text-align: center;float: none' class='am-btn-group am-btn-group-xs'>"+
              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='EditAuthority("+index+")'>"+"<span class='am-icon-pencil-square-o'></span>编辑</button>"+
                "</div></div> </td>";		
                var t10="</tr>";
               $("#tby").append(t0).append(t1).append(t2).append(t3).append(t4).append(t5).append(t6).append(t7).append(t8).append(t9).append(t10);
  			});
  	}
 	
 	function EditAuthority(index)
 	{
 		var a=AuthorInfo[index].authvalue;
  		var b=a.split("");
  		$("#edit_role").val(AuthorInfo[index].role);
  		if(b[0]==1)
  		{
  			$("input[name=edit_wei]:eq(0)").attr("checked",'checked');
  		}
  		else
  		{
  			$("input[name=edit_wei]:eq(1)").attr("checked",'checked');
  		}
        if(b[1]==1){
  			$("input[name=edit_ope]:eq(0)").attr("checked",'checked');
  		}
  		else
  		{
  			$("input[name=edit_ope]:eq(1)").attr("checked",'checked');
  		}
        if(b[2]==1){
  			$("input[name=edit_guide]:eq(0)").attr("checked",'checked');
  		}
  		else
  		{
  			$("input[name=edit_guide]:eq(1)").attr("checked",'checked');
  		}
        if(b[3]==1){
  			$("input[name=edit_visitor]:eq(0)").attr("checked",'checked');
  		}
  		else
  		{
  			$("input[name=edit_visitor]:eq(1)").attr("checked",'checked');
  		}
        if(b[4]==1){
  			$("input[name=edit_order]:eq(0)").attr("checked",'checked');
  		}
  		else
  		{
  			$("input[name=edit_order]:eq(1)").attr("checked",'checked');
  		}
        if(b[5]==1){
  			$("input[name=edit_scenic]:eq(0)").attr("checked",'checked');
  		}
  		else
  		{
  			$("input[name=edit_scenic]:eq(1)").attr("checked",'checked');
  		}
        if(b[6]==1){
  			$("input[name=edit_money]:eq(0)").attr("checked",'checked');
  		}
  		else
  		{
  			$("input[name=edit_money]:eq(1)").attr("checked",'checked');
  		}
              	
              	
 		$("#editmodal").modal('show');
 	}
 	
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
	<script src="<%=path%>/assets/js/dataTables/extensions/buttons/dataTables.buttons.js"></script>
	<script src="<%=path%>/assets/js/dataTables/extensions/buttons/buttons.flash.js"></script>
	<script src="<%=path%>/assets/js/dataTables/extensions/buttons/buttons.html5.js"></script>
	<script src="<%=path%>/assets/js/dataTables/extensions/buttons/buttons.print.js"></script>
	<script src="<%=path%>/assets/js/dataTables/extensions/buttons/buttons.colVis.js"></script>
	<script src="<%=path%>/assets/js/dataTables/extensions/select/dataTables.select.js"></script>
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
