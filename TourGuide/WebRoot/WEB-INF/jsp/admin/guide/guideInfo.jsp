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
	<script type="text/javascript" src="<%=path %>/assets/js/jquery.js"></script>
	<script type="text/javascript" src="<%=path %>/assets/js/bootstrap-paginator.min.js"></script>

  </head>
  
 <body>




  <!-- content start -->
  <div class="admin-content">
    <div class="admin-content-body">
      <div class="am-cf am-padding am-padding-bottom-0">
        <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">讲解员管理</strong> / <small>讲解员信息管理</small></div>
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
            
            <input type="text"  id="querytxt" class="am-form-field" placeholder="证号">
          <span class="am-input-group-btn">
            <button class="am-btn am-btn-default" type="button" onclick="search()">搜索</button>
          </span>
          </div>
        </div>
      </div>

      <div class="am-g">
        <div class="am-u-sm-12">
          <form class="am-form">
            <table class="am-table am-table-striped am-table-hover table-main" style="border-collapse:separate; border-spacing:5px;">
              <thead>
              <tr>
               <th style="text-align: center; width: 5%;">姓名</th><th style="text-align: center; width: 10%;">性别</th><th style="text-align: center; width: 10%;">证号</th><th style="text-align: center; width: 10%;">讲解语言</th>
                <th style="text-align: center; width: 5%;">年龄</th><th style="text-align: center; width: 5%;">工作年限</th><th  style="text-align: center; width: 5%;">审核状态</th><th style="text-align: center; width: 5%;">禁用状态</th>
              	<th style="text-align: center; width: 25%;">操作</th>
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

<div class="modal fade" id="deletemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:25%">
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
						<h4 class="modal-title" id="myModalLabel" style="text-align:center;">
							删除讲解员
						</h4>
					</div>
 					<div class="modal-body">
						<table style="border-collapse:separate; border-spacing:10px;">
						<tr ><td >手机号：</td>
						<td><input  type="text" id="delete_phone" name="delete_phone"  readonly="readonly"/></td>
						</tr>
						<tr><td>姓名：</td>
						<td><input  type="text" id="delete_name" name="delete_name" readonly="readonly" /></td>
						</tr>
						<tr><td>性别:</td>
						<td><input  type="text"  id="delete_sex" name="delete_sex"  readonly="readonly"/></td></tr>
						<tr><td>导游证号:</td>
						<td><input  type="text"  id="delete_certificateID" name="delete_certificateID"  readonly="readonly"/></td></tr>
						<tr><td>讲解语言:</td>
						<td><input  type="text"  id="delete_language" name="delete_language"  readonly="readonly"/></td></tr>
						<tr><td>自我介绍:</td>
						<td><input  type="text"  id="delete_selfIntro" name="delete_selfIntro"  readonly="readonly"/></td></tr>
						<tr><td>年龄:</td>
						<td><input  type="text"  id="delete_age" name="delete_age"  readonly="readonly"/></td></tr>
						<tr><td>工作年限:</td>
						<td><input  type="text"  id="delete_workAge" name="delete_workAge"  readonly="readonly"/></td></tr>
						<tr><td colspan="2" style="text-align:center;"><button class="btn btn-danger" onclick="DeleteGuideInfo()">Delete</button><button class="close" data-dismiss="modal" aria-hidden="true">Return</button></td></tr>
					
						</table>			
					</div>
				</div>
			</div>
		</div>
<!-- 显示搜索到的讲解人员 -->
<div class="modal fade" id="searchmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:25%">
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
						<h4 class="modal-title" id="myModalLabel" style="text-align:center;">
							搜索到讲解员
						</h4>
					</div>
					<div class="modal-body">
					<table style="border-collapse:separate; border-spacing:10px;">
						<tr ><td >手机号：</td>
						<td><input  type="text" id="search_phone" name="search_phone"  readonly="readonly"/></td>
						</tr>
						<tr><td>姓名：</td>
						<td><input  type="text" id="search_name" name="search_name" readonly="readonly" /></td>
						</tr>
						<tr><td>性别:</td>
						<td><input  type="text"  id="search_sex" name="search_sex"  readonly="readonly"/></td></tr>
						<tr><td>导游证号:</td>
						<td><input  type="text"  id="search_certificateID" name="search_certificateID"  readonly="readonly"/></td></tr>
						<tr><td>讲解语言:</td>
						<td><input  type="text"  id="search_language" name="search_language"  readonly="readonly"/></td></tr>
						<tr><td>自我介绍:</td>
						<td><input  type="text"  id="search_selfIntro" name="search_selfIntro"  readonly="readonly"/></td></tr>
						<tr><td>年龄:</td>
						<td><input  type="text"  id="search_age" name="search_age"  readonly="readonly"/></td></tr>
						<tr><td>工作年限:</td>
						<td><input  type="text"  id="search_workAge" name="search_workAge"  readonly="readonly"/></td></tr>
						<tr><td colspan="2" style="text-align:center;"><button class="close" data-dismiss="modal" aria-hidden="true">返回</button></td></tr>
					
						</table>
					</div>
				</div>
			</div>
