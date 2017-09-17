package com.TourGuide.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.GuideWorkdayDao;
import com.TourGuide.model.Guideworkday;

@Service
public class GuideworkdayService {
	
	@Autowired
	private GuideWorkdayDao guideWorkdayDao;
	
	
	/**
	 * 设置导游的工作时间，
	 * @param days 不工作的日期，如2017-1-12
	 * @param phone  手机号
	 * @return 
	 */
	public boolean setGuideWorkday(List<String> days, String phone){
		return guideWorkdayDao.setGuideWorkday(days, phone);
	}
	
	
	/**
	 * 导游签到，若已经签到，则显示当日的日期
	 * @param phone  手机号
	 * @return
	 */
	public boolean guideCheckIn(String phone){
		return guideWorkdayDao.guideCheckIn(phone);
	}
	
	
	/**
	 * 判断讲解员当天是否签到了
	 * @param phone  手机号
	 * @return
	 */
	public boolean whetherCheckIn(String phone){
		return guideWorkdayDao.whetherCheckIn(phone);
	}
	
	
	public List<Map<String , Object>> GetGuideworkday(int currentPage,int rows)
	{
		return guideWorkdayDao.GetGuideworkday(currentPage,rows);
	}
	
	public int  getguideWorkdayCount() {
		return guideWorkdayDao.getguideWorkdayCount();
	}
	
	public int UpdateGuideWorkday(Guideworkday guideworkday) {
		
		return guideWorkdayDao.UpdateGuideWorkday(guideworkday);
	}
	
	public List<Map<String, Object>> QueryGuideworkdayByPhone(String phone)
	{
		return guideWorkdayDao.QueryGuideworkdayByPhone(phone);
	}

}
