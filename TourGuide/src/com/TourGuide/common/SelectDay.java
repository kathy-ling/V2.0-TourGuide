package com.TourGuide.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SelectDay {
	
	/**
	 * 计算参观日期与当前日期的间隔，并得到数据库的字段名称
	 * @param visitDate   参观日期
	 * @return
	 */
	public static String getSelectDay(String visitDate){
		
		String dayNow = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
		int day = DateConvert.getDaysBetweenDate(visitDate, dayNow);
		
		String selectDay = null;
		switch (day) {		
		case 0:
			selectDay = "one";
			break;
		case 1:
			selectDay = "two";			
			break;
		case 2:
			selectDay = "three";
			break;
		case 3:
			selectDay = "four";
			break;
		default:
			break;
		}
		
		return selectDay;
	}

}
