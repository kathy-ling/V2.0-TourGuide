package com.TourGuide.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.TourGuide.common.CommonResp;
import com.TourGuide.common.MyDateFormat;
import com.TourGuide.service.EvaluateService;
import com.google.gson.Gson;

@Controller
public class EvaluateController {
	
	@Autowired
	private EvaluateService evaluateService;
	
	
	
	/**
	 * 发表评论
	 * @param resp
	 * @param orderID   订单编号（预约订单、拼单）
	 * @param evaluateContext  评价内容
	 * @param isAnonymous  是否匿名（1-匿名）
	 * @param star 评价星级（1-5）
	 * @return
	 * @throws IOException
	 * orderID=005ff64d497841af8ee4cce3df31b6ba&evaluateContext=很好&isAnonymous=1
	 */
	@RequestMapping(value = "/commentByVisitor.do")
	@ResponseBody
	public Object commentByVisitor(HttpServletResponse resp,
			@RequestParam("orderID") String orderID, 
			@RequestParam("evaluateContext") String evaluateContext, 
			@RequestParam("isAnonymous") String isAnonymous,
			@RequestParam("star1") String star1,
			@RequestParam("star2") String star2,
			@RequestParam("star3") String star3) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		String evaluateTime = MyDateFormat.form(new Date());
		
		int bool = evaluateService.commentByVisitor(orderID, evaluateContext, 
				evaluateTime, Integer.parseInt(isAnonymous), Integer.parseInt(star1),
				Integer.parseInt(star2),Integer.parseInt(star3));
		
		return bool;
		
	}
	
	
	/**
	 * 查看某个讲解员相关的历史评论
	 * @param resp
	 * @param guidePhone  讲解员的手机号
	 * @return  评价时间、评价内容、游客的昵称（若是匿名，则为“匿名用户”）
	 * @throws IOException
	 */
	@RequestMapping(value = "/getComments.do")
	@ResponseBody
	public void getComments(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String, Object>> list = new ArrayList<>();
		list = evaluateService.getComments(guidePhone);
		
//		System.out.println(list.get(0).get("evaluateTime"));
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(list));
		writer.flush();
	}

}
