package com.TourGuide.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ScenicfeeDao {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	/**
	 * 分页得到景区收入信息
	 * @param currentPage
	 * @param rows
	 * @return
	 * 2017-1-15 11:17:14
	 */
	public List<Map<String, Object>> GetscenicFee(int currentPage,int rows)
	{
		int j=(currentPage-1)*rows;
		String sql="SELECT  t_scenicspotinfo.scenicName,t_scenicfee.* "
				+ "from t_scenicspotinfo,t_scenicfee  where t_scenicfee.scenicID = t_scenicspotinfo.scenicNo"
				+ " LIMIT "+j+" ,"+rows+"";
		return jdbcTemplate.queryForList(sql);
	}
	
	
	
	
	/**
	 * 得到景区收入信息数目
	 * @return
	 * 2017-1-15 11:17:41
	 */
	public int  GetscenicFeeCount()
	{
		String sql="SELECT  t_scenicspotinfo.scenicName,t_scenicfee.* "
				+ "from t_scenicspotinfo,t_scenicfee  "
				+ "where t_scenicfee.scenicID = t_scenicspotinfo.scenicNo";
		int i=jdbcTemplate.queryForList(sql).size();
		return i;
	}
	
	/**
	 * 通过景区编号得到景区的收入详情
	 * @param scenicID
	 * @return
	 */
	public List<Map<String, Object>> GetscenicFeeByID(String scenicID)
	{
		String sql="SELECT  t_scenicspotinfo.scenicName,t_scenicfee.* "
				+ "from t_scenicspotinfo,t_scenicfee  "
				+ "where t_scenicfee.scenicID = t_scenicspotinfo.scenicNo"
				+ " and t_scenicfee.scenicID='"+scenicID+"'";
		return jdbcTemplate.queryForList(sql);
	}
	
	public List<Map<String, Object>> GetscenicFeeBydate(String date,String date1,String scenicID)
	{
		String sql="SELECT  t_scenicspotinfo.scenicName,t_scenicfee.* "
				+ "from t_scenicspotinfo,t_scenicfee  "
				+ "where t_scenicfee.scenicID = t_scenicspotinfo.scenicNo"
				+ " and t_scenicfee.scenicID='"+scenicID+"' AND t_scenicfee.date>='"+
				date+"' and t_scenicfee.date <= '"+date1+"'";
		
		return jdbcTemplate.queryForList(sql);
		
	}

}
