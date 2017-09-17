package com.TourGuide.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
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
import com.TourGuide.common.MyDateFormat;
import com.TourGuide.model.ScenicTickets;
import com.TourGuide.model.ScenicsSpotInfo;
import com.TourGuide.service.BookOrderService;
import com.TourGuide.service.GuideService;
import com.TourGuide.service.ScenicSpotService;
import com.TourGuide.service.ScenicTicketService;


@Controller
public class BookOrderController {

	@Autowired
	private BookOrderService bookOrderService;
	
	@Autowired
	private ScenicSpotService scenicSpotService;
	
	@Autowired
	private ScenicTicketService scenicTicketService;
	
	@Autowired
	private GuideService guideService;
	
	private final int releaseByVisitor = 1;  //是否是游客自己发布的订单
	private final String orderState = "待接单";  //游客刚发布的订单的状态为“待接单”
	
	
	/**
	 * 将游客自己发布的预约订单存入数据库
	 * @param resp
	 * @param scenicID  游客所预约的景区对应的景区编号
	 * @param visitTime  游客参观的时间
	 * @param visitNum   参观的人数
	 * @param language  讲解员的讲解语言
	 * @param guideSex   讲解员的性别
	 * @param visitorPhone   游客的手机号
	 * @param visitorName   游客的姓名
	 * @param priceRange   游客可接受的价位区间
	 * @param purchaseTicket  是否代购门票
	 * @param halfPrice  若代购门票，购买半价票的人数
	 * @param discoutPrice 若代购门票，购买折扣票的人数
	 * @param fullPrice  若代购门票，购买全价票的人数
	 * @param otherCommand    其他需求
	 * @throws IOException
	 */
	@RequestMapping(value = "/releaseBookOrder.do")
	@ResponseBody
	public Object releaseBookOrder(HttpServletResponse resp,
			@RequestParam("scenicName") String scenicName, 
			@RequestParam("visitTime") String visitTime, 
			@RequestParam("visitNum") String visitNum,
			@RequestParam("language") String language,
			@RequestParam("guideSex") String guideSex,
			@RequestParam("visitorPhone") String visitorPhone,
			@RequestParam("visitorName") String visitorName,
			@RequestParam("priceRange") String priceRange,
			@RequestParam("purchaseTicket") String purchaseTicket,
			@RequestParam("fullPrice") String fullPriceNum,
			@RequestParam("halfPrice") String halfPriceNum,
			@RequestParam("discoutPrice") String discoutPriceNum,
			@RequestParam("otherCommand") String otherCommand,
			@RequestParam("contact") String contact
			) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		String bookOrderID = UUID.randomUUID().toString().replace("-", "");
		String produceTime = MyDateFormat.form(new Date());
		
		List<Map<String, Object>> scenicSpotInfo = scenicSpotService.getScenicByName(scenicName);
		String scenicID = (String) scenicSpotInfo.get(0).get("scenicNo");
				
		//计算门票总额
		int totalTicket = 0;
		//景区门票的价格
		int halfPrice = 0, fullPrice = 0, discoutPrice = 0; 
		if(purchaseTicket.equals("0") || purchaseTicket == "0")
		{
			halfPriceNum = "0";
			fullPriceNum = "0";
			discoutPriceNum = "0";
		}
		else {
			//查询该景区的门票信息
			ScenicTickets scenicTickets = scenicTicketService.geTicketsByScenicNo(scenicID);
			halfPrice = scenicTickets.getHalfPrice();
			fullPrice = scenicTickets.getFullPrice();
			discoutPrice = scenicTickets.getDiscoutPrice();
			
			totalTicket= halfPrice * Integer.parseInt(halfPriceNum) +
					discoutPrice * Integer.parseInt(discoutPriceNum) +
					fullPrice * Integer.parseInt(fullPriceNum);
		}
			
		boolean bool = bookOrderService.ReleaseBookOrder(bookOrderID, scenicID, produceTime,
				visitTime, Integer.parseInt(visitNum), language, guideSex, 
				visitorPhone, visitorName, Integer.parseInt(priceRange), Integer.parseInt(purchaseTicket), 
				otherCommand, releaseByVisitor, orderState, totalTicket, 
				Integer.parseInt(fullPriceNum), Integer.parseInt(discoutPriceNum), Integer.parseInt(halfPriceNum),
				fullPrice, halfPrice, discoutPrice,contact);
		