</div>

<div class="modal fade" id="editmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:25%">
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
						<h4 class="modal-title" id="myModalLabel" style="text-align:center;">
							编辑讲解员
						</h4>
					</div>
 					<div class="modal-body">
						<table style="border-collapse:separate; border-spacing:10px;">
						<tr ><td >手机号：</td>
						<td><input  type="text" id="edit_phone" name="edit_phone" /></td>
						</tr>
						<tr><td>姓名：</td>
						<td><input  type="text" id="edit_name" name="edit_name" /></td>
						</tr>
						<tr><td>性别:</td>
						<td>
						<input type="radio" value="男" name="edit_sex" checked="checked"><label for="男">男</label>
						<input type="radio" value="女" name="edit_sex"><label for="女">女</label>
						</td></tr>	
						<tr><td>导游证号:</td>
						<td><input  type="text"  id="edit_certificateID" name="edit_certificateID" readonly="readonly"/></td></tr>
						<tr><td>讲解语言:</td>
						<td>
						<select id="edit_language" name="edit_language">
							<option value="1" checked="checked">英语</option>
							<option value="0">汉语</option>
							<option value="2">全部</option>
						</select></td></tr>
						<tr><td>自我介绍:</td>
						<td><input  type="text"  id="edit_selfIntro" name="edit_selfIntro" /></td></tr>
						<tr><td>年龄:</td>
						<td><input  type="text"  id="edit_age" name="edit_age" /></td></tr>
						<tr><td>工作年限:</td>
						<td><input  type="text"  id="edit_workAge" name="edit_workAge" /></td></tr>
						<tr><td colspan="2" style="text-align:center;"><button class="btn btn-danger" onclick="EditGuideInfo()">修改</button><button class="close" data-dismiss="modal" aria-hidden="true">返回</button></td></tr>
					
						</table>			
					</div>
				</div>
			</div>
		</div>

<div class="modal fade" id="lookmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:25%">
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
						<h4 class="modal-title" id="myModalLabel" style="text-align:center;">
							讲解员详情
						</h4>
					</div>
					<div class="modal-body">
					<table style="border-collapse:separate; border-spacing:10px;">
						<tr ><td>导游的级别：</td>
						<td><input type="text" id="look_guideLevel" name="look_guideLevel"  readonly="readonly"/></td>
						</tr>
						<tr><td >导游所属的景区：</td>
						<td><input  type="text" id="look_scenicBelong" name="look_scenicBelong" readonly="readonly" /></td>
						</tr>
						<tr><td>历史接待人数:</td>
						<td><input  type="text"  id="look_historyNum" name="look_historyNum"  readonly="readonly"/></td></tr>
						<tr><td>单次最大讲解人数:</td>
						<td><input  type="text"  id="look_singleMax" name="look_singleMax"  readonly="readonly"/></td></tr>
						<tr><td>讲解费:</td>
						<td><input  type="text"  id="look_guideFee" name="look_guideFee"  readonly="readonly"/></td></tr>
						<tr><td>审核情况:</td>
						<td><input  type="text"  id="look_authorized" name="look_authorized"  readonly="readonly"/></td></tr>
						<tr><td>禁用状态:</td>
						<td><input  type="text"  id="look_disabled" name="look_disabled"  readonly="readonly"/></td></tr>
						<tr><td colspan="2" style="text-align:center;"><button class="close" data-dismiss="modal" aria-hidden="true">返回</button></td></tr>
					
						</table>
					</div>
				</div>
			</div>
</div>

<div class="modal fade" id="checkmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:25%">
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
					</div>
					<div class="modal-body">
						<table style="border-collapse:separate; border-spacing:10px;">
						<tr><td>&nbsp;</td></tr>
						<tr><td style="text-align:center;">确定审核通过该讲解员？</td></tr>
						<tr><td>&nbsp;</td></tr>
						<tr><td  style="text-align:center;"><button class="close" onclick="CheckGuideInfo()">确定</button></td><td><button class="close" data-dismiss="modal" aria-hidden="true">返回</button></td></tr>
						</table>
					</div>
				</div>
			</div>
