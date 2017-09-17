package com.TourGuide.weixin.menu;


/**
 * view类型的按钮
 * @author Tian
 * view类型的按钮有type、name、url三个属性
 * type，始终为click
 * name，显示在按钮表面
 * url，点击按钮后访问的网页链接
 */
public class ViewButton extends Button{
	
	private String type;
	private String url;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}
