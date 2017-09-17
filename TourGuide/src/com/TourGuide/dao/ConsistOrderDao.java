package com.TourGuide.dao;


import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



















import javax.sql.DataSource;

import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.TourGuide.common.DateConvert;
import com.TourGuide.common.MyDateFormat;
import com.TourGuide.model.ConsistOrder;
import com.TourGuide.model.ConsistResult;

@Repository
public class ConsistOrderDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private GuideDao guideDao;
	
	private final int isConsisted = 0;  //isConsisted,订单未被拼单
	
	
	/**
	 * 将游客自己发布的拼单订单存入数据库
	 * @param consistOrderID  拼单编号
	 * @param orderID  
	 * @param scenicID  景区编号
	 * @param produceTime  订单生产时间
	 * @param visitTime 游客参观的时间
	 * @param visitNum  参观的人数
	 * @param visitorPhone  游客的手机号
	 * @param orderState  订单状态
	 * @param isConsisted  是否已经拼单
	 * @param maxNum  最大可拼单人数
	 * @param totalFee  讲解费总额
	 * @param fee 每个人的讲解费
	 * @return
	 * @throws SQLException 
	 */
	public boolean ReleaseConsistOrder(String consistOrderID, String orderID, String scenicID,
			String produceTime, String visitTime, int visitNum, String visitorPhone, 
			String contact, String orderState, int isConsisted, int maxNum,
			int totalFee, int fee) throws SQLException{
		
		boolean bool = false;
		int finishScan = 2;
		
		DataSource dataSource = jdbcTemplate.getDataSource();
		Connection  conn = null;
		try{
			conn = dataSource.getConnection();
			conn.setAutoCommit(false);
			
			String sqlString2 = "insert into t_consistresult (orderID,visitNum,maxNum,"
					+ "visitTime,scenicID,finishScan,guideFee) values (?,?,?,?,?,?,?)";
			int j = jdbcTemplate.update(sqlString2, new Object[]{orderID, visitNum, 
					maxNum, visitTime, scenicID, finishScan,fee});
			
			String sqlString = "insert into t_consistOrder (consistOrderID,orderID,scenicID,produceTime,"
					+ "visitTime,visitNum,visitorPhone,contact,orderState,"
					+ "isConsisted,maxNum,totalGuideFee,guideFee)"
					+ "values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
			int i = jdbcTemplate.update(sqlString, new Object[]{consistOrderID, orderID, scenicID, 
					produceTime, visitTime, visitNum, visitorPhone,contact,
					orderState, isConsisted,maxNum, totalFee, fee});
			
			/**
			 * 假设付款成功
			 */
			String payTime = MyDateFormat.form(new Date());
			String sqlUpdate = "update t_consistOrder set hadPay=1,payTime='"+payTime+"' "
					+ "where consistOrderID='"+consistOrderID+"'";
			int k = jdbcTemplate.update(sqlUpdate);	
			
			if(visitNum >= maxNum-3){
				boolean assign = AssignGuide(visitTime, visitNum, maxNum, scenicID, orderID);
			}			

			conn.commit();//提交JDBC事务 
			conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
			conn.close();
			
			if(i!=0 && j!=0 && k!=0){
				bool = true;
			}			
		} catch (SQLException e) {
			conn.rollback();
			e.printStackTrace();
		}	
	
		return bool;
	}
	
	
	/**
	 * 为拼团订单分配导游
	 * @param visitTime
	 * @param visitNum
	 * @param maxNum
	 * @param scenicID
	 * @param orderID
	 * @return
	 * @throws SQLException 
	 */
	public boolean AssignGuide(String visitTime, int visitNum, int maxNum,
			String scenicID, String orderID) throws SQLException{
		
		boolean bool = false;
		String phoneString = null;
		
		if(visitNum >= maxNum-3){
			phoneString = guideDao.getPhoneOfPinGuide(visitTime, scenicID);
		}
		if(phoneString != null){
			
			DataSource dataSource =jdbcTemplate.getDataSource();
			Connection conn = null;
			int hour = 0;
			try {	
				conn = dataSource.getConnection();
				conn.setAutoCommit(false);
				
				CallableStatement cst = conn.prepareCall("call getMaxHourbyScenicID(?)");
				cst.setString(1, scenicID);
				ResultSet rst=cst.executeQuery();
				
				while (rst.next()) {
					hour = Integer.parseInt(rst.getString(1));
				}
				
				String sqlInsert = "insert into t_guideBeOrdered "
						+ "(orderId,guidePhone,visitTime,timeFrom,timeTo)"
						+ "values (?,?,?,?,?)";
				String timeFrom = DateConvert.addHourToTime(visitTime+":00", -hour);
				String timeTo = DateConvert.addHourToTime(visitTime+":00", hour);
				int k = jdbcTemplate.update(sqlInsert, new Object[]{orderID, phoneString, visitTime,
						timeFrom, timeTo});
				
				String sqlUpdate = "update t_consistOrder set guidePhone='"+phoneString+"',"
						+ "orderState='待游览' where orderID='"+orderID+"'";
				int j = jdbcTemplate.update(sqlUpdate);
				
				String Update = "update t_consistresult set guidePhone='"+phoneString+"' where orderID='"+orderID+"'";
				int i = jdbcTemplate.update(Update);
				
				conn.commit();//提交JDBC事务 
				conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
				conn.close();
				
				if(i!=0 && j!=0 && k!=0){
					bool = true;
				}
			} catch (SQLException e) {
				conn.rollback();
				e.printStackTrace();
			}						
		}
		return bool;
	}
	
	
	/**
	 * 从可拼单列表中选择订单，进行拼单
	 * @param orderID   订单编号，一个订单编号对应多个拼单编号
	 * @param consistOrderID  拼单编号
	 * @param scenicID    景区编号
	 * @param produceTime  订单生成时间
	 * @param visitTime  参观时间
	 * @param visitNum   参观人数
	 * @param visitorPhone  游客的手机号
	 * @param totalMoney  此拼单的金额
	 * @param purchaseTicket  是否代购门票
	 * @param orderState  拼单的状态
	 * @param isConsisted   是否被拼单
	 * @param maxNum
	 * @throws SQLException 
	 */
	public boolean consistWithconsistOrderID(String orderID, String consistOrderID,
			String scenicID, String produceTime, String visitTime, int visitNum, 
			String visitorPhone, String contact,int currentNum, String orderState,
			int isConsisted, int maxNum, int totalFee, int fee) throws SQLException{
		
		boolean bool = false;
		String payTime = MyDateFormat.form(new Date());;
		
		DataSource dataSource = jdbcTemplate.getDataSource();
		Connection  conn = null;
		try{
			conn = dataSource.getConnection();
			conn.setAutoCommit(false);
			
			//将拼单信息插入拼单表
			String sqlString = "insert into t_consistOrder (orderID,consistOrderID,scenicID,produceTime,"
					+ "visitTime,visitNum,visitorPhone,contact,orderState,isConsisted,maxNum,"
					+ "totalGuideFee,guideFee) "
					+ "values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
			int i = jdbcTemplate.update(sqlString, new Object[]{orderID, consistOrderID, scenicID, 
					produceTime, visitTime, visitNum, visitorPhone, contact,
					orderState, isConsisted,maxNum,totalFee, fee});
			
			//更新拼单状态，已拼单
			String sqlString1 = "update t_consistorder set isConsisted=1 where orderID=?";
			int j = jdbcTemplate.update(sqlString1, new Object[]{orderID});
			
			//更新拼单结果，当前人数
			String sqlString2 = "update t_consistresult set "
					+ "visitNum=?,maxNum=?,visitTime=?,scenicID=?,guideFee=?,finishScan=2 where orderID=?";
			int k = jdbcTemplate.update(sqlString2, new Object[]{currentNum, maxNum,
					visitTime, scenicID, fee, orderID});
			
			String sqlUpdate = "update t_consistorder set payTime='"+payTime+"',hadPay=1 "
					+ "where orderID='"+orderID+"' ";
			int h = jdbcTemplate.update(sqlUpdate);
			
			if(currentNum >= maxNum-3) {
				boolean assign = AssignGuide(visitTime, currentNum, maxNum, scenicID, orderID);
			}			

			conn.commit();//提交JDBC事务 
			conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
			conn.close();
			
			if(i != 0 && j!=0 && k!=0 && h!=0){
				bool = true;
			}
			
		} catch (SQLException e) {
			conn.rollback();
			e.printStackTrace();
		}	
	
		return bool;
	}

	
	
	
	
	/**
	 * 查询数据库中的当前可拼单的订单
	 * @param scenicID  景区编号
	 * @param date   当前的时间
	 */
	public List<Map<String , Object>> getAllAvailableConsistOrder(){
		
		List<Map<String , Object>> list = new ArrayList<>(); 			 		
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getAvailableConsistOrder()");
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				
				int currentNum = rst.getInt(3);
				int maxNum = rst.getInt(4);
				//还可以拼单的人数
				int num = maxNum - currentNum;
				map.put("orderID", rst.getString(1));
				map.put("visitTime", rst.getString(2));
				map.put("currentNum", currentNum);
				map.put("num", num);
				map.put("scenicID", rst.getString(5));
				map.put("scenicName", rst.getString(6));
				map.put("guideFee", rst.getInt(7));
				list.add(map);
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
				
		return list;
	}
	
	
	/**
	 * 根据条件，筛选可拼单的订单
	 * @param scenicName   景区名称
	 * @param date  日期
	 * @param visitNum  参观人数
	 * @return
	 */
	public List<Map<String , Object>> getConsistOrderWithSelector(String scenicName, 
			String date, int visitNum){
		
		int def = -1;
		List<Map<String , Object>> listResult = new ArrayList<>(); 		
		List<Map<String , Object>> list = getAllAvailableConsistOrder();
		
		for(int i=0; i<list.size(); i++){
			listResult.add(list.get(i));
		}
		
		for(int i=0; i<list.size(); i++){
			
			String lname = (String) list.get(i).get("scenicName");
			String ldate = (String) list.get(i).get("visitTime");
			int num = (Integer) list.get(i).get("num");

			
			if(!scenicName.equals("null") && !scenicName.equals(lname)){
				listResult.remove(list.get(i));
			}
			
			if((visitNum != def) && (visitNum > num)){
				listResult.remove(list.get(i));
			}
			
			//true: dateFrom <= dateTo
			if(!date.equals("null") && DateConvert.dateCompare(ldate, date)){
				listResult.remove(list.get(i));
			}
		}
		
		return listResult;
	}


	
	
	/**
	 * 根据订单编号，查询每个拼单结果的详细信息,t_consistresult
	 * @param OrderID  订单编号
	 * @return 订单编号、参观时间、当前人数、最大人数、景区编号
	 */
	public ConsistResult getDetailConsistResult(String OrderID){
		
		ConsistResult consistResult = new ConsistResult(); 			 		
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getDetailConsistResult(?)");
			cst.setString(1, OrderID);
			ResultSet rst=cst.executeQuery();
		
			while (rst.next()) {				
				consistResult.setOrderID(rst.getString(1));
				consistResult.setScenicID(rst.getString(2));
				consistResult.setVisitTime(rst.getString(3));
				consistResult.setVisitNum(rst.getInt(4));
				consistResult.setMaxNum(rst.getInt(5));											
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 	
		
		return consistResult;
	}
	
	
	/**
	 * 导游指定集合地点
	 * @param orderId 预约订单的订单号
	 * @param longitude  经度
	 * @param latitude  纬度
	 * @return
	 */
	public int uploadConsistLocation(String orderId, String longitude, String latitude){
		
		int ret = 0;
		
		String update = "UPDATE t_consistorder SET longitude='"+longitude+"',"
				+ "latitude='"+latitude+"' WHERE orderID='"+orderId+"'";
		int i = jdbcTemplate.update(update);
		
		if(i != 0){
			ret = 1;
		}
		
		return ret;
	}
	
	
	/**
	 * 讲解员完成拼单订单的讲解
	 * @param orderId
	 * @return
	 * @throws SQLException
	 */
	public int finishConsistOrderByGuide(String orderId) throws SQLException{
		
		int ret = 0;
		DataSource dataSource = jdbcTemplate.getDataSource();
		Connection  conn = null;
		try{
			conn = dataSource.getConnection();
			conn.setAutoCommit(false);
			
			String update = "UPDATE t_consistorder SET endTime=NOW(),orderState='待评价'"
					+ " WHERE orderID='"+orderId+"'";
			int i = jdbcTemplate.update(update);
			
			String sqlString = "update t_consistresult set state=1 where orderID='"+orderId+"'";
			int j = jdbcTemplate.update(sqlString);
			
			conn.commit();//提交JDBC事务 
			conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
			conn.close();
			
			if(i != 0 && j!= 0){
				ret = 1;
			}			
		} catch (SQLException e) {
			conn.rollback();
			e.printStackTrace();
		}
		
		return ret;
	}

	
	/**
	 * 根据订单编号，查询该订单中的所有拼单的编号
	 * @param orderID  订单编号
	 * @return
	 */
	public List<String> getConsistOrderIDsWithOrderID(String orderID){
		
		List<String> consistOrderIDs = new ArrayList<>();
		
		String sqlSearch = "select consistOrderID from t_consistorder where orderID='"+orderID+"'";
		List<Map<String , Object>> list2=jdbcTemplate.queryForList(sqlSearch);
		
		for (int j = 0; j <list2.size(); j++){
			String id = (String)list2.get(j).get("consistOrderID");
			consistOrderIDs.add(id);
		}
		
		return consistOrderIDs;
	}
	
	
	/**
	 * 从t_consistResult中筛选讲解员未讲解的订单(拼单和快捷拼单)
	 * @param guidePhone
	 * @return
	 */
	public List<Map<String , Object>> getUndoGuideOrder(String guidePhone){
		
		List<Map<String , Object>> list = new ArrayList<>();		
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getUndoGuideOrder(?)");
			cst.setString(1, guidePhone);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("orderID", rst.getString(1));
				map.put("visitTime", rst.getString(2));
				map.put("orderState", rst.getString(3));
				map.put("visitNum", rst.getInt(4));
				map.put("guideFee", rst.getInt(5));
				map.put("scenicName", rst.getString(6));
				map.put("cancleFee", rst.getInt(7));
				
				list.add(map);
			}			
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		
		return list;
	} 
	
	
	/**
	 * 从t_consistResult中筛选讲解员已经讲解完成的订单(拼单和快捷拼单)
	 * @param guidePhone
	 * @return
	 */
	public List<Map<String , Object>> getFinishedGuideOrder(String guidePhone){
		
		List<Map<String , Object>> list = new ArrayList<>();		
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getFinishedGuideOrder(?)");
			cst.setString(1, guidePhone);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("orderID", rst.getString(1));
				map.put("visitTime", rst.getString(2));
				map.put("orderState", rst.getString(3));
				map.put("visitNum", rst.getInt(4));
				map.put("guideFee", rst.getInt(5));
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
	 * 填写拼单订单中游客未确认的原因
	 * @param orderId
	 * @return
	 */
	public int writeConsitOrderReason(String orderId, String reason, String phone){
		
		int ret = 0;
		
		String update = "update t_consistorder set reason='"+reason+"' "
				+ "where orderID='"+orderId+"' and visitorPhone='"+phone+"'";
		int i = jdbcTemplate.update(update);
		
		if(i != 0){
			ret = 1;
		}
		return ret;
	}
	
}
