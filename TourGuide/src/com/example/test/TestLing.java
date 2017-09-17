package com.example.test;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.TourGuide.model.WeixinUserList;
import com.TourGuide.weixin.menu.Button;
import com.TourGuide.weixin.menu.Menu;
import com.TourGuide.weixin.menu.ViewButton;
import com.TourGuide.weixin.util.MenuUtil;
import com.TourGuide.weixin.util.Oauth2Util;
import com.TourGuide.weixin.util.TokenUtil;
import com.TourGuide.weixin.util.UserListUtil;
import com.google.gson.Gson;
import com.google.gson.JsonObject;


 

public class TestLing { 
	
	
	public static String createMenu(){
		
		ViewButton btn1 = new ViewButton();
		btn1.setName("访问链接");
		btn1.setType("view");
		btn1.setUrl("http://1f656026j8.imwork.net/TourGuide/");
		
		Menu menu = new Menu();
		menu.setButton(new Button[]{btn1});
		
		String jsonMenu = new Gson().toJson(menu);
		return jsonMenu;
	}
	
    /** 
     * 测试 
     * @param args 
     * @throws Exception 
     */  
	
    public static void main(String[] args) throws Exception {
    	
//    	Calendar calendar = Calendar.getInstance();
//    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//    	calendar.add(Calendar.DAY_OF_YEAR, 2);
//    	Date date = calendar.getTime();
//    	System.out.println(sdf.format(date));
//    	Date date1=new Date();
//    	String day1=new SimpleDateFormat("yyyy-MM-dd").format(date1);
//    	
//    	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//    	
//    	Date date = dateFormat.parse("2017-1-11");
//    	Date date2 = dateFormat.parse(day1);
//    	
//    	long day = (date.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000);
//
//    	String timeNow = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());

    	//    	MenuUtil.getMenu(TokenUtil.getToken().getAccessToken());
    	
//    	String redirect = Oauth2Util.urlEncodeUTF8("http://1f656026j8.imwork.net/TourGuide/oauthServlet");
//    	System.out.println(redirect);
    	
    	
    	SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
    	String accessToken = TokenUtil.getToken().getAccessToken(); 
    	
    	WeixinUserList weixinUserList = UserListUtil.getUserList(accessToken, "");
    	
    	for(int i=0; i<weixinUserList.getOpenIdList().size(); i++){
    		
    		String openID = weixinUserList.getOpenIdList().get(i);
    		String time = UserListUtil.getSubscribeTime(accessToken, openID);
    		
    		System.out.println(openID + ":" + format.format(Long.parseLong(time)*1000L));
    	}
    
    }  
	
}
