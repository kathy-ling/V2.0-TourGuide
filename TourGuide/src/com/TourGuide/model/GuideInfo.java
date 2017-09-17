package com.TourGuide.model;

/**
 * 导游的基本信息
 * @author Tian
 *
 */
public class GuideInfo {
	
	private String phone; //导游的手机号
	private String name; //导游的姓名
	private String sex; // 性别
//	private String certificateID; //导游证号
	private String language; //导游的讲解语言
	private String selfIntro; //自我介绍
	private String image;  //头像
	private int age; //年龄
//	private int workAge; //工作年限
	
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
/*	public String getCertificateID() {
		return certificateID;
	}
	public void setCertificateID(String certificateID) {
		this.certificateID = certificateID;
	}*/
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getSelfIntro() {
		return selfIntro;
	}
	public void setSelfIntro(String selfIntro) {
		this.selfIntro = selfIntro;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
/*	public int getWorkAge() {
		return workAge;
	}
	public void setWorkAge(int workAge) {
		this.workAge = workAge;
	}*/
}
