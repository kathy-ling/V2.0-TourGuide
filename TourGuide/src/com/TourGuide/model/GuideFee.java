package com.TourGuide.model;

/**
 * 
 * @author wxt
 *
 */
public class GuideFee {
	
	/**
	 * 讲解员手机号,讲解员姓名，讲解员，月收入，日收入，奖励金额，惩罚金额
	 */
	private String guidePhone;
	private String guideName; 
	private int monthFee;
	private int dayFee;
	private int reward;
	private int punishment;
	public String getGuideName() {
		return guideName;
	}
	public void setGuideName(String guideName) {
		this.guideName = guideName;
	}
	public int getMonthFee() {
		return monthFee;
	}
	public void setMonthFee(int monthFee) {
		this.monthFee = monthFee;
	}
	public int getDayFee() {
		return dayFee;
	}
	public void setDayFee(int dayFee) {
		this.dayFee = dayFee;
	}
	public int getReward() {
		return reward;
	}
	public void setReward(int reward) {
		this.reward = reward;
	}
	public int getPunishment() {
		return punishment;
	}
	public void setPunishment(int punishment) {
		this.punishment = punishment;
	}
	public String getGuidePhone() {
		return guidePhone;
	}
	public void setGuidePhone(String guidePhone) {
		this.guidePhone = guidePhone;
	}
	
	

	
}
