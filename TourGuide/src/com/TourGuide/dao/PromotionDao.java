package com.TourGuide.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PromotionDao {
	

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	/**
	 * 获取首页的活动信息
	 * @return 活动的相关信息,活动图片、活动链接
	 */
	public List<Map<String, Object>> getPromotions(){
		 
		List<Map<String , Object>> list = new ArrayList<>(); 
		DataSource dataSource =jdbcTemplate.getDataSource();
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getPromotions()");
			
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("promotionImage", "/TourGuide" + rst.getString(1));
				map.put("promotionLinks", rst.getString(2));
				map.put("promotionTitle", rst.getString(3));
				list.add(map);
			}
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
	}
	
	
	/**
	 * 根据景区编号，查询该景区的活动信息
	 * @param scenicNo
	 * @return
	 */
	public List<Map<String, Object>> getScenicPromotions(String scenicNo){
		
		List<Map<String , Object>> list = new ArrayList<>(); 
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getScenicPromotions(?)");
			cst.setString(1, scenicNo);
			ResultSet rst = cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("promotionImage", rst.getString(1));
				map.put("promotionLinks", rst.getString(2));
				map.put("promotionTitle", rst.getString(3));
				list.add(map);
			}
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
	}
//	/**
//	 * 查询首页可以显示的活动个数，从t_system中获取
//	 * @return
//	 * @throws SQLException
//	 */
//	public int getpromotionShowNum() throws SQLException{
//		
//		int num = 0;
//		
//		DataSource dataSource =jdbcTemplate.getDataSource();
//		 
//		try {
//			Connection conn = dataSource.getConnection();
//			CallableStatement cst=conn.prepareCall("call getMainPagePromotionNum(?)");
//			cst.registerOutParameter(1, java.sql.Types.BIGINT);
//			cst.execute();
//			num = (int)cst.getInt(1);
//			conn.close();
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		
//		return num;
//	}
}