</div>

<div class="modal fade" id="forbidmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:25%">
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
					</div>
					<div class="modal-body">
						<table style="border-collapse:separate; border-spacing:10px;">
						<tr><td>&nbsp;</td></tr>
						<tr><td style="text-align:center;">确定禁用该讲解员？</td></tr>
						<tr><td>&nbsp;</td></tr>
						<tr><td  style="text-align:center;"><button class="close" onclick="ForbidGuideInfo()">确定</button></td><td><button class="close" data-dismiss="modal" aria-hidden="true">返回</button></td></tr>
						</table>
					</div>
				</div>
			</div>
</div>

<div class="modal fade" id="relievemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:25%">
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
					</div>
					<div class="modal-body">
						<table style="border-collapse:separate; border-spacing:10px;">
						<tr><td>&nbsp;</td></tr>
						<tr><td style="text-align:center;">确定解禁该讲解员？</td></tr>
						<tr><td>&nbsp;</td></tr>
						<tr><td  style="text-align:center;"><button class="close" onclick="RelieveGuideInfo()">确定</button></td><td><button class="close" data-dismiss="modal" aria-hidden="true">返回</button></td></tr>
						</table>
					</div>
				</div>
			</div>
</div>

<footer>
  <hr>
  <p class="am-padding-left">© 2014 AllMobilize, Inc. Licensed under MIT license.</p>
</footer>


