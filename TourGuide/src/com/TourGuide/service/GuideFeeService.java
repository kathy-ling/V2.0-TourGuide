package com.TourGuide.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.GuideFeeDao;
import com.TourGuide.model.GuideFee;

@Service
public class GuideFeeService {

	@Autowired
	private GuideFeeDao guideFeeDao;
	
	public List<GuideFee> GetGuideFee(int currentPage,int rows)
	{
		return guideFeeDao.GetGuideFee(currentPage, rows);
	}
	
	public int  GetGuideFeeCount()
	{
		return guideFeeDao.GetGuideFeeCount();
	}
	
	public GuideFee GetguideFeeByID(String guideID)
	{
		
		return guideFeeDao.getguideFeeByPhone(guideID);
	}
	
	public  int  RewardGuideFee(String phone,int money,String reason, String loginphone) 
	{
		return guideFeeDao.RewardGuideFee(phone, money, reason,loginphone);
	}
	
	public int PunishGuideFee(String phone,int money,String reason, String loginphone)
	{
		return guideFeeDao.PunishGuideFee(phone, money, reason,loginphone);
		
	}
}
