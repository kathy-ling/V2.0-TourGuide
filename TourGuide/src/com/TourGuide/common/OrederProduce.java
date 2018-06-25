package com.TourGuide.common;
import java.util.Random;

public class OrederProduce {
	//订单号生成规则
		public static String getOrderNo() {
			
			Random random=new Random();
			String s = String.valueOf(System.currentTimeMillis()+random.nextInt(99999));
			return s;	
		}
}
