package com.TourGuide.service;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourGuide.dao.GuideSalaryDao;

@Service
public class GuideSalaryService {
	
	@Autowired
	private GuideSalaryDao guideSalaryDao;

	/**
	 * 根据讲解员的手机号，查询讲解员的收入记录
	 * @param guidePhone  讲解员的手机号
	 * @return
	 */
	public List<Map<String, Object>> getSalaryRecord(String guidePhone){
		return guideSalaryDao.getSalaryRecord(guidePhone);
	}
	
	
	/**
	 * 若订单已取消，则取消的费用为讲解员的收入
	 * @param guidePhone
	 * @return
	 */
	public List<Map<String, Object>> getCancleOrderFee(String guidePhone){
		return guideSalaryDao.getCancleOrderFee(guidePhone);
	}
	
	/**
	 * 统计讲解员接单的总次数和总金额
	 * @param guidePhone
	 * @return
	 */
	public Map<String , Object> getSalaryAmount(String guidePhone){
		return guideSalaryDao.getSalaryAmount(guidePhone);
	}
	
	
	/**
	 * 查询用户的总金额、可提现金额和已经提现的总额
	 * @param guidePhone
	 * @return
	 */
	public Map<String , Object> getCash(String guidePhone){
		return guideSalaryDao.getCash(guidePhone);
	}
	
	
	/**
	 * 输入金额进行提现
	 * @param guidePhone  讲解员手机号
	 * @param money   提现金额
	 * @return
	 * @throws SQLException
	 * 
	 */
	public int withdrawMoney(String guidePhone, BigDecimal money) 
			throws SQLException{
		return guideSalaryDao.withdrawMoney(guidePhone, money);
	}
	
	
	/**
	 * 查看正在处理的提现申请
	 * @param guidePhone
	 * @return
	 */
	public List<Map<String, Object>> getProcessingWithdraw(String guidePhone){
		return guideSalaryDao.getProcessingWithdraw(guidePhone);
	}
	
	
	/**
	 * 查看已经成功提现的记录
	 * @param guidePhone
	 * @return
	 */
	public List<Map<String, Object>> getSuccessRecord(String guidePhone){
		return guideSalaryDao.getSuccessRecord(guidePhone);
	}
}
