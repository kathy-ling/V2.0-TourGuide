package com.TourGuide.model;


/**
 * 通过微信公众号获取用户的当前位置
 * @author Tian
 *
 */
public class LocationWeixin {
	
	//纬度
	private String latitude;
	//经度
	private String longitude;
	//精度
	private String precision;
	
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	
	public String getPrecision() {
		return precision;
	}
	public void setPrecision(String precision) {
		this.precision = precision;
	}		
}
