package com.TourGuide.model;

/**
 * 景区门票信息
 * @author Tian
 *
 */
public class ScenicTickets {
	
	private String scenicNo; //景区编号
	//儿童票（1.5米以下），残疾票，老人票（65岁以上），学生票，军人票
	private int halfPrice; //半价票
	private int fullPrice; //全价票
	private int discoutPrice; //折扣价
	
	public String getScenicNo() {
		return scenicNo;
	}
	public void setScenicNo(String scenicNo) {
		this.scenicNo = scenicNo;
	}
	public int getHalfPrice() {
		return halfPrice;
	}
	public void setHalfPrice(int halfPrice) {
		this.halfPrice = halfPrice;
	}
	public int getFullPrice() {
		return fullPrice;
	}
	public void setFullPrice(int fullPrice) {
		this.fullPrice = fullPrice;
	}
	public int getDiscoutPrice() {
		return discoutPrice;
	}
	public void setDiscoutPrice(int discoutPrice) {
		this.discoutPrice = discoutPrice;
	}
}
