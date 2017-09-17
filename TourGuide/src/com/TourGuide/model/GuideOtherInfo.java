package com.TourGuide.model;

/**
 * 导游的除了基本信息之外的信息
 * @author Tian
 *
 */
public class GuideOtherInfo {
	
	private String phone; //导游的手机号
	private String guideLevel; //导游的级别
	private String scenicBelong; //导游所属的景区
	private int historyNum; //历史接待人数
	private int singleMax; //单次最大讲解人数
	private int guideFee; //讲解费
	private int authorized; //是否审核通过
	private int disabled; //是否禁用讲解员
	private int workAge; //工作年限
	private String certificateID; //导游证号
	public int getWorkAge() {
		return workAge;
	}
	public void setWorkAge(int workAge) {
		this.workAge = workAge;
	}
	public String getCertificateID() {
		return certificateID;
	}
	public void setCertificateID(String certificateID) {
		this.certificateID = certificateID;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getGuideLevel() {
		return guideLevel;
	}
	public void setGuideLevel(String guideLevel) {
		this.guideLevel = guideLevel;
	}
	public String getScenicBelong() {
		return scenicBelong;
	}
	public void setScenicBelong(String scenicBelong) {
		this.scenicBelong = scenicBelong;
	}
	public int getHistoryNum() {
		return historyNum;
	}
	public void setHistoryNum(int historyNum) {
		this.historyNum = historyNum;
	}
	public int getSingleMax() {
		return singleMax;
	}
	public void setSingleMax(int singleMax) {
		this.singleMax = singleMax;
	}
	public int getGuideFee() {
		return guideFee;
	}
	public void setGuideFee(int guideFee) {
		this.guideFee = guideFee;
	}
	public int getAuthorized() {
		return authorized;
	}
	public void setAuthorized(int authorized) {
		this.authorized = authorized;
	}
	public int getDisabled() {
		return disabled;
	}
	public void setDisabled(int disabled) {
		this.disabled = disabled;
	}
}
