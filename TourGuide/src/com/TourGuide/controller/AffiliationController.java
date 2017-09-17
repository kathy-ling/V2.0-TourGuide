package com.TourGuide.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.TourGuide.common.CommonResp;
import com.TourGuide.service.AffiliationService;
import com.google.gson.Gson;

@Controller
public class AffiliationController {

	@Autowired
	private AffiliationService affiliationService;
	
	
	/**
	 * 导游选中景区后，申请挂靠
	 * @param resp
	 * @param guidePhone  导游手机号
	 * @param scenicID  景区编号
	 * @return
	 * @throws IOException
	 * @throws SQLException 
	 */
	@RequestMapping(value = "/applyForAffiliation.do")
	@ResponseBody
	public Object applyForAffiliation(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone, 
			@RequestParam("scenicID") String scenicID) throws IOException, SQLException{
		
		CommonResp.SetUtf(resp);
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String applyDate = dateFormat.format(new Date());
		
		int bool = affiliationService.applyForAffiliation(guidePhone, scenicID, applyDate);
		
		return bool;
	}
	
	
	/**
	 * 取消导游所挂靠的景区
	 * @param guidePhone  导游手机号
	 * @param scenicID   景区编号
	 * @return
	 * @throws SQLException 
	 */
	@RequestMapping(value = "/cancleAffiliation.do")
//	@ResponseBody
	public void cancleAffiliation(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone, 
			@RequestParam("scenicID") String scenicID) throws IOException, SQLException{
		
		CommonResp.SetUtf(resp);
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String quitDate = dateFormat.format(new Date());
		
		boolean bool = affiliationService.cancleAffiliation(guidePhone, scenicID, quitDate);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(bool));
		writer.flush();
	}
	
	
	
	/**
	 * 查看该导游的挂靠景区记录
	 * @param resp
	 * @param guidePhone  手机号
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getHistoryAffiliation.do")
	@ResponseBody
	public Object getHistoryAffiliation(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = new ArrayList<>();
		
		list = affiliationService.getHistoryAffiliation(guidePhone);
		
		return list;
	}
	
	
	/**
	 * 查看该导游的当前挂靠景区
	 * @param resp
	 * @param guidePhone
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/getCurrentAffiliation.do")
	@ResponseBody
	public Object getCurrentAffiliation(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		Map<String , Object> map = new HashMap<String, Object>();
		
		map = affiliationService.getCurrentAffiliation(guidePhone);
		
		return map;
	}
	
	
	/**
	 * 查看该导游当前de挂靠申请
	 * @param resp
	 * @param guidePhone
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/getCurrentApply.do")
	@ResponseBody
	public Object getCurrentApply(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		Map<String , Object> map = new HashMap<String, Object>();
		
		map = affiliationService.getCurrentApply(guidePhone);
		
		return map;
	}
}
