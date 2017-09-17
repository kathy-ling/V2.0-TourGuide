package com.TourGuide.dao;


import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import com.TourGuide.model.SNSUserInfo;
import com.TourGuide.model.VisitorInfo;

@Repository
public class VisitorDao {

		@Autowired
		private JdbcTemplate jdbcTemplate;
		private final int disable = 0;  //用户是否被禁止登陆，0-否，1-是
		
		
		
		/**
		 * 将微信端获取到的用户信息，存入数据库
		 * @param snsUserInfo
		 * @return
		 */
		public boolean recordWeixinInfo(SNSUserInfo snsUserInfo){
			
			boolean bool = false;
			
			String select = "select * from t_visitor where openID='"+snsUserInfo.getOpenId()+"'";
			List<Map<String , Object>> list = jdbcTemplate.queryForList(select);
			
			if(list.size() == 0){
				//从微信服务端得到的用户性别，2-女，1-男
				int tmp = snsUserInfo.getSex();
				String sex = null;
				if(tmp == 1){
					sex = "男";
				}else {
					sex = "女";
				}
				String insert = "insert into t_visitor (nickName,sex,phone,image,openID) "
						+ "values ('"+snsUserInfo.getNickname()+"','"+ sex +"',"
						+ "'"+snsUserInfo.getOpenId()+"','"+snsUserInfo.getHeadImgUrl()+"',"
						+ "'"+snsUserInfo.getOpenId()+"')";
				int i = jdbcTemplate.update(insert);
				
				if(i != 0){
					bool = true;
				}
			}
						
			return bool;
		}
		
		
		/**
		 * 根据openID，查看用户的信息
		 * @param openID
		 * @return
		 */
		public VisitorInfo getInfobyOpenID(String openID){
					
			final VisitorInfo visitorInfo = new VisitorInfo();
			DataSource dataSource =jdbcTemplate.getDataSource();
			 
			try {
				Connection conn = dataSource.getConnection();
				CallableStatement cst=conn.prepareCall("call getInfobyOpenID(?)");
				cst.setString(1, openID);
				ResultSet rst=cst.executeQuery();
				
				while (rst.next()) {
					visitorInfo.setPhone(rst.getString(1));
					visitorInfo.setName(rst.getString(2));
					visitorInfo.setNickName(rst.getString(3));
					visitorInfo.setImage(rst.getString(4));
					visitorInfo.setSex(rst.getString(5));
					visitorInfo.setOpenID(openID);
				}							
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			} 		
			
			return visitorInfo;
		}
		
		
		/**
		 * 用户注册
		 * @param nickName 用户昵称
		 * @param sex  性别
		 * @param name  用户姓名
		 * @param phone  手机号
		 * @param passwd  用户密码
		 * @param image   用户头像
		 * 
		 * @return
		 * @throws SQLException 
		 */
		public boolean visitorRegister(String nickName, String sex,
				String name, String phone, String passwd, 
				String image,String openID) throws SQLException{
			
			boolean bool = false;
			
			DataSource dataSource = jdbcTemplate.getDataSource();
			Connection  conn = null;
			try{
				conn = dataSource.getConnection();
				conn.setAutoCommit(false);
				
				String sqlRegister = "update t_visitor set nickName='"+nickName+"',sex='"+sex+"',"
						+ "name='"+name+"',phone='"+phone+"',image='"+image+"' "
						+ "where openID='"+openID+"' ";					
				int i = jdbcTemplate.update(sqlRegister);
				
				String sqlSetPass = "insert into t_visitorlogin (phone,password,disable) "
						+ "values (?,?,?)";
				int j = jdbcTemplate.update(sqlSetPass, new Object[]{phone, passwd, disable});

				conn.commit();//提交JDBC事务 
				conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
				conn.close();
				
				if(i!=0 && j!=0){
					bool = true;
				}
				
			} catch (SQLException e) {
				conn.rollback();
				e.printStackTrace();
			}	

			return bool;
		}
		
		
		/**
		 * 根据游客的手机号，查询个人详细信息
		 * @param phone  手机号
		 * @return 手机号、姓名、性别、昵称、头像
		 */
		public VisitorInfo getVisitorInfoWithPhone(String phone){
			
			final VisitorInfo visitorInfo = new VisitorInfo();
			DataSource dataSource =jdbcTemplate.getDataSource();
			 
			try {
				Connection conn = dataSource.getConnection();
				CallableStatement cst=conn.prepareCall("call getVisitorInfoWithPhone(?)");
				cst.setString(1, phone);
				ResultSet rst=cst.executeQuery();
				
				while (rst.next()) {
					visitorInfo.setPhone(rst.getString(1));
					visitorInfo.setName(rst.getString(2));
					visitorInfo.setNickName(rst.getString(3));
					visitorInfo.setImage(rst.getString(4));
					visitorInfo.setSex(rst.getString(5));					
				}							
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			} 		
			
			return visitorInfo;
		}  
		
		
		/**
		 * 用户根据openId修改自己的头像
		 * @param openId
		 * @param imgPath 头像路径
		 * @return
		 */
		public boolean changeImg(String openId, String imgPath){
			
			boolean bool = false;
			
			String sqlUpdate = "update t_visitor set image='"+imgPath+"' where openID='"+openId+"'";
			int i = jdbcTemplate.update(sqlUpdate);
			
			if(i != 0){
				bool = true;
			}
			
			return bool;
		}
		
		
		/**
		 * 用户根据openId修改自己的信息
		 * @param openId
		 * @param name  姓名
		 * @param nickName  昵称
		 * @param sex  性别
		 * @return
		 */
		public boolean changeInfo(String openId, String name, String nickName, String sex){
			
			boolean bool = false;
			
			String sqlUpdate = "update t_visitor set name='"+name+"',"
					+ "nickName='"+nickName+"',sex='"+sex+"' where openID='"+openId+"'";
			int i = jdbcTemplate.update(sqlUpdate);
			
			if(i != 0){
				bool = true;
			}
			
			return bool;
		}
		
		
		/**
		 * 判断游客是否被拉黑
		 * @param phone
		 * @return  false --没有拉黑，true---拉黑
		 */
		public boolean isBlackened(String phone){
			boolean bool = false;
			DataSource dataSource =jdbcTemplate.getDataSource();
			 
			try {
				Connection conn = dataSource.getConnection();
				CallableStatement cst = conn.prepareCall("call isBlackened(?)");
				cst.setString(1, phone);
				ResultSet rst = cst.executeQuery();
				
				while (rst.next()) {
					int disable = rst.getInt(1);
					if(disable == 1){//游客被拉黑
						bool = true;
					}				
				}							
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			} 
			return bool;
		}

/////////////////////////////////////////////////////////////////////////////////////////////////
		
