package com.TourGuide.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.ScenicfeeDao;

@Service
public class ScenicfeeService {

	@Autowired
	private ScenicfeeDao scenicfeeDao;
	
	public List<Map<String, Object>> GetscenicFee(int currentPage,int rows)
	{
		
		return scenicfeeDao.GetscenicFee(currentPage, rows);
	}
	
	public int  GetscenicFeeCount()
	{
		
		return scenicfeeDao.GetscenicFeeCount();
	}
	
	
	public List<Map<String, Object>> GetscenicFeeByID(String scenicID)
	{
		return scenicfeeDao.GetscenicFeeByID(scenicID);
	}
	
	
	public List<Map<String, Object>> GetscenicFeeBydate(String date,String date1,String scenicID)
	{
		return scenicfeeDao.GetscenicFeeBydate(date, date1, scenicID);
	}
}
