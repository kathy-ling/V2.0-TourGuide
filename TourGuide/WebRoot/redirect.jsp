<%@ page language="java" pageEncoding="utf-8"%>
<%@ page import="com.TourGuide.model.SNSUserInfo"%>
<!DOCTYPE html>
<html>
<head>

<%String path = request.getContextPath(); %>

    <meta charset="UTF-8" />
    <title>注册页面</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="<%=path %>/web/css/Register.css">
    <link rel="stylesheet" type="text/css" href="<%=path %>/web/css/jquery.mobile-1.4.5.css">
    <link rel="stylesheet" type="text/css" href="<%=path %>/web/css/nativedroid2.css">
    <script type="text/javascript" src="<%=path %>/web/js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="<%=path %>/web/js/jquery.mobile-1.4.5.min.js"></script>    
</head>
<body>

<% 
		// 获取由OAuthServlet中传入的参数
		SNSUserInfo user = (SNSUserInfo)request.getAttribute("snsUserInfo"); 
		
		if(null != user) {
			out.print(user.getNickname()+user.getOpenId());
		}
	%>


<div data-role="page" id="registerPage">
    <div data-role="header"  id="header" class="header">
    </div>
    <div data-role="main" class="ui-content">
        <form action="register_submit" method="get" accept-charset="utf-8">
            <!-- 前三个通过微信自动获取-->
            <div class="ui-field-contain">
            <label for="nickname" class="ui-hidden-accessible">昵称：</label>
            <input type="text" id="nickname" name="" class="" value="<%=user.getNickname()%>" placeholder="昵称" />
            <table><tbody>
            <tr><td>  <label for="sex" class="" sex="<%=user.getSex()%>" id="sexlable" >性别：</label></td>
            <td><fieldset data-role="controlgroup" data-type="horizontal">
                      <label for="Fmale" >女</label>
                      <input type="radio"  id="Fmale" name="guideSex" value="女"/>
                        <label for="Male" >男</label>
                        <input type="radio"  id="Male" name="guideSex" value="男"/>
                        </fieldset>
            </td></tr></tbody></table>
            <label for="name" class="ui-hidden-accessible" class="">姓名:</label>
            <input type="text" id="name" name="" class="" placeholder="姓名"/>
            <label for="tel" class="ui-hidden-accessible" class="">电话:</label>
            <input type="tel" id="tel" name="" class="" placeholder="电话" />
            <label for="password"  class="ui-hidden-accessible" class="">密码：</label>
            <input type="password" id="password" name="" class=""  placeholder="密码"/>
            <label for="password"  class="ui-hidden-accessible" class="">确认密码：</label>
            <input type="password" id="confirm_password" name="" class="" placeholder="确认密码" />
            <input type="text" id="openID" name="openID" value="<%=user.getOpenId()%>" style="display: none;" ></input>
            <label for="headimg">头像：</label>
            <div>
            	<!-- <input type="file" id="btnFile" style="display: none" onchange="selectImage(this)"> -->
            	<img src="<%=user.getHeadImgUrl()%>" id="visitor_img">
            </div>  
            <label for="agreeClause" class="">我已阅读并同意<a href="#">相关服务条款</a></label>
            <input type="checkbox" id="agreeClause" value="yes" name="" class="" />
            <input type="button" id="Registsubmit" name="submit" value="注册">
            </div>
        </form>
    </div>
    <script type="text/javascript" src="<%=path %>/web/js/Regist.js"></script>
</div>
</body>
</html>


<!-- <html>
<head>
	<title>OAuth2.0网页授权</title>
	<meta name="viewport" content="width=device-width,user-scalable=0">
	<style type="text/css">
		*{margin:0; padding:0}
		table{border:1px dashed #B9B9DD;font-size:12pt}
		td{border:1px dashed #B9B9DD;word-break:break-all; word-wrap:break-word;}
	</style>
</head>
<body> -->
	
	<%-- <table width="100%" cellspacing="0" cellpadding="0">
		
		<tr><td>昵称</td><td><%=user.getNickname()%></td></tr>
		<tr><td>性别</td><td><%=user.getSex()%></td></tr>
		<tr><td>头像</td><td><%=user.getHeadImgUrl()%></td></tr>
		
		<tr><td width="20%">属性</td><td width="80%">值</td></tr>		
		<tr><td>OpenID</td><td><%=user.getOpenId()%></td></tr>
		<tr><td>国家</td><td><%=user.getCountry()%></td></tr>
		<tr><td>省份</td><td><%=user.getProvince()%></td></tr>
		<tr><td>城市</td><td><%=user.getCity()%></td></tr>		
	</table> --%>
	<%-- <%
		}
		else 
			out.print("用户不同意授权,未获取到用户信息！");
	%> --%>