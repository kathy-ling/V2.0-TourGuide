package com.TourGuide.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.RecordofRewardDao;
import com.TourGuide.model.RecordofReward;


@Service
public class RecordofRewardService {

	@Autowired
	private RecordofRewardDao recordofRewardDao;
	
	public List<RecordofReward> GetRecordofReward(int currentPage,int rows)
	{
		return recordofRewardDao.GetRecordofReward(currentPage, rows);
	}
	
	public int  GetRecordofRewardCount() 
	{
		return recordofRewardDao.GetRecordofRewardCount();
		
	}
	
	public List<RecordofReward> GetRecordofRewardByPhone(String phone, int currentPage, int pageRows)
	{
		return recordofRewardDao.GetRecordofRewardByPhone(phone,currentPage,pageRows);
	}
	
	public List<RecordofReward> GetRecordofRewardByDate(String date1,String date2, int currentPage, int pageRows)
	{
		return recordofRewardDao.GetRecordofRewardByDate(date1, date2,currentPage,pageRows);
	}
	
	public int GetRecordofRewardByDateCount(String date1,String date2) 
	{
		return recordofRewardDao.GetRecordofRewardByDateCount(date1, date2);
	}
	
	public int  GetRecordofRewardByPhoneCount(String phone)
	{
		return recordofRewardDao.GetRecordofRewardByPhoneCount(phone);
	}
}
