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

import org.omg.PortableServer.ID_ASSIGNMENT_POLICY_ID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import com.TourGuide.model.GuideOtherInfo;

@Repository
public class AffiliationDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	/**
	 * 导游选中景区后，申请挂靠
	 * @param guidePhone  导游手机号
	 * @param scenicID  景区编号
	 * @param applyDate  申请日期
	 * @return 0--失败 ，1--成功，-1--申请失败。因为您有待处理的挂靠申请！，
	 * -2请先取消当前的挂靠，再进行申请,-3未通过审核，不能挂靠
	 * @throws SQLException 
	 */
	public int applyForAffiliation(String guidePhone, String scenicID, 
			String applyDate) throws SQLException{
		
		int ret = 0;
		String belong = null;
		int state = 1;  //1---待处理
		
		belong = (String) getCurrentAffiliation(guidePhone).get("scenicID");	
		
		if(belong != null){
			return ret = -2;
		}else{
			
			String id = (String) getCurrentApply(guidePhone).get("scenicID");
			if(id != null){
				return ret = -1;
			}
			
			//jdbc事务
			DataSource dataSource = jdbcTemplate.getDataSource();
			Connection  conn = null;
			try {
				  conn = dataSource.getConnection();
				  conn.setAutoCommit(false);
				  
				  String sqlUpdate = "update t_guideotherinfo set scenicBelong='"+scenicID+"' "
							+ "where phone='"+guidePhone+"' and authorized=2";
				  int i = jdbcTemplate.update(sqlUpdate);
				  
				  if (i != 0 ){
					  ret = -3;
				  }
				  
				  String sql = "update t_guideotherinfo set authorized=2 "
							+ "where phone='"+guidePhone+"'";
				  int j = jdbcTemplate.update(sql);
					
				  String sqlInsert = "insert into t_affiliation (guidePhone,scenicID,applyDate,state) "
							+ "values (?,?,?,?)";
				  int k = jdbcTemplate.update(sqlInsert, new Object[]{guidePhone, scenicID, applyDate,state});									
			
				  conn.commit();//提交JDBC事务 
				  conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
				  conn.close();
				  if (i != 0 && j != 0 && k != 0){
					  ret = 1;
				  }
				} catch (SQLException e) {
					conn.rollback();
					e.printStackTrace();
				}	
		}
				
		return ret;
	}
	
	
	/**
	 * 取消导游所挂靠的景区
	 * @param guidePhone  导游手机号
	 * @param scenicID   景区编号
	 * @param quitDate  取消挂靠的日期
	 * @return
	 * @throws SQLException 
	 */
	public boolean cancleAffiliation(String guidePhone, String scenicID, 
			String quitDate) throws SQLException{
		
		boolean bool = false;
		
		Map<String , Object> map = getCurrentAffiliation(guidePhone);
		int historyTimes = (int) map.get("historyTimes");
		int historyNum = (int) map.get("historyNum");
		int singleMax = (int) map.get("singleMax");
		int guideFee = (int) map.get("guideFee");
		String guideLevel = (String) map.get("guideLevel");
		
		String sqlSelect = "select * from t_guidebeordered where guidePhone='"+guidePhone+"'";
		List<Map<String , Object>> list = jdbcTemplate.queryForList(sqlSelect);
		
		if(list.size() != 0){
			return false;
		}
		
		//jdbc事务
		DataSource dataSource = jdbcTemplate.getDataSource();
		Connection  conn = null;
		try{
			conn = dataSource.getConnection();
			conn.setAutoCommit(false);
			//记录之前的挂靠数据及取消的日期,state=0 ---不再挂靠该景区
			String sqlRecord = "update t_affiliation set quitDate='"+quitDate+"', "
					+ "historyTimes="+historyTimes+",historyNum="+historyNum+","
					+ "singleMax="+singleMax+", guideFee="+guideFee+",guideLevel='"+guideLevel+"',state=0 "
					+ "where guidePhone='"+guidePhone+"' and scenicID='"+scenicID+"'";
			int j = jdbcTemplate.update(sqlRecord);
			
			String sqlUpdate = "update t_guideotherinfo set scenicBelong='null',"
					+ "historyTimes=0,historyNum=0,singleMax=0,guideFee=0,guideLevel='0',authorized='2',"
					+ "InterviewTime='null',Interviewlocation='null',InterviewContext='null' "
					+ "where phone='"+guidePhone+"'";
			int i = jdbcTemplate.update(sqlUpdate);	
			
			String delete = "delete from guide where gtel='"+guidePhone+"'";
			int k = jdbcTemplate.update(delete);	
			
			conn.commit();//提交JDBC事务 
			conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
			conn.close();
			if (i != 0 && j != 0 && k!= 0){
				bool = true;
			}
		} catch (SQLException e) {
			conn.rollback();
			e.printStackTrace();
		}
		
		return bool;
	}	
	
	
	
	/**
	 * 查看该导游的当前挂靠景区
	 * @param guidePhone  手机号
	 * @return
	 */
	public Map<String , Object> getCurrentAffiliation(String guidePhone){
		
		Map<String , Object> map = new HashMap<String, Object>();
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getCurrentAffiliation(?)");
			cst.setString(1, guidePhone);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				map.put("scenicID", rst.getString(1));
				map.put("scenicName", rst.getString(2));
				map.put("applyDate", rst.getString(3));
				map.put("passDate", rst.getString(4));
				map.put("historyTimes", rst.getInt(5));
				map.put("historyNum", rst.getInt(6));
				map.put("singleMax", rst.getInt(7));
				map.put("guideFee", rst.getInt(8));
				map.put("guideLevel", rst.getString(9));
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		return map;
	}
	
	/**
	 * 查看该导游当前de挂靠申请
	 * @param guidePhone
	 * @return
	 */
	public Map<String , Object> getCurrentApply(String guidePhone){
		
		Map<String , Object> map = new HashMap<String, Object>();
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getCurrentApply(?)");
			cst.setString(1, guidePhone);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				map.put("scenicID", rst.getString(1));
				map.put("scenicName", rst.getString(2));
				map.put("applyDate", rst.getString(3));
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		return map;
	}
	
	/**
	 * 查看该导游的挂靠景区记录
	 * @param guidePhone
	 * @return
	 */
	public List<Map<String , Object>> getHistoryAffiliation(String guidePhone){
		
		List<Map<String , Object>> list = new ArrayList<>();
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getHistoryAffiliation(?)");
			cst.setString(1, guidePhone);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("scenicID", rst.getString(1));
				map.put("scenicName", rst.getString(2));
				map.put("applyDate", rst.getString(3));
				map.put("passDate", rst.getString(4));
				map.put("quitDate", rst.getString(5));
				map.put("historyTimes", rst.getInt(6));
				map.put("historyNum", rst.getInt(7));
				map.put("singleMax", rst.getInt(8));
				map.put("guideFee", rst.getInt(9));
				map.put("guideLevel", rst.getString(10));
				list.add(map);
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		return list;
	}
}
