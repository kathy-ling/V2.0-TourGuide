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
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.TourGuide.model.ScenicTickets;

@Repository
public class ScenicTicketsDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	/**
	 * 根据景区编号，查询该景区的门票信息
	 * @param scenicNo  景区编号
	 * @return  景区的门票信息
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ScenicTickets geTicketsByScenicNo(String scenicNo){
		
		ScenicTickets scenicTickets = new ScenicTickets();	
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call geTicketsByScenicNo(?)");
			cst.setString(1, scenicNo);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				scenicTickets.setScenicNo(rst.getString(1));
				scenicTickets.setHalfPrice(rst.getInt(2));
				scenicTickets.setFullPrice(rst.getInt(3));
				scenicTickets.setDiscoutPrice(rst.getInt(4));
			}
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return scenicTickets;
	}
	
	/**
	 * 分页得到景区门票的详细信息
	 * @param i
	 * @param j
	 * @return
	 * 2017-2-10 21:10:16
	 */
	public  List<Map<String , Object>> getScenicTicketByPage(int i,int j) {
		
		int k=(i-1)*j;
		List<Map<String, Object>> list=new ArrayList<>();
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getScenicTicket(?,?)");
			cst.setInt(1, k);
			cst.setInt(2, j);
			ResultSet rSet=cst.executeQuery();
			while (rSet.next()){
				Map<String, Object> map=new HashMap<>();
				map.put("scenicID", rSet.getString(1));
				map.put("scenicName", rSet.getString(5));
				map.put("half", rSet.getInt(2));
				map.put("full", rSet.getInt(3));
				map.put("discount", rSet.getInt(4));
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
	 * 得到景区门票信息的数目
	 * @return
	 * 2017-2-10 21:32:44
	 */
	public  int getScenicTicketCount()
	{
		DataSource dataSource=jdbcTemplate.getDataSource();
		int i=0;
		try {
			Connection connection=dataSource.getConnection();
			CallableStatement cst=connection.prepareCall("call getscenicTicketCount(?)");
			cst.registerOutParameter(1, java.sql.Types.BIGINT);
			cst.execute();
			i=cst.getInt(1);
			connection.close();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return i;
	}
	
	/**
	 * 通过景区编号查询景区门票信息
	 * @param scenicID
	 * @return
	 * 2017-2-10 21:39:18
	 */
	public  List<Map<String , Object>> getTicketByscenicN(String scenicID) {
		
		
		String sql="SELECT t_scenictickets.*, t_scenicspotinfo.scenicName"+
				"  FROM t_scenictickets,t_scenicspotinfo WHERE"+
				" t_scenicspotinfo.scenicNo = t_scenictickets.scenicNo"
				+ " and t_scenictickets.scenicNo= '"+scenicID+"'";
		
		return jdbcTemplate.queryForList(sql);
	}
	
	/**
	 * 更新景区门票价格信息
	 * @param scenicTickets
	 * @return
	 * 2017-2-10 22:01:53
	 */
	public int   UpdatescenicTicket(ScenicTickets scenicTickets) {
		
		String sql="update t_scenictickets set halfPrice=?,"
				+ "fullPrice=?,discoutPrice=? where scenicNo=?";
		return jdbcTemplate.update(sql, new Object[]{scenicTickets.getHalfPrice(),
				scenicTickets.getFullPrice(),scenicTickets.getDiscoutPrice(),
				scenicTickets.getScenicNo()});
	}
}
