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
        <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">讲解员管理</strong> / <small>未审核讲解员信息管理</small></div>
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
               <th style="text-align: center; width: 10%;">姓名</th>
               <th style="text-align: center; width: 10%;">性别</th>
               <th style="text-align: center; width: 10%;">年龄</th>
               <th style="text-align: center; width: 10%;">语言</th>
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
						<tr><td>讲解语言:</td>
						<td><input  type="text"  id="delete_language" name="delete_language"  readonly="readonly"/></td></tr>
						<tr><td>自我介绍:</td>
						<td><input  type="text"  id="delete_selfIntro" name="delete_selfIntro"  readonly="readonly"/></td></tr>
						<tr><td>年龄:</td>
						<td><input  type="text"  id="delete_age" name="delete_age"  readonly="readonly"/></td></tr>
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
							搜索详情
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
						<tr><td>讲解语言:</td>
						<td><input  type="text"  id="search_language" name="search_language"  readonly="readonly"/></td></tr>
						<tr><td>自我介绍:</td>
						<td><input  type="text"  id="search_selfIntro" name="search_selfIntro"  readonly="readonly"/></td></tr>
						<tr><td>年龄:</td>
						<td><input  type="text"  id="search_age" name="search_age"  readonly="readonly"/></td></tr>
						<tr><td colspan="2" style="text-align:center;"><button class="close" data-dismiss="modal" aria-hidden="true">返回</button></td></tr>
					
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
							未审核讲解员详情
						</h4>
					</div>
					<div class="modal-body">
					<table style="border-collapse:separate; border-spacing:10px;">
						<tr ><td>手机号：</td>
						<td><input type="text" id="look_phone" name="look_phone"  readonly="readonly"/></td>
						</tr>
						<tr><td >姓名：</td>
						<td><input  type="text" id="look_name" name="look_name" readonly="readonly" /></td>
						</tr>
						<tr><td>性别:</td>
						<td><input  type="text"  id="look_sex" name="look_sex"  readonly="readonly"/></td></tr>
						<tr><td>年龄:</td>
						<td><input  type="text"  id="look_age" name="look_age"  readonly="readonly"/></td></tr>
						<tr><td>语言:</td>
						<td><input  type="text"  id="look_language" name="look_language"  readonly="readonly"/></td></tr>
						<tr><td>自我介绍:</td>
						<td><input  type="text"  id="look_selfIntro" name="look_selfIntro" /></td></tr>
						<tr><td colspan="2" style="text-align:center;"><button class="close" data-dismiss="modal" aria-hidden="true">确定</button></td></tr>
					
						</table>
					</div>
				</div>
			</div>
</div>

