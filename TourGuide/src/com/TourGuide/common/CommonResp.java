package com.TourGuide.common;

import javax.servlet.http.HttpServletResponse;

public class CommonResp {
	
	public static void SetUtf(HttpServletResponse resp) {
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("UTF-8");
		resp.setHeader("content-type", "text/html;charset=UTF-8");
		resp.setContentType("application/json");
		//允许所有的客户端进行访问
		resp.setHeader("Access-Control-Allow-Origin","*");
	}

}
