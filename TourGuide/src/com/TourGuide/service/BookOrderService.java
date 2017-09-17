package com.TourGuide.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.BookOrderDao;

@Service
public class BookOrderService {
	
	@Autowired
	public BookOrderDao bookOrderDao;
	
	/**
	 * 将游客自己发布的预约订单存入数据库
	 * @param bookOrderID  订单编号，使用JDK的UUID产生
	 * @param scenicID  游客所预约的景区对应的景区编号
	 * @param produceTime  该订单的生成时间
	 * @param visitTime  游客参观的时间
	 * @param visitNum   参观的人数
	 * @param language  讲解员的讲解语言
	 * @param guideSex   讲解员的性别
	 * @param visitorPhone   游客的手机号
	 * @param visitorName   游客的姓名
	 * @param priceRange   游客可接受的价位区间
	 * @param purchaseTicket  是否代购门票
	 * @param otherCommand    其他需求
	 * @param releaseByVisitor  标志该订单是由游客自己发布的
	 * @param orderState 订单的状态
	 * @param totalTicket 门票费总额
	 * @param halfPrice  若代购门票，购买半价票的人数
	 * @param discoutPrice 若代购门票，购买折扣票的人数
	 * @param fullPrice  若代购门票，购买全价票的人数
	 * @return 发布订单是否成功，成功：1  失败：0
	 */
	public boolean ReleaseBookOrder(String bookOrderID, String scenicID, String produceTime,String visitTime, 
			int visitNum, String language, String guideSex, String visitorPhone,String visitorName, 
			int priceRange, int purchaseTicket, String otherCommand, int releaseByVisitor, String orderState,
			int totalTicket, int fullPriceNum, int discoutPriceNum, int halfPriceNum, 
			int fullPrice, int discoutPrice, int halfPrice,String contact){
		
		return bookOrderDao.ReleaseBookOrder(bookOrderID, scenicID, produceTime, 
				visitTime, visitNum, language, guideSex, visitorPhone, visitorName, 
				priceRange, purchaseTicket, otherCommand, releaseByVisitor, orderState,
				totalTicket, fullPriceNum, discoutPriceNum, halfPriceNum, 
				fullPrice, discoutPrice, halfPrice, contact);
	}
	
	
	/**
	 * 选定导游后，进行预约
	 * @param orderID  订单编号
	 * @param produceTime  订单生成时间
	 * @param guidePhone   导游手机号
	 * @param visitorPhone  游客手机号
	 * @param visitTime  参观时间
	 * @param scenicID   景区编号
	 * @param visitNum  参观人数
	 * @param purchaseTicket  是否代购门票
	 * @param halfPrice  若代购门票，购买半价票的人数
	 * @param discoutPrice 若代购门票，购买折扣票的人数
	 * @param fullPrice  若代购门票，购买全价票的人数
	 * @param totalTicket  门票总额
	 * @param guideFee   讲解费
	 * @param totalGuideFee  讲解费总额
	 * @param totalMoney  门票总额 + 讲解费总额
	 * @return
	 * @throws SQLException 
	 */
	public int BookOrderWithGuide(String orderID, String produceTime, String guidePhone, 
			String visitorPhone, String visitTime, String scenicID, 
			int visitNum, int guideFee, String contactPhone, String language, String visitorName) throws SQLException{
		return bookOrderDao.BookOrderWithGuide(orderID, produceTime, guidePhone, 
				visitorPhone, visitTime, scenicID, visitNum, guideFee, contactPhone, language, visitorName);
	}
	
	
	/**
	 * 讲解员查看游客发布的预约订单（简要信息）
	 * @param timeNow  当前的时间
	 * @return 订单号、景区名称、参观时间、人数、讲解员性别、讲解语言、可接受价位
	 */
	public List<Map<String , Object>> getReleasedOrders(String guidePhone){
		return bookOrderDao.getReleasedOrders(guidePhone);
	}
	
	
	/**
	 * 讲解员根据订单编号查看游客发布的预约订单（详细信息）
	 * @param orderID   订单编号
	 * @return
	 */
	public List<Map<String , Object>> getDetailedReleasedOrders(String orderID){
		return bookOrderDao.getDetailedReleasedOrders(orderID);
	}
	
	
	/**
	 * 讲解员接单
	 * @param orderID  订单编号
	 * @param guidePhone   讲解员手机号
	 * @return
	 */
	public boolean takeReleasedOrderByGuide(String orderID, String guidePhone){
		return bookOrderDao.takeReleasedOrderByGuide(orderID, guidePhone);
	}
	
	
	/**
	 * 讲解员查看被预约的还未讲解的订单
	 * @param guidePhone
	 * 查询条件：guidePhone、visitTime
	 * @return 订单编号、景区名称、参观时间、人数、讲解费
	 */
	public List<Map<String , Object>> getMyBookedOrder(String guidePhone){
		return bookOrderDao.getMyBookedOrder(guidePhone);
	}
	
	
	/**
	 * 讲解员查看被预约的已经完成的订单
	 * @param guidePhone  讲解员手机号
	 * @return
	 */
	public List<Map<String , Object>> getFinishedBookedOrder(String guidePhone){
		return bookOrderDao.getFinishedBookedOrder(guidePhone);
	}
	
	/**
	 * 导游指定集合地点
	 * @param orderId 预约订单的订单号
	 * @param longitude  经度
	 * @param latitude  纬度
	 * @return
	 */
	public int uploadBookLocation(String orderId, String longitude, String latitude){
		return bookOrderDao.uploadBookLocation(orderId, longitude, latitude);		
	}
	
	
	/**
	 * 讲解员完成预约订单的讲解
	 * @param orderId
	 * @return
	 * @throws SQLException 
	 */
	public int finishOrderByGuide(String orderId) throws SQLException{
		return bookOrderDao.finishOrderByGuide(orderId);
	}
	
	
	/**
	 * 讲解员和游客之间进行扫码确认信息
	 * @param orderId
	 * @return 1--信息确认成功，0--失败
	 */
	public int doConfirm(String orderId){
		return bookOrderDao.doConfirm(orderId);
	}
	
	/**
	 * 填写游客未确认的原因
	 * @param orderId
	 * @return
	 */
	public int writeBookOrderReason(String orderId, String reason){
		return bookOrderDao.writeBookOrderReason(orderId, reason);
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * 
	 * @param currentPage
	 * @param pageRows
	 * @return
	 */
	
	public List<Map<String , Object>> GetBookorderBypage(int currentPage,int pageRows) 
	{
		return bookOrderDao.GetBookorderBypage(currentPage, pageRows);
	}
	
	/**
	 * 得到订单信息表的数目
	 * @return
	 * 2017-1-14 20:20:34
	 */
	public int GetBookorderCount() {
		return bookOrderDao.GetBookorderCount();
	}
	
	public List<Map<String , Object>> GetBookorderBySearch(int currentPage,int pageRows,String word,String value )
	{
		return bookOrderDao.GetBookorderBySearch(currentPage,pageRows,word, value);
	}
	
	public int GetBookorderBySearchCount(String word,String value)
	{
		return bookOrderDao.GetBookorderBySearchCount(word, value);
	}
}
