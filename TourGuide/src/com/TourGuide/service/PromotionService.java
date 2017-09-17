package com.TourGuide.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.PromotionDao;
import com.TourGuide.model.Promotion;

@Service
public class PromotionService {
	
	@Autowired
	public PromotionDao promotionDao;
	
	/*
	 * 获取首页的活动信息
	 */
	public List<Map<String, Object>> getPromotions(){
		return promotionDao.getPromotions();
	}

	
	/**
	 * 根据景区编号，查询该景区的活动信息
	 * @param scenicNo
	 * @return
	 */
	public List<Map<String, Object>> getScenicPromotions(String scenicNo){
		return promotionDao.getScenicPromotions(scenicNo);
	}
}