<div class="modal fade" id="checkmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:30%">
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
						<h4 class="modal-title" id="myModalLabel" style="text-align:center;">
							审核讲解员
						</h4>
					</div>
					<div class="modal-body">
						<table style="border-collapse:separate; border-spacing:10px;">
						<tr ><td>姓名：</td>
						<td><input type="text" id="check_name" name="check_guidename"  readonly="readonly"/></td>
						<tr ><td>手机号：</td>
						<td><input type="text" id="check_phone" name="check_guidephone"  readonly="readonly"/></td>
						<tr ><td>性别：</td>
						<td><input type="text" id="check_sex" name="check_guidsex"  readonly="readonly"/></td>
						<tr ><td>导游证号：</td>
						<td><input type="text" id="check_guideID" name="check_guideID" style="background-color:lavender"  /></td></tr>
						<tr ><td>工作年限：</td>
						<td><input type="text" id="check_guideWorkyear" name="check_guideWorkyear" style="background-color:lavender"  /></td>
						<tr ><td>讲解级别：</td>
						<td><input type="text" id="check_guideLevel" name="check_guideLevel"  style="background-color:lavender" /></td>
						</tr>
						<tr><td >所属景区：</td>
						<td><input  type="text" id="check_scenicBelong" name="check_scenicBelong"  style="background-color:lavender" /></td>
						</tr>
						<tr><td>历史人数:</td>
						<td><input  type="text"  id="check_historyNum" name="check_historyNum"  style="background-color:lavender" /></td></tr>
						<tr><td>讲解人数:</td>
						<td><input  type="text"  id="check_singleMax" name="check_singleMax" style="background-color:lavender" /></td></tr>
						<tr><td>讲解费:</td>
						<td><input  type="text"  id="check_guideFee" name="check_guideFee"  style="background-color:lavender" /></td></tr>
						<tr><td colspan="2" style="text-align:center;"><button class="btn btn-warning" onclick="CheckGuideInfo()" data-dismiss="modal" aria-hidden="true">审核通过</button></td></tr>
					
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
  		var url="<%=basePath%>Guide/GetGuiderofNo.action";
  		
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
              	var t1="<td style='text-align: center; width: 8%;'>"+value.phone+"</td>";
              	var t2="<td style='text-align: center; width: 8%;'>"+value.name+"</td>";
              	var t3="<td style='text-align: center; width: 8%;'>"+value.sex+"</td>";
              	var t4="<td style='text-align: center; width: 8%;'>"+value.age+"</td>";
            	var language = "无";
				if (value.language == 1) language = "英语";else
				if (value.language == 0) language = "汉语";else
				if (value.language == 2) language = "英语  汉语";
              	var t5="<td style='text-align: center; width: 8%;'>"+language+"</td>";
              	var t6="<td style='text-align: center; '> <div class='am-btn-toolbar'>"+
	              	"<div  style='text-align: center;float: none' class='am-btn-group am-btn-group-xs'>"+
	              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='LookGuideInfo("+index+")'>"+"<span class='am-icon-pencil-square-o'></span> 查看</button>"+
	                "<button class='am-btn am-btn-default am-btn-xs am-text-danger ' type='button' onclick='deleteGuideInfo("+index+")'>"+"<span class='am-icon-trash-o'></span>删除</button>"+   
                	"<button  class='am-btn am-btn-default am-btn-xs am-text-danger ' type='button' onclick='checkGuideInfo("+index+")'>"+"<span class='am-icon-trash-o'></span>审核</button>";		
                var t7="</div></div> </td></tr>";
                $("#tby").append(t0).append(t1).append(t2).append(t3).append(t4).append(t5).append(t6).append(t7);
  			});
  	}
 	
 	function search()
 	{
 		var url = "<%=basePath%>Guide/GetGuiderinfoByPhone.action";
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
		var language = "无";
		if (GuiderInfo[index].language == 1) language = "英语";else
		if (GuiderInfo[index].language == 0) language = "汉语";else
		if (GuiderInfo[index].language == 2) language = "英语  汉语";
		$("#delete_language").val(language);
		$("#delete_selfIntro").val(GuiderInfo[index].selfIntro);
		$("#delete_age").val(GuiderInfo[index].age);
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
 	function LookGuideInfo(index) {
		lookGuideInfo(GuiderInfo[index]);
 	}
 	
 	function lookGuideInfo(data) {
 		$("#look_phone").val(data.phone);
 		$("#look_name").val(data.name);
 		$("#look_sex").val(data.sex);
 		$("#look_age").val(data.age);
 		var language = "无";
		if (data.language == 1) language = "英语";else
		if (data.language == 0) language = "汉语";else
		if (data.language == 2) language = "英语  汉语";
 		$("#look_language").val(language);
 		$("#look_selfIntro").val(data.selfIntro);
 		$("#lookmodal").modal('show');
 	}
 	
 	function checkGuideInfo(index) {
 		GlobalIndex=index;
 		$("#check_name").val(GuiderInfo[index].name);
 		$("#check_phone").val(GuiderInfo[index].phone);
 		$("#check_sex").val(GuiderInfo[index].sex);
 		$("#check_historyNum").val();
 		$("#check_singleMax").val();
 		$("#check_guideID").val();
 		$("#check_guideLevel").val();
 		$("#check_scenicBelong").val();
 		$("#check_guideWorkyear").val();
 		$("#check_guideFee").val();
 		$("#checkmodal").modal('show');
 	}
 	
 	function CheckGuideInfo() {
 		var url = "<%=basePath%>Guide/CheckGuideInfo.action";
 		var phone = GuiderInfo[GlobalIndex].phone;
 		alert(phone);
 		var historyNum=$("#check_historyNum").val();
 		var singleMax=$("#check_singleMax").val();
 		var guideFee=$("#check_guideFee").val();
 		var guideLevel=$("#check_guideLevel").val();
 		var scenicBelong=$("#check_scenicBelong").val();
 		var workAge=$("#check_guideWorkyear").val();
 		var certificateID=$("#check_guideID").val();
 		$.ajax ({
 			url:url,
 			type:"POST",
 			datatype:"json",
 			data:{phone:phone,historyNum:historyNum,singleMax:singleMax
 				,guideFee:guideFee,guideLevel:guideLevel,scenicBelong:scenicBelong,
 				workAge:workAge,certificateID:certificateID},
 			success:function(data) {
 				if (data.confirm) {alert("审核通过！");loadGuideInfo();}
 				else {alert("无法通过审核！");loadGuideInfo();}
 			}
 		});
 		$("#checkmodal").modal('hide');
 		loadGuideInfo();
 	}
 	
 	
 	
 	
 	
 	
</script>

	<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='<%=path%>/assets/js/jquery.mobile.custom.js'>"+"<"+"/script>");
	</script>
	<script src="<%=path %>/assets/js/bootstrap.js"></script>

</body>
</html>
