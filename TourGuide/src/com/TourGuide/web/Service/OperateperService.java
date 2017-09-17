package com.TourGuide.web.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.model.Operateper;
import com.TourGuide.web.Dao.OperateperDao;

@Service
public class OperateperService {
	
	@Autowired
	private OperateperDao operateperDao;
	
	/*
	 *通过分页语句来得到运营人员的信息 
	 *2017-1-3 14:15:26
	 * */
	public List<Operateper> getOperatepersByPage(int i,int j) {
		return operateperDao.GetOperateUseInfoByPage(i, j);
	}
	
	/*
	 * 得到运营人员的个数
	 * 2017-1-3 14:16:19
	 * */
	public  int  GetOperateCount()
	{
		return operateperDao.GetOperateCount();
	}
	
	
	/*
	 * 通过运营人员的名字来进行运营人员查询
	 * 2017-1-3 14:17:35
	 * */
	public List<Operateper> SearchOperateInfoByAccount_Service(String name) {
		return operateperDao.SearchOperateInfoByAccount_Dao(name);
	}
	
	
	/*
	 * 添加运营人员
	 * 2017-1-3 14:17:50
	 * */
	public boolean AddOperateperInfo_Service(Operateper operateper, String password) {
		return operateperDao.AddOperateperInfo_Dao(operateper,password);
	}
	
	
	/*
	 * 删除运营人员
	 * 2017-1-3 14:18:04
	 * */
	public boolean DeleteOperateperInfo_Service(String s) {
		return operateperDao.DeleteOperateperInfo(s);
	}
	
	
	/*
	 * 更新运营人员信息
	 * 2017-1-3 14:18:28
	 * */
	public boolean UpdateOperateperInfo_Service(Operateper operateper) {
		return operateperDao.UpdateOperateperInfo(operateper);
	}
	/*
	 * 禁用运营人员
	 * */
	public boolean ForbidOperate_Service(String account) {
		return operateperDao.ForbidOperate_Dao(account);
	}
	/*
	 * 解禁运营人员
	 * */
	public boolean RelieveOperate_Service(String account) {
		return operateperDao.RelieveOperate_Dao(account);
	}
	
	/**
	 * 通过账号修改运营人员密码为手机号后六位
	 * @param account
	 * @param phone
	 * @return
	 */
	public int ResetPassword(String account,String phone)
	{
		return operateperDao.ResetPassword(account, phone);
	}
	
	
	public List<Operateper> getOperateperByAccount(String account,int i,int j)
	{
		return operateperDao.getOperateperByAccount(account, i, j);
	}
	
	
	
	public int getOperateByAcount(String account) 
	{
		return operateperDao.getOperateByAcount(account);
	}
}
