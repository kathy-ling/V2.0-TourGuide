package com.TourGuide.common;

import java.util.ArrayList;
import java.util.List;

public class TotalMoney {
	
	/**
	 * 计算每个订单的应付总额
	 * @param fee  每个人的讲解费
	 * @param visitNum  参观人数
	 * @param purchaseTicket   是否代购门票
	 * @param halfPrice  半价票的价钱
	 * @param discoutPrice  折扣票的价钱
	 * @param fullPrice   全票的价钱
	 * @param halfPriceNum  购买半价票的人数  
	 * @param discoutPriceNum  购买折扣票的人数
	 * @param fullPriceNum  购买全价票的人数	 
	 * @return   讲解费总额、门票费总额、订单总额
	 */
	public static List<Integer> getMoney(int fee, int visitNum, int purchaseTicket, 
			int halfPrice, int discoutPrice, int fullPrice,
			int halfPriceNum, int discoutPriceNum, int fullPriceNum){
		
		List<Integer> list = new ArrayList<>();
		
		//讲解费总额
		int totalFee = fee * visitNum;
		
		//门票费总额
		int totalTickets = 0;
		if(purchaseTicket == 1){
			totalTickets = halfPrice * halfPriceNum + discoutPrice * discoutPriceNum +
					fullPrice * fullPriceNum;
		}	 
		
		//讲解费总额 + 门票费总额
		int total = totalFee + totalTickets;
		
		list.add(totalFee);
		list.add(totalTickets);
		list.add(total);
		
		return list;
	}
}