		return bool;
	}

	
	
	/**
	 * 选定导游后，进行预约
	 * @param resp
	 * @param scenicName  景区名称
	 * @param visitTime 参观时间
	 * @param visitNum   参观人数
	 * @param guidePhone   导游手机号
	 * @param guideFee   导游的讲解费
	 * @param visitorPhone  游客手机号
	 * @param contactPhone  订单联系人手机号
	 * @return
	 * @throws IOException
	 * @throws SQLException 
	 * @throws NumberFormatException 
	 */
	@RequestMapping(value = "/BookOrderWithGuide.do")
	@ResponseBody
	public Object BookOrderWithGuide(HttpServletResponse resp,
			@RequestParam("scenicName") String scenicName, 
			@RequestParam("visitTime") String visitTime, 
			@RequestParam("visitNum") String visitNum,
			@RequestParam("guidePhone") String guidePhone,
			@RequestParam("guideFee") String guideFee,
			@RequestParam("visitorPhone") String visitorPhone,
			@RequestParam("contactPhone") String contactPhone,
			@RequestParam("language") String language,
			@RequestParam("visitorName") String visitorName
			) throws IOException, NumberFormatException, SQLException{
		//BookOrderWithGuide.do?scenicName=秦始皇兵马俑&visitTime=2017-4-12 14:00&visitNum=6&guidePhone=13823456789&guideFee=300&visitorPhone=18191762572&contactPhone=1111
		CommonResp.SetUtf(resp);
		
		String orderID = UUID.randomUUID().toString().replace("-", "");
		String produceTime = MyDateFormat.form(new Date());
		
		List<Map<String, Object>> scenicSpotInfo = scenicSpotService.getScenicByName(scenicName);
		String scenicID = (String) scenicSpotInfo.get(0).get("scenicNo");
		
		//查询该景区的门票信息
//		ScenicTickets scenicTickets = scenicTicketService.geTicketsByScenicNo(scenicID);
		
//		//计算门票总额
//		int totalTicket = scenicTickets.getHalfPrice() * Integer.parseInt(halfPrice) +
//				scenicTickets.getDiscoutPrice() * Integer.parseInt(discoutPrice) +
//				scenicTickets.getFullPrice() * Integer.parseInt(fullPrice);
		
//		//得到该讲解员的讲解费
//		List<Map<String , Object>> guideInfo = guideService.getDetailGuideInfoByPhone(guidePhone);
//		int guideFee = (int)guideInfo.get(0).get("guideFee");
//		
//		int totalMoney = totalTicket + guideFee;
		
		int ret = bookOrderService.BookOrderWithGuide(orderID, produceTime, guidePhone, 
				visitorPhone, visitTime, scenicID, Integer.parseInt(visitNum),
				Integer.parseInt(guideFee), contactPhone, language, visitorName);
		
		return ret;
	}
	
	
	
	/**
	 * 讲解员查看游客发布的预约订单（简要信息）
	 * @param resp
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getReleasedOrders.do")
	@ResponseBody
	public Object getReleasedOrders(HttpServletResponse resp, 
			@RequestParam("guidePhone") String guidePhone) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		String timeNow = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
		
		List<Map<String , Object>> list = bookOrderService.getReleasedOrders(guidePhone);
		
		return list;
	}
	
	
	
	/**
	 * 讲解员根据订单编号查看游客发布的预约订单（详细信息）
	 * @param resp
	 * @param orderID   订单编号
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getDetailedReleasedOrders.do")
	@ResponseBody
	public Object getDetailedReleasedOrders(HttpServletResponse resp,
			@RequestParam("orderID") String orderID) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = bookOrderService.getDetailedReleasedOrders(orderID);
		
		return list;
	}
	
	
	
	/**
	 * 讲解员接单
	 * @param resp
	 * @param orderID  订单编号
	 * @param guidePhone   讲解员手机号
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/takeReleasedOrderByGuide.do")
	@ResponseBody
	public Object takeReleasedOrderByGuide(HttpServletResponse resp,
			@RequestParam("orderID") String orderID,
			@RequestParam("guidePhone") String guidePhone) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		boolean bool = bookOrderService.takeReleasedOrderByGuide(orderID, guidePhone);
		
		return bool;
	}
	
	
	
	/**
	 * 讲解员查看被预约的还未讲解的订单
	 * @param resp
	 * @param guidePhone  讲解员手机号
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getMyBookedOrder.do")
	@ResponseBody
	public Object getMyBookedOrder(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = bookOrderService.getMyBookedOrder(guidePhone) ;
		
		return list;
	}
	
	
	/**
	 * 讲解员查看被预约的已经完成的订单
	 * @param resp
	 * @param guidePhone  讲解员手机号
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getFinishedBookedOrder.do")
	@ResponseBody
	public Object getFinishedBookedOrder(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = bookOrderService.getFinishedBookedOrder(guidePhone);
		
		return list;
	}
	
	
	/**
	 * 导游指定集合地点
	 * @param resp
	 * @param orderId 预约订单的订单号
	 * @param longitude  经度
	 * @param latitude  纬度
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/uploadBookLocation.do")
	@ResponseBody
	public Object uploadBookLocation(HttpServletResponse resp,
			@RequestParam("orderId") String orderId,
			@RequestParam("longitude") String longitude,
			@RequestParam("latitude") String latitude) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		int ret = bookOrderService.uploadBookLocation(orderId, longitude, latitude);
		
		return ret;
	}
	
	
	/**
	 * 讲解员完成预约订单的讲解
	 * @param orderId
	 * @return
	 * @throws SQLException 
	 */
	@RequestMapping(value = "/finishOrderByGuide.do")
	@ResponseBody
	public Object finishOrderByGuide(HttpServletResponse resp,
			@RequestParam("orderId") String orderId)throws IOException, SQLException{
	
		CommonResp.SetUtf(resp);
		
		int ret = bookOrderService.finishOrderByGuide(orderId);
		
		return ret;
	}
	
	
	/**
	 * 讲解员和游客之间进行扫码确认信息
	 * @param resp
	 * @param orderId
	 * @return 1--信息确认成功，0--失败
	 * @throws IOException
	 */
	@RequestMapping(value = "/doConfirm.do")
	@ResponseBody
	public Object doConfirm(HttpServletResponse resp,
			@RequestParam("orderId") String orderId)throws IOException{
	
		CommonResp.SetUtf(resp);
		
		int ret = bookOrderService.doConfirm(orderId);
		
		return ret;
	}
	
	
	/**
	 * 填写游客未确认的原因
	 * @param resp
	 * @param orderId
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/writeBookOrderReason.do")
	@ResponseBody
	public Object writeBookOrderReason(HttpServletResponse resp,
			@RequestParam("orderId") String orderId,
			@RequestParam("reason") String reason)throws IOException{
	
		CommonResp.SetUtf(resp);
		
		int ret = bookOrderService.writeBookOrderReason(orderId, reason);
		
		return ret;
	}
	
}
