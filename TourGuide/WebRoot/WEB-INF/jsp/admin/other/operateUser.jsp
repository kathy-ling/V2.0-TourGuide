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
              <button type="button" class="am-btn am-btn-default" onclick="addOperateUser()"><span class="am-icon-plus"></span> 新增运营人员</button>
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
                <th style="text-align:center; width: 10%;">所属景区编号</th>
                <th style="text-align:center; width: 10%;">禁用状态</th>
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
<div class="modal fade" id="addmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" >
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
						<h4 class="modal-title" id="myModalLabel" style="text-align:center;">
							增加运营人员
						</h4>
					</div>
					<div class="modal-body">
					<table style="border-collapse:separate; border-spacing:10px; margin:auto;">
						<tr ><td >姓名：</td>
						<td><input  type="text" id="add_name" name="add_name" /></td>
						</tr>
						<tr><td>账号：</td>
						<td><input  type="text" id="add_account" name="add_account" /></td>
						</tr>
						<tr><td>角色:</td>
						<td><input  type="text"  id="add_role" name="add_role" /></td></tr>
						<tr><td>手机号:</td>
						<td><input  type="text"  id="add_phone" name="add_phone" /></td></tr>
						<tr><td>所属景区编号:</td>
						<td><input  type="text"  id="add_scenicID" name="add_scenicID" /></td></tr>
						<tr><td colspan="2" style="text-align:center;"><button class="close" onclick="AddOperateperInfo()" >确定增加</button></td></tr>
						
					</table>
					
									
					</div>
				</div>
			</div>
</div>
<div class="modal fade" id="editmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" >
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
						<h4 class="modal-title" id="myModalLabel" style="text-align:center;">
							编辑运营人员
						</h4>
					</div>
					<div class="modal-body">
					<table style="border-collapse:separate; border-spacing:10px; margin:auto;">
						<tr ><td >姓名：</td>
						<td><input  type="text" id="edit_name" name="edit_name" /></td>
						</tr>
						<tr><td>账号：</td>
						<td><input  type="text" id="edit_account" name="edit_account" readonly="true" /></td>
						</tr>
						<tr><td>角色:</td>
						<td><input  type="text"  id="edit_role" name="edit_role" /></td></tr>
						<tr><td>手机号:</td>
						<td><input  type="text"  id="edit_phone" name="edit_phone" /></td></tr>
						<tr><td>所属景区编号:</td>
						<td><input  type="text"  id="edit_scenicID" name="edit_scenicID" /></td></tr>
						
						<tr>
						<td  style="text-align:center;"><button class="btn btn-warning"  onclick="editOperateperInfo()" >修改</button></td>
						<td  style="text-align:center;"><button class="btn btn-warning"  onclick="resetPassword()" >重置密码</button></td>
						</tr>
						
					</table>
					
									
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
<div class="modal fade" id="deletemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" >
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
						<h4 class="modal-title" id="myModalLabel" style="text-align:center;">
							删除运营人员
						</h4>
					</div>
					<div class="modal-body">
						<table style="border-collapse:separate; border-spacing:10px; margin:auto;">
						<tr ><td >姓名：</td>
						<td><input  type="text" id="delete_name" name="delete_name"  readonly="true"/></td>
						</tr>
						<tr><td>账号：</td>
						<td><input  type="text" id="delete_account" name="delete_account" readonly="true" /></td>
						</tr>
						<tr><td>角色:</td>
						<td><input  type="text"  id="delete_role" name="delete_role"  readonly="true"/></td></tr>
						<tr><td>手机号:</td>
						<td><input  type="text"  id="delete_phone" name="delete_phone" readonly="true" /></td></tr>
						<tr><td>所属景区编号:</td>
						<td><input  type="text"  id="delete_scenicID" name="delete_scenicID" readonly="true" /></td></tr>
						<tr><td colspan="2" style="text-align:center;"><div >
							<button class="btn btn-danger" onclick="DeleteOperateInfo()">Delete</button>
											
						</div></td></tr>
						
					</table>
						
									
					</div>
				</div>
			</div>
		</div>


