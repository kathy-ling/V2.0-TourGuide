package com.TourGuide.controller;

import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;

import com.TourGuide.weixin.util.SignUtil;

public class CheckSignature extends HttpServlet {
	
	public void service(javax.servlet.ServletRequest request, 
			javax.servlet.ServletResponse response) 
					throws javax.servlet.ServletException ,java.io.IOException {
		
		// 微信加密签名
		String signature = request.getParameter("signature");
		// 时间戳
		String timestamp = request.getParameter("timestamp");
		// 随机数
		String nonce = request.getParameter("nonce");
		// 随机字符串
		String echostr = request.getParameter("echostr");

		PrintWriter out = response.getWriter();
		// 请求校验，若校验成功则原样返回echostr，表示接入成功，否则接入失败
		if (SignUtil.checkSignature(signature, timestamp, nonce)) {
			out.print(echostr);
		}
		out.close();
		out = null;
		
	};
	
	

}
