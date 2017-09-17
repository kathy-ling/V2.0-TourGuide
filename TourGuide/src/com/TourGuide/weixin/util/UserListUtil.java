package com.TourGuide.weixin.util;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import com.TourGuide.model.WeixinUserList;

public class UserListUtil {
	
	
	/**
	 * 获取关注者列表
	 * @param accessToken   调用接口凭证
	 * @param nextOpenId   第一个拉取的openId，不填默认从头开始拉取
	 * @return total,关注该公众账号的总用户数
	 * 		   count，拉取的OPENID个数，最大值为10000
	 *         data，列表数据，OPENID的列表
	 *         next_openid，拉取列表的最后一个用户的OPENID
	 * 当公众号关注者数量超过10000时，可通过填写next_openid的值，从而多次拉取列表的方式来满足需求。
	 */
	public static WeixinUserList getUserList(String accessToken, String nextOpenId){
		
		WeixinUserList weixinUserList = null;
		
		if (null == nextOpenId){
			nextOpenId = "";
		}
			
		// 拼接请求地址
		String requestUrl = "https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID";
		requestUrl = requestUrl.replace("ACCESS_TOKEN", accessToken).replace("NEXT_OPENID", nextOpenId);
		
		// 获取关注者列表
		JSONObject jsonObject = TokenUtil.getTokenJsonObject(requestUrl, "GET", null);
		
		// 如果请求成功
		if (null != jsonObject) {
			try {
				weixinUserList = new WeixinUserList();
				weixinUserList.setTotal(jsonObject.getInt("total"));
				weixinUserList.setCount(jsonObject.getInt("count"));
				weixinUserList.setNextOpenId(jsonObject.getString("next_openid"));
				JSONObject dataObject = (JSONObject) jsonObject.get("data");
				weixinUserList.setOpenIdList(JSONArray.toList(dataObject.getJSONArray("openid"), List.class));
			} catch (JSONException e) {
				weixinUserList = null;
				int errorCode = jsonObject.getInt("errcode");
				String errorMsg = jsonObject.getString("errmsg");
				System.out.printf("获取关注者列表失败 errcode:{} errmsg:{}", errorCode, errorMsg);
			}
		}
		return weixinUserList;
	}
	
	
	public static String getSubscribeTime(String accessToken, String openId){
		
		String time = null;
		
		// 拼接请求地址
		String requestUrl = "https://api.weixin.qq.com/cgi-bin/user/info?"
				+ "access_token=ACCESS_TOKEN&openid=OPENID";
		requestUrl = requestUrl.replace("ACCESS_TOKEN", accessToken).replace("OPENID", openId);
		
		// 获取用户信息
		JSONObject jsonObject = TokenUtil.getTokenJsonObject(requestUrl, "GET", null);
		
		time = jsonObject.getString("subscribe_time");
		
		return time;
		
	}

}
