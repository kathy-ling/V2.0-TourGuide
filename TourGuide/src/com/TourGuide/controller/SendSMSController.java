package com.TourGuide.controller;

import java.util.Random;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.TourGuide.SendSMS.JavaSmsApi;
import com.TourGuide.common.CommonResp;

/**
 * 短信发送
 * @author tian
 *
 */
@Controller
public class SendSMSController {

	@RequestMapping(value = "/SendSMS.do")
	@ResponseBody
	public  String  SendSMS(
			@RequestParam(value="phone")String SendPhone,HttpServletResponse resp) {
		CommonResp.SetUtf(resp);
		
		String string="0123456789";
		
		char[] c =string.toCharArray();
		
		Random random=new Random();
		
		String s="";
		
		for(int i=0; i<6;i++)
		{
			int j=random.nextInt(9);
			
			s=s+c[j];
		}
		
		String a= JavaSmsApi.SendSMSMain(SendPhone, s);
		if (a.equals("0")) {
			return "0";
		} else {
			return a ;
		}
		
		
	}
}
