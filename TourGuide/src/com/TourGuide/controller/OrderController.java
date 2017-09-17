package com.TourGuide.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
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
import com.TourGuide.service.OrderService;
import com.google.gson.Gson;

@Controller
public class OrderController {

	@Autowired
	OrderService orderService;
	
	
	/**
	 * 根据用户的手机号，查询用户的所有订单
	 * @param resp
	 * @param visitorPhone  用户手机号
	 * @throws IOException
	 * 订单编号、参观时间、参观人数、景区名称、订单状态、总金额
	 */
	@RequestMapping(value = "/getAllOrders.do")
	public void getAllOrders(HttpServletResponse resp,
			@RequestParam("visitorPhone") String visitorPhone) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> listResult =orderService.getAllOrders(visitorPhone);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(listResult));
		writer.flush();
	}
	
	
	/**
	 * 游客删除自己的订单
	 * @param resp
	 * @param orderId
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/deleteOrderbyVisitor.do")
	@ResponseBody
	public Object deleteOrderbyVisitor(HttpServletResponse resp,
			@RequestParam("orderId") String orderId) throws IOException{
		
		CommonResp.SetUtf(resp);

		boolean bool = orderService.deleteOrderbyVisitor(orderId);
		
		return bool;
	}
	
	
	/**
	 * 导游删除已经讲解完成的订单
	 * @param resp
	 * @param orderId
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/deleteOrderbyGuide.do")
	@ResponseBody
	public Object deleteOrderbyGuide(HttpServletResponse resp,
			@RequestParam("orderId") String orderId) throws IOException{
		
		CommonResp.SetUtf(resp);

		boolean bool = orderService.deleteOrderbyGuide(orderId);
		
		return bool;
	}
	
	/**
	 * 根据订单编号，查看订单的详细信息
	 * @param resp
	 * @param orderID  订单编号
	 * @param orderState  订单状态
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getDetailOrderInfo.do")
	@ResponseBody
	public Object getDetailOrderInfo(HttpServletResponse resp,
			@RequestParam("orderID") String orderID) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String, Object>> listResult = new ArrayList<>();
		listResult = orderService.getDetailOrderInfo(orderID);
		
		return listResult;
	}
	
	
	/**
	 * 根据订单编号，讲解员查看自己的预约单的详情,包括游客的姓名、手机号
	 * @param resp
	 * @param orderID
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getGuideBookOrdersDetail.do")
	@ResponseBody
	public Object getGuideBookOrdersDetail(HttpServletResponse resp,
			@RequestParam("orderID") String orderID) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		Map<String, Object> map = orderService.getGuideBookOrdersDetail(orderID);
				
		return map;
	}

	
	/**
	 * 根据订单编号，讲解员查看自己的拼单订单的详情
	 * @param resp
	 * @param orderID
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getGuideConsistOrderDetail.do")
	@ResponseBody
	public Object getGuideConsistOrderDetail(HttpServletResponse resp,
			@RequestParam("orderID") String orderID) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		Map<String, Object> map = orderService.getGuideConsistOrderDetail(orderID);
				
		return map;
	}
	
	
	/**
	 * 讲解员查看自己的拼团订单中的游客的信息
	 * @param resp
	 * @param orderID
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getConsistVisitorInfo.do")
	@ResponseBody
	public Object getConsistVisitorInfo(HttpServletResponse resp,
			@RequestParam("orderID") String orderID) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String, Object>> list = orderService.getConsistVisitorInfo(orderID);
				
		return list;
	}
	
	
	/**
	 * 讲解员开始讲解
	 * @param resp
	 * @param orderId
	 * @return
	 * @throws IOException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/startVisit.do")
	@ResponseBody
	public Object startVisit(HttpServletResponse resp,
			@RequestParam("orderId") String orderId)throws IOException, SQLException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = orderService.startVisit(orderId);
		
		return bool;
	}
}
