package com.TourGuide.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.apache.catalina.webresources.Cache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import com.TourGuide.model.IntroFeeAndMaxNum;

@Repository
public class IntroFeeAndMaxNumDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	/**
	 * 查询某天该景区的拼单讲解费,拼单的最大可拼人数
	 * @param date  日期
	 * @param scenicNo  景区编号
	 * @return
	 */
	public IntroFeeAndMaxNum getIntroFeeAndMaxNum(String date, String scenicNo){
		
		final IntroFeeAndMaxNum introFeeAndMaxNum = new IntroFeeAndMaxNum();
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getIntroFeeAndMaxNum(?,?)");
			cst.setString(1, scenicNo);
			cst.setString(2, date);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				introFeeAndMaxNum.setFee(rst.getInt(1));
				introFeeAndMaxNum.setMaxNum(rst.getInt(2));
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		

		return introFeeAndMaxNum;
	}
	
	
	/**
	 * 查询某天该景区的
	 * @param date  日期
	 * @param scenicNo   景区编号
	 * @return  
	 */
//	public int getMaxNum(String date, String scenicNo){
//		
//		int maxNum = 0;
//		final IntroFeeAndMaxNum introFeeAndMaxNum = new IntroFeeAndMaxNum();
//		
//		String sql = "select maxNum from t_introfeeandmaxnum where scenicNo='"+scenicNo+"' and date='"+date+"'";
//		jdbcTemplate.query(sql,  new RowCallbackHandler() {
//			
//			@Override
//			public void processRow(ResultSet res) throws SQLException {
//				introFeeAndMaxNum.setMaxNum(res.getInt(1));
//			}
//		});
//		
//		maxNum = introFeeAndMaxNum.getMaxNum();
//		
//		return maxNum;
//	}
}
