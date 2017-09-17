package com.TourGuide.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.VisitorloginDao;

@Service
public class VisitorloginService {
	
	@Autowired
	private VisitorloginDao visitorloginDao;
	
	/**
	 * 游客的登录验证
	 * @param username  用户名：手机号
	 * @param password   登录密码
	 * @return int 0：登录失败，1：游客被禁用，2：登录成功
	 */
	public int Valid_Service(String username,String password){
		return visitorloginDao.Valid(username, password);	
	}

}