		/*
		 *通过页数与页数容量来获取未禁用游客信息 
		 * time：2017-1-2 17:22:30
		 * */
		public List<VisitorInfo> GetVisitorInfoByPage(int currentPage,int rows)
		{
			int i=(currentPage-1)*rows;
			List<VisitorInfo> listres=new ArrayList<>();
			DataSource dataSource=jdbcTemplate.getDataSource();
			try {
				Connection conn=dataSource.getConnection();
				CallableStatement cst=conn.prepareCall("call getvisitorNo(?,?)");
				cst.setInt(1, i);
				cst.setInt(2, rows);
				ResultSet rst=cst.executeQuery();
				while (rst.next()) {
					VisitorInfo visitorInfo=new VisitorInfo();
					visitorInfo.setPhone( rst.getString(1));
					visitorInfo.setName(rst.getString(2));
					visitorInfo.setNickName(rst.getString(3));
					visitorInfo.setImage(rst.getString(4));
					visitorInfo.setSex(rst.getString(5));
					listres.add(visitorInfo);
				}
				conn.close();
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
			
			
			
			return listres;
		}
		
		/**
		 * 分页得到禁用的游客基本信息
		 * @param currentPage
		 * @param rows
		 * @return
		 * 2017-2-9 16:03:40
		 */
		public List<VisitorInfo> GetVisitorInfoDisabled(int currentPage,int rows)
		{
			int i=(currentPage-1)*rows;
			List<VisitorInfo> listres=new ArrayList<>();
			DataSource dataSource=jdbcTemplate.getDataSource();
			try {
				Connection conn=dataSource.getConnection();
				CallableStatement cst=conn.prepareCall("call getvisitorDisabled(?,?)");
				cst.setInt(1, i);
				cst.setInt(2, rows);
				ResultSet rst=cst.executeQuery();
				while (rst.next()) {
					VisitorInfo visitorInfo=new VisitorInfo();
					visitorInfo.setPhone( rst.getString(1));
					visitorInfo.setName(rst.getString(2));
					visitorInfo.setNickName(rst.getString(3));
					visitorInfo.setImage(rst.getString(4));
					visitorInfo.setSex(rst.getString(5));
					listres.add(visitorInfo);
				}
				conn.close();
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
			
			
			
			return listres;
		}
		
		
		/**
		 * 获取未禁用游客的数量
		 * @return
		 * 2017-2-8 19:45:59
		 */
		public  int  GetVisitorCount() {
			DataSource dataSource=jdbcTemplate.getDataSource();
			int i=0;
			try {
				Connection connection=dataSource.getConnection();
				CallableStatement cst=connection.prepareCall("call getVisitorCount(?)");
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
		 * 获取黑名单游客的数量
		 * @return
		 * 2017-2-9 16:15:30
		 */
		public  int  GetVisitorDisabledCount() {
			DataSource dataSource=jdbcTemplate.getDataSource();
			int i=0;
			try {
				Connection connection=dataSource.getConnection();
				CallableStatement cst=connection.prepareCall("call getVisitorDisabledCount(?)");
				cst.registerOutParameter(1, java.sql.Types.BIGINT);
				cst.execute();
				i=cst.getInt(1);
				connection.close();
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
			
			return i;
		}
		
		public List<VisitorInfo> SearchVisitorDisByPhone(String phone) {
			List<VisitorInfo> list = new ArrayList<VisitorInfo>();
			DataSource dataSource=jdbcTemplate.getDataSource();
			try {
				Connection connection=dataSource.getConnection();
				CallableStatement cst=connection.prepareCall("call getVisiDisableByPhone(?)") ;
				cst.setString(1, phone);
				ResultSet rSet=cst.executeQuery();
				while (rSet.next()) {
					VisitorInfo visitorInfo = new VisitorInfo();
					visitorInfo.setPhone(rSet.getString(1));
					visitorInfo.setName(rSet.getString(2));
					visitorInfo.setNickName(rSet.getString(3));
					visitorInfo.setImage(rSet.getString(4));
					visitorInfo.setSex(rSet.getString(5));
					list.add(visitorInfo);
				}
				connection.close();
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
				
			return list;
		}
		
		/*
		 * 通过游客手机号进行查询未禁用游客的详细信息
		 * 参数：SQL语句
		 * 2017-1-2 17:22:30
		 * */
		public List<VisitorInfo> SearchVisitorInfoByPhone(String phone) {
			List<VisitorInfo> list = new ArrayList<VisitorInfo>();
			DataSource dataSource=jdbcTemplate.getDataSource();
			try {
				Connection connection=dataSource.getConnection();
				CallableStatement cst=connection.prepareCall("call getVisitorByphone(?)") ;
				cst.setString(1, phone);
				ResultSet rSet=cst.executeQuery();
				while (rSet.next()) {
					VisitorInfo visitorInfo = new VisitorInfo();
					visitorInfo.setPhone(rSet.getString(1));
					visitorInfo.setName(rSet.getString(2));
					visitorInfo.setNickName(rSet.getString(3));
					visitorInfo.setImage(rSet.getString(4));
					visitorInfo.setSex(rSet.getString(5));
					list.add(visitorInfo);
				}
				connection.close();
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
				
			return list;
		}
		/*
		 * 更新游客信息
		 * 参数：游客信息类
		 * 2017-1-2 17:24:30 
		 * */
		public boolean UpdateVisitorInfo(VisitorInfo visitorInfo) {
			String sql = "update   t_visitor set phone=?,name=?,nickName=?, "+
						" sex=? where phone=?";
			int i=jdbcTemplate.update(sql, new Object[]{
					visitorInfo.getPhone(),
					visitorInfo.getName(),
					visitorInfo.getNickName(),
					visitorInfo.getSex(),
					visitorInfo.getPhone()});
			if (i>0) {
				return true;
			} else {
				return false;
			}			
		}
		
		/*
		 * 禁用游客
		 * */
		public boolean ForbidVisitorInfo_Dao(String phone) {
			String sql = " update t_visitorlogin set disable=1 where phone='"+phone+"'";
			int i = jdbcTemplate.update(sql);
			
			if (i > 0) return true;
			return false;
		}
		/*
		 * 解禁游客
		 * */
		public boolean RelieveVisitorInfo_Dao(String phone) {
			String sql = " update t_visitorlogin set disable=0 where phone='"+phone+"'";
			int i = jdbcTemplate.update(sql);
			
			if (i > 0) return true;
			return false;
		}
		
}
