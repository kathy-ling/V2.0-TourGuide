package com.TourGuide.web.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.web.Dao.PromotionInfoDao;
import com.TourGuide.web.model.PromotionInfo;


@Service
public class PromotionInfoService {
	
	@Autowired
	private PromotionInfoDao promotionInfoDao;
	
	public List<PromotionInfo> getPromotionInfoBypage(int i,int j) 
	{
		return promotionInfoDao.getPromotionInfoBypage( i, j);
	}
	
	public int getProCount() 
	{
		return promotionInfoDao.getProCount();
	}
	
	
	public List<PromotionInfo> getPromotionInfoByscenicNo(int i,int j,String scenicNo)
	{
		return promotionInfoDao.getPromotionInfoByscenicNo(i, j, scenicNo);
	}
	
	public int getProByscenicNoCount(String scenicNo) 
	{
		return promotionInfoDao.getProByscenicNoCount(scenicNo);
	}
	
	public int UpdateMainShow(String proID,String main)
	{
		return promotionInfoDao.UpdateMainShow(proID, main);
	}
	
	
	public  String  getBookOrderID () 
	{
		return promotionInfoDao.getBookOrderID();
	}
	
	
	public String getPromotionID() 
	{
		return promotionInfoDao.getPromotionID();
	}
	
	public int InsetProInfo(PromotionInfo promotionInfo) 
	{
		return promotionInfoDao.InsetProInfo(promotionInfo);
	}
	
	
	public  boolean JspToHtmlFile(String url,String filePath, String HtmlFile,
			PromotionInfo list) 
	{
		return promotionInfoDao.JspToHtmlFile(url, filePath, HtmlFile, list);
	}

}
