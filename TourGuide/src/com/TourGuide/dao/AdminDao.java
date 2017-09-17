package com.TourGuide.dao;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class AdminDao {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	/*
	 * 管理员登陆检测
	 * 参数：用户名，密码
	 * 2017-1-1 11:32:07
	 * */
	public boolean isValid(String username,String password)
	{
		
		String sql="select * from t_admin where username=? and password=?";
		int i=jdbcTemplate.queryForList(sql,new Object[]{username,password}).size();
		if (i>0) {
			return true;
		} else {
			return false;
		}
		
	}
	
	/**
	 * 更新用户密码
	 * @param username
	 * @param passNew
	 * @param passOld
	 * @return
	 * 2017-2-27 15:10:48
	 */
	public int UpdatePass(String username,String passNew,String passOld)
	{
		int j=0;
		
		String sql="select count(*) from t_admin where username=? and password=?";
		int i=jdbcTemplate.queryForObject(sql, new Object[]{username,passOld}, Integer.class);
		
		if (i>0) {
			String sql1="update t_admin set password=? where username=?";
			j=jdbcTemplate.update(sql1, new Object[]{passNew,username});
		}
			return j;
		
	}
	
	
	public String  getRoleByAccount(String Account) {
		
		String sql="SELECT t_admin.role FROM t_admin WHERE t_admin.username=?";
		String role="aa";
		try {
			role = jdbcTemplate.queryForObject(sql, new Object[]{Account},String.class);
		} catch (DataAccessException e) {
			// TODO Auto-generated catch block
			role="aa";
		}
		return role;
	}

}
