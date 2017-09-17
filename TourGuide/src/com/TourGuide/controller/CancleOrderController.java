package com.TourGuide.controller;

import java.io.IOException;
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
import com.TourGuide.service.CancleOrderService;

@Controller
public class CancleOrderController {

	@Autowired
	private CancleOrderService cancleOrderService;
	
	
	/**
	 * 游客取消预约订单，预约单和发布预约单
	 * @param resp
	 * @param orderId
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/cancleBookOrder.do")
	@ResponseBody
	public Object cancleBookOrder(HttpServletResponse resp,
			@RequestParam("orderId") String orderId) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		int ret = cancleOrderService.cancleBookOrder(orderId);
		
		return ret;
	}
	
	
	/**
	 * 游客取消拼团订单
	 * @param resp
	 * @param orderId
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/cancleConsistOrder.do")
	@ResponseBody
	public Object cancleConsistOrder(HttpServletResponse resp,
			@RequestParam("orderId") String orderId) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		int ret = cancleOrderService.cancleConsistOrder(orderId);
		
		return ret;
	}
}
