package com.TourGuide.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.AdminDao;


@Service
public class AdminService {

	@Autowired
	private AdminDao adminDao;
	
	/*
	 * 管理员登录验证
	 * */
	public boolean isValid(String username,String password)
	{
		return adminDao.isValid(username, password);
	}
	
	public String  getRoleByAccount(String Account) 
	{
		return adminDao.getRoleByAccount(Account);
	}
	
	/**
	 * 修改密码
	 * @param username
	 * @param passNew
	 * @param passOld
	 * @return
	 * 2017-2-27 15:35:40
	 */
	public int UpdatePass(String username,String passNew,String passOld)
	{
		return adminDao.UpdatePass(username, passNew, passOld);
	}
}
