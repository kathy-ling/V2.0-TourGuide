package com.TourGuide.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.TourGuide.model.RecordofReward;


@Repository
public class RecordofRewardDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	/**
	 * 分页得到奖惩记录的信息
	 * @param currentPage
	 * @param rows
	 * @return
	 * 2017-2-22 09:32:57
	 */
	public List<RecordofReward> GetRecordofReward(int currentPage,int rows)
	{
		
		int k=(currentPage-1)*rows;
		List<RecordofReward> list=new ArrayList<>();
		
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection connection=dataSource.getConnection();
			CallableStatement cst=connection.prepareCall("call getGuideRecord(?,?)");
			cst.setInt(1, k);
			cst.setInt(2, rows);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				String cla;
				RecordofReward recordofReward=new RecordofReward();
				recordofReward.setGuidePhone(rst.getString(1));
				recordofReward.setGuideName(rst.getString(2));
				if(rst.getInt(3)==0)
				{
					cla="奖励";
				}else {
					cla="惩罚";
				}
				recordofReward.setCla(cla);
				recordofReward.setMoney(rst.getInt(4));
				recordofReward.setReason(rst.getString(5));
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				recordofReward.setDate(df.format(rst.getTimestamp(6)));
				recordofReward.setOperatePhone(rst.getString(7));
				recordofReward.setOperateRole(rst.getString(8));
				list.add(recordofReward);
			}
			
			connection.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
	}
	
	
	/**
	 * 得到奖惩记录的信息数目
	 * @return
	 * 2017-2-22 09:34:56
	 */
	public int  GetRecordofRewardCount() {
		
		int i=0;
		DataSource dataSource = jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getGuideRecordCount(?)");
			cst.registerOutParameter(1, java.sql.Types.BIGINT);
			cst.execute();
			i=cst.getInt(1);
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return i;
	}
	
	
	/**
	 * 通过日期搜索讲解员记录信息
	 * @param date1
	 * @param date2
	 * @param phone
	 * @param pageRows 
	 * @param currentPage 
	 * @return
	 * 2017-2-22 14:27:44
	 */
	public List<RecordofReward> GetRecordofRewardByDate(String date1,String date2, int currentPage, int pageRows) 
	{
		int k=(currentPage-1)*pageRows;
		List<RecordofReward> list=new ArrayList<>();
		DataSource dataSource = jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getGuideRecordBydate(?,?,?,?)");
			cst.setString(1, date1);
			cst.setString(2, date2);
			cst.setInt(3, k);
			cst.setInt(4, pageRows);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				String cla;
				RecordofReward recordofReward=new RecordofReward();
				recordofReward.setGuidePhone(rst.getString(1));
				recordofReward.setGuideName(rst.getString(2));
				if(rst.getInt(3)==0)
				{
					cla="奖励";
				}else {
					cla="惩罚";
				}
				recordofReward.setCla(cla);
				recordofReward.setMoney(rst.getInt(4));
				recordofReward.setReason(rst.getString(5));
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				recordofReward.setDate(df.format(rst.getTimestamp(6)));
				recordofReward.setOperatePhone(rst.getString(7));
				recordofReward.setOperateRole(rst.getString(8));
				list.add(recordofReward);
			}
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	 /**
	  * 通过手机号进行查询讲解员的记录信息
	  * @param phone
	 * @param pageRows 
	 * @param currentPage 
	  * @return
	  * 2017-2-22 14:34:28
	  */
	public List<RecordofReward> GetRecordofRewardByPhone(String phone, int currentPage, int pageRows) 
	{
		
		int k=(currentPage-1)*pageRows;
		List<RecordofReward> list=new ArrayList<>();
		DataSource dataSource = jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getGuideRecordByphone(?,?,?)");
			cst.setString(1, phone);
			cst.setInt(2, k);
			cst.setInt(3, pageRows);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				String cla;
				RecordofReward recordofReward=new RecordofReward();
				recordofReward.setGuidePhone(rst.getString(1));
				recordofReward.setGuideName(rst.getString(2));
				if(rst.getInt(3)==0)
				{
					cla="奖励";
				}else {
					cla="惩罚";
				}
				recordofReward.setCla(cla);
				recordofReward.setMoney(rst.getInt(4));
				recordofReward.setReason(rst.getString(5));
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				recordofReward.setDate(df.format(rst.getTimestamp(6)));
				recordofReward.setOperatePhone(rst.getString(7));
				recordofReward.setOperateRole(rst.getString(8));
				list.add(recordofReward);
			}
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
		
	}
	
	
	public int GetRecordofRewardByDateCount(String date1,String date2) 
	{
		
		int i=0;
		DataSource dataSource = jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getGuideRecordBydateCount(?,?)");
			cst.setString(1, date1);
			cst.setString(2, date2);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				i=rst.getInt(1);
			}
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return i;
	}
	
	
	public int  GetRecordofRewardByPhoneCount(String phone) {
		
		int i=0;
		DataSource dataSource = jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getGuideRecordByphoneCount(?)");
			cst.setString(1, phone);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				i=rst.getInt(1);
			}
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return i;
	}
	
}
