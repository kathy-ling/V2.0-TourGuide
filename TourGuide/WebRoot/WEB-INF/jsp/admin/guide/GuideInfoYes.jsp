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
        <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">讲解员管理</strong> / <small>已审核讲解员信息管理</small></div>
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
            
            <input type="text"  id="querytxt" class="am-form-field" placeholder="手机号">
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
              	<th style="text-align: center; width: 10%;">手机号</th>
               <th style="text-align: center; width: 5%;">姓名</th>
               <th style="text-align: center; width: 5%;">性别</th>
               <th style="text-align: center; width: 10%;">证号</th>
               <th style="text-align: center; width: 10%;">讲解语言</th>
                <th style="text-align: center; width: 5%;">年龄</th>
                <th style="text-align: center; width: 5%;">工作年限</th>
                <th style="text-align: center; width: 5%;">禁用状态</th>
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
						<tr ><td>姓名：</td>
						<td><input type="text" id="edit_guidename" name="edit_guidename"  readonly="readonly"/></td>
						<tr ><td>手机号：</td>
						<td><input type="text" id="edit_guidephone" name="edit_guidephone"  readonly="readonly"/></td>
						<tr ><td>性别：</td>
						<td><input type="text" id="edit_guidesex" name="edit_guidesex"  readonly="readonly"/></td>
						<tr ><td>导游证号：</td>
						<td><input type="text" id="edit_guideID" name="edit_guideID"  readonly="readonly"/></td>
						<tr ><td>工作年限：</td>
						<td><input type="text" id="edit_guideWorkyear" name="edit_guideWorkyear"  readonly="readonly"/></td>
						<tr><td >所属景区：</td>
						<td><input  type="text"  id="edit_scenicBelong" name="edit_scenicBelong" readonly="readonly" /></td>
						</tr>
						<tr ><td>讲解级别：</td>
						<td><input type="text" style="background-color:moccasin;" id="edit_guideLevel" name="edit_guideLevel"  /></td>
						</tr>
						<tr><td>历史人数:</td>
						<td><input  type="text" style="background-color:moccasin;"  id="edit_historyNum" name="edit_historyNum"  /></td></tr>
						<tr><td>讲解人数:</td>
						<td><input  type="text" style="background-color:moccasin;"  id="edit_singleMax" name="edit_singleMax"  /></td></tr>
						<tr><td>讲解费:</td>
						<td><input  type="text" style="background-color:moccasin;"  id="edit_guideFee" name="edit_guideFee"  /></td></tr>
						<tr><td colspan="2" style="text-align:center;"><button class="btn btn-warning" onclick="EditGuideInfomodal()" data-dismiss="modal" aria-hidden="true">修改</button></td></tr>
					
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
						<tr ><td>姓名：</td>
						<td><input type="text" id="look_guidename" name="look_guidename"  readonly="readonly"/></td>
						<tr ><td>手机号：</td>
						<td><input type="text" id="look_guidephone" name="look_guidephone"  readonly="readonly"/></td>
						<tr ><td>性别：</td>
						<td><input type="text" id="look_guidesex" name="look_guidesex"  readonly="readonly"/></td>
						<tr ><td>导游证号：</td>
						<td><input type="text" id="look_guideID" name="look_guideID"  readonly="readonly"/></td>
						<tr ><td>工作年限：</td>
						<td><input type="text" id="look_guideWorkyear" name="look_guideWorkyear"  readonly="readonly"/></td>
						<tr ><td>讲解级别：</td>
						<td><input type="text" id="look_guideLevel" name="look_guideLevel"  readonly="readonly"/></td>
						</tr>
						<tr><td >所属景区：</td>
						<td><input  type="text" id="look_scenicBelong" name="look_scenicBelong" readonly="readonly" /></td>
						</tr>
						<tr><td>历史人数:</td>
						<td><input  type="text"  id="look_historyNum" name="look_historyNum"  readonly="readonly"/></td></tr>
						<tr><td>讲解人数:</td>
						<td><input  type="text"  id="look_singleMax" name="look_singleMax"  readonly="readonly"/></td></tr>
						<tr><td>讲解费:</td>
						<td><input  type="text"  id="look_guideFee" name="look_guideFee"  readonly="readonly"/></td></tr>
						<tr><td colspan="2" style="text-align:center;"><button class="close" data-dismiss="modal" aria-hidden="true">返回</button></td></tr>
					
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
	var currentPage=1;
	var pageRows=5;
	var GlobalIndex;
	$(document).ready(function()
  	{
  			loadGuideInfo();
  	});
  	
  	function loadGuideInfo()
  	{
  		var url="<%=basePath%>Guide/GetGuiderofYes.action";
  		
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
              	var a;
              	var disabled = value.disabled;
		 		var b;
		 		if (disabled == 1) {a = "禁用";b="解禁";}
		 		else {a = "未禁用";b="禁用";}
              	var t7="<td style='text-align: center; width: 8%;'>"+a+"</td>";
              	var t8="<td style='text-align: center; '> <div class='am-btn-toolbar'>"+
	              	"<div style='text-align: center;float: none' class='am-btn-group am-btn-group-xs'>"+
	              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='LookGuideInfo("+index+")'>"+"<span class='am-icon-pencil-square-o'></span> 查看</button>"+
	              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='editGuideInfo("+index+")'>"+"<span class='am-icon-pencil-square-o'></span> 编辑</button>"+
	                "<button class='am-btn am-btn-default am-btn-xs am-text-danger ' type='button' onclick='deleteGuideInfo("+index+")'>"+"<span class='am-icon-trash-o'></span>删除</button>"+
                	"<button  class='am-btn am-btn-default am-btn-xs am-text-danger ' type='button' onclick='forbidGuideInfo("+index+")'>"+"<span class='am-icon-trash-o'></span>"+b+"</button>";		
                var t9="</div></div> </td></tr>";
                var t10="<td style='text-align: center; width: 8%;'>"+value.phone+"</td>";
                $("#tby").append(t0).append(t10).append(t1).append(t2).append(t3).append(t4).append(t5).append(t6).append(t7).append(t8).append(t9);
  			});
  	}
 	
 	function search()
 	{
 		var url = "<%=basePath%>Guide/GetGuiderinfoBystring.action";
 		var phone = $("#querytxt").val();
 		
 		query(url, phone);
 	}
 	
 	function query(url, phone)
 	{ 		
 		$.ajax(
 		{
 			url:url,
 			datatype:"json",
 			type:"POST",
 			data:{phone:phone},
 			success: function(data)
 			{
 				if (data.jsonStr=="[]") {
					alert("没有搜索到任何讲解员信息，请重新搜索");
				} else {
						
						var a=JSON.parse(data.jsonStr);
						$("#look_guidename").val(a[0].name);
 						$("#look_guidephone").val(a[0].phone);
 						$("#look_guidesex").val(a[0].sex);
 						$("#look_guideID").val(a[0].certificateID);
 						$("#look_guideWorkyear").val(a[0].workAge);
 						$("#look_guideLevel").val(a[0].guideLevel);
 						$("#look_scenicBelong").val(a[0].scenicName);
 						$("#look_historyNum").val(a[0].historyNum);
 						$("#look_singleMax").val(a[0].singleMax);
 						$("#look_guideFee").val(a[0].guideFee);
 						
					
					//显示前先对对应字段完成赋值
					$("#lookmodal").modal('show');
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
 		var phone = $("#delete_phone").val();
 		$.ajax({
	 			url:url,
	 			type:"post",
	 			datatype:"json",
	 			data:{phone:phone},
	 			success: function(data)
	 			{
	 				if(data=="1")
	 				{
	 					$("#deletemodal").modal('hide');
	 					alert("删除成功！");
	 					loadGuideInfo();
	 				}else
	 				{
	 					$("#deletemodal").modal('hide');
	 					alert("删除失败！");
	 					loadGuideInfo();
	 				}
	 			}
	 		});
 	}
 	function editGuideInfo(index) {
 		var data=GuiderInfo[index];
 		$("#edit_guidename").val(data.name);
 		$("#edit_guidephone").val(data.phone);
 		$("#edit_guidesex").val(data.sex);
 		$("#edit_guideID").val(data.certificateID);
 		$("#edit_guideWorkyear").val(data.workAge);
 		$("#edit_guideLevel").val(data.guideLevel);
 		$("#edit_scenicBelong").val(data.scenicName);
 		$("#edit_historyNum").val(data.historyNum);
 		$("#edit_singleMax").val(data.singleMax);
 		$("#edit_guideFee").val(data.guideFee);
 		$("#editmodal").modal('show');	
 	}
 	
 	function forbidGuideInfo(index)
 	{
 		GlobalIndex=index;
 		var a=GuiderInfo[GlobalIndex].disabled;
 		if(a==0)  $("#forbidmodal").modal('show');
 		else $("#relievemodal").modal('show');
 	}
 	
 	function EditGuideInfomodal() {
 	 	var url = "<%=basePath%>Guide/EditGuideInfo.action";
 		var level= $("#edit_guideLevel").val();
 		var historyNum= $("#edit_historyNum").val();
 		var guideNum=$("#edit_singleMax").val();
 		var fee=$("#edit_guideFee").val();
		var phone=$("#edit_guidephone").val();
 		
 		if(level  != "" && historyNum != "" && guideNum != "" && fee != "")
 		{
 			$.ajax({
 				url:url,
 				datatype:"json",
 				type:"post",
 				data:{level:level,historyNum:historyNum,guideNum:guideNum,fee:fee,phone:phone},
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
		lookGuideInfo(GuiderInfo[index]);
 	}
 	
 	function lookGuideInfo(data) {
 		$("#look_guidename").val(data.name);
 		$("#look_guidephone").val(data.phone);
 		$("#look_guidesex").val(data.sex);
 		$("#look_guideID").val(data.certificateID);
 		$("#look_guideWorkyear").val(data.workAge);
 		$("#look_guideLevel").val(data.guideLevel);
 		$("#look_scenicBelong").val(data.scenicName);
 		$("#look_historyNum").val(data.historyNum);
 		$("#look_singleMax").val(data.singleMax);
 		$("#look_guideFee").val(data.guideFee);
 		$("#lookmodal").modal('show');
 	}
 	
 	
 	
 	function ForbidGuideInfo() {
 		alert("进入禁用讲解员");
 		var url = "<%=basePath%>Guide/ForbidGuideInfo.action";
 		var phone = GuiderInfo[GlobalIndex].phone;
 		alert(phone);
 		$.ajax ({
 			url:url,
 			type:"POST",
 			datatype:"json",
 			data:{phone:phone},
 			success:function(data) {
 				if (data.confirm) {alert("成功禁用该讲解员！");loadGuideInfo();}
 				else {alert("无法禁用该讲解员！");loadGuideInfo();}
 			}
 			
 		});
 		$("#forbidmodal").modal('hide');
 		
 	}
 	
 	function RelieveGuideInfo() {
 		var url = "<%=basePath%>Guide/RelieveGuideInfo.action";
 		var phone = GuiderInfo[GlobalIndex].phone;
 		$.ajax ({
 			url:url,
 			type:"POST",
 			datatype:"json",
 			data:{phone:phone},
 			success:function(data) {
 				if (data.confirm) {alert("解禁成功！");loadGuideInfo();}
 				else {alert("解禁失败！");loadGuideInfo();}
 			}
 		});
 		$("#relievemodal").modal('hide');
 		
 	}
 	
</script>

	<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='<%=path%>/assets/js/jquery.mobile.custom.js'>"+"<"+"/script>");
	</script>
	<script src="<%=path %>/assets/js/bootstrap.js"></script>

</body>
</html>
