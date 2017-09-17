package com.TourGuide.model;

import java.sql.Date;

import com.TourGuide.common.DateConvert;

public class Guideworkday {
	
	private String phone;
	private int day1;
	private int day2;
	private int day3;
	private int day4;
	private String date;
	
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getDay1() {
		return day1;
	}
	public void setDay1(int day1) {
		this.day1 = day1;
	}
	public int getDay2() {
		return day2;
	}
	public void setDay2(int day2) {
		this.day2 = day2;
	}
	public int getDay3() {
		return day3;
	}
	public void setDay3(int day3) {
		this.day3 = day3;
	}
	public int getDay4() {
		return day4;
	}
	public void setDay4(int day4) {
		this.day4 = day4;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
}
