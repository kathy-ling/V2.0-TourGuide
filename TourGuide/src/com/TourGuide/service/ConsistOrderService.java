package com.TourGuide.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.ConsistOrderDao;
import com.TourGuide.model.ConsistResult;

@Service
public class ConsistOrderService {
	
	@Autowired
	public ConsistOrderDao consistOrderDao;
	
	
	/**
	 * 
	 * @param consistOrderID  拼单编号
	 * @param orderID  
	 * @param scenicID  景区编号
	 * @param produceTime  订单生产时间
	 * @param visitTime 游客参观的时间
	 * @param visitNum  参观的人数
	 * @param visitorPhone  游客的手机号
	 * @param orderState  订单状态
	 * @param isConsisted  是否已经拼单
	 * @param maxNum  最大可拼单人数
	 * @param totalFee  讲解费总额
	 * @param fee 每个人的讲解费
	 * @return
	 * @throws SQLException 
	 */
	public boolean ReleaseConsistOrder(String consistOrderID, String orderID, String scenicID,
			String produceTime, String visitTime, int visitNum, String visitorPhone, 
			String contact,String orderState, int isConsisted, int maxNum, 
			int totalFee, int fee) throws SQLException{
		
		return consistOrderDao.ReleaseConsistOrder(consistOrderID, orderID, scenicID,
				produceTime, visitTime, visitNum, visitorPhone, contact,orderState, 
				isConsisted, maxNum, totalFee, fee);
	}
	
	
	
	/**
	 * 查询当前可拼单的订单
	 * @param scenicID  景区编号
	 * @param date   当前的时间
	 */
	public List<Map<String , Object>> getAllAvailableConsistOrder(){
		return consistOrderDao.getAllAvailableConsistOrder();
	}
	
	
	/**
	 * 根据条件，筛选可拼单的订单
	 * @param scenicName   景区名称
	 * @param date  日期
	 * @param visitNum  参观人数
	 * @return
	 */
	public List<Map<String , Object>> getConsistOrderWithSelector(String scenicName, 
			String date, int visitNum){
		return consistOrderDao.getConsistOrderWithSelector(scenicName, date, visitNum);
	}
	
	
	/**
	 * 从可拼单列表中选择订单，进行拼单
	 * @param orderID   订单编号，一个订单编号对应多个拼单编号
	 * @param consistOrderID  拼单编号
	 * @param scenicID    景区编号
	 * @param produceTime  订单生成时间
	 * @param visitTime  参观时间
	 * @param visitNum   参观人数
	 * @param visitorPhone  游客的手机号
	 * @param totalMoney  此拼单的金额
	 * @param purchaseTicket  是否代购门票
	 * @param orderState  拼单的状态
	 * @param isConsisted   是否被拼单
	 * @param maxNum
	 * @throws SQLException 
	 */
	public boolean consistWithconsistOrderID(String orderID, String consistOrderID,
			String scenicID, String produceTime, String visitTime, int visitNum,
			String visitorPhone, String contact,int currentNum, String orderState,
			int isConsisted, int maxNum, int totalFee, int fee) throws SQLException{
		
		return consistOrderDao.consistWithconsistOrderID(orderID, consistOrderID, scenicID, 
				produceTime, visitTime, visitNum, visitorPhone, contact, currentNum, 
				orderState, isConsisted, maxNum, totalFee, fee);
	}
	
	
	/**
	 * 根据订单编号，查询该订单中的所有拼单的编号
	 * @param orderID  订单编号
	 * @return
	 */
	public List<String> getConsistOrderIDsWithOrderID(String orderID){
		return consistOrderDao.getConsistOrderIDsWithOrderID(orderID);
	}
	
	
	/**
	 * 根据订单编号，查询每个拼单结果的详细信息
	 * @param OrderID  订单编号
	 * @return 订单编号、参观时间、当前人数、最大人数、景区编号
	 */
	public ConsistResult getDetailConsistResult(String OrderID){
		return consistOrderDao.getDetailConsistResult(OrderID);
	}


	/**
	 * 从t_consistResult中筛选讲解员未讲解的订单(拼单和快捷拼单)
	 * @param guidePhone
	 * @return
	 */
	public List<Map<String , Object>> getUndoGuideOrder(String guidePhone){
		return consistOrderDao.getUndoGuideOrder(guidePhone);
	}
	
	/**
	 * 从t_consistResult中筛选讲解员已经讲解完成的订单(拼单和快捷拼单)
	 * @param guidePhone
	 * @return
	 */
	public List<Map<String , Object>> getFinishedGuideOrder(String guidePhone){
		return consistOrderDao.getFinishedGuideOrder(guidePhone);
	}
	
	
	/**
	 * 导游指定集合地点
	 * @param orderId 预约订单的订单号
	 * @param longitude  经度
	 * @param latitude  纬度
	 * @return
	 */
	public int uploadConsistLocation(String orderId, String longitude, String latitude){
		return consistOrderDao.uploadConsistLocation(orderId, longitude, latitude);
	}
	
	
	/**
	 * 讲解员完成拼单订单的讲解
	 * @param orderId
	 * @return
	 * @throws SQLException
	 */
	public int finishConsistOrderByGuide(String orderId) throws SQLException{
		return consistOrderDao.finishConsistOrderByGuide(orderId);
	}
	
	/**
	 * 填写拼单订单中游客未确认的原因
	 * @param orderId
	 * @return
	 */
	public int writeConsitOrderReason(String orderId, String reason, String phone){
		return consistOrderDao.writeConsitOrderReason(orderId, reason, phone);
	}
}
