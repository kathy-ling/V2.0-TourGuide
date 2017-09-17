package com.TourGuide.model;

import java.util.Date;

/**
 * 挂靠景区信息（包含历史记录）
 * @author Tian
 *
 */
public class Affiliation {

	private String guidePhone; //导游的手机号
	private String scenicID;   //景区编号
	private Date applyDate;   //申请挂靠的日期
	private Date quitDate;  //取消挂靠的日期
	
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
	public Date getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}
	public Date getQuitDate() {
		return quitDate;
	}
	public void setQuitDate(Date quitDate) {
		this.quitDate = quitDate;
	}
}
