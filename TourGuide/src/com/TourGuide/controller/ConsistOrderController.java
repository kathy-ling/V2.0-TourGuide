package com.TourGuide.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.TourGuide.common.CommonResp;
import com.TourGuide.common.DateConvert;
import com.TourGuide.common.MyDateFormat;
import com.TourGuide.common.TotalMoney;
import com.TourGuide.model.ConsistOrder;
import com.TourGuide.model.ConsistResult;
import com.TourGuide.model.IntroFeeAndMaxNum;
import com.TourGuide.model.ScenicTickets;
import com.TourGuide.service.ConsistOrderService;
import com.TourGuide.service.IntroFeeAndMaxNumService;
import com.TourGuide.service.ScenicSpotService;
import com.TourGuide.service.ScenicTicketService;
import com.google.gson.Gson;

@Controller
public class ConsistOrderController {
	
	@Autowired
	IntroFeeAndMaxNumService introFeeAndMaxNumService;
	
	@Autowired
	private ScenicSpotService scenicSpotService;
	
	@Autowired
	ConsistOrderService consistOrderService;
	
	@Autowired
	ScenicTicketService scenicTicketService;
	
	private final String orderState = "待接单";  //游客刚发布的拼单的状态为“待接单”
	
	private int isConsisted = 0;  //游客刚发布的拼单，没有被拼单
	
	
	/**
	 * 查询某天该景区的拼单讲解费
	 * @param resp
	 * @param scenicID  景区编号
	 * @param date   日期
	 * @throws IOException
	 */
	@RequestMapping(value = "/getIntroFee.do")
	public void getIntroFee(HttpServletResponse resp,
			@RequestParam("scenicName") String scenicName, 
			@RequestParam("date") String date) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		String scenicID = null;
		
