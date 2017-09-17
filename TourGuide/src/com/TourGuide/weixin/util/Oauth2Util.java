package com.TourGuide.weixin.util;

import java.io.UnsupportedEncodingException;

import net.sf.json.JSONObject;

import org.apache.naming.java.javaURLContextFactory;

import com.TourGuide.model.WeixinOauth2Token;
import com.google.gson.JsonObject;

public class Oauth2Util {
	
//	//公众账号的唯一标识
//	public static final String appid = "wxd3bda909c7fb1467";
//	//公众账号的密钥
//	public static final String appSecret = "11d33e83aab183855f77a779a42d894d";
	
	
	//公众账号的唯一标识
	public static final String appid = "wx6e58a089f2d129f4";
	//公众账号的密钥
	public static final String appSecret = "97c82f3f6361f239362c34ed096f9c1d";
	
	/**
	 * 获取网页授权凭证。根据code获取access_token
	 * @param code  
	 * @return
	 * json数据包：access_token,网页授权接口调用凭证
	 * 			 expires_in，access_token的有效时长
	 * 			 refresh_token,用于刷新access_token
	 * 			 openid,用户唯一标识
	 * 			 scope,用户授权的作用域
	 */
	public static WeixinOauth2Token getOauth2AccessToken(String code){
		
		WeixinOauth2Token oauth2Token = null;
		
		//code, 上一步获取到的code参数
		//grant_type, 授权类型，填写固定值authorization_code
		String requestUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?"
				+ "appid="+ appid +"&secret="+ appSecret +""
				+ "&code=CODE&grant_type=authorization_code";
		
		requestUrl = requestUrl.replace("CODE", code);
		
		//获取网页授权凭证
		JSONObject jsonObject = TokenUtil.getTokenJsonObject(requestUrl, "GET", null);
		
		if(null != jsonObject){
			try {
				oauth2Token = new WeixinOauth2Token();
				oauth2Token.setAccessToken(jsonObject.getString("access_token"));
				oauth2Token.setExpiresIn(jsonObject.getInt("expires_in"));
				oauth2Token.setRefreshToken(jsonObject.getString("refresh_token"));
				oauth2Token.setOpenId(jsonObject.getString("openid"));
				oauth2Token.setScope(jsonObject.getString("scope"));
			} catch (Exception e) {
				oauth2Token = null;
				int errorCode = Integer.parseInt(jsonObject.get("errcode").toString());
				String errorMsg = jsonObject.get("errmsg").toString();
				
				System.out.printf("获取网页授权失败 errcode:{} errmsg:{}", errorCode, errorMsg);
			}
		}
				
		return oauth2Token;		
	}

	
	/**
	 * 刷新网页授权凭证
	 * @param refreshToken  
	 * @return
	 * access_token的有效时长为7200秒，如果超时，
	 */
	public static WeixinOauth2Token refreshOauth2AccessToken(String refreshToken){
		
		WeixinOauth2Token oauth2Token = null; 
		
		String requestUrl = "https://api.weixin.qq.com/sns/oauth2/refresh_token?"
				+ "appid="+ appid +"&grant_type=refresh_token&refresh_token=REFRESH_TOKEN";
		requestUrl = requestUrl.replace("REFRESH_TOKEN", refreshToken);
		
		//刷新网页授权凭证
		JSONObject  jsonObject = TokenUtil.getTokenJsonObject(requestUrl, "GET", null);
		
		if(null != jsonObject){
			try {
				oauth2Token = new WeixinOauth2Token();
				oauth2Token.setAccessToken(jsonObject.get("access_token").toString());
				oauth2Token.setExpiresIn(Integer.parseInt(jsonObject.get("expires_in").toString()));
				oauth2Token.setRefreshToken(jsonObject.get("refresh_token").toString());
				oauth2Token.setOpenId(jsonObject.get("openid").toString());
				oauth2Token.setScope(jsonObject.get("scope").toString());
			} catch (Exception e) {
				oauth2Token = null;
				int errorCode = Integer.parseInt(jsonObject.get("errcode").toString());
				String errorMsg = jsonObject.get("errmsg").toString();
				
				System.out.printf("刷新网页授权失败 errcode:{} errmsg:{}", errorCode, errorMsg);
			}
		}
		return oauth2Token;
	}
	
	
	/**
	 * URL编码（utf-8）
	 * @param source   http://1f656026j8.imwork.net/TourGuide/oauthServlet
	 * @return
	 */
	public static String urlEncodeUTF8(String source){
		
		String result = source;
		
		try {
			result = java.net.URLEncoder.encode(source, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	
	/**
	 * 构造网页授权链接
	 * @return
	 * 引导用户访问此链接，将会获得code。若code为“authdeny”，表示用户拒绝授权。
	 */
	public static String getOauth2Url(){
		
		//state、#wechat_redirect参数不是必须的
		String Oauth2Url = "https://open.weixin.qq.com/connect/oauth2/authorize?"
				+ "appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&"
				+ "scope=SCOPE&state=STATE#wechat_redirect";
		
		// 授权回调地址（OAuthServlet的访问地址）
//		String redirectUrI = urlEncodeUTF8("http://1f656026j8.imwork.net/TourGuide/oauthServlet");


//		String redirectUrI = urlEncodeUTF8("http://cps.xaut.edu.cn/TourGuide/oauthServlet");
		
		String redirectUrI = urlEncodeUTF8("http://zhoudaoly.com/TourGuide/oauthServlet");

		
		//String redirectUrI = urlEncodeUTF8("http://168r7882j9.imwork.net/TourGuide/oauthServlet");
		// 应用授权作用域。scope等于"snsapi_base"时，不弹出授权页面，直接跳转。
		// scope等于"snsapi_userinfo"时，弹出授权页面，可以通过OpenID获取用户信息。
		String scope = "snsapi_userinfo";
		
		Oauth2Url = Oauth2Url.replace("APPID", appid);
		Oauth2Url = Oauth2Url.replace("REDIRECT_URI", redirectUrI);
		Oauth2Url = Oauth2Url.replace("SCOPE", scope);
		
		https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e58a089f2d129f4&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
		
		return Oauth2Url;
	}
}

