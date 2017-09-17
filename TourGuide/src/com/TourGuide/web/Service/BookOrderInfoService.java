package com.TourGuide.web.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.TourGuide.web.Dao.BookOrderInfoDao;
import com.TourGuide.web.model.BookOrderInfo;

@Service 
public class BookOrderInfoService {

	private BookOrderInfoDao bookOrderInfoDao;
	
	public List<BookOrderInfo> getBookOrderInfoBypage(int i,int j)
	{
		return bookOrderInfoDao.getBookOrderInfoBypage(i, j);
	}
	
	public int  getBookOrderInfoCount() {
		return bookOrderInfoDao.getBookOrderInfoCount();
	}
}
