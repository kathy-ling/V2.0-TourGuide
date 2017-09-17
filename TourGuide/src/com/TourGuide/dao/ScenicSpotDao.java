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
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import com.TourGuide.model.ScenicsSpotInfo;

@Repository
public class ScenicSpotDao {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	private final int scenicNum = 6;  //推荐的热门景点的数目
	private final int isHotSpot = 1;  //是否是热门景点，是：1  否：0
	private final int recommandNum = 4;  //相关景点的推荐数目
	
	
	/**
 	 * 根据景区编号，查看景区的详细信息
 	 * @param scenicNo  景区编号
 	 * @return 景区详细信息
 	 * 景区图片、编号、名称、简介、省、市、详细位置、等级、历史参观人数、开放时间
 	 */
 	public List<Map<String , Object>> getDetailScenicByScenicID(String scenicNo){
 			
 		List<Map<String , Object>> list = new ArrayList<>(); 		
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getDetailScenicByScenicID(?)");
			cst.setString(1, scenicNo);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("scenicNo", rst.getString(1));
				map.put("scenicName", rst.getString(2));
				map.put("scenicImagePath", rst.getString(3));
				map.put("scenicIntro", rst.getString(4));
				map.put("province", rst.getString(5));
				map.put("city", rst.getString(6));
				map.put("scenicLocation", rst.getString(7));
				map.put("scenicLevel", rst.getString(8));
				map.put("openingHours", rst.getString(9));
				map.put("totalVisits", rst.getString(10));

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
	 * 根据用户的位置（省份），获取对应省份的热门景点
	 * @param location 用户当前的位置
	 * @return 景区图片、编号、名称
	 */
 	public List<Map<String , Object>> getScenicByLocation(String location){
		
 		List<Map<String , Object>> list = new ArrayList<>();
 		
 		ScenicsSpotInfo scenicsSpotInfo = new ScenicsSpotInfo();
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getScenicByLocation(?,?)");
			cst.setString(1, location);
			cst.setInt(2, scenicNum);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("scenicNo", rst.getString(1));
				map.put("scenicImagePath", rst.getString(2));
				map.put("scenicName", rst.getString(3));
				
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
	 * 显示数据库内的所有景点信息,并按景区等级降序排列
	 * @return 景区图片、编号、名称
	 */
	public List<Map<String , Object>> getAllScenics(){
		
		List<Map<String , Object>> list = new ArrayList<>();
 		
 		ScenicsSpotInfo scenicsSpotInfo = new ScenicsSpotInfo();
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getAllScenics()");
			
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("scenicNo", rst.getString(1));
				map.put("scenicImagePath", rst.getString(2));
				map.put("scenicName", rst.getString(3));
				
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
	 * 根据景区的名称进行搜索，搜索对应景区的详细信息。
	 * @param scenicName  景区的名称，景区名必须和数据库的一致（客户端完成）
	 * @return
	 */
	public List<Map<String, Object>> getScenicByName(String scenicName){
		
		List<Map<String , Object>> list = new ArrayList<>();
 		
 		ScenicsSpotInfo scenicsSpotInfo = new ScenicsSpotInfo();
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getScenicByName(?)");
			cst.setString(1, scenicName);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("scenicNo", rst.getString(1));
				map.put("scenicName", rst.getString(2));
				map.put("scenicImagePath", rst.getString(3));
				map.put("scenicIntro", rst.getString(4));
				map.put("province", rst.getString(5));
				map.put("city", rst.getString(6));
				map.put("scenicLocation", rst.getString(7));
				map.put("scenicLevel", rst.getString(8));
				map.put("openingHours", rst.getString(9));
				map.put("totalVisits", rst.getString(10));

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
	 * 根据搜索的特定的景区的地址，进行相关的景区推荐，暂定推荐数为4个
	 * @param name 景区的名称
	 * @return 相关的推荐景区的信息。
	 * 景区图片、编号、名称
	 */
	public List<Map<String , Object>> getScenicRelatesByName(String scenicName){
		
		List<Map<String , Object>> listResult = new ArrayList<>(); 		
 		ScenicsSpotInfo scenicsSpotInfo = new ScenicsSpotInfo();
 		DataSource dataSource =jdbcTemplate.getDataSource();
 		
		List<Map<String , Object>> list = getNameSimilarScenics(scenicName);
		String cityString = null;
		String scenicID = null;
		if(list.size() != 0){
			cityString = (String)list.get(0).get("city");
			scenicID = (String)list.get(0).get("scenicNo");
		}
				 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getScenicRelatesByName(?,?,?)");
			cst.setString(1, scenicID);
			cst.setString(2, cityString);
			cst.setInt(3, recommandNum);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("scenicNo", rst.getString(1));
				map.put("scenicName", rst.getString(2));
				map.put("scenicImagePath", rst.getString(3));
				
				listResult.add(map);
			}
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			
		return listResult;
	}
	
	
	
	/**
	 * 根据景区的编号， 查询景区的信息,景区名称、图片
	 * @param scenicID   景区编号
	 * @return 景区名称、图片
	 */
	public List<Map<String , Object>> getSomeScenicInfoByscenicID(String scenicID){
		
		List<Map<String , Object>> list = new ArrayList<>();
 		
 		ScenicsSpotInfo scenicsSpotInfo = new ScenicsSpotInfo();
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getSomeScenicInfoByscenicID(?)");
			cst.setString(1, scenicID);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("scenicName", rst.getString(1));
				map.put("scenicImagePath", rst.getString(2));
			
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
	 * 根据景区名称，搜索名称相似的景区
	 * @param scenicName 景区名称
	 * @return  相似景区的名称、编号
	 */
	public List<Map<String , Object>> getNameSimilarScenics(String scenicName){
		
		List<Map<String , Object>> list = new ArrayList<>();
 		
 		ScenicsSpotInfo scenicsSpotInfo = new ScenicsSpotInfo();
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getNameSimilarScenics(?)");
			cst.setString(1, scenicName);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("scenicName", rst.getString(1));
				map.put("scenicNo", rst.getString(2));
				map.put("city", rst.getString(3));
			
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
	 * 暂时作废
	 * 
	 * 根据用户所在的省份，获取该省内的所有景点
	 * @param location 用户所在的省份
	 * @return 景区图片、编号、名称
	 */
	public List<Map<String , Object>> getAllScenicByLocation(String location){
		
		String sqlString = "select scenicImagePath,scenicNo,scenicName "
				+ "from t_scenicspotinfo where province like '%"+location+"%'";
		
		List<Map<String , Object>> list=jdbcTemplate.queryForList(sqlString);
		
		return list;
	}
	
///////////////////////////////////////////////////////////////////////////////////////////////////
	
	/*
	 *通过页数与页数容量来获取景区信息 
	 * time：2017-1-2 10:37:30
	 * */
	public List<ScenicsSpotInfo> GetScenicInfoByPage(int currentPage,int rows)
	{
		int j=(currentPage-1)*rows;
		String sql="SELECT * FROM t_scenicspotinfo LIMIT "+j+" ,"+rows+"";
		
		List<Map<String , Object>> list=jdbcTemplate.queryForList(sql);
		List<ScenicsSpotInfo> listres=new ArrayList<>();
		for (int k = 0; k < list.size(); k++) {
			ScenicsSpotInfo scenicsSpotInfo = new ScenicsSpotInfo();
			scenicsSpotInfo.setScenicNo((String) list.get(k).get("scenicNo"));
			scenicsSpotInfo.setScenicImagePath((String) list.get(k).get("scenicImagePath"));
			scenicsSpotInfo.setScenicName((String) list.get(k).get("scenicName"));
			scenicsSpotInfo.setTotalVisits((String) list.get(k).get("totalVisits"));
			scenicsSpotInfo.setOpeningHours((String) list.get(k).get("openingHours"));
			scenicsSpotInfo.setScenicLevel((String) list.get(k).get("scenicLevel"));
			scenicsSpotInfo.setScenicLocation((String) list.get(k).get("scenicLocation"));
			scenicsSpotInfo.setProvince((String) list.get(k).get("province"));
			scenicsSpotInfo.setCity((String) list.get(k).get("city"));
			scenicsSpotInfo.setChargePerson((String) list.get(k).get("chargePerson"));
			scenicsSpotInfo.setIsHotSpot((int) list.get(k).get("isHotSpot"));
			scenicsSpotInfo.setScenicIntro((String) list.get(k).get("scenicIntro"));
			scenicsSpotInfo.setAccount((String) list.get(k).get("account"));
			listres.add(scenicsSpotInfo);
		}
		
		return listres;
	}
	
	public  int  GetScenicCount() {
		String sql="SELECT * FROM t_scenicspotinfo";
		return jdbcTemplate.queryForList(sql).size();
	}
	
	
	/*
	 * 通过sql查询语句进行查询景区的详细信息
	 * 参数：SQL语句
	 * 2017-1-2 10:36:30
	 * */
	public ScenicsSpotInfo SearchSceincInfoByName_Dao(String a) {
		final ScenicsSpotInfo scenicsSpotInfo = new ScenicsSpotInfo();
		String sql=" select * from t_scenicspotinfo where scenicName = '" + a +"'";
		jdbcTemplate.query(sql, new RowCallbackHandler() {
			
			@Override
			public void processRow(java.sql.ResultSet rSet) throws SQLException {
				scenicsSpotInfo.setScenicNo(rSet.getString(1));
				scenicsSpotInfo.setScenicImagePath(rSet.getString(2));
				scenicsSpotInfo.setScenicName(rSet.getString(3));
				scenicsSpotInfo.setScenicIntro(rSet.getString(4));
				scenicsSpotInfo.setTotalVisits(rSet.getString(5));
				scenicsSpotInfo.setOpeningHours(rSet.getString(6));
				scenicsSpotInfo.setProvince(rSet.getString(7));
				scenicsSpotInfo.setCity(rSet.getString(8));
				scenicsSpotInfo.setScenicLocation(rSet.getString(9));
				scenicsSpotInfo.setIsHotSpot(rSet.getInt(10));
				scenicsSpotInfo.setScenicLevel(rSet.getString(11));
				scenicsSpotInfo.setChargePerson(rSet.getString(12));
				scenicsSpotInfo.setAccount(rSet.getString(13));
			}
		});
		return scenicsSpotInfo;
	}
	
	/**
	 * 根据景区的省份、市、详细地址进行景区信息查看
	 * @param provin
	 * @param city
	 * @param s
	 * @return
	 * 2017-1-8 21:40:19
	 */
	public ScenicsSpotInfo SearchSceincInfoByLocation_Dao(String provin,
			String city ,String s) {
		ScenicsSpotInfo scenicsSpotInfo = new ScenicsSpotInfo();
		String sql=" select * from t_scenicspotinfo where province = '"+provin+"' and city='"
				+city+"' and scenicLocation='"+s+"'";
		List<Map<String , Object>> list=jdbcTemplate.queryForList(sql);
		if (list.size()>0) {
			
			scenicsSpotInfo.setScenicNo((String) list.get(0).get("scenicNo"));
			scenicsSpotInfo.setScenicImagePath((String) list.get(0).get("scenicImagePath"));
			scenicsSpotInfo.setScenicName((String) list.get(0).get("scenicName"));
			scenicsSpotInfo.setScenicIntro((String) list.get(0).get("scenicIntro"));
			scenicsSpotInfo.setTotalVisits((String) list.get(0).get("totalVisits"));
			scenicsSpotInfo.setOpeningHours((String) list.get(0).get("openingHours"));
			scenicsSpotInfo.setProvince((String) list.get(0).get("province"));
			scenicsSpotInfo.setCity((String) list.get(0).get("city"));
			scenicsSpotInfo.setScenicLocation((String) list.get(0).get("scenicLocation"));
			scenicsSpotInfo.setIsHotSpot((int) list.get(0).get("isHotSpot"));
			scenicsSpotInfo.setScenicLevel((String) list.get(0).get("scenicLevel"));
			scenicsSpotInfo.setChargePerson((String) list.get(0).get("chargePerson"));
			scenicsSpotInfo.setAccount((String) list.get(0).get("account"));
		}
		
		return scenicsSpotInfo;
	}
	
	/*
	 * 增加景区信息
	 * 参数：景区信息类
	 * 2017-1-2 10:36:30
	 * */
	public boolean AddScenicInfo_Dao(ScenicsSpotInfo scenicsSpotInfo, String password) {
		String sql = " select count(*) from t_scenicspotinfo where scenicName = '"
					+scenicsSpotInfo.getScenicName()+"'";
		String sql1="select count(*) from t_admin where username="+scenicsSpotInfo.getAccount(); 
		
		if ((jdbcTemplate.queryForObject(sql, Integer.class) == 0)&&
				((jdbcTemplate.queryForObject(sql, Integer.class) == 0))) {
			
			DataSource dataSource=jdbcTemplate.getDataSource();
			Connection  conn;
			try {
				  conn=dataSource.getConnection();
				  conn.setAutoCommit(false);
				  sql =  " insert into t_scenicspotinfo values (?,?,?,?,?,?,?,?,?,?,?,?,?) ";
					jdbcTemplate.update(sql, new Object[]{
						scenicsSpotInfo.getScenicNo(),
						scenicsSpotInfo.getScenicImagePath(),
						scenicsSpotInfo.getScenicName(),
						scenicsSpotInfo.getScenicIntro(),
						scenicsSpotInfo.getTotalVisits(),
						scenicsSpotInfo.getOpeningHours(),
						scenicsSpotInfo.getProvince(),
						scenicsSpotInfo.getCity(),
						scenicsSpotInfo.getScenicLocation(),
						scenicsSpotInfo.getIsHotSpot(),
						scenicsSpotInfo.getScenicLevel(),
						scenicsSpotInfo.getChargePerson(),
						scenicsSpotInfo.getAccount(),
					});
					sql1="insert into t_admin(role,username,password)  values(?,?,?)";
					jdbcTemplate.update(sql1, new Object[]{"景区管理人员",scenicsSpotInfo.getAccount(),password});
					conn.commit();//提交JDBC事务 
					conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
					return true;
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			}	
		}
		return false;
	}
	/*
	 * 	删除景区信息
	 * 	参数：景区名称
	 * 2017-1-2 10:35:30
	 * */
	public boolean DeleteScenicInfo(String s) {
		String sql = "delete from t_scenicspotinfo where scenicName='"+s+"'";
		if (jdbcTemplate.update(sql)>0) {
			return true;
		} else {
			return false;
		}
		
		
	}
	
	/*
	 * 更新景区信息
	 * 参数：景区信息类
	 * 2017-1-2 10:34:30
	 * */
	public boolean UpdateScenicInfo(ScenicsSpotInfo scenicsSpotInfo) {
		String sql = " update t_scenicspotinfo set scenicNo=?,scenicImagePath=?,scenicName=?, "+
					" scenicIntro=?,totalVisits=?,openingHours=?,province=?,city=?,scenicLocation=?, "+
					" isHotSpot=?,scenicLevel=?,chargePerson=?,account=?  where scenicNo=? ";
		int i=jdbcTemplate.update(sql, new Object[]{
				scenicsSpotInfo.getScenicNo(),
				scenicsSpotInfo.getScenicImagePath(),
				scenicsSpotInfo.getScenicName(),
				scenicsSpotInfo.getScenicIntro(),
				scenicsSpotInfo.getTotalVisits(),
				scenicsSpotInfo.getOpeningHours(),
				scenicsSpotInfo.getProvince(),
				scenicsSpotInfo.getCity(),
				scenicsSpotInfo.getScenicLocation(),
				scenicsSpotInfo.getIsHotSpot(),
				scenicsSpotInfo.getScenicLevel(),
				scenicsSpotInfo.getChargePerson(),
				scenicsSpotInfo.getAccount(),
				scenicsSpotInfo.getScenicNo()});
		if (i>0) {
			return true;
		} else {
			return false;
		}
		
		
	}
	
	
	
}


