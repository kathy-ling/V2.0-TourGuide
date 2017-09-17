package com.TourGuide.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.OrderDao;



@Service
public class OrderService {

	@Autowired
	public OrderDao orderDao;
	
	/**
	 * 根据用户的手机号，查询用户的所有订单
	 * 全部订单包括：拼单（用户自己发起的拼单、与他人进行拼单）
	 * 			  预约单（选择讲解员进行预约、自己发布预约订单）
	 * @param phone  用户手机号
	 * @return 订单编号、参观时间、参观人数、景区名称、图片（暂时不用）、订单状态、总金额
	 */
	public List<Map<String , Object>> getAllOrders(String phone){
		return orderDao.getAllOrders(phone);
	}
	
	
	/**
	 * 游客删除自己的订单
	 * @param orderId
	 * @return
	 */
	public boolean deleteOrderbyVisitor(String orderId){
		return orderDao.deleteOrderbyVisitor(orderId);
	}
	
	/**
	 * 导游删除已经讲解完成的订单
	 * @param orderId
	 * @return
	 */
	public boolean deleteOrderbyGuide(String orderId){
		return orderDao.deleteOrderbyGuide(orderId);
	}
	
	/**
	 * 根据订单编号和订单状态，查询订单的详细信息
	 * @param orderID  订单编号
	 * @param orderState   订单状态
	 * @return
	 */
	public List<Map<String, Object>> getDetailOrderInfo(String orderID){
		return orderDao.getDetailOrderInfo(orderID);
	}
	

	/**
	 * 根据订单编号，讲解员查看自己的预约单的详情,包括游客的姓名、手机号
	 * @param orderID
	 * @return
	 */
	public Map<String, Object> getGuideBookOrdersDetail(String orderID){
		return orderDao.getGuideBookOrdersDetail(orderID);		
	}
	
	
	/**
	 * 根据订单编号，讲解员查看自己的拼单订单的详情
	 * @param orderID
	 * @return
	 */
	public Map<String, Object> getGuideConsistOrderDetail(String orderID){
		return orderDao.getGuideConsistOrderDetail(orderID);
	}

	
	/**
	 * 讲解员查看自己的拼团订单中的游客的信息
	 * @param orderID
	 * @return
	 */
	public List<Map<String, Object>> getConsistVisitorInfo(String orderID){
		return orderDao.getConsistVisitorInfo(orderID);
	}
	
	/**
	 * 讲解员开始讲解
	 * @param orderId
	 * @return
	 * @throws SQLException
	 */
	public boolean startVisit(String orderId) throws SQLException{
		return orderDao.startVisit(orderId);
	}
}