		List<Map<String, Object>> scenicSpotInfo = scenicSpotService.getScenicByName(scenicName);
		if(scenicSpotInfo.size() != 0){
			scenicID = (String) scenicSpotInfo.get(0).get("scenicNo");
		}
		 
		
		//讲解费,？元/人		
		IntroFeeAndMaxNum introFeeAndMaxNum = 
				introFeeAndMaxNumService.getIntroFeeAndMaxNum(date,scenicID);
		int fee = introFeeAndMaxNum.getFee();
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(fee));
		writer.flush();
	}
	
	
	
	
	/**
	 * 将游客自己发布的拼单订单存入数据库
	 * @param resp
	 * @param scenicName  景区名称
	 * @param visitTime  游客参观的时间
	 * @param visitNum    参观的人数
	 * @param visitorPhone   游客的手机号
	 * @param contact  订单联系人
	 * @return
	 * @throws IOException
	 * @throws SQLException 
	 * @throws NumberFormatException 
	 */
	@RequestMapping(value = "/releaseConsistOrder.do")
	@ResponseBody
	public Object releaseConsistOrder(HttpServletResponse resp,
			@RequestParam("scenicName") String scenicName, 
			@RequestParam("visitTime") String visitTime, 
			@RequestParam("visitNum") String visitNum,
			@RequestParam("visitorPhone") String visitorPhone,
			@RequestParam("contact") String contact
//			@RequestParam("purchaseTicket") String purchaseTicket,
//			@RequestParam("halfPrice") String halfPrice,
//			@RequestParam("discoutPrice") String discoutPrice,
//			@RequestParam("fullPrice") String fullPrice
			) throws IOException, NumberFormatException, SQLException{
		
		//releaseConsistOrder.do?scenicName=秦始皇兵马俑&visitTime=2017-03-22 15:00&visitNum=10&visitorPhone=18191762572
		
		CommonResp.SetUtf(resp);
		
		String consistOrderID = UUID.randomUUID().toString().replace("-", "");
		String orderID = UUID.randomUUID().toString().replace("-", "");
		String produceTime = MyDateFormat.form(new Date());
		
//		//查询该景区的门票信息
//		ScenicTickets scenicTickets = scenicTicketService.geTicketsByScenicNo(scenicID);
		
		List<Map<String, Object>> scenicSpotInfo = scenicSpotService.getScenicByName(scenicName);
		String scenicID = (String) scenicSpotInfo.get(0).get("scenicNo");
		
		//查询该景区该日的讲解费、最大可拼单人数
		String[] date = visitTime.toString().split(" ");
		IntroFeeAndMaxNum introFeeAndMaxNum = 
				introFeeAndMaxNumService.getIntroFeeAndMaxNum(date[0], scenicID);
		
		int fee = introFeeAndMaxNum.getFee();
		int totalFee = Integer.parseInt(visitNum) * fee  ;
		
//		int maxNum = introFeeService.getMaxNum(date[0], scenicID);
//		int fee = introFeeService.getIntroFee(date[0], scenicID);
		
		//订单相关的计算
//		List<Integer> money = TotalMoney.getMoney(fee, Integer.parseInt(visitNum), Integer.parseInt(purchaseTicket), 
//				scenicTickets.getHalfPrice(), scenicTickets.getDiscoutPrice(), scenicTickets.getFullPrice(), 
//				Integer.parseInt(halfPrice), Integer.parseInt(discoutPrice), Integer.parseInt(fullPrice));
		
//		int totalFee = money.get(0);  //讲解费总额
//		int totalTicket = money.get(1);  //门票费总额
//		int totalMoney = money.get(2);  //讲解费总额 + 门票费总额
		
		boolean bool = consistOrderService.ReleaseConsistOrder(consistOrderID, orderID, 
				scenicID, produceTime, visitTime, Integer.parseInt(visitNum), visitorPhone,
				contact, orderState, isConsisted, introFeeAndMaxNum.getMaxNum(), totalFee, fee);
		
		return bool;
	}
	
	
	
	/**
	 * 查询数据库中的当前可拼单的订单
	 * @param resp
	 * @throws IOException
	 */
	@RequestMapping(value = "/getAllAvailableConsistOrder.do")
	public void getAllAvailableConsistOrder(HttpServletResponse resp)throws IOException{
		
		CommonResp.SetUtf(resp);	
		
		List<Map<String , Object>> list = consistOrderService.getAllAvailableConsistOrder();
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(list));
		writer.flush();
	}

	
	/**
	 * 根据条件，筛选可拼单的订单
	 * @param scenicName   景区名称
	 * @param visitDate  日期
	 * @param visitNum  参观人数
	 */
	@RequestMapping(value = "/getConsistOrderWithSelector.do")
	@ResponseBody
	public Object getConsistOrderWithSelector(HttpServletResponse resp,
			@RequestParam("scenicName") String scenicName, 
			@RequestParam("visitDate") String visitDate, 
			@RequestParam("visitNum") String visitNum)throws IOException{
		//scenicName=秦始皇兵马俑&visitDate=2017-3-22&visitNum=3
		CommonResp.SetUtf(resp);	
		
		List<Map<String , Object>> list = consistOrderService.
				getConsistOrderWithSelector(scenicName, visitDate, Integer.parseInt(visitNum));
		
		return list;
	}
	
	
	/**
	 * 从可拼单列表中选择订单，进行拼单
	 * 
	 * @param resp
	 * @param orderID  订单编号
	 * @param visitNum  拼单的参观人数
	 * @param visitorPhone  游客的手机
	 * @param contact  游客在订单中填写的联系人手机号
	 * @return
	 * @throws IOException
	 * @throws SQLException 
	 * @throws NumberFormatException 
	 */
	@RequestMapping(value = "/consistWithconsistOrderID.do")
	@ResponseBody
	public Object consistWithconsistOrderID(HttpServletResponse resp,
			@RequestParam("orderID") String orderID,  
			@RequestParam("visitNum") String visitNum,
			@RequestParam("visitorPhone") String visitorPhone,
			@RequestParam("contact") String contact
//			@RequestParam("purchaseTicket") String purchaseTicket,
//			@RequestParam("halfPrice") String halfPrice,
//			@RequestParam("discoutPrice") String discoutPrice,
//			@RequestParam("fullPrice") String fullPrice
			) throws IOException, NumberFormatException, SQLException{
		//orderID=2ac019d156e4402e9dcdeaa59cc636c9&visitNum=2&visitorPhone=18191762572&contact=13698742569
		CommonResp.SetUtf(resp);
		
		String consistOrderID = UUID.randomUUID().toString().replace("-", "");
		String produceTime = MyDateFormat.form(new Date());
		
		//查询该拼单结果的详细信息
		ConsistResult consistResult = consistOrderService.getDetailConsistResult(orderID);
		int currentNum = consistResult.getVisitNum();
		int maxNum = consistResult.getMaxNum();
		String scenicID = consistResult.getScenicID();
		String visitTime = consistResult.getVisitTime();
		
		currentNum = currentNum + Integer.parseInt(visitNum);
		
		String[] date = visitTime.toString().split(" ");
		IntroFeeAndMaxNum introFeeAndMaxNum = 
				introFeeAndMaxNumService.getIntroFeeAndMaxNum(date[0], scenicID);
		int fee = introFeeAndMaxNum.getFee();
		int totalFee = Integer.parseInt(visitNum) * fee;
		
//		//查询该景区的门票信息
//		ScenicTickets scenicTickets = scenicTicketService.geTicketsByScenicNo(scenicID);		
//		//计算每个订单的应付总额
//		List<Integer> money= TotalMoney.getMoney(fee, Integer.parseInt(visitNum), Integer.parseInt(purchaseTicket), 
//				scenicTickets.getHalfPrice(), scenicTickets.getDiscoutPrice(), scenicTickets.getFullPrice(), 
//				Integer.parseInt(halfPrice), Integer.parseInt(discoutPrice), Integer.parseInt(fullPrice));
//		int totalFee = money.get(0);  //讲解费总额
//		int totalTicket = money.get(1);  //门票费总额
//		int totalMoney = money.get(2);  //讲解费总额 + 门票费总额
		
		isConsisted = 1;
		
		boolean bool = consistOrderService.consistWithconsistOrderID(orderID, 
				consistOrderID, scenicID, produceTime, visitTime, 
				Integer.parseInt(visitNum), visitorPhone, contact, currentNum,
			    orderState, isConsisted, maxNum,totalFee, fee);
		
		return bool;
	}
	
	
	/**
	 * 筛选讲解员未讲解的订单(拼单和快捷拼单)
	 * @param resp
	 * @param guidePhone
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getUndoGuideOrder.do")
	@ResponseBody
	public Object getUndoGuideOrder(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone)throws IOException{
		//scenicName=秦始皇兵马俑&visitDate=2017-3-22&visitNum=3
		CommonResp.SetUtf(resp);	
		
		List<Map<String , Object>> list = consistOrderService.getUndoGuideOrder(guidePhone);				
		
		return list;
	}
	
	
	/**
	 * 筛选讲解员已经讲解完成讲解的订单(拼单和快捷拼单)
	 * @param resp
	 * @param guidePhone
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getFinishedGuideOrder.do")
	@ResponseBody
	public Object getFinishedGuideOrder(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone)throws IOException{
		//scenicName=秦始皇兵马俑&visitDate=2017-3-22&visitNum=3
		CommonResp.SetUtf(resp);	
		
		List<Map<String , Object>> list = consistOrderService.getFinishedGuideOrder(guidePhone);				
		
		return list;
	}
	
	
	/**
	 * 导游指定集合地点
	 * @param resp
	 * @param orderId 拼单订单的订单号（导游的订单号）
	 * @param longitude  经度
	 * @param latitude  纬度
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/uploadConsistLocation.do")
	@ResponseBody
	public Object uploadConsistLocation(HttpServletResponse resp,
			@RequestParam("orderId") String orderId,
			@RequestParam("longitude") String longitude,
			@RequestParam("latitude") String latitude) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		int ret = consistOrderService.uploadConsistLocation(orderId, longitude, latitude);
		
		return ret;
	}
	
	
	/**
	 * 讲解员完成拼单订单的讲解
	 * @param resp
	 * @param orderId
	 * @return
	 * @throws IOException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/finishConsistOrderByGuide.do")
	@ResponseBody
	public Object finishConsistOrderByGuide(HttpServletResponse resp,
			@RequestParam("orderId") String orderId) throws IOException, SQLException{
	
		CommonResp.SetUtf(resp);
		
		int ret = consistOrderService.finishConsistOrderByGuide(orderId);
		
		return ret;
	}
	
	
	/**
	 * 填写拼单订单中游客未确认的原因
	 * @param resp
	 * @param orderId
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/writeConsitOrderReason.do")
	@ResponseBody
	public Object writeConsitOrderReason(HttpServletResponse resp,
			@RequestParam("orderId") String orderId,
			@RequestParam("reason") String reason,
			@RequestParam("visitorPhone") String visitorPhone )throws IOException{
	
		CommonResp.SetUtf(resp);
		
		int ret = consistOrderService.writeConsitOrderReason(orderId, reason, visitorPhone);
		
		return ret;
	}
	
}
