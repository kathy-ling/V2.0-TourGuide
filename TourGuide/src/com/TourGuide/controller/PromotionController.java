package com.TourGuide.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.TourGuide.common.CommonResp;
import com.TourGuide.model.Promotion;
import com.TourGuide.service.PromotionService;
import com.TourGuide.service.VisitorService;
import com.google.gson.Gson;

@Controller
@SessionAttributes("visitorSession")
public class PromotionController {

	@Autowired
	public PromotionService promotionService;
	
	@Autowired
	private VisitorService visitorService;
	
	/**
	 * 获取首页的活动信息，暂定返回五个
	 * @param resp
	 * @throws IOException
	 */
	@RequestMapping(value = "/getPromotions.do")
	public void getPromotions(HttpServletResponse resp) throws IOException{
		
		CommonResp.SetUtf(resp);
		

		List<Map<String, Object>> list = promotionService.getPromotions();
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(list));
		writer.flush();		
	}
	
	
	/**
	 * 根据景区编号，查询该景区的活动信息
	 * @param resp
	 * @throws IOException
	 */
	@RequestMapping(value = "/getScenicPromotions.do")
	public void getScenicPromotions(HttpServletResponse resp,
			@RequestParam("scenicNo") String scenicNo) throws IOException{
		
		CommonResp.SetUtf(resp);
		

		List<Map<String, Object>> list = promotionService.getScenicPromotions(scenicNo);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(list));
		writer.flush();		
	}
}