<!--[if (gte IE 9)|!(IE)]><!-->
<!--<![endif]-->
<script src="<%=path %>/assets1/js/amazeui.min.js"></script>
<script src="<%=path %>/assets1/js/app.js"></script>
<script type="text/javascript">
	var id=1;
	var GuiderInfo="";
	var GuideOtherInfo="";
	var currentPage=1;
	var pageRows=5;
	var GlobalIndex;
	$(document).ready(function()
  	{
  			loadGuideInfo();
  	});
  	
  	function loadGuideInfo()
  	{
  		var url="<%=basePath%>Guide/GetGuider.action";
  		
  		$.ajax(
  		{
  			url:url,
  			type:"POST",
  			datatype: "json",
  			data:{currentPage:1,pageRows:pageRows},
  			success: function(data)
  					{
  					    if(data!=null){
  					    GuiderInfo = data.jsonStr;
  					    GuiderInfo = JSON.parse(GuiderInfo);
  					    GuideOtherInfo = data.otherInfo;
  					    GuideOtherInfo = JSON.parse(GuideOtherInfo);
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
										GuiderInfo = data.jsonStr;
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
              	var t1="<td style='text-align: center; width: 8%;'>"+value.name+"</td>";
              	var t2="<td style='text-align: center; width: 8%;'>"+value.sex+"</td>";
              	var t3="<td style='text-align: center; width: 8%;'>"+value.certificateID+"</td>";
            	var language = "无";
				if (value.language == 1) language = "英语";else
				if (value.language == 0) language = "汉语";else
				if (value.language == 2) language = "英语  汉语";
              	var t4="<td style='text-align: center; width: 8%;'>"+language+"</td>";
              	var t5="<td style='text-align: center; width: 8%;'>"+value.age+"</td>";
              	var t6="<td style='text-align: center; width: 8%;'>"+value.workAge+"</td>";
              	var authorized = GuideOtherInfo[index].authorized;
              	var disabled = GuideOtherInfo[index].disabled;
              	var a;
		 		var b;
              	if (authorized == 1) {authorized = "通过";a="disabled='disabled'"}
		 		else {authorized = "未通过";a='';}
		 		if (disabled == 1) {disabled = "禁用";b="解禁";}
		 		else {disabled = "未禁用";b="禁用";}
		 		
		 		
              	var t7="<td style='text-align: center; width: 8%;'>"+authorized+"</td>";
              	var t8="<td style='text-align: center; width: 8%;'>"+disabled+"</td>";
              	var t9="<td style='text-align: center; '> <div class='am-btn-toolbar'>"+
	              	"<div class='am-btn-group am-btn-group-xs'>"+
	              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='LookGuideInfo("+index+")'>"+"<span class='am-icon-pencil-square-o'></span> 查看</button>"+
	              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='editGuideInfo("+index+")'>"+"<span class='am-icon-pencil-square-o'></span> 编辑</button>"+
	                "<button class='am-btn am-btn-default am-btn-xs am-text-danger ' type='button' onclick='deleteGuideInfo("+index+")'>"+"<span class='am-icon-trash-o'></span>删除</button>"+   
                	"<button "+a+" class='am-btn am-btn-default am-btn-xs am-text-danger ' type='button' onclick='checkGuideInfo("+index+")'>"+"<span class='am-icon-trash-o'></span>审核</button>"+
                	"<button  class='am-btn am-btn-default am-btn-xs am-text-danger ' type='button' onclick='forbidGuideInfo("+index+")'>"+"<span class='am-icon-trash-o'></span>"+b+"</button>";		
                var t10="</div></div> </td></tr>";
                $("#tby").append(t0).append(t1).append(t2).append(t3).append(t4).append(t5).append(t6).append(t7).append(t8).append(t9).append(t10);
  			});
  	}
 	
 	function search()
 	{
 		var url = "<%=basePath%>Guide/GetGuiderinfoBystring.action";
 		var cID = $("#querytxt").val();
 		
 		query(url, cID);
 	}
 	
 	function query(url, cID)
 	{ 		
 		$.ajax(
 		{
 			url:url,
 			datatype:"json",
 			type:"POST",
 			data:{cID:cID},
 			success: function(data)
 			{
 				if (data.jsonStr=="[]") {
					alert("没有搜索到任何讲解员信息，请重新搜索");
				} else {
					$.each(JSON.parse(data.jsonStr),function(index,value)
					{
						$("#search_phone").val(value.phone);
						$("#search_name").val(value.name);
						$("#search_sex").val(value.sex);
						$("#search_certificateID").val(value.certificateID);
						var language = "无";
						if (value.language == 1) language = "英语";else
						if (value.language == 0) language = "汉语";else
						if (value.language == 2) language = "英语  汉语";
						$("#search_language").val(language);
						$("#search_selfIntro").val(value.selfIntro);
						$("#search_age").val(value.age);
						$("#search_workAge").val(value.workAge);
					});
					//显示前先对对应字段完成赋值
					$("#searchmodal").modal('show');
				};
 			}
 		}
 		);
 	}
 	
 	
 	function deleteGuideInfo(index)
 	{	
		$("#delete_phone").val(GuiderInfo[index].phone);
		$("#delete_name").val(GuiderInfo[index].name);
		$("#delete_sex").val(GuiderInfo[index].sex);
		$("#delete_certificateID").val(GuiderInfo[index].certificateID);
		var language = "无";
		if (GuiderInfo[index].language == 1) language = "英语";else
		if (GuiderInfo[index].language == 0) language = "汉语";else
		if (GuiderInfo[index].language == 2) language = "英语  汉语";
		$("#delete_language").val(language);
		$("#delete_selfIntro").val(GuiderInfo[index].selfIntro);
		$("#delete_age").val(GuiderInfo[index].age);
		$("#delete_workAge").val(GuiderInfo[index].workAge);
 		$("#deletemodal").modal('show');	
 	}
 	
 	function DeleteGuideInfo() {
 		var url="<%=basePath%>Guide/DeleteGuideInfo.action";
 		var id = $("#delete_certificateID").val();
 		if (id != "") {
	 		$.ajax({
	 			url:url,
	 			type:"post",
	 			datatype:"json",
	 			data:{id:id}
	 		});
	 		$("#deletemodal").modal('hide');
	 		alert("删除成功！");
	 		loadGuideInfo();
	 	}else {
	 		$("#deletemodal").modal('hide');
	 		alert("删除失败！");
	 		loadGuideInfo();
	 	}
 	}
 	function editGuideInfo(index) {
 		$("#edit_phone").val(GuiderInfo[index].phone);
		$("#edit_name").val(GuiderInfo[index].name);
 		if(GuiderInfo[index].sex=="男") $("input[name=edit_sex]:eq(0)").attr("checked",'checked');  
 		else $("input[name=edit_sex]:eq(1)").attr("checked",'checked'); 
		$("#edit_certificateID").val(GuiderInfo[index].certificateID);
		if (GuiderInfo[index].language == 1) $("#edit_language").val("1");else
		if (GuiderInfo[index].language == 0) $("#edit_language").val("0");else
		if (GuiderInfo[index].language == 2) $("#edit_language").val("2");
		$("#edit_selfIntro").val(GuiderInfo[index].selfIntro);
		$("#edit_age").val(GuiderInfo[index].age);
		$("#edit_workAge").val(GuiderInfo[index].workAge);
 		$("#editmodal").modal('show');	
 	}
 	
 	function EditGuideInfo() {
 	 	var url = "<%=basePath%>Guide/EditGuideInfo.action";
 		
		var phone = $("#edit_phone").val();
		
 		var name = $("#edit_name").val();
 		var sex = $("input[name=edit_sex]:checked").val();
 		var cID = $("#edit_certificateID").val();
 		var language = $("#edit_language").val();
 		var selfIntro = $("#edit_selfIntro").val();
 		var age = $("#edit_age").val();
 		var workAge = $("#edit_workAge").val();
 		
 		if(phone  != "" && name != "" && sex != "" && cID != "" && language != "" && selfIntro != ""
 			&& age != "" && workAge != "")
 		{
 			$.ajax({
 				url:url,
 				datatype:"json",
 				type:"post",
 				data:{phone:phone,name:name, sex:sex, cID:cID, language:language, selfIntro:selfIntro,
 				age:age, workAge:workAge},
 				success:function(data)
 				{
  					if(data.confirm == true) {
	  					$("#editmodal").modal('hide');
	  					alert("修改成功！");
	  					loadGuideInfo();
  					}
  					else {
  						alert("修改失败！");
  						loadGuideInfo();
  					}
 				}
 			});
 		}
 		else
 			alert("输入有误！");
 	}
 	
 	function LookGuideInfo(index) {
		lookGuideInfo(GuideOtherInfo[index]);
 	}
 	
 	function lookGuideInfo(data) {
 		$("#look_guideLevel").val(data.guideLevel);
 		$("#look_scenicBelong").val(data.scenicBelong);
 		$("#look_historyNum").val(data.historyNum);
 		$("#look_singleMax").val(data.singleMax);
 		$("#look_guideFee").val(data.guideFee);
 		var authorized = "无";
 		var disabled = "无";
 		if (data.authorized == 1) authorized = "通过";
 		else authorized = "未通过";
 		if (data.disabled == 1) disabled = "禁用";
 		else disabled = "未禁用";
 		$("#look_authorized").val(authorized);
 		$("#look_disabled").val(disabled);
 		$("#lookmodal").modal('show');
 	}
 	
 	function checkGuideInfo(index) {
 		GlobalIndex=index;
 		if(GuideOtherInfo[GlobalIndex].authorized=="0")
 		{
 			$("#checkmodal").modal('show');
 		}
 		
 	}
 	
 	function CheckGuideInfo() {
 		var url = "<%=basePath%>Guide/CheckGuideInfo.action";
 		var phone = GuideOtherInfo[GlobalIndex].phone;
 		$.ajax ({
 			url:url,
 			type:"POST",
 			datatype:"json",
 			data:{phone:phone},
 			success:function(data) {
 				if (data.confirm) alert("审核通过！");
 				else alert("无法通过审核！");
 			}
 		});
 		$("#checkmodal").modal('hide');
 		loadGuideInfo();
 	}
 	
 	function forbidGuideInfo(index) {
 		GlobalIndex=index;
 		if(GuideOtherInfo[GlobalIndex].disabled=="0")
 		{
 			$("#forbidmodal").modal('show');
 		}else
 		{
 			$("#relievemodal").modal('show');
 		}
 		
 	}
 	
 	function ForbidGuideInfo() {
 		var url = "<%=basePath%>Guide/ForbidGuideInfo.action";
 		var phone = GuideOtherInfo[GlobalIndex].phone;
 		$.ajax ({
 			url:url,
 			type:"POST",
 			datatype:"json",
 			data:{phone:phone},
 			success:function(data) {
 				if (data.confirm) alert("成功禁用该讲解员！");
 				else alert("无法禁用该讲解员！");
 			}
 		});
 		$("#forbidmodal").modal('hide');
 		loadGuideInfo();
 	}
 	
 	function RelieveGuideInfo() {
 		var url = "<%=basePath%>Guide/RelieveGuideInfo.action";
 		var phone = GuideOtherInfo[GlobalIndex].phone;
 		$.ajax ({
 			url:url,
 			type:"POST",
 			datatype:"json",
 			data:{phone:phone},
 			success:function(data) {
 				if (data.confirm) alert("解禁成功！");
 				else alert("解禁失败！");
 			}
 		});
 		$("#relievemodal").modal('hide');
 		loadGuideInfo();
 	}
 	
</script>

	<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='<%=path%>/assets/js/jquery.mobile.custom.js'>"+"<"+"/script>");
	</script>
	<script src="<%=path %>/assets/js/bootstrap.js"></script>

</body>
</html>
