package com.TourGuide.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.TourGuide.common.CommonResp;
import com.TourGuide.model.ScenicTickets;
import com.TourGuide.service.ScenicSpotService;
import com.TourGuide.service.ScenicTicketService;
import com.google.gson.Gson;

@Controller
public class ScenicSpotController {

	@Autowired
	public ScenicSpotService scenicSpotService;
	
	@Autowired
	public ScenicTicketService scenicTicketService;
	
	/**
	 * 推荐景点
	 * 根据用户的位置（省份），获取对应省份的热门景点
	 * @param resp
	 * @param province  用户当前所在的省份
	 * @throws IOException
	 */
	@RequestMapping(value = "/getScenicByLocation.do")
	public void getScenicByLocation(HttpServletResponse resp,
			@RequestParam("province") String province) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = scenicSpotService.getScenicByLocation(province);

		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(list));
		writer.flush();
	}
	
		
	/**
	 * 当用户点击【更多】时的响应
	 * 显示数据库内的所有景点信息,并按景区等级降序排列
	 * @param resp
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="getAllScenics.do")
	@ResponseBody
	public Object getAllScenicByLocation(HttpServletResponse resp) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = scenicSpotService.getAllScenics();
		
		return list;
	}
	
	
	/**
	 * 根据景区编号，查看景区的详细信息
	 * @param resp
	 * @param scenicID   景区编号
	 * @return 景区详细信息
 	 * 景区图片、编号、名称、简介、省、市、详细位置、等级、历史参观人数、开放时间
	 * @throws IOException
	 */
	@RequestMapping(value = "/getDetailScenicByScenicID.do")
	@ResponseBody
	public Object getDetailScenicByScenicID(HttpServletResponse resp,
			@RequestParam("scenicID") String scenicID) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = scenicSpotService.getDetailScenicByScenicID(scenicID);
		
		return list;
	}
	
	
	/**
	 * 根据景区的名称进行搜索，搜索对应景区的详细信息。
	 * @param scenicName  景区的名称，景区名必须和数据库的一致（客户端完成）
	 * @return
	 */
	@RequestMapping(value = "/getScenicByName.do")
	@ResponseBody
	public Object getScenicByName(HttpServletResponse resp,
			@RequestParam("scenicName") String scenicName) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = scenicSpotService.getScenicByName(scenicName);
		
		return list;
	}
	
	
	
	/**
	 * 根据搜索的特定的景区的地址，进行相关的景区推荐，暂定推荐数为4个
	 * @param name 景区的名称
	 * @return 相关的推荐景区的信息。
	 * 景区图片、编号、名称
	 */
	@RequestMapping(value = "/getScenicRelatesByName.do")
	@ResponseBody
	public Object getScenicRelatesByName(HttpServletResponse resp,
			@RequestParam("scenicName") String scenicName) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = scenicSpotService.getScenicRelatesByName(scenicName);
		
		return list;
	}
	
	
	
	/**
	 * 根据景区编号，查询该景区的门票信息
	 * @param resp
	 * @param scenicNo   景区编号
	 * @throws IOException
	 */
	@RequestMapping(value = "/geTicketsByScenicNo.do")
	public void geTicketsByScenicNo(HttpServletResponse resp,
			@RequestParam("scenicNo") String scenicNo) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		ScenicTickets scenicTickets = scenicTicketService.geTicketsByScenicNo(scenicNo);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(scenicTickets));
		writer.flush();
	}
	
	
	
	/**
	 * 根据景区名称，搜索名称相似的景区
	 * @param resp
	 * @param scenicName 景区名称
	 * 
	 * @return  相似景区的名称、编号
	 * @throws IOException
	 */
	@RequestMapping(value = "/getNameSimilarScenics.do")
	@ResponseBody
	public Object getNameSimilarScenics(HttpServletResponse resp,
			@RequestParam("scenicName") String scenicName) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> listResult = new ArrayList<>();
		listResult = scenicSpotService.getNameSimilarScenics(scenicName);
		
		return listResult;
	}
	
	
	
	/**
	 * 根据景区的编号， 查询景区的信息,景区名称、图片
	 * @param resp
	 * @param scenicID  景区的编号
	 * @return  景区名称、图片
	 * @throws IOException
	 */
	@RequestMapping(value = "/getSomeScenicInfoByscenicID.do")
	@ResponseBody
	public Object getSomeScenicInfoByscenicID(HttpServletResponse resp,
			@RequestParam("scenicID") String scenicID) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> listResult = new ArrayList<>();
		listResult = scenicSpotService.getSomeScenicInfoByscenicID(scenicID);
		
		return listResult;
	}
	
	
	/**
	 * 暂时作废
	 * 
	 * 根据用户的当前所在的省份，获取该省份的所有景点
	 * @param resp
	 * @param province  用户当前所在的省份
	 * @throws IOException
	 * @return 景区图片、编号、名称
	 */
//	@RequestMapping(value = "/getAllScenicByLocation.do")
//	@ResponseBody
//	public Object getAllScenicByLocation(HttpServletResponse resp,
//			@RequestParam("province") String province) throws IOException{
//		
//		CommonResp.SetUtf(resp);
//		
//		List<Map<String , Object>> list = scenicSpotService.getAllScenicByLocation(province);
//		
//		return list;
//	}
}
