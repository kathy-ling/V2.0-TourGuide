package com.TourGuide.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.TourGuide.model.AdminInfo;
import com.TourGuide.model.GuideFee;

@Repository
public class GuideFeeDao {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	/**
	 * 对讲解员的收入信息获取并进行分页
	 * @param currentPage
	 * @param rows
	 * @return
	 * 2017-1-13 21:14:29
	 */
	public List<GuideFee> GetGuideFee(int currentPage,int rows)
	{
		int k=(currentPage-1)*rows;
		List<GuideFee> list=new ArrayList<>();
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getGuidefee(?,?)");
			cst.setInt(1, k);
			cst.setInt(2, rows);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				GuideFee guideFee=new GuideFee();
				guideFee.setGuidePhone(rst.getString(1));
				guideFee.setGuideName(rst.getString(2));
				guideFee.setMonthFee(rst.getInt(3));
				guideFee.setDayFee(rst.getInt(4));
				guideFee.setReward(rst.getInt(5));
				guideFee.setPunishment(rst.getInt(6));
				list.add(guideFee);
			}
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
	}
	
	
	/**
	 * 得到讲解员的信息数目
	 * @return
	 * 2017-1-13 21:14:59
	 */
	public int  GetGuideFeeCount()
	{
		int i=0;
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection connection=dataSource.getConnection();
			CallableStatement cst=connection.prepareCall("call getGuideFeecount(?)");
			cst.registerOutParameter(1, java.sql.Types.BIGINT);
			cst.execute();
			i=cst.getInt(1);
			connection.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return i;
	}
	
	
	/**
	 * 根据讲解员手机号得到讲解员收入详细信息
	 * @param guidePhone
	 * @return
	 * 2017-2-21 14:18:11
	 */
	public GuideFee getguideFeeByPhone(String guidePhone)
	{
		
		GuideFee guideFee=new GuideFee();
		DataSource dataSource =jdbcTemplate.getDataSource();
		
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getGuideFeeByPhone(?)");
			cst.setString(1, guidePhone);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
					guideFee.setGuidePhone(rst.getString(1));
					guideFee.setGuideName(rst.getString(2));
					guideFee.setMonthFee(rst.getInt(3));
					guideFee.setDayFee(rst.getInt(4));
					guideFee.setReward(rst.getInt(5));
					guideFee.setPunishment(rst.getInt(6));
			}
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		return guideFee;
	}
	
	/**
	 * 奖励讲解员金额
	 * @param phone
	 * @param money
	 * @param reason
	 * @param loginphone 
	 * @return
	 * 2017-2-21 16:53:41
	 */
	public  int  RewardGuideFee(String phone,int money,String reason, String loginphone) {
		
		int i=0;
		DataSource dataSource=jdbcTemplate.getDataSource();
		Connection conn;
		try {
			conn=dataSource.getConnection();
			conn.setAutoCommit(false);
			String sql2="select role from t_admin where username='"+loginphone+"'";
			Map<String, Object> map=jdbcTemplate.queryForMap(sql2);
			String role=(String) map.get("role");
			String sql="INSERT INTO t_guiderecord (guideID, reason, money, date,class,role,phone)"+ 
					"SELECT t_guideinfo.id,?,?,NOW(),0,?,?"+
					"FROM t_guideinfo WHERE phone = ?";
			
			jdbcTemplate.update(sql, new Object[]{reason,money,role,loginphone,phone});
			String sql1="SELECT reward from t_guidefee "
					+ "WHERE guideID IN "
					+ "(SELECT id FROM t_guideinfo WHERE phone=?)";
			 map=jdbcTemplate.queryForMap(sql1, phone);
			int reward=(int) map.get("reward");
			String sql3="update t_guidefee set reward=? where "
					+ "guideID IN (SELECT id FROM t_guideinfo WHERE phone=?) ";
			i=jdbcTemplate.update(sql3, new Object[]{reward+money,phone});
			conn.commit();//提交JDBC事务 
			conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
			conn.close();
		} catch (DataAccessException e) {
			i=0;
			e.printStackTrace();
		} catch (SQLException e) {
			i=0;
			e.printStackTrace();
		}
		
		return i;
	}
	
	/**
	 * 惩罚讲解员金额
	 * @param phone
	 * @param money
	 * @param reason
	 * @param loginphone 
	 * @return
	 * 2017-2-21 17:01:01
	 */
	public int PunishGuideFee(String phone,int money,String reason, String loginphone) {
		
		int i=0;
		DataSource dataSource=jdbcTemplate.getDataSource();
		Connection conn;
		try {
			conn=dataSource.getConnection();
			conn.setAutoCommit(false);
			String sql2="select role from t_admin where username='"+loginphone+"'";
			Map<String, Object> map=jdbcTemplate.queryForMap(sql2);
			String role=(String) map.get("role");
			String sql="INSERT INTO t_guiderecord (guideID, reason, money, date,class,role,phone)"+ 
					"SELECT t_guideinfo.id,?,?,NOW(),1,?,? "+
					"FROM t_guideinfo WHERE phone = ?";
			
			jdbcTemplate.update(sql, new Object[]{reason,money,role,loginphone,phone});
			String sql1="SELECT punishment from t_guidefee "
					+ "WHERE guideID IN "
					+ "(SELECT id FROM t_guideinfo WHERE phone=?)";
		    map=jdbcTemplate.queryForMap(sql1, phone);
			int punishment=(int) map.get("punishment");
			
			String sql3="update t_guidefee set punishment=? where "
					+ "guideID IN (SELECT id FROM t_guideinfo WHERE phone=?) ";
			i=jdbcTemplate.update(sql3, new Object[]{punishment+money,phone});
			conn.commit();//提交JDBC事务 
			conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
			conn.close();
		} catch (DataAccessException e) {
			i=0;
			e.printStackTrace();
		} catch (SQLException e) {
			i=0;
			e.printStackTrace();
		}
		
		return i;
	}

}
