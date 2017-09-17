package com.TourGuide.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.OperateRecordDao;
import com.TourGuide.model.OperateRecord;

@Service
public class OperateRecordService {

	@Autowired
	private OperateRecordDao operateRecordDao;
	
	public List<OperateRecord> getOperateRecordBypage(int i,int j)
	{
		return operateRecordDao.getOperateRecordBypage(i, j);
	}
	
	public int getOperateRecordCount()
	{
		return operateRecordDao.getOperateRecordCount();
	}
	
	public int getOperateRecordByDateCount(String date1,String date2)
	{
		return operateRecordDao.getOperateRecordByDateCount(date1, date2);
	}
	
	public int getOperateRecordByScenicCount(String scenic)
	{
		return operateRecordDao.getOperateRecordByScenicCount(scenic);
	}
	
	
	public List<OperateRecord> getOperateRecordByDate(int i,int j,String date1,String date2) 
	{
		return operateRecordDao.getOperateRecordByDate(i, j, date1, date2);
	}
	
	public List<OperateRecord> getOperateRecordByScenic(int i,int j,String scenic) 
	{
		return operateRecordDao.getOperateRecordByScenic(i, j, scenic);
	}
}