<div class="modal fade" id="forbidmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:25%">
				<div class="modal-content">
					<div class="model-header">
						
					</div>
					<div class="modal-body">
						<table style="border-collapse:separate; border-spacing:10px;">
						<tr><td>&nbsp;</td></tr>
						<tr><td style="text-align:center;">确定禁用该运营人员？</td></tr>
						<tr><td>&nbsp;</td></tr>
						<tr><td  style="text-align:center;"><button class="close" onclick="ForbidOperate()">确定</button></td><td><button class="close" data-dismiss="modal" aria-hidden="true">返回</button></td></tr>
						</table>
					</div>
				</div>
			</div>
</div>

<div class="modal fade" id="relievemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:25%">
				<div class="modal-content">
					<div class="modal-body">
						<table style="border-collapse:separate; border-spacing:10px;">
						<tr><td>&nbsp;</td></tr>
						<tr><td style="text-align:center;">确定解禁该运营人员？</td></tr>
						<tr><td>&nbsp;</td></tr>
						<tr><td  style="text-align:center;"><button class="close" onclick="RelieveOperate()">确定</button></td><td><button class="close" data-dismiss="modal" aria-hidden="true">返回</button></td></tr>
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
  		var url="<%=basePath%>operate/GetOperateUser.action";
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
              	var t6="<td style='width: 10%; text-align:center;'>"+value.Operateper_scenic+"</td>";
              	var c;
              	var a;
              	if(value.Operateper_bool=="0"){
              		c="未禁用";
              		a="禁用";
              	}else{
              		c="禁用";
              		a="解禁";
              	}
              	
              	
              	var	t7="<td style=' width: 8%; text-align:center;'>"+c+"</td>";
              	var t8="<td align='center' style=' width: 15%; '> <div class='am-btn-toolbar'>"+
              	"<div style='float: none' class='am-btn-group am-btn-group-xs'>"+
              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='EditOperate("+index+")'>"+"<span class='am-icon-pencil-square-o'></span>编辑</button>"+
                  "<button class='am-btn am-btn-default am-btn-xs am-text-danger ' type='button' onclick='DeleteOperate("+index+")'>"+"<span class='am-icon-trash-o'></span>删除</button>"+
                  "<button class='am-btn am-btn-default am-btn-xs am-text-danger ' type='button' onclick='forbidOperate("+index+")'>"+"<span class='am-icon-cog'></span>"+a+"</button>"+
                  "</div></div> </td>";
                 				
                var t9="</tr>";
                $("#tby").append(t0).append(t2).append(t3).append(t4).append(t5).append(t6).append(t7).append(t8).append(t9);
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
 	
 	function addOperateUser()
 	{
 		$("#add_name").val("");
 		$("#add_account").val("");
 		$("#add_role").val("");
 		$("#add_phone").val("");
 		$("#add_scenicID").val("");
 		$("#addmodal").modal('show');
 	}
 	function AddOperateperInfo() {
 		var url = "<%=basePath%>operate/AddOperateperInfo.action";
 		var name = $("#add_name").val();
 		var account = $("#add_account").val();
 		var role = $("#add_role").val();
 		var phone = $("#add_phone").val();
 		var scenicID=$("#add_scenicID").val();
 		if (name != "" && account != "" && role != "" && phone != "") {
 			$.ajax( {
 				url:url,
 				type:"POST",
 				datatype:"json",
 				data:{name:name,account:account,role:role,phone:phone,scenicID:scenicID},
 				success:function(data) {
 					if (data.confirm) {
 						$("#addmodal").modal('hide');
 						alert("添加成功！");
 						
 					}
 					else
 						{alert("帐号已存在，请重新添加！");}
 						loadGuideInfo();
 				}
 			});
 		}else{
 		alert("请重新填写运营人员信息！");
 		}
 		
 	}
 
 	function EditOperate(index)
 	{
 		$("#edit_name").val(OperateUseInfo[index].Operateper_name);
 		$("#edit_account").val(OperateUseInfo[index].Operateper_account);
 		$("#edit_role").val(OperateUseInfo[index].operateper_role);
 		
		$("#edit_phone").val(OperateUseInfo[index].Operateper_phone);
		$("#edit_scenicID").val(OperateUseInfo[index].Operateper_scenic);
 		$("#editmodal").modal('show');
 		
 	}
 	function editOperateperInfo()
 	{
 		var url = "<%=basePath%>operate/UpdateOperateperInfo.action";
 		var name = $("#edit_name").val();
 		var account = $("#edit_account").val();
 		var role = $("#edit_role").val();
 		var phone = $("#edit_phone").val();
 		var scenicID=$("#edit_scenicID").val();
 		if (name != "" && account != "" && role != "" && phone != "") {
 			$.ajax( {
 				url:url,
 				type:"POST",
 				datatype:"json",
 				data:{name:name,account:account,role:role,phone:phone,scenicID:scenicID},
 				success:function(data) {
 					if (data.confirm) {
 						$("#editmodal").modal('hide');
 						alert("修改成功！");
 						loadGuideInfo();
 					}
 					else{alert("修改失败，请重新确认修改");
 						$("#editmodal").modal('hide');
 						loadGuideInfo();
 					}
 					
 				}
 				
 			});
 		}
 		
 	}
 	function DeleteOperate(index)
 	{	
 		$("#delete_name").val(OperateUseInfo[index].Operateper_name);
 		$("#delete_account").val(OperateUseInfo[index].Operateper_account);
 		$("#delete_role").val(OperateUseInfo[index].operateper_role);
		$("#delete_phone").val(OperateUseInfo[index].Operateper_phone);
		$("#delete_scenicID").val(OperateUseInfo[index].Operateper_scenic);
		
 		$("#deletemodal").modal('show');	
 	}
 	
 	function DeleteOperateInfo()
 	{
 		var url = "<%=basePath%>operate/DeleteOperateperInfo.action";
 		var account=$("#delete_account").val();
 		$.ajax({
 				url:url,
 				type:"POST",
 				datatype:"json",
 				data:{account:account},
 				success:function(data) {
 					if (data.confirm) {
 						$("#deletemodal").modal('hide');
 					}
 					alert("删除成功");
 					loadGuideInfo();
 				}
 			});
 		
 	}
 	function forbidOperate(index) {
 		forbidIndex=index;
 		if(OperateUseInfo[forbidIndex].Operateper_bool=="0")
 		{
 			$("#forbidmodal").modal('show');
 		}else
 		{
 			$("#relievemodal").modal('show');
 		}
 		
 	}
 	
 	function ForbidOperate() {
 		var url = "<%=basePath%>operate/ForbidOperate.action";
 		var account=OperateUseInfo[forbidIndex].Operateper_account;
 		$.ajax ({
 			url:url,
 			type:"get",
 			datatype:"json",
 			data:{account:account},
 			success:function(data) {
 				if (data.confirm) alert("成功禁用该运营人员！");
 				else alert("无法禁用该运营人员！");
 				$("#forbidmodal").modal('hide');
 				loadGuideInfo();
 			}
 		});
 	}
 	
 	
 	
 	function RelieveOperate() {
 		var url = "<%=basePath%>operate/RelieveOperate.action";
 		var account=OperateUseInfo[forbidIndex].Operateper_account;
 		$.ajax ({
 			url:url,
 			type:"get",
 			datatype:"json",
 			data:{account:account},
 			success:function(data) {
 				if (data.confirm) alert("解禁成功！");
 				else alert("解禁失败！");
 			 	$("#relievemodal").modal('hide');
 				loadGuideInfo();
 			}
 		});

 	}
 	
 	function resetPassword()
 	{
 		var account=$("#edit_account").val();
 		var phone=$("#edit_phone").val();
 		alert(account+" "+phone);
 		$.ajax(
 		{
 			url:"<%=basePath%>operate/resetPassword.action",
 			type:"POST",
 			datatype:"json",
 			data:{account:account,phone:phone},
 			success:function(data) {
 					if (data==1) {
 						alert("重置成功");
 					}else alert("重置失败");
 					loadGuideInfo();
 				}
 			});
 	}
</script>

	<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='<%=path%>/assets/js/jquery.mobile.custom.js'>"+"<"+"/script>");
	</script>
	<script src="<%=path%>/assets/js/bootstrap.js"></script>
	<!-- page specific plugin scripts -->
	
</body>
</html>
