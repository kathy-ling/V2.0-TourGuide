package com.TourGuide.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.TourGuide.common.CommonResp;
import com.TourGuide.service.GuideworkdayService;
import com.google.gson.Gson;

@Controller
public class GuideWorkdayController {

	@Autowired
	private GuideworkdayService guideworkdayService;
	
	/**
	 * 设置导游的工作时间，
	 * @param days 不工作的日期，如2017-1-12
	 * @param phone  手机号
	 * @throws IOException
	 */
	@RequestMapping(value = "/setGuideWorkday.do")
	public void setGuideWorkday(HttpServletResponse resp,
			@RequestParam("phone") String phone,
			@RequestParam("days") List<String> days) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = guideworkdayService.setGuideWorkday(days, phone);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(bool));
		writer.flush();
		
	}
	
	
	
	/**
	 * 导游签到
	 * @param resp
	 * @param phone  导游手机号
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/guideCheckIn.do")
	@ResponseBody
	public Object guideCheckIn(HttpServletResponse resp,
			@RequestParam("phone") String phone) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = guideworkdayService.guideCheckIn(phone);
		
		return bool;
	}
	
	
	
	/**
	 * 判断今天是否已经签到
	 * @param resp
	 * @param phone  导游手机号
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/whetherCheckIn.do")
	@ResponseBody
	public Object whetherCheckIn(HttpServletResponse resp,
			@RequestParam("phone") String phone) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = guideworkdayService.whetherCheckIn(phone);
		
		return bool;
	}
}
