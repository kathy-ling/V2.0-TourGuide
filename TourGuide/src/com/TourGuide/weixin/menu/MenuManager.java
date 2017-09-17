package com.TourGuide.weixin.menu;

import com.TourGuide.model.Token;
import com.TourGuide.weixin.util.MenuUtil;
import com.TourGuide.weixin.util.Oauth2Util;
import com.TourGuide.weixin.util.TokenUtil;

public class MenuManager {
	
	/**
	 * 自定义菜单的结构
	 * @return
	 */
	private static Menu createMyMenu(){
		
		ViewButton btn1 = new ViewButton();
		btn1.setName("主页-");
		btn1.setType("view");
//		btn1.setUrl("http://www.baidu.com");
		btn1.setUrl(Oauth2Util.getOauth2Url().toString());
		
		ClickButton btn2 = new ClickButton();
		btn2.setName("待定1");
		btn2.setType("click");
		btn2.setKey("daiding1");
		
		ClickButton btn3 = new ClickButton();
		btn3.setName("待定2");
		btn3.setType("click");
		btn3.setKey("daiding2");
		
		ClickButton btn4 = new ClickButton();
		btn4.setName("待定3");
		btn4.setType("click");
		btn4.setKey("daiding3");
		
		ClickButton btn5 = new ClickButton();
		btn5.setName("未知");
		btn5.setType("click");
		btn5.setKey("weizhi");
		
		ComplexButton Btn1 = new ComplexButton();
		Btn1.setName("待定");
		Btn1.setSub_button(new Button[]{btn2, btn3, btn4});
		
		Menu menu = new Menu();
		menu.setButton(new Button[]{btn1, Btn1, btn5});
		
		return menu;
	}
	
	
	public static void main(String[] args){
		
		Token token = TokenUtil.getToken();
		
		if(null != token){
			
			boolean result = MenuUtil.createMenu(createMyMenu(), token.getAccessToken());
			
			if(result){
				System.out.println("菜单创建成功");
				System.out.println(Oauth2Util.getOauth2Url().toString());
			}else{
				System.out.println("菜单创建失败！");
			}
		}
		
//		System.out.println(Oauth2Util.getOauth2Url().toString());
	}

}
