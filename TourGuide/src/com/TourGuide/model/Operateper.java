package com.TourGuide.model;

/*
 * 运营人员信息类
 * 
 * */
public class Operateper {
	
	//运营人员姓名
	private String Operateper_name;
	////运营人员账号 
	private String Operateper_account;
	//运营人员角色
	private String operateper_role;
	//运营人员手机号
	private String Operateper_phone;
	//所属景区
	private String Operateper_scenic;
	//运营人员是否禁用
	private int Operateper_bool;
	
	public String getOperateper_name() {
		return Operateper_name;
	}
	public void setOperateper_name(String operateper_name) {
		Operateper_name = operateper_name;
	}
	public String getOperateper_account() {
		return Operateper_account;
	}
	public void setOperateper_account(String operateper_account) {
		Operateper_account = operateper_account;
	}
	public String getOperateper_role() {
		return operateper_role;
	}
	public void setOperateper_role(String operateper_role) {
		this.operateper_role = operateper_role;
	}
	public String getOperateper_phone() {
		return Operateper_phone;
	}
	public void setOperateper_phone(String operateper_phone) {
		Operateper_phone = operateper_phone;
	}
	public int getOperateper_bool() {
		return Operateper_bool;
	}
	public void setOperateper_bool(int operateper_bool) {
		Operateper_bool = operateper_bool;
	}
	public String getOperateper_scenic() {
		return Operateper_scenic;
	}
	public void setOperateper_scenic(String operateper_scenic) {
		Operateper_scenic = operateper_scenic;
	}
	
}
