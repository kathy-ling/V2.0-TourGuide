package com.TourGuide.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.CancleOrderDao;

@Service
public class CancleOrderService {

	@Autowired
	private CancleOrderDao cancleOrderDao;
	
	
	/**
	 * 游客取消预约订单，预约单和发布预约单
	 * @param orderId
	 * @return 1--取消成功,-1--已经开始参观，不能取消,2--扣费1%,3--扣费5%
	 */
	public int cancleBookOrder(String orderId){
		return cancleOrderDao.cancleBookOrder(orderId);
	}
	
	/**
	 * 游客取消拼团订单
	 * @param orderId
	 * @return
	 */
	public int cancleConsistOrder(String orderId){
		return cancleOrderDao.cancleConsistOrder(orderId);
	}
}
