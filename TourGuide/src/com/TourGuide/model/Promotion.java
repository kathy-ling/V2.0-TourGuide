package com.TourGuide.model;

/**
 * 首页活动信息
 * @author Tian
 *
 */
public class Promotion {

	private String promotionNo; //活动编号
	private String promotionImage; //活动图片
	private String promotionLinks; //活动链接
	private String promotionStartTime; //活动开始时间
	private String promotionEndTime; //活动结束时间
	private String promotionReleaseTime; //活动发布时间
	
	public String getPromotionNo() {
		return promotionNo;
	}
	public void setPromotionNo(String promotionNo) {
		this.promotionNo = promotionNo;
	}
	public String getPromotionImage() {
		return promotionImage;
	}
	public void setPromotionImage(String promotionImage) {
		this.promotionImage = promotionImage;
	}
	public String getPromotionLinks() {
		return promotionLinks;
	}
	public void setPromotionLinks(String promotionLinks) {
		this.promotionLinks = promotionLinks;
	}
	public String getPromotionStartTime() {
		return promotionStartTime;
	}
	public void setPromotionStartTime(String promotionStartTime) {
		this.promotionStartTime = promotionStartTime;
	}
	public String getPromotionEndTime() {
		return promotionEndTime;
	}
	public void setPromotionEndTime(String promotionEndTime) {
		this.promotionEndTime = promotionEndTime;
	}
	public String getPromotionReleaseTime() {
		return promotionReleaseTime;
	}
	public void setPromotionReleaseTime(String promotionReleaseTime) {
		this.promotionReleaseTime = promotionReleaseTime;
	}
	
}
