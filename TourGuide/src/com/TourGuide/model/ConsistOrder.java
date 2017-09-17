package com.TourGuide.model;

import java.sql.Date;

/**
 * 拼单的订单详细信息
 * @author Tian
 *
 */
public class ConsistOrder {
	
	private String consistOrderID; //拼单的编号
	private String orderID;  //订单编号
	private String produceTime; //订单产生时间
	private String visitTime; //参观时间
	private String endTime; //订单结束时间
	private String visitorPhone; //预约的游客的手机号
	private String guidePhone; //导游的手机号
	private String scenicID; //景点编号
	private String orderState; //订单状态
	private String otherCommand; //其他需求
	private int totalMoney; //订单费用
	private int visitNum; //参观人数 
	private int maxNum; //每单可带的最大人数
	private int purchaseTicket; //是否代购门票
	private int fullPrice;  //购买全票的数量
	private int discoutPrice;  //购买折扣票的数量
	private int halfPrice;  //购买半票的数量
	private int guideFee; //参观日的讲解费
	private int totalGuideFee;   //讲解费总额
	private int totalTicket;  //门票费总额
	private int isConsisted; //是否被拼单
	
	public String getConsistOrderID() {
		return consistOrderID;
	}
	public void setConsistOrderID(String consistOrderID) {
		this.consistOrderID = consistOrderID;
	}
	public String getOrderID() {
		return orderID;
	}
	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}
	public String getProduceTime() {
		return produceTime;
	}
	public void setProduceTime(String produceTime) {
		this.produceTime = produceTime;
	}
	public String getVisitTime() {
		return visitTime;
	}
	public void setVisitTime(String visitTime) {
		this.visitTime = visitTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public int getVisitNum() {
		return visitNum;
	}
	public void setVisitNum(int visitNum) {
		this.visitNum = visitNum;
	}
	public String getVisitorPhone() {
		return visitorPhone;
	}
	public void setVisitorPhone(String visitorPhone) {
		this.visitorPhone = visitorPhone;
	}
	public String getGuidePhone() {
		return guidePhone;
	}
	public void setGuidePhone(String guidePhone) {
		this.guidePhone = guidePhone;
	}
	public String getScenicID() {
		return scenicID;
	}
	public void setScenicID(String scenicID) {
		this.scenicID = scenicID;
	}
	public String getOrderState() {
		return orderState;
	}
	public void setOrderState(String orderState) {
		this.orderState = orderState;
	}
	public String getOtherCommand() {
		return otherCommand;
	}
	public void setOtherCommand(String otherCommand) {
		this.otherCommand = otherCommand;
	}
	public int getTotalMoney() {
		return totalMoney;
	}
	public void setTotalMoney(int totalMoney) {
		this.totalMoney = totalMoney;
	}
	public int getMaxNum() {
		return maxNum;
	}
	public void setMaxNum(int maxNum) {
		this.maxNum = maxNum;
	}
	public int getPurchaseTicket() {
		return purchaseTicket;
	}
	public void setPurchaseTicket(int purchaseTicket) {
		this.purchaseTicket = purchaseTicket;
	}
	public int getFullPrice() {
		return fullPrice;
	}
	public void setFullPrice(int fullPrice) {
		this.fullPrice = fullPrice;
	}
	public int getGuideFee() {
		return guideFee;
	}
	public void setGuideFee(int guideFee) {
		this.guideFee = guideFee;
	}
	public int getDiscoutPrice() {
		return discoutPrice;
	}
	public void setDiscoutPrice(int discoutPrice) {
		this.discoutPrice = discoutPrice;
	}
	public int getHalfPrice() {
		return halfPrice;
	}
	public void setHalfPrice(int halfPrice) {
		this.halfPrice = halfPrice;
	}
	public int getTotalGuideFee() {
		return totalGuideFee;
	}
	public void setTotalGuideFee(int totalGuideFee) {
		this.totalGuideFee = totalGuideFee;
	}
	public int getTotalTicket() {
		return totalTicket;
	}
	public void setTotalTicket(int totalTicket) {
		this.totalTicket = totalTicket;
	}
	public int getIsConsisted() {
		return isConsisted;
	}
	public void setIsConsisted(int isConsisted) {
		this.isConsisted = isConsisted;
	}
}
