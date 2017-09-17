<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<link href='http://fonts.googleapis.com/css?family=Oleo+Script' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="<%=path %>/css/style.css" />
		<script type="text/javascript" src="<%=path %>/js/jquery-2.2.3.min.js" ></script>
	</head>
	<body background="<%=path%>/image/bg.png">
		<div class="lg-container">
		<h1>Admin Area</h1>
		<div>
		<c:if test="${!empty error }">
    	<font color="red"><c:out value="${error}"></c:out></font>
    	</c:if>
	</div>
		<form action="login.action" id="lg-form" name="lg-form"  method="post">
			
			<div>
				<label for="username">Username:</label>
				<input type="text" name="username" id="username" placeholder="username"/>
			</div>

			<div>
				<label for="password">Password:</label>
				<input type="password" name="password" id="password" placeholder="password" />
			</div>
			
			<div>
				<button type="submit" id="login">Login</button>
			</div>
		</form>
		<div id="message"></div>
	</div>
	</body>
	<script>
		
	</script>
</html>
