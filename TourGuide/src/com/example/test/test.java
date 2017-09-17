package com.example.test;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.springframework.expression.ParseException;

import com.TourGuide.common.DateConvert;
import com.TourGuide.model.WeixinOauth2Token;
import com.TourGuide.weixin.util.Oauth2Util;

public class test {
	
	

	public static void main(String[] args) throws java.text.ParseException {
		
		String imgString = "640 (1).jpg";
		
		String[] tmp = imgString.split("\\.");
		String fileName = tmp[0] + new Date().getTime() + "."+tmp[1];
		
		System.out.println(fileName);
		
//		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Date date=null;
//		try {
//		date = sdf.parse("2012-07-25 21:00:00");
//		} catch (ParseException e) {
//		// TODO 自动生成 catch 块
//		e.printStackTrace();
//		}
//		Calendar ca=Calendar.getInstance();
//		ca.setTime(date);
//		ca.add(Calendar.HOUR_OF_DAY, -3);
//		String time = sdf.format(ca.getTime());

//		System.out.println(DateConvert.addHourToTime("2012-7-25 12:00:00", -3));
//
//		System.out.println(Oauth2Util.getOauth2Url());
		
//		System.out.println(DateConvert.dateCompare("2012-7-25", "2017-03-22"));
		
//		System.out.println(DateConvert.addMinuteToTime("2012-7-25 12:00:00", 35));

		/*String visitTime="2017-05-06 08:00:00";
		int visitNum=5;
		String scenicID="19743";*/
	}
	
	/**
	 * 比较两个字符串格式日期的大小
	 * @param dateFrom  开始日期: yyyy-MM-dd
	 * @param dateTo  结束日期: yyyy-MM-dd
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

}
