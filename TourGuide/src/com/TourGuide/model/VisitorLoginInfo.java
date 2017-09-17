package com.TourGuide.model;
/*
 * 游客其他信息
 * */
public class VisitorLoginInfo {
	private String phone;//游客手机号
	private String password;//游客密码
	private int disable;//是否禁用
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getDisable() {
		return disable;
	}
	public void setDisable(int disable) {
		this.disable = disable;
	}
	
}
