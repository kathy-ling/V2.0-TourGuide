package com.TourGuide.weixin.menu;

/**
 * click类型的按钮
 * @author Tian
 * click类型的按钮有type、name、key三个属性
 * type，始终为click
 * name，显示在按钮表面
 * key，通过它来判断用户点击的按钮
 */
public class ClickButton extends Button{
	
	private String type;
	private String key;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

}
