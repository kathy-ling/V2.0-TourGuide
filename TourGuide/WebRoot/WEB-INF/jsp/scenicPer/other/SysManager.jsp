<%@ page language="java" import="java.util.*,com.TourGuide.model.AdminInfo" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
AdminInfo username=(AdminInfo)session.getAttribute("adminSession");
%>

<!doctype html>
<html class="no-js">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="这是一个 index 页面">
<meta name="keywords" content="index">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="renderer" content="webkit">
<meta http-equiv="Cache-Control" content="no-siteapp" />
<meta name="apple-mobile-web-app-title" content="Amaze UI" />
<link rel="stylesheet" href="<%=basePath %>assets/css/amazeui.min.css"/>
<link rel="stylesheet" href="<%=basePath %>assets/css/admin.css">
<script src="<%=basePath %>assets/js/jquery-1.7.min.js"></script>
</head>
<body>
<div >
    <div class="listbiaoti am-cf">
      <ul class="am-icon-skyatlas"> 系统设置</ul>
      <dl class="am-icon-home" style="float: right;">当前位置： 首页 > <a href="#">系统设置</a></dl>
    </div>
      <div class="am-tabs am-margin" data-am-tabs>
    	<ul class="am-tabs-nav am-nav am-nav-tabs">
      <li class="am-active"><a href="#tab2">密码修改</a></li>
      
    </ul>













    <div class="am-tabs-bd">
      

      <div class="am-tab-panel am-fade" id="tab2">
        <form class="am-form">
          <div class="am-g am-margin-top">
            <div class="am-u-sm-4 am-u-md-2 am-text-right">
              用户名
            </div>
            <div class="am-u-sm-8 am-u-md-4">
              <input style="text-align: center;"  type="text" value="<%=username.getUsername() %>" class="am-input-sm" readonly="true">
            </div>
            <div class="am-hide-sm-only am-u-md-6"></div>
          </div>

          <div class="am-g am-margin-top">
            <div class="am-u-sm-4 am-u-md-2 am-text-right">
              原密码
            </div>
            <div class="am-u-sm-8 am-u-md-4 am-u-end col-end">
              <input id="password" type="password" class="am-input-sm">
            </div>
          </div>

          <div class="am-g am-margin-top">
            <div class="am-u-sm-4 am-u-md-2 am-text-right">
              新密码
            </div>
            <div class="am-u-sm-8 am-u-md-4">
              <input id="password1" type="password" class="am-input-sm">
            </div>
            <div class="am-hide-sm-only am-u-md-6">必填</div>
          </div>
				<div class="am-g am-margin-top" align="center">
            	<button type="button" class="am-btn am-btn-success am-radius "  onclick="updatePass()">保存</button>
          </div>
          

        </form>
      </div>

    

    </div>
  </div>
</div>

<script src="<%=basePath %>assets/js/amazeui.min.js"></script>
<!--<![endif]-->
<script>

	function updatePass()
	{
		var url="<%=basePath%>UpdatePass.action";
		var a=$("#password").val();
		var b=$("#password1").val();
		$.ajax(
		{
			url:url,
			type:"post",
			datatype:"json",
			data:{username:<%=username.getUsername()%>,passOld:a,passNew:b},
			success:function(data)
			{
				if(data==1)
				{
					alert("密码修改成功");
				}else
				{
					alert("密码修改失败");
				}
			}
		});
	}


</script>




</body>
</html>