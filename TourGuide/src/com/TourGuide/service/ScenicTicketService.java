package com.TourGuide.service;


import java.util.List;
import java.util.Map;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.ScenicTicketsDao;
import com.TourGuide.model.ScenicTickets;

@Service
public class ScenicTicketService {

	@Autowired
	ScenicTicketsDao scenicTicketsDao;
	
	/**
	 * 根据景区编号，查询该景区的门票信息
	 * @param scenicNo  景区编号
	 * @return 景区的门票信息
	 */
	public ScenicTickets geTicketsByScenicNo(String scenicNo){
		return scenicTicketsDao.geTicketsByScenicNo(scenicNo);
	}
	
	/**
	 * 分页得到景区门票的详细信息
	 * @param i
	 * @param j
	 * @return
	 * 2017-2-10 21:10:16
	 */
	public  List<Map<String , Object>> getScenicTicketByPage(int i,int j) {
		
		return scenicTicketsDao.getScenicTicketByPage(i, j);
	}
	
	/**
	 * 得到景区门票信息的数目
	 * @return
	 * 2017-2-10 21:32:44
	 */
	public  int getScenicTicketCount()
	{
		return scenicTicketsDao.getScenicTicketCount();
	}
	
	/**
	 * 通过景区编号查询景区门票信息
	 * @param scenicID
	 * @return
	 * 2017-2-10 21:39:18
	 */
	public  List<Map<String , Object>> getTicketByscenicN(String scenicID) {
		
		return scenicTicketsDao.getTicketByscenicN(scenicID);
	}
	
	/**
	 * 更新景区门票价格信息
	 * @param scenicTickets
	 * @return
	 * 2017-2-10 22:03:13
	 */
	public int   UpdatescenicTicket(ScenicTickets scenicTickets) 
	{
		return scenicTicketsDao.UpdatescenicTicket(scenicTickets);
	}
}
