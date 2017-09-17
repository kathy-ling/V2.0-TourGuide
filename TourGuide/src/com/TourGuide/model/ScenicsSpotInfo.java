package com.TourGuide.model;

/**
 * 景点信息
 */
public class ScenicsSpotInfo {

	private String scenicNo; //景区编号，主键
	private String scenicImagePath; //景区图片
	private String scenicName; //景点名称
	private String scenicIntro; //景点介绍
	private String totalVisits; //景区历史参观人数
	private String openingHours; //景区开放时间
	private String province; //景区所在省份
	private String city; //景区所在市
	private String scenicLocation; //景区详细位置（除省市之外）
	private int isHotSpot; //是否是热门景点（是：1  否：0）
	private String scenicLevel; //景区级别
	private String chargePerson; //负责人
	private String account;//景区管理员账号
	
	public String getScenicNo() {
		return scenicNo;
	}
	public void setScenicNo(String scenicNo) {
		this.scenicNo = scenicNo;
	}
	public String getScenicImagePath() {
		return scenicImagePath;
	}
	public void setScenicImagePath(String scenicImagePath) {
		this.scenicImagePath = scenicImagePath;
	}
	public String getScenicName() {
		return scenicName;
	}
	public void setScenicName(String scenicName) {
		this.scenicName = scenicName;
	}
	public String getScenicIntro() {
		return scenicIntro;
	}
	public void setScenicIntro(String scenicIntro) {
		this.scenicIntro = scenicIntro;
	}
	public String getTotalVisits() {
		return totalVisits;
	}
	public void setTotalVisits(String totalVisits) {
		this.totalVisits = totalVisits;
	}
	public String getOpeningHours() {
		return openingHours;
	}
	public void setOpeningHours(String openingHours) {
		this.openingHours = openingHours;
	}
	public String getScenicLocation() {
		return scenicLocation;
	}
	public void setScenicLocation(String scenicLocation) {
		this.scenicLocation = scenicLocation;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public int getIsHotSpot() {
		return isHotSpot;
	}
	public void setIsHotSpot(int isHotSpot) {
		this.isHotSpot = isHotSpot;
	}
	public String getScenicLevel() {
		return scenicLevel;
	}
	public void setScenicLevel(String scenicLevel) {
		this.scenicLevel = scenicLevel;
	}
	public String getChargePerson() {
		return chargePerson;
	}
	public void setChargePerson(String chargePerson) {
		this.chargePerson = chargePerson;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	
	
}
