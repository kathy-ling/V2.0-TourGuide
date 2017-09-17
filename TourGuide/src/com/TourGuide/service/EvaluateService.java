package com.TourGuide.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.EvaluateDao;

@Service
public class EvaluateService {

	@Autowired
	private EvaluateDao evaluateDao;
	
	
	/**
	 * 发表评论
	 * @param orderID   订单编号
	 * @param evaluateContext  评价内容
	 * @param evaluateTime  评价时间
	 * @param guidePhone  游客的手机号
	 * @param visitorPhone  讲解员的手机号
	 * @param isAnonymous  是否匿名（1-匿名）
	 * @return
	 */
	public int commentByVisitor(String orderID, String evaluateContext,
			String evaluateTime, int isAnonymous, int star1, int star2, int star3){
		
		return evaluateDao.commentByVisitor(orderID, evaluateContext,
				evaluateTime, isAnonymous, star1, star2, star3);
	}
	
	
	/**
	 * 查看某个讲解员相关的历史评论
	 * @param guidePhone  讲解员的手机号
	 * @return 评价时间、评价内容、游客的昵称（若是匿名，则为“匿名用户”）
	 */
	public List<Map<String, Object>> getComments(String guidePhone){
		return evaluateDao.getComments(guidePhone);
	}
}
