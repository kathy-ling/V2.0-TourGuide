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

import com.TourGuide.model.OperateRecord;


@Repository
public class OperateRecordDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	/**
	 * 分页得到操作日志记录
	 * @param i
	 * @param j
	 * @return
	 * 2017-2-23 16:43:34
	 */
	public List<OperateRecord> getOperateRecordBypage(int i,int j) {
		
		List<OperateRecord> list=new ArrayList<>();
		int k=(i-1)*j;
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getOperateRecord(?,?)");
			cst.setInt(1, k);
			cst.setInt(2, j);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				OperateRecord operateRecord=new OperateRecord();
				operateRecord.setOperateAccount(rst.getString(1));
				operateRecord.setOperateRole(rst.getString(2));
				operateRecord.setOperateScenic(rst.getString(3));
				operateRecord.setOperateMessage(rst.getString(4));
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				operateRecord.setOperateDate(df.format(rst.getTimestamp(5)));
				list.add(operateRecord);
			}
			conn.close();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return list;	
	}
	
	/**
	 * 得到操作记录信息数目
	 * @return
	 * 2017-2-23 16:48:35
	 */
	public int getOperateRecordCount()
	{
		int i=0;
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getOperateRecordCount()");
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				i=rst.getInt(1);
			}
			conn.close();
		} catch (SQLException e) {
			
			e.printStackTrace();
			i=0;
		}
		return i;
	}
	
	/**
	 * 得到通过日期查询到的记录数目
	 * @return
	 * 2017-2-23 20:36:00
	 */
	public int getOperateRecordByDateCount(String date1,String date2)
	{
		int i=0;
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getOperateRecordDateCount(?,?)");
			cst.setString(1, date1);
			cst.setString(2, date2);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				i=rst.getInt(1);
			}
			conn.close();
		} catch (SQLException e) {
			
			e.printStackTrace();
			i=0;
		}
		return i;
	}
	
	/**
	 * 得到通过景区名称查询到的记录数目
	 * @param scenic 
	 * @return
	 * 2017-2-23 20:36:22
	 */
	public int getOperateRecordByScenicCount(String scenic)
	{
		int i=0;
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getRecordByScenicCount(?)");
			cst.setString(1, scenic);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				i=rst.getInt(1);
			}
			conn.close();
		} catch (SQLException e) {
			
			e.printStackTrace();
			i=0;
		}
		return i;
	}

	
	/**
	 * 分页得到通过日期得到的记录信息
	 * @param i
	 * @param j
	 * @param date1
	 * @param date2
	 * @return
	 * 2017-2-23 20:37:02
	 */
	public List<OperateRecord> getOperateRecordByDate(int i,int j,String date1,String date2) 
	{
		List<OperateRecord> list=new ArrayList<>();
		int k=(i-1)*j;
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getOperateRecordBydate(?,?,?,?)");
			cst.setString(1, date1);
			cst.setString(2, date2);
			cst.setInt(3, k);
			cst.setInt(4, j);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				OperateRecord operateRecord=new OperateRecord();
				operateRecord.setOperateAccount(rst.getString(1));
				operateRecord.setOperateRole(rst.getString(2));
				operateRecord.setOperateScenic(rst.getString(3));
				operateRecord.setOperateMessage(rst.getString(4));
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				operateRecord.setOperateDate(df.format(rst.getTimestamp(5)));
				list.add(operateRecord);
			}
			conn.close();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return list;
		
	}
	
	
	/**
	 * 分页得到通过景区名称得到的记录信息
	 * @param i
	 * @param j
	 * @param scenic
	 * @return
	 * 2017-2-23 20:37:22
	 */
	public List<OperateRecord> getOperateRecordByScenic(int i,int j,String scenic) 
	{
		List<OperateRecord> list=new ArrayList<>();
		int k=(i-1)*j;
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getOperateRecordByScenic(?,?,?)");
			cst.setString(1, scenic);
			cst.setInt(2, k);
			cst.setInt(3, j);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				OperateRecord operateRecord=new OperateRecord();
				operateRecord.setOperateAccount(rst.getString(1));
				operateRecord.setOperateRole(rst.getString(2));
				operateRecord.setOperateScenic(rst.getString(3));
				operateRecord.setOperateMessage(rst.getString(4));
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				operateRecord.setOperateDate(df.format(rst.getTimestamp(5)));
				list.add(operateRecord);
			}
			conn.close();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return list;
		
	}
	
	
}
