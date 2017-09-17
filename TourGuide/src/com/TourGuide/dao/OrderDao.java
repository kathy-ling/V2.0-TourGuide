package com.TourGuide.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.TourGuide.common.DateConvert;
import com.TourGuide.model.ScenicTickets;

@Repository
public class OrderDao {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	ScenicTicketsDao scenicTicketsDao;
	
	@Autowired
	ScenicSpotDao scenicSpotDao;
	
	@Autowired
	GuideDao guideInfoDao;
	
	@Autowired
	IntroFeeAndMaxNumDao introFeeAndMaxNumDao;
	
	
	/**
	 * 根据用户的手机号，查询用户的所有订单(游客)
	 * 全部订单包括：拼单（用户自己发起的拼单、与他人进行拼单）
	 * 			  预约单（选择讲解员进行预约、自己发布预约订单）
	 * @param phone  用户手机号
	 * @return 订单编号、参观时间、参观人数、景区名称、景区名称、订单状态、总金额
	 */
	public List<Map<String , Object>> getAllOrders(String phone){
		
		List<Map<String , Object>> listResult = new ArrayList<>();
		
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst = conn.prepareCall("call getAllBookOrdersbyVisitorPhone(?)");
			cst.setString(1, phone);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("OrderID", rst.getString(1));
				map.put("visitTime", rst.getString(2));
				map.put("visitNum", rst.getInt(3));
				map.put("scenicID", rst.getString(4));
				map.put("scenicName", rst.getString(5));
				map.put("totalMoney", rst.getInt(6));
				map.put("orderState", rst.getString(7));
				map.put("type", "预约单");
				listResult.add(map);
			}
			
			CallableStatement cst1 = conn.prepareCall("call getAllConsistOrdersbyVisitorPhone(?)");
			cst1.setString(1, phone);
			ResultSet rst1 = cst1.executeQuery();
			
			while (rst1.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("OrderID", rst1.getString(1));
				map.put("visitTime", rst1.getString(2));
				map.put("visitNum", rst1.getInt(3));
				map.put("scenicID", rst1.getString(4));
				map.put("scenicName", rst1.getString(5));
				map.put("totalMoney", rst1.getInt(6));
				map.put("orderState", rst1.getString(7));
				map.put("type", "拼团单");
				listResult.add(map);
			}
			
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 	
		
