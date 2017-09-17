package com.TourGuide.service;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.FastOrderDao;

@Service
public class FastOrderService {
	
	@Autowired
	private FastOrderDao fastOrderDao;
	
	/**
	 * 游客发起快捷拼团
	 * @param consistOrderID  拼团订单号
	 * @param scenicID  景区编号
	 * @param visitNum  参观人数
	 * @param guideFee  景区该天的讲解费
	 * @param visitorPhone 游客的手机号
	 * @return
	 */
	public boolean releaseFastOrder(String consistOrderID, 
			String scenicID, int visitNum, int guideFee, String visitorPhone){
		return fastOrderDao.releaseFastOrder(consistOrderID, 
				scenicID, visitNum, guideFee, visitorPhone);
	}
	
	
	/**
	 * 导游接单前的确认操作
	 * @param guidePhone
	 * @return 返回此次接单的订单号、单人讲解费、最大接单人数
	 */
	public Map<String, Object> confirmBeforTake(String guidePhone){
		return fastOrderDao.confirmBeforTake(guidePhone);
	}
	
	
	/**
	 * 讲解员加单（快捷拼单）
	 * @param consistOrderID  游客的订单编号
	 * @param orderID   讲解员的订单编号
	 * @param guidePhone  讲解员的手机号
	 * @param num  游客的订单中的参观人数
	 * @return
	 * @throws SQLException 
	 */
	public int takeFastOrder(String consistOrderID, 
			String guidePhone, int num) throws SQLException{
		return fastOrderDao.takeFastOrder(consistOrderID, guidePhone, num);
	}

	
	/**
	 * 讲解员设置结束扫码，完成拼单
	 * @param guidePhone
	 * @return 0--结束扫码失败，1--结束扫码成功
	 */
	public int finishScan(String guidePhone){
		return fastOrderDao.finishScan(guidePhone);
	}
}
