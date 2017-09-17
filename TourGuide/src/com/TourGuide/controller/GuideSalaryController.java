package com.TourGuide.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.TourGuide.common.CommonResp;
import com.TourGuide.service.GuideSalaryService;

@Controller
public class GuideSalaryController {

	@Autowired
	private GuideSalaryService guideSalaryService;
	
	
	/**
	 * 根据讲解员的手机号，查询讲解员的收入记录
	 * @param resp
	 * @param guidePhone
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getSalaryRecord.do")
	@ResponseBody
	public Object getSalaryRecord(HttpServletResponse resp, 
			@RequestParam("guidePhone") String guidePhone) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = guideSalaryService.getSalaryRecord(guidePhone);
		
		return list;
	}
	
	/**
	 * 若订单已取消，则取消的费用为讲解员的收入
	 * @param guidePhone
	 * @return
	 */
	@RequestMapping(value = "/getCancleOrderFee.do")
	@ResponseBody
	public Object getCancleOrderFee(HttpServletResponse resp, 
			@RequestParam("guidePhone") String guidePhone) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = guideSalaryService.getCancleOrderFee(guidePhone);
		
		return list;
	}
	
	
	/**
	 * 统计讲解员接单的总次数和总金额
	 * @param resp
	 * @param guidePhone
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getSalaryAmount.do")
	@ResponseBody
	public Object getSalaryAmount(HttpServletResponse resp, 
			@RequestParam("guidePhone") String guidePhone) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		Map<String , Object> map = guideSalaryService.getSalaryAmount(guidePhone);
		
		return map;
	}
	
	
	/**
	 * 查询用户的总金额、可提现金额和已经提现的总额
	 * @param resp
	 * @param guidePhone
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getCash.do")
	@ResponseBody
	public Object getCash(HttpServletResponse resp, 
			@RequestParam("guidePhone") String guidePhone) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		Map<String , Object> map = guideSalaryService.getCash(guidePhone);
		
		return map;
	}
	
	
	/**
	 * 输入金额进行提现
	 * @param resp
	 * @param guidePhone  手机号
	 * @param money  提现金额
	 * @return
	 * @throws IOException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/withdrawMoney.do")
	@ResponseBody
	public Object withdrawMoney(HttpServletResponse resp, 
			@RequestParam("guidePhone") String guidePhone,
			@RequestParam("money") BigDecimal money) throws IOException, SQLException{
	
		CommonResp.SetUtf(resp);
		
		int ret = guideSalaryService.withdrawMoney(guidePhone, money);
		
		return ret;
	}
	
	
	/**
	 * 查看正在处理的提现申请
	 * @param resp
	 * @param guidePhone
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getProcessingWithdraw.do")
	@ResponseBody
	public Object getProcessingWithdraw(HttpServletResponse resp, 
			@RequestParam("guidePhone") String guidePhone) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = guideSalaryService.getProcessingWithdraw(guidePhone);
		
		return list;
	}
	
	
	/**
	 * 查看已经成功提现的记录
	 * @param resp
	 * @param guidePhone
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getSuccessRecord.do")
	@ResponseBody
	public Object getSuccessRecord(HttpServletResponse resp, 
			@RequestParam("guidePhone") String guidePhone) throws IOException{
	
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> list = guideSalaryService.getSuccessRecord(guidePhone);
		
		return list;
	}
	
}
