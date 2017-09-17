package com.TourGuide.weixin.menu;

/**
 * 含有子菜单的一级菜单
 * @author Tian
 *
 */
public class ComplexButton extends Button{

	private Button[] sub_button;

	public Button[] getSub_button() {
		return sub_button;
	}

	public void setSub_button(Button[] sub_button) {
		this.sub_button = sub_button;
	}
}
