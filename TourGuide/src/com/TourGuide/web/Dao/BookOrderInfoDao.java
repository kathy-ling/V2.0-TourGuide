package com.TourGuide.web.Dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.TourGuide.web.model.BookOrderInfo;

@Repository
public class BookOrderInfoDao {

	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	
	/**
	 * 分页得到预约订单信息
	 * @param i
	 * @param j
	 * @return
	 * 2017-3-9 11:12:29
	 */
	public List<BookOrderInfo> getBookOrderInfoBypage(int i,int j)
	{
		
		List<BookOrderInfo> list=new ArrayList<>();
		int k=(i-1)*j;
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getBookOrderInfo(?,?)");
			cst.setInt(1, k);
			cst.setInt(2, j);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				BookOrderInfo bookOrderInfo=new BookOrderInfo();
				bookOrderInfo.setOrderID(rst.getString(1));
				bookOrderInfo.setOrderState(rst.getString(2));
				bookOrderInfo.setOrderClass(rst.getInt(3));
				bookOrderInfo.setScenicName(rst.getString(4));
				bookOrderInfo.setVisitorPhone(rst.getString(5));
				bookOrderInfo.setVisitorName(rst.getString(6));
				bookOrderInfo.setTotalMoney(rst.getInt(7));
				if (rst.getString(8)==null) {
					bookOrderInfo.setGuidePhone("等待接单");
				} else {
					bookOrderInfo.setGuidePhone(rst.getString(8));
				}
				
				if (rst.getString(9)==null) {
					bookOrderInfo.setGuideName("等待接单");;
				} else {
					bookOrderInfo.setGuidePhone(rst.getString(9));
				}
				
				list.add(bookOrderInfo);
			}
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
	}
	
	/**
	 * 得到预约订单的订单数目
	 * @return
	 * 2017-3-9 11:44:46
	 */
	public int getBookOrderInfoCount () {
		
		DataSource dataSource=jdbcTemplate.getDataSource();
		int i=0;
		try {
			Connection connection=dataSource.getConnection();
			CallableStatement cst=connection.prepareCall("call getBookOrderInfoCount(?)");
			cst.registerOutParameter(1, java.sql.Types.BIGINT);
			cst.execute();
			i=cst.getInt(1);
			connection.close();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return i;
	}
}
