package com.TourGuide.model;

/**
 * 拼单的最终结果
 * @author Tian
 * 订单编号与拼单ID是一对多的关系，
 * 多个拼单编号对应同一个订单编号
 */
public class ConsistResult {

	private String orderID; //订单编号
	private int visitNum; //当前的总人数
	private int maxNum;  //最大可拼单人数
	private String visitTime; //参观时间
	private String scenicID; //景点编号
	
	public String getOrderID() {
		return orderID;
	}
	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}
//	public int getCurrentNum() {
//		return currentNum;
//	}
//	public void setCurrentNum(int currentNum) {
//		this.currentNum = currentNum;
//	}
	public int getMaxNum() {
		return maxNum;
	}
	public void setMaxNum(int maxNum) {
		this.maxNum = maxNum;
	}
	public String getVisitTime() {
		return visitTime;
	}
	public void setVisitTime(String visitTime) {
		this.visitTime = visitTime;
	}
	public String getScenicID() {
		return scenicID;
	}
	public void setScenicID(String scenicID) {
		this.scenicID = scenicID;
	}
	public int getVisitNum() {
		return visitNum;
	}
	public void setVisitNum(int visitNum) {
		this.visitNum = visitNum;
	}
}
