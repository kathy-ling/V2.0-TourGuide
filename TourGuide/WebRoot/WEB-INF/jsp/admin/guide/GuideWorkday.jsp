<%@ page language="java" import="java.util.*,java.text.SimpleDateFormat,java.util.Date,java.util.Calendar" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Calendar calendar = Calendar.getInstance();
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
Date date1 = calendar.getTime();
String day1=sdf.format(date1);
calendar.add(Calendar.DAY_OF_YEAR, 1);
Date date2 = calendar.getTime();
String day2=sdf.format(date2);
calendar.add(Calendar.DAY_OF_YEAR, 1);
Date date3 = calendar.getTime();
String day3=sdf.format(date3);
calendar.add(Calendar.DAY_OF_YEAR, 1);
Date date4 = calendar.getTime();
String day4=sdf.format(date4);
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

  </head>
  
 <body>


  <!-- content start -->
  <div class="admin-content">
    <div class="admin-content-body">
      <div class="am-cf am-padding am-padding-bottom-0">
        <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">讲解员管理</strong> / <small>讲解员日程管理</small></div>
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
            
           <input type="text" id="searchText" class="am-form-field" placeholder="手机号">
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
              	<th style="text-align:center; width: 10%;">手机号</th>
                <th style="text-align:center; width: 10%;">姓名</th>
                <th style="text-align:center; width: 10%;"><%=day1 %></th>
                <th style="text-align:center; width: 10%;"><%=day2 %></th>
                <th style="text-align:center; width: 10%;"><%=day3 %></th>
                <th style="text-align:center; width: 10%;"><%=day4 %></th>
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

  
<div class="modal fade" id="EditModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
			<div class="modal-dialog" >
				<div class="modal-content">
					<div class="model-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                        <span class="blue">X</span>
	                    </button>
	                    <h4 class="modal-title" id="myModalLabel" style="text-align:center;">
							编辑运营人员日程
						</h4>
					</div>
					<div class="modal-body">
					<table style="border-collapse:separate; border-spacing:10px; margin:auto;">
						<tr ><td >姓名：</td>
						<td><input id="Editname" style="text-align:center; " readonly= "true " /></td>
						</tr>
						<tr><td>手机号：</td>
						<td><input id="Editphone" style="text-align:center;" readonly= "true "/></td>
						</tr>
						<tr><td><%=day1 %></td>
						<td align="center">
							<input type="radio" id="yes" name="day1" value="0"/>请假
							<input  id="no" type="radio" name="day1" value="1"/>工作
						</td>
						</tr>
						<tr><td><%=day2 %></td>
						<td align="center">
							<input type="radio" id="yes" name="day2" value="0"/>请假
							<input  id="no" type="radio" name="day2" value="1"/>工作
						</td>
						</tr>
						<tr><td><%=day3 %></td>
						<td align="center">
						<input type="radio" id="yes" name="day3" value="0"/>请假
						<input  id="no" type="radio" name="day3" value="1"/>工作
						</td>
						</tr>
						<tr><td><%=day4 %></td>
						<td align="center">
						<input type="radio" id="yes" name="day4" value="0"/>请假
						<input  id="no" type="radio" name="day4" value="1"/>工作
						</td>
							</tr>						
						<tr><td colspan="2" style="text-align:center;"><button onclick="EditGuideWorkdayInfo()" data-dismiss="modal" aria-hidden="true" >修改</button></td></tr>
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
							查看结果
						</h4>
					</div>
					<div class="modal-body">
					<table style="border-collapse:separate; border-spacing:10px; margin:auto;">
						<tr ><td align="center">姓名：</td>
						<td align="center"><input id="Searchname" style="text-align:center; " readonly= "true " /></td>
						</tr>
						<tr><td align="center">手机号：</td>
						<td align="center"><input  id="Searchphone" style="text-align:center;" readonly= "true "/></td>
						</tr>
						<tr><td align="center"><%=day1 %></td>
						<td align="center"><input  type="text"  id="Searchday1" style="text-align:center;" name="Searchday1"  readonly="true"/></td>
						</tr>
						<tr><td align="center"><%=day2 %></td>
						<td align="center"><input  type="text"  id="Searchday2" name="Searchday1" style="text-align:center;"  readonly="true"/></td>
						</tr>
						<tr><td align="center"><%=day3 %></td>
						<td align="center"><input  type="text"  id="Searchday3" name="Searchday3" style="text-align:center;"  readonly="true"/></td>
						</tr>
						<tr><td align="center"><%=day4 %></td>
						<td align="center"><input  type="text"  id="Searchday4" name="Searchday4" style="text-align:center;"  readonly="true"/></td></tr>						
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
	
	var guideWorkday;
	var currentPage=1;
	var pageRows=5;
	var GuideIndex;
	var queryGuide;
	$(document).ready(function()
  	{
  		loadGuideInfo();
  	});
  	function loadGuideInfo()
  	{
  		var url="<%=basePath%>guideworkday/GetGuideWorkDay.action";
  		$.ajax(
  		{
  			url:url,
  			type:"POST",
  			datatype: "json",
  			data:{currentPage:1,pageRows:pageRows},
  			success: function(data)
  					{
  					    if(data!=null){
  					    guideWorkday = data.jsonStr;
  					    initTable(guideWorkday,data.page);	
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
									guideWorkday = data.jsonStr;
  					   				initTable(guideWorkday.jsonStr,page);
  					   						
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
  		var a=JSON.parse(jsonStr);
  		$.each(a,function(index,value)
  			{
  				var q,w,e,r;
  				var t1="<tr>";
  				var t2="<td style='width: 10%; text-align:center;'>"+value.phone+"</td>";
              	var t3="<td style='width: 10%; text-align:center;'>"+value.name+"</td>";
              	if(value.one==1) q="工作"; else q="请假";
              	if(value.two==1) w="工作"; else w="请假";
              	if(value.three==1) e="工作"; else e="请假";
              	if(value.four==1) r="工作"; else r="请假";
              	var t4="<td style='width: 10%; text-align:center;'>"+q+"</td>";
              	var t5="<td style='width: 10%; text-align:center;'>"+w+"</td>";
              	var t6="<td style='width: 10%; text-align:center;'>"+e+"</td>";
              	var t7="<td style='width: 10%; text-align:center;'>"+r+"</td>";
              	var t8="<td align='center' style=' width: 15%; '> <div class='am-btn-toolbar'>"+
              	"<div style='float: none' class='am-btn-group am-btn-group-xs'>"+
              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='LookGuideWorkday("+index+")'>"+"查看</button>"+
              	"<button class='am-btn am-btn-default am-btn-xs am-text-secondary' type='button' onclick='EditGuideWorkday("+index+")'>"+"编辑</button>"+
                 "</div></div> </td>";
                 				
                var t9="</tr>";
                $("#tby").append(t1).append(t2).append(t3).append(t4).append(t5).append(t6).append(t7).append(t8).append(t9);
  			});
  	}
 	function EditGuideWorkday(index)
 	{
 		GuideIndex=index;
 		var a =JSON.parse(guideWorkday);
 		$("#Editname").val(a[GuideIndex].name);
 		$("#Editphone").val(a[GuideIndex].phone);
 		if(a[GuideIndex].one==0) $("input[name='day1']").eq(0).attr("checked","checked");
 		else  $("input[name='day1']").eq(1).attr("checked","checked");
 		if(a[GuideIndex].one==0) $("input[name='day2']").eq(0).attr("checked","checked");
 		else  $("input[name='day2']").eq(1).attr("checked","checked");
 		if(a[GuideIndex].one==0) $("input[name='day3']").eq(0).attr("checked","checked");
 		else  $("input[name='day3']").eq(1).attr("checked","checked");
 		if(a[GuideIndex].one==0) $("input[name='day4']").eq(0).attr("checked","checked");
 		else  $("input[name='day4']").eq(1).attr("checked","checked");
 		$("#EditModal").modal('show');
 	}
 	
 	function EditGuideWorkdayInfo()
 	{
 		var a =JSON.parse(guideWorkday)[GuideIndex].phone;
 		var b = $("input[name='day1']:checked").val();
 		var c = $("input[name='day2']:checked").val();
 		var d = $("input[name='day3']:checked").val();
 		var e = $("input[name='day4']:checked").val();
 		var url="<%=basePath%>guideworkday/EditGuideWorkdayInfo.action";
 		$.ajax(
 		{
 			url:url,
 			type:"post",
 			datatype:"json",
 			data:{day1:b,day2:c,day3:d,day4:e,phone:a},
 			success:function(data){
 				if(data=="1")
 				{
 					alert("修改成功");
 					$("#EditModal").modal('hide');
 					loadGuideInfo();
 				}else{
 					alert("修改失败，请重新修改");
 					$("#EditModal").modal('hide');
 					loadGuideInfo();			
 				}
 			
 			}
 		
 		});
 	}
 	
 	function LookGuideWorkday(index)
 	{
 		var a =JSON.parse(guideWorkday);
 		var q,w,e,r;
 		if(a[index].one==1) q="工作"; else q="请假";
        if(a[index].two==1) w="工作"; else w="请假";
        if(a[index].three==1) e="工作"; else e="请假";
        if(a[index].four==1) r="工作"; else r="请假";
 		$("#Searchname").val(a[index].name);
 		$("#Searchphone").val(a[index].phone);
 		$("#Searchday1").val(q);
 		$("#Searchday2").val(w);
 		$("#Searchday3").val(e);
 		$("#Searchday4").val(r);
 		$("#SearchModal").modal('show');
 	}
 	
 	function serach()
 	{
 		var a=$("#searchText").val();
 		var url="<%=basePath%>guideworkday/QueryGuideWorkdayByPhone.action";
 		$.ajax({
 			url:url,
 			type:"post",
 			datatype:"json",
 			data:{phone:a},
 			success:function(data)
 			{
 				var b=data.jsonStr;
 				serachGuideWorkday(b);
 			}
 		
 		});
 	
 	}
 	
 	function serachGuideWorkday(data)
 	{
 		
 		var a =JSON.parse(data);
 		var q,w,e,r;
 		if(a[0].one==1) q="工作"; else q="请假";
        if(a[0].two==1) w="工作"; else w="请假";
        if(a[0].three==1) e="工作"; else e="请假";
        if(a[0].four==1) r="工作"; else r="请假";
 		$("#Searchname").val(a[0].name);
 		$("#Searchphone").val(a[0].phone);
 		$("#Searchday1").val(q);
 		$("#Searchday2").val(w);
 		$("#Searchday3").val(e);
 		$("#Searchday4").val(r);
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