		return listResult;
	}
	
	
	/**
	 * 游客删除自己的订单
	 * @param orderId
	 * @return
	 */
	public boolean deleteOrderbyVisitor(String orderId){
		
		boolean bool = false;
		
		String updateBook = "update t_bookorder set visitorVisible=0 where bookOrderID='"+orderId+"'";
		String updateConsist = "update t_consistorder set visitorVisible=0 where consistOrderID='"+orderId+"'";
		
		int i = jdbcTemplate.update(updateBook);
		int j = jdbcTemplate.update(updateConsist);
		
		if(i!=0 || j!=0){
			bool = true;
		}
		return bool;
	}
	
	/**
	 * 导游删除已经讲解完成的订单
	 * @param orderId
	 * @return
	 */
	public boolean deleteOrderbyGuide(String orderId){
		
		boolean bool = false;
		
		String updateBook = "update t_bookorder set guideVisible=0 where bookOrderID='"+orderId+"'";
		String updateConsist = "update t_consistresult set guideVisible=0 where orderID='"+orderId+"'";
		
		int i = jdbcTemplate.update(updateBook);
		int j = jdbcTemplate.update(updateConsist);
		
		if(i!=0 || j!=0){
			bool = true;
		}
		return bool;
	}
	
	/**
	 * 根据订单编号，查询订单的详细信息,包括拼单表和预约表
	 * @param orderID  订单编号
	 * @return
	 */
	public List<Map<String, Object>> getDetailOrderInfo(String orderID){
		
		List<Map<String, Object>> listResult = new ArrayList<>();
		
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getDetailOrderInfoByOrderID(?)");
			cst.setString(1, orderID);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("produceTime", rst.getString(1));
				map.put("payTime", rst.getString(2));
				map.put("takeOrderTime", rst.getString(3));
				map.put("visitTime", rst.getString(4));
				map.put("endTime", rst.getString(5));
				map.put("visitorPhone", rst.getString(6));
				map.put("visitNum", rst.getInt(7));
				map.put("scenicID", rst.getString(8));
				map.put("scenicName", rst.getString(9));
				map.put("money", rst.getInt(10));
				map.put("guideID", rst.getString(11));
				map.put("guidePhone", rst.getString(12));
				map.put("orderState", rst.getString(13));
				map.put("imagePath", rst.getString(14));
				map.put("longitude", rst.getString(15));
				map.put("latitude", rst.getString(16));
				map.put("cancleFee", rst.getInt(17));
				
				listResult.add(map);
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 	
		
		return listResult;
	}
	
	
	/**
	 * 根据订单的编号，查询游客的手机和讲解员的手机号
	 * @param orderID  订单号（拼单、预约订单）
	 * @return
	 */
	public List<Map<String, Object>> getPhoneByOrderID(String orderID){
		
		List<Map<String, Object>> listResult = new ArrayList<>();
		String sqlString = null;
		
		sqlString = "select guidePhone,visitorPhone from t_bookorder where bookOrderID='"+orderID+"'";
		listResult = jdbcTemplate.queryForList(sqlString);
		
		if(listResult == null){
			sqlString = "select guidePhone,visitorPhone from t_consistorder where"
					+ " consistOrderID='"+orderID+"'";
			listResult = jdbcTemplate.queryForList(sqlString);
		}
		
		return listResult;
	}
	

	/**
	 * 根据订单编号，讲解员查看自己的预约单的详情,包括游客的姓名、手机号
	 * @param orderID
	 * @return
	 */
	public Map<String, Object> getGuideBookOrdersDetail(String orderID){
		
		Map<String, Object> map = new HashMap<>();
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getGuideBookOrdersDetail(?)");
			cst.setString(1, orderID);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				map.put("orderID", rst.getString(1));
				map.put("scenicName", rst.getString(2));
				map.put("visitNum", rst.getInt(3));
				map.put("money", rst.getInt(4));
				map.put("visitTime", rst.getString(5));
				map.put("state", rst.getString(6));
				map.put("contact", rst.getString(7));
				map.put("visitorName", rst.getString(8));
				map.put("signIn", rst.getInt(9));
				map.put("longitude", rst.getString(10));
				map.put("latitude", rst.getString(11));
				map.put("startTime", rst.getString(12));
				map.put("endTime", rst.getString(13));
				map.put("cancleFee", rst.getInt(14));
				map.put("confirm", rst.getInt(15));
				map.put("reason", rst.getString(16));
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return map;
	}
	
	
	/**
	 * 根据订单编号，讲解员查看自己的拼单订单的详情
	 * @param orderID
	 * @return
	 */
	public Map<String, Object> getGuideConsistOrderDetail(String orderID){
		
		Map<String, Object> map = new HashMap<>();
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getGuideConsistOrderDetail(?)");
			cst.setString(1, orderID);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				map.put("orderID", rst.getString(1));
				map.put("scenicName", rst.getString(2));
				map.put("visitNum", rst.getInt(3));
				map.put("money", rst.getInt(4));
				map.put("visitTime", rst.getString(5));
				map.put("state", rst.getString(6));
				map.put("signIn", rst.getInt(7));
				map.put("longitude", rst.getString(8));
				map.put("latitude", rst.getString(9));
				map.put("startTime", rst.getString(10));
				map.put("endTime", rst.getString(11));
				map.put("cancleFee", rst.getInt(12));
				map.put("isFastPin",rst.getInt(13));
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return map;
	}
	
	
	/**
	 * 讲解员查看自己的拼团订单中的游客的信息
	 * @param orderID
	 * @return
	 */
	public List<Map<String, Object>> getConsistVisitorInfo(String orderID){
		
		List<Map<String, Object>> list = new ArrayList<>();		
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getConsistVisitorInfo(?)");
			cst.setString(1, orderID);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String, Object> map = new HashMap<>();
				map.put("visitorPhone", rst.getString(1));
				map.put("visitorName", rst.getString(2));
				map.put("visitNum", rst.getInt(3));
				map.put("reason", rst.getString(4));
				map.put("confirm", rst.getInt(5));
				list.add(map);
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}
	
	
	/**
	 * 讲解员开始讲解
	 * @param orderId
	 * @return
	 * @throws SQLException
	 */
	public boolean startVisit(String orderId) throws SQLException{
		
		boolean bool = false;
		
		DataSource dataSource = jdbcTemplate.getDataSource();
		Connection  conn = null;
		try{
			conn = dataSource.getConnection();
			conn.setAutoCommit(false);
			
			String sqlBook = "update t_bookorder set startTime=NOW() where bookOrderID='"+orderId+"'";
			int i = jdbcTemplate.update(sqlBook);
			
			String sqlConsist = "update t_consistorder set startTime=NOW() where orderID='"+orderId+"'";
			int j = jdbcTemplate.update(sqlConsist);
			
			conn.commit();//提交JDBC事务 
			conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
			conn.close();
			
			if(i!=0 || j!=0){
				bool = true;
			}
			
		} catch (SQLException e) {
			conn.rollback();
			e.printStackTrace();
		}
		
		return bool;
	}
	
//	/**
//	 * 根据用户的手机号，查询特定订单状态的订单
//	 * 订单状态：待接单、待付款、待游览、待评价
//	 * @param phone  手机号
//	 * @param orderState   订单状态
//	 * @return
//	 */
//	public List<Map<String, String>> getOrdersWithState(String phone, String orderState){
//		
//		List<Map<String, String>> listResult = new ArrayList<>();
//		
//		//从拼单表中查找相关的拼单
//		String sqlString = "select consistOrderID,visitTime,visitNum,scenicID,totalMoney,orderState"
//				+ " from t_consistorder where visitorPhone='"+phone+"' and orderState='"+orderState+"'";
//		List<Map<String , Object>> list = jdbcTemplate.queryForList(sqlString);
//		
//		listResult = getSimpleOders(list, "consistOrderID");
//		
//		//从预约表中查找相关的订单
//		String sqlString2 = "select bookOrderID,visitTime,totalMoney,orderState,scenicID,visitNum "
//				+ "from t_bookorder where visitorPhone='"+phone+"' and orderState='"+orderState+"'";
//		List<Map<String , Object>> list2 = jdbcTemplate.queryForList(sqlString2);
//		
//		listResult.addAll(getSimpleOders(list2, "bookOrderID"));
//		
//		return listResult;
//	}
	
	


}
