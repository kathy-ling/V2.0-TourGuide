package com.TourGuide.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.ScenicSpotDao;
import com.TourGuide.model.ScenicsSpotInfo;

@Service
public class ScenicSpotService {

	@Autowired
	public ScenicSpotDao scenicSpotDao;
	
	/**
	 * 根据用户的位置（省份），获取对应省份的热门景点
	 * @param location 用户当前的位置
	 * @return 景区图片、编号、名称、简介、省、市、详细位置、等级、历史参观人数、开放时间
	 */
	public List<Map<String , Object>> getScenicByLocation(String province){
		return scenicSpotDao.getScenicByLocation(province);
	}
	
	
	/**
	 * 根据用户所在的省份，获取该省内的所有景点
	 * @param location 用户所在的省份
	 * @return 景区图片、编号、名称
	 */
	public List<Map<String , Object>> getAllScenicByLocation(String location){
		return scenicSpotDao.getAllScenicByLocation(location);
	}
	
	
	/**
	 * 显示数据库内的所有景点信息,并按景区等级降序排列
	 * @return 景区图片、编号、名称
	 */
	public List<Map<String , Object>> getAllScenics(){
		return scenicSpotDao.getAllScenics();
	}
	
	
	/**
 	 * 根据景区编号，查看景区的详细信息
 	 * @param scenicNo  景区编号
 	 * @return 景区详细信息
 	 * 景区图片、编号、名称、简介、省、市、详细位置、等级、历史参观人数、开放时间
 	 */
 	public List<Map<String , Object>> getDetailScenicByScenicID(String scenicNo){
 		return scenicSpotDao.getDetailScenicByScenicID(scenicNo);
 	}
	
 	/**
	 * 根据景区的名称进行搜索。
	 * @param scenicName  景区的名称
	 * @return
	 */
	public List<Map<String , Object>> getScenicByName(String scenicName){
		return scenicSpotDao.getScenicByName(scenicName);
	}
	
	
	/**
	 * 根据搜索的特定的景区的地址，进行相关的景区推荐，暂定推荐数为4个
	 * @param name 景区的名称
	 * @return 相关的推荐景区的信息。
	 * 景区图片、编号、名称
	 */
	public List<Map<String , Object>> getScenicRelatesByName(String scenicName){
		return scenicSpotDao.getScenicRelatesByName(scenicName);
	}
	
	
	
	/**
	 * 根据景区名称，搜索名称相似的景区
	 * @param scenicName 景区名称
	 * @return  相似景区的名称、编号
	 */
	public List<Map<String , Object>> getNameSimilarScenics(String scenicName){
		return scenicSpotDao.getNameSimilarScenics(scenicName);
	}
	
	
	/**
	 * 根据景区的编号， 查询景区的信息,景区名称、图片
	 * @param scenicID   景区编号
	 * @return 景区名称、图片
	 */
	public List<Map<String , Object>> getSomeScenicInfoByscenicID(String scenicID){
		return scenicSpotDao.getSomeScenicInfoByscenicID(scenicID);
	}

	public ScenicsSpotInfo SearchSceincInfoByLocation(String provin,String city,String s)
	{
		return scenicSpotDao.SearchSceincInfoByLocation_Dao(provin, city, s);
	}
	
	
	/*
	 * 为景区信息进行分页
	 * 2017-1-3 14:43:09
	 * */
	public List<ScenicsSpotInfo> getScenicInfoByPage(int i,int j) {
		return scenicSpotDao.GetScenicInfoByPage(i, j);
	}
	
	/*
	 * 得到景区信息表的景区数目
	 * 2017-1-3 14:43:14
	 * */
	public  int  GetScenicCount()
	{
		return scenicSpotDao.GetScenicCount();
	}
	
	/*
	 * 通过景区名称来获取景区信息
	 * 2017-1-3 14:44:29
	 * */
	public ScenicsSpotInfo SearchScenicInfoByName_Service(String name) {
		return scenicSpotDao.SearchSceincInfoByName_Dao(name);
	}
	
	/*
	 * 添加景区信息
	 * 2017-1-3 14:44:50
	 * */
	public boolean AddScenicInfo_Service(ScenicsSpotInfo scenicsSpotInfo, String password) {
		return scenicSpotDao.AddScenicInfo_Dao(scenicsSpotInfo,password);
	}
	
	/*
	 * 通过景区名称来删除景区信息
	 * 2017-1-3 14:45:25
	 * */
	public boolean DeleteScenicInfo_Service(String s) {
		return scenicSpotDao.DeleteScenicInfo(s);
	}
	
	/*
	 * 更新景区信息
	 * 2017-1-3 14:45:38
	 * */
	public boolean UpdateScenicInfo_Service(ScenicsSpotInfo scenicsSpotInfo) {
		return scenicSpotDao.UpdateScenicInfo(scenicsSpotInfo);
	}
	
	
	
}

