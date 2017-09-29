package com.TourGuide.Servlet;


import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.TourGuide.weixin.util.SignUtil;
import com.TourGuide.weixin.util.weixinCoreService;


public class weixinServlet extends HttpServlet {

	private static final long serialVersionUID = 4440739483644821986L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		// 微信加密签名
		String signature = request.getParameter("signature");
		System.out.println("signature:"+signature);
		// 时间戳
		String timestamp = request.getParameter("timestamp");
		System.out.println("timestamp"+timestamp);
		// 随机数
		String nonce = request.getParameter("nonce");
		System.out.println("nonce"+nonce);
		// 随机字符串
		String echostr = request.getParameter("echostr");
		System.out.println("timestamp"+timestamp);
		PrintWriter out = response.getWriter();
		// 请求校验，若校验成功则原样返回echostr，表示接入成功，否则接入失败
		if (SignUtil.checkSignature(signature, timestamp, nonce)) {
			out.print(echostr);
		}
		out.close();
		out.flush();
	}

	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		// 接收参数微信加密签名、 时间戳、随机数
		String signature = request.getParameter("signature");
		System.out.println("signature:"+signature);
		String timestamp = request.getParameter("timestamp");
		System.out.println("timestamp"+timestamp);
		String nonce = request.getParameter("nonce");
		System.out.println("nonce"+nonce);
		PrintWriter out = response.getWriter();
		// 请求校验
		if (SignUtil.checkSignature(signature, timestamp, nonce)) {
			// 调用核心服务类接收处理请求
			String respXml = weixinCoreService.processRequest(request);
			out.print(respXml);
		}
		out.close();
		out.flush();
	}
}

