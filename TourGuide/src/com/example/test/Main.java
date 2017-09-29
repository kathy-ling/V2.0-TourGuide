package com.example.test;

import java.util.Date;

import com.TourGuide.common.MyDateFormat;

public class Main {

	public static void main(String[] args) {
		
		String time=MyDateFormat.form(new Date());
		System.out.println(time);
	}
}
