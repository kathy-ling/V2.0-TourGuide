<%@ page language="java" import="java.util.*,com.TourGuide.model.AdminInfo,javax.servlet.http.HttpSession" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
AdminInfo accont=(AdminInfo) session.getAttribute("adminSession");
%>

<!doctype html>
<html class="no-js">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title></title>
<meta name="description" content="这是一个 index 页面">
<meta name="keywords" content="index">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="renderer" content="webkit">
<meta http-equiv="Cache-Control" content="no-siteapp" />
<meta name="apple-mobile-web-app-title" content="Amaze UI" />
<link rel="stylesheet" href="<%=basePath %>/assets/css/amazeui.min.css" />
<link rel="stylesheet" href="<%=basePath %>/assets/css/admin.css">
<script src="<%=basePath %>/assets/js/jquery.js"></script>
<script src="<%=basePath %>/assets/js/app.js"></script>
</head>
<body>
	<!--[if lte IE 9]><p class="browsehappy">升级你的浏览器吧！ <a href="http://se.360.cn/" target="_blank">升级浏览器</a>以获得更好的体验！</p><![endif]-->
</head>

<body>
	<header class="am-topbar admin-header">
		<div class="am-topbar-brand">
			<img src="<%=basePath %>assets/i/logo.png">
		</div>
		<div class="am-collapse am-topbar-collapse" id="topbar-collapse">
			<ul class="am-nav am-nav-pills am-topbar-nav admin-header-list">
				<li class="am-dropdown tognzhi" data-am-dropdown>
					<button
						class="am-btn am-btn-primary am-dropdown-toggle am-btn-xs am-radius am-icon-bell-o"
						data-am-dropdown-toggle>
						系统管理<span class="am-badge am-badge-danger am-round">a</span>
					</button>
					<ul class="am-dropdown-content">
						<li><a href="SysManager.action" target="targetiframe">平台系统设置</a></li>
					</ul>
				</li>
				<li class="am-hide-sm-only" style="float: right;"><a
					href="javascript:;" id="admin-fullscreen"><span
						class="am-icon-arrows-alt"></span> <span class="admin-fullText">开启全屏</span></a>
				</li>
				<li class="kuanjie"><a href="#" onclick="exit()">退出系统</a> </li>
			</ul>
		</div>
		<div class="am-collapse am-topbar-collapse" id="topbar-collapse">
			<ul class="am-nav am-nav-pills am-topbar-nav admin-header-list">

				<li class="am-dropdown tognzhi" data-am-dropdown></li>

			</ul>
		</div>
	</header>

	<div class="am-cf admin-main">

		<div class="nav-navicon admin-main admin-sidebar">

	
			<div id="welcomeRole" class="sideMenu am-icon-dashboard"
				style="color:#aeb2b7; margin: 10px 0 0 0;">欢迎运营人员:<%=accont.getUsername() %></div>
			<div class="sideMenu" id="menu1">
				
				<h3 class="am-icon-flag">
					<em></em> <a href="#">运营人员管理</a>
				</h3>
				<ul>
					<li><a href="operateInfo.action" target="targetiframe">运营人员信息管理</a></li>
				</ul>
				<h3 class="am-icon-users">
					<em></em> <a href="#">讲解员管理</a>
				</h3>
				<ul>
					<li><a href="GuideInfoYes.action" target="targetiframe">已审核信息管理</a></li>
					<li><a href="GuideInfoNo.action" target="targetiframe">未审核信息管理</a></li>
					<li><a href="guideWorkday.action" target="targetiframe">讲解员日程管理</a></li>
				</ul>

				<h3 class="am-icon-users">
					<em></em> <a href="#">游客管理</a>
				</h3>
				<ul>
					<li><a href="visitor.action" target="targetiframe">游客信息管理</a></li>
					<li><a href="visitorInfoDisabled.action" target="targetiframe">游客黑名单管理</a></li>
				</ul>

				<h3 class="am-icon-cart-plus">
					<em></em> <a href="#"> 订单管理</a>
				</h3>
				<ul>
					<li><a href="BookOrderInfo.action" target="targetiframe">预约信息管理</a></li>
				</ul>
				<h3 class="am-icon-cart-plus">
					<em></em> <a href="#"> 记录管理</a>
				</h3>
				<ul>
					<li><a href="RewardOrPunishRecord.action"
						target="targetiframe">奖励惩罚记录管理</a></li>
					<li><a href="OperateRecord.action" target="targetiframe">操作日志记录管理</a></li>
				</ul>
				<h3 class="am-icon-location-arrow">
					<em></em> <a href="#">景区管理</a>
				</h3>
				<ul>
					<li><a href="scenicInfo.action" target="targetiframe">景区信息设置</a></li>
				</ul>
				<h3 class="am-icon-money">
					<em></em> <a href="#">收入管理</a>
				</h3>
				<ul>
					<li><a href="ScenicFee.action" target="targetiframe">景区收入信息管理</a></li>
					<li><a href="GuideFee.action" target="targetiframe">讲解员收入查询</a></li>

				</ul>

			</div>
		</div>

		<div class=" admin-content">
			<div class="daohang">
				<ul>
				</ul>
			</div>




			<div class="admin-biaogelist" style="width: 85%;height:90%">
				<iframe name="targetiframe" style="width: 100%; height:95% ; "
					src="operateInfo.action"></iframe>
			</div>

		</div>
	</div>


	<script src="<%=basePath %>/assets/js/amazeui.min.js"></script>
	
	<script type="text/javascript">
			window.jQuery || document.write("<script src='<%=basePath %>/assets/js/jquery.js'>"
								+ "<"+"/script>");
	</script>

	<script type="text/javascript">
		jQuery(".sideMenu").slide({
			titCell : "h3", //鼠标触发对象
			targetCell : "ul", //与titCell一一对应，第n个titCell控制第n个targetCell的显示隐藏
			effect : "slideDown", //targetCell下拉效果
			delayTime : 300, //效果时间
			triggerTime : 150, //鼠标延迟触发时间（默认150）
			defaultPlay : true,//默认是否执行效果（默认true）
			returnDefault : true
		//鼠标从.sideMen移走后返回默认状态（默认false）
		});
		
		function exit()
		{
			
			var url = "<%=basePath%>exit.action";
			$.ajax ({
 			url:url,
 			type:"post",
 			datatype:"json",
 			success:function(data) {
 				if (data) {window.location.href="<%=basePath%>logincheck.action";}
 				else alert("退出系统失败");
 			}
 		});
		
		
		}
		
	</script>

</body>
</html>