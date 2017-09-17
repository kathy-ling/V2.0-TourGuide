package com.TourGuide.Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.TourGuide.model.WeixinOauth2Token;
import com.TourGuide.weixin.util.GetWxOrderno;
import com.TourGuide.weixin.util.Oauth2Util;
import com.TourGuide.weixin.util.RequestHandler;
import com.TourGuide.weixin.util.TenpayUtil;
import com.TourGuide.weixin.util.TokenUtil;
import com.google.gson.Gson;

import net.sf.json.JSONObject;
import com.TourGuide.common.CommonResp;

public class topayServlet extends HttpServlet{
	
	//商户相关资料 
	public static String appid = "wx6e58a089f2d129f4";
	public static String appsecret = "97c82f3f6361f239362c34ed096f9c1d";
	public static String partner = "1482391452";
	public static String partnerkey = "97c82f3f6361f239362c34ed096f9c1d";
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		CommonResp.SetUtf(response);
		
		System.out.println("进入topayServlet");	
		
		Random random=new Random();
		String openId = request.getParameter("openId");
		String orderNo = "1482391452aaabbb"+random.nextInt(99999999);
		String money = request.getParameter("money");
		
		System.out.println("openId="+openId);	
		System.out.println("money"+money);					
		
		//金额转化为分为单位
		Double doubleMoney = Double.parseDouble(money);
		String finalmoney = doubleMoney * 100 + "";
/*		float sessionmoney = Float.parseFloat(money);
		String finalmoney = String.format("%.2f", sessionmoney);
		finalmoney = finalmoney.replace(".", "");*/
		
		String currTime = TenpayUtil.getCurrTime();
		String strTime = currTime.substring(8, currTime.length());
		String strRandom = TenpayUtil.buildRandom(4) + "";
		String strReq = strTime + strRandom;
		
		//商户号
		String mch_id = partner;
		String nonce_str = strReq;
		String body = "支付测试";
		String out_trade_no = orderNo;
		String spbill_create_ip = "202.200.112.54";
		String notify_url ="http://www.zhoudaoly.com/TourGuide/NotifyServlet";
		
		String trade_type = "JSAPI";
		String openid = openId;
		SortedMap<String, String> packageParams = new TreeMap<String, String>();
		packageParams.put("appid", appid);  
		packageParams.put("mch_id", mch_id);  
		packageParams.put("nonce_str", nonce_str);  
		packageParams.put("body", body); 
		packageParams.put("out_trade_no", out_trade_no);  
		packageParams.put("total_fee", finalmoney);  
		packageParams.put("spbill_create_ip", spbill_create_ip);  
		packageParams.put("notify_url", notify_url);  		
		packageParams.put("trade_type", trade_type);  
		packageParams.put("openid", openid);  
	
		RequestHandler reqHandler = new RequestHandler(request, response);
		reqHandler.init(appid, appsecret, partnerkey);
		String sign = reqHandler.createSign(packageParams);
		String xml="<xml>"+
				"<appid>"+appid+"</appid>"+
				"<mch_id>"+mch_id+"</mch_id>"+
				"<nonce_str>"+nonce_str+"</nonce_str>"+
				"<sign>"+sign+"</sign>"+
				"<body><![CDATA["+body+"]]></body>"+				
				"<out_trade_no>"+out_trade_no+"</out_trade_no>"+
				//金额，这里写的1 分到时修改
				"<total_fee>"+finalmoney+"</total_fee>"+
				"<spbill_create_ip>"+spbill_create_ip+"</spbill_create_ip>"+
				"<notify_url>"+notify_url+"</notify_url>"+
				"<trade_type>"+trade_type+"</trade_type>"+
				"<openid>"+openid+"</openid>"+
				"</xml>";
		String allParameters = "";
		try {
			allParameters =  reqHandler.genPackage(packageParams);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String createOrderURL = "https://api.mch.weixin.qq.com/pay/unifiedorder";
		String prepay_id="";
		try {
			prepay_id = new GetWxOrderno().getPayNo(createOrderURL, xml);
			System.out.println("prepay_id:======"+prepay_id);
			if(prepay_id.equals("")){
				request.setAttribute("ErrorMsg", "统一支付接口获取预支付订单出错");
				response.sendRedirect("error.jsp");
			}
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		SortedMap<String, String> finalpackage = new TreeMap<String, String>();
		String appid2 = appid;
		String timestamp = String.valueOf(System.currentTimeMillis() / 1000);
		String nonceStr2 = nonce_str;
		String prepay_id2 = prepay_id;
		String packages = "prepay_id="+prepay_id2;
		finalpackage.put("appId", appid2);  
		finalpackage.put("timeStamp", timestamp);  
		finalpackage.put("nonceStr", nonceStr2);  
		finalpackage.put("package", packages);  
		finalpackage.put("signType", "MD5");
		String finalsign = reqHandler.createSign(finalpackage);
		
		//System.out.println("pay.jsp?appid="+appid2+"&timeStamp="+timestamp+"&nonceStr="+nonceStr2+"&package="+packages+"&sign="+finalsign);
//		response.sendRedirect("");
//		response.sendRedirect("/TourGuide/web/FastPin.html?appId="+appid2+"&timeStamp="+timestamp+"&nonceStr="+nonceStr2+"&package="+packages+"&sign="+finalsign);
		Map<String, Object> map = new HashMap<>();
		map.put("appId", appid2);
		map.put("timeStamp", timestamp);
		map.put("nonceStr", nonceStr2);
		map.put("packageValue", packages);
		map.put("sign", finalsign);
		System.out.println("输出完毕"+map.toString());
		PrintWriter writer = response.getWriter();
		writer.write(new Gson().toJson(map).toString());
		writer.close();
		writer.flush();	
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}

}
