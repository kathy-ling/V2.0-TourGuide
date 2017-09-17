package com.TourGuide.common;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateConvert {
	
	/**
	 * 将TimeStamp类型的时间转换为yyyy-MM-dd HH:mm格式的日期类型
	 * @param timestamp 时间
	 * @return DateTimeString: yyyy-MM-dd HH:mm
	 */
	public static String timeStamp2DateTime(Timestamp timestamp) {
		
		String datetime = "";
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		try {
			datetime = df.format(timestamp);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return datetime;
	}
	
	
	/**
	 * 计算两个字符串类型的日期间的天数
	 * @param str1     日期1，字符串类型
	 * @param str2   日期2，字符串类型
	 * @return
	 */
	public static int getDaysBetweenDate(String str1, String str2){
		
		long day = 0;
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = null;
		Date date2 = null;
		
		try {
			date1 = dateFormat.parse(str1);
			date2 = dateFormat.parse(str2);
		} catch (ParseException e) {
			e.printStackTrace();
		}
        	
    	day = (date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000);
		return (int)day;
	}
	
	
	/**
	 * 时间字符串加上若干小时
	 * @param time
	 * @param hour
	 * @return
	 */
	public static String addHourToTime(String time, int hour){
		
		String retTime = null;
		Date date = null;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			date = dateFormat.parse(time);			
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.HOUR_OF_DAY, hour);
		
		retTime = dateFormat.format(calendar.getTime());
		return retTime;
	}
	
	
	/**
	 * 时间字符串加上若干分钟
	 * @param time
	 * @param hour
	 * @return
	 */
	public static String addMinuteToTime(String time, int minute){
		
		String retTime = null;
		Date date = null;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			date = dateFormat.parse(time);			
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MINUTE, minute);
		
		retTime = dateFormat.format(calendar.getTime());
		return retTime;
	}
	
	/**
	 * 比较两个字符串格式日期的大小
	 * @param dateFrom  开始日期: yyyy-MM-dd HH:mm:ss
	 * @param dateTo  结束日期: yyyy-MM-dd HH:mm:ss
	 * @return  true: dateFrom <= dateTo 
	 */
	public static Boolean DateCompare(String dateFrom, String dateTo) {
		Boolean isTrue = false;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		try {
			java.util.Date df = sdf.parse(dateFrom);
			java.util.Date dt = sdf.parse(dateTo);
			if(df.before(dt)) {
				isTrue = true;
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return isTrue;
	}
	
	
	/**
	 * 比较两个字符串格式日期的大小
	 * @param dateFrom  开始日期: yyyy-MM-dd
	 * @param dateTo  结束日期: yyyy-MM-dd
	 * @return  true: dateFrom <= dateTo 
	 */
	public static Boolean dateCompare(String dateFrom, String dateTo) {
		Boolean isTrue = false;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		try {
			java.util.Date df = sdf.parse(dateFrom);
			java.util.Date dt = sdf.parse(dateTo);
			if(df.before(dt)) {
				isTrue = true;
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return isTrue;
	}
}
