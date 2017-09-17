package com.TourGuide.dao;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.TourGuide.common.MyDateFormat;

@Repository
public class GuideSalaryDao {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	/**
	 * 根据讲解员的手机号，查询讲解员的收入记录(不包括已取消的订单)
	 * @param guidePhone  讲解员的手机号
	 * @return
	 */
	public List<Map<String, Object>> getSalaryRecord(String guidePhone){
		
		List<Map<String, Object>> list = new ArrayList<>();		
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst = conn.prepareCall("call getSalaryRecord(?)");
			cst.setString(1, guidePhone);
			ResultSet rst = cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("orderId", rst.getString(1));
				map.put("guidePhone", rst.getString(2));
				map.put("visitNum", rst.getInt(3));
				map.put("totalMoney", rst.getInt(4));
				map.put("time", rst.getString(5));
				map.put("scenicName", rst.getString(6));				
				list.add(map);
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		
		return list;
	}
	
	
	/**
	 * 若订单已取消，则取消的费用为讲解员的收入
	 * @param guidePhone
	 * @return
	 */
	public List<Map<String, Object>> getCancleOrderFee(String guidePhone){
		
		List<Map<String, Object>> list = new ArrayList<>();		
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst = conn.prepareCall("call getCancleOrderFee(?)");
			cst.setString(1, guidePhone);
			ResultSet rst = cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("orderId", rst.getString(1));
				map.put("guidePhone", rst.getString(2));
				map.put("visitNum", rst.getInt(3));
				map.put("totalMoney", rst.getBigDecimal(4));
				map.put("time", rst.getString(5));
				map.put("scenicName", rst.getString(6));				
				list.add(map);
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		
		return list;
	}
	
	
	/**
	 * 统计讲解员接单的总次数和总金额
	 * @param guidePhone
	 * @return
	 */
	public Map<String , Object> getSalaryAmount(String guidePhone){
		
		Map<String , Object> map = new HashMap<String, Object>();
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst = conn.prepareCall("call getSalaryAmount(?)");
			cst.setString(1, guidePhone);
			ResultSet rst = cst.executeQuery();
			
			while (rst.next()) {								
				map.put("totalMoney", rst.getInt(1));
				map.put("totalOrders", rst.getInt(2));				
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		return map;
	}
	
	
	/**
	 * 查询用户的总金额、可提现金额和已经提现的总额
	 * @param guidePhone
	 * @return
	 */
	public Map<String , Object> getCash(String guidePhone){
		
		Map<String , Object> map = new HashMap<String, Object>();
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst = conn.prepareCall("call getCash(?)");
			cst.setString(1, guidePhone);
			ResultSet rst = cst.executeQuery();
			
			while (rst.next()) {
				map.put("guidePhone", rst.getString(1));
				map.put("cashTotal", rst.getBigDecimal(2));				
				map.put("cashAvailable", rst.getBigDecimal(3));
				map.put("cashRaised", rst.getBigDecimal(4));				
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		return map;
	}
	
	
	/**
	 * 输入金额进行提现
	 * @param guidePhone  讲解员手机号
	 * @param money   提现金额
	 * @return
	 * @throws SQLException
	 * 
	 */
	public int withdrawMoney(String guidePhone, BigDecimal money) 
			throws SQLException{
		
		int ret = 0;
		String now = MyDateFormat.form(new Date());
		String state = "待处理";
		
		DataSource dataSource = jdbcTemplate.getDataSource();
		Connection conn = null;
		try{
				conn = dataSource.getConnection();
				conn.setAutoCommit(false);
				
				String sqlInsert = "insert into t_takecashrecord(guidePhone,takeTime,money,state) "
						+ "values (?,?,?,?)";
				int i = jdbcTemplate.update(sqlInsert, new Object[]{guidePhone, now, money, state});
				
				String sqlUpdate ="update t_guideotherinfo set cashRaised=cashRaised+"+money+","
						+ "cashAvailable=cashTotal-cashRaised where phone='"+guidePhone+"'";
				int j = jdbcTemplate.update(sqlUpdate);
				
				conn.commit();//提交JDBC事务 
				conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
				conn.close();
				
				if(i != 0 && j != 0){
					ret = 1;
				}
				
		} catch (SQLException e) {
			conn.rollback();
			e.printStackTrace();
		}	
		
		return ret;
	}
	
	
	/**
	 * 查看正在处理的提现申请
	 * @param guidePhone
	 * @return
	 */
	public List<Map<String, Object>> getProcessingWithdraw(String guidePhone){
		
		List<Map<String, Object>> list = new ArrayList<>();		
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst = conn.prepareCall("call getProcessingWithdraw(?)");
			cst.setString(1, guidePhone);
			ResultSet rst = cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();				
				map.put("guidePhone", rst.getString(1));
				map.put("takeTime", rst.getString(2));
				map.put("money", rst.getBigDecimal(3));
							
				list.add(map);
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		
		return list;
	}
	
	
	/**
	 * 查看已经成功提现的记录
	 * @param guidePhone
	 * @return
	 */
	public List<Map<String, Object>> getSuccessRecord(String guidePhone){
		
		List<Map<String, Object>> list = new ArrayList<>();		
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst = conn.prepareCall("call getSuccessRecord(?)");
			cst.setString(1, guidePhone);
			ResultSet rst = cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();				
				map.put("guidePhone", rst.getString(1));
				map.put("takeTime", rst.getString(2));
				map.put("money", rst.getBigDecimal(3));
							
				list.add(map);
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		
		return list;
	}
}
