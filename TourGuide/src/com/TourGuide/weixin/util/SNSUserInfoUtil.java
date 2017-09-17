package com.TourGuide.weixin.util;

import net.sf.json.JSONObject;

import com.TourGuide.model.SNSUserInfo;
import com.google.gson.JsonObject;

public class SNSUserInfoUtil {
	
//	public static SNSUserInfo snsUserInfo = null;
	
	
	/**
	 * 通过网页授权获取用户信息
	 * @param accessToken  网页授权接口条用凭证
	 * @param openId  用户标识
	 * @return
	 */
	public static SNSUserInfo getSNSUserInfo(String accessToken, String openId){
		
		SNSUserInfo snsUserInfo = null;
		
		String requestUrl = "https://api.weixin.qq.com/sns/userinfo?"
				+ "access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN";
		requestUrl = requestUrl.replace("ACCESS_TOKEN", accessToken);
		requestUrl = requestUrl.replace("OPENID", openId);
		
		// 通过网页授权获取用户信息
		JSONObject jsonObject = TokenUtil.getTokenJsonObject(requestUrl, "GET", null);
	
		if (null != jsonObject) {
			try {
				snsUserInfo = new SNSUserInfo();
				// 用户的标识
				snsUserInfo.setOpenId(jsonObject.get("openid").toString());
				// 昵称
				snsUserInfo.setNickname(jsonObject.get("nickname").toString());
				// 性别（1是男性，2是女性，0是未知）
				snsUserInfo.setSex(Integer.parseInt(jsonObject.get("sex").toString()));
				// 用户所在国家
				snsUserInfo.setCountry(jsonObject.get("country").toString());
				// 用户所在省份
				snsUserInfo.setProvince(jsonObject.get("province").toString());
				// 用户所在城市
				snsUserInfo.setCity(jsonObject.get("city").toString());
				// 用户头像
				snsUserInfo.setHeadImgUrl(jsonObject.get("headimgurl").toString());
//				// 用户特权信息
//				snsUserInfo.setPrivilegeList(JSONArray.toList(jsonObject.getJSONArray("privilege"), List.class));
			} catch (Exception e) {
				snsUserInfo = null;
				String errorCode = jsonObject.get("errcode").toString();
				String errorMsg = jsonObject.get("errmsg").toString();
				System.out.printf("获取用户信息失败 errcode:{} errmsg:{}", errorCode, errorMsg);
			}
		}
		
		return snsUserInfo;		
	}

}
