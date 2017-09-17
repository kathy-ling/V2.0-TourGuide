package com.TourGuide.model;

public class IntroFeeAndMaxNum {
	
	private String scenicNo; //景区的编号
	private String date; //日期
	private int fee; //讲解费
	private int maxNum; //每个拼单订单的最大可拼人数
	
	public String getScenicNo() {
		return scenicNo;
	}
	public void setScenicNo(String scenicNo) {
		this.scenicNo = scenicNo;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public int getFee() {
		return fee;
	}
	public void setFee(int fee) {
		this.fee = fee;
	}
	public int getMaxNum() {
		return maxNum;
	}
	public void setMaxNum(int maxNum) {
		this.maxNum = maxNum;
	}
}
