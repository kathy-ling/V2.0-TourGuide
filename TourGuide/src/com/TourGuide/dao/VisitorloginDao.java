package com.TourGuide.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class VisitorloginDao {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	/**
	 * 游客的登录验证
	 * @param username  用户名：手机号
	 * @param password   登录密码
	 * @return int 0：登录失败，1：游客被禁用，2：登录成功
	 */
	public int Valid(String username,String password){
		
		String sql="select * from t_visitorlogin where phone=? and password=? ";
		List<Map<String, Object>> list=jdbcTemplate.queryForList(sql, 
				new Object[]{username,password});
		
		int i=0; //返回的结果
		if (list.size() > 0) {
			i=(int) list.get(0).get("disable");
		}
		if (list.size()>0 && i==0) {
			return 2;
		} else if(list.size()>0 && i==1) {
			return 1;
		}else {
			return 0;
		}
		
	}
}
