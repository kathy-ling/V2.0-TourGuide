package com.TourGuide.SendSMS;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class JavaSmsApi {
	
	private static String URI_SEND_SMS = "http://yunpian.com/v1/sms/send.json";  
	  
	//编码格式。发送编码格式统一用UTF-8  
	private static String ENCODING = "UTF-8";  
	
	private static String  apikey = "cb5f4d41e7ea28cbe2a2c54f24dfb30a";  
	  
	public static void main(String[] args) throws IOException, URISyntaxException {  
	  
	    //修改为您的apikey.apikey可在官网（http://www.yuanpian.com)登录后用户中心首页看到  
	   
	  
	    //修改为您要发送的手机号  
	    String mobile = "15829304168";  
	  
	    /**************** 使用智能匹配模版接口发短信(推荐) *****************/  
	    //设置您要发送的内容(内容必须和某个模板匹配。以下例子匹配的是系统提供的1号模板）  
	    String text = "【周道旅游】15029319152用户，一面时间为2017年8月27日18:41:50，地点是仙灵大学，备注：携带身份证";  
	    //发短信调用示例  
	    System.out.println(JavaSmsApi.sendSms(apikey, text, mobile));  
	  
	}  
	
	public static String SendSMSMain(String phone,String code)
	{
		 String text = "【周道旅游】您的验证码是"+code+"";  
		 try {
			JavaSmsApi.sendSms(apikey, text, phone);
		} catch (IOException e) {
			return "0";
		}
		 
		 return code;
		 
	}
	
	
	  
	/** 
	* 智能匹配模版接口发短信 
	* 
	* @param apikey apikey 
	* @param text   　短信内容 
	* @param mobile 　接受的手机号 
	* @return json格式字符串 
	* @throws IOException 
	*/  
	  
	public static String sendSms(String apikey, String text, String mobile) throws IOException {  
	    Map<String, String> params = new HashMap<String, String>();  
	    params.put("apikey", apikey);  
	    params.put("text", text);  
	    params.put("mobile", mobile);  
	    return post(URI_SEND_SMS, params);  
	}  
	  
	/** 
	* 基于HttpClient 4.3的通用POST方法 
	* 
	* @param url       提交的URL 
	* @param paramsMap 提交<参数，值>Map 
	* @return 提交响应 
	*/  
	  
	public static String post(String url, Map<String, String> paramsMap) {  
	    CloseableHttpClient client = HttpClients.createDefault();  
	    String responseText = "";  
	    CloseableHttpResponse response = null;  
	    try {  
	        HttpPost method = new HttpPost(url);  
	        if (paramsMap != null) {  
	            List<NameValuePair> paramList = new ArrayList<NameValuePair>();  
	            for (Map.Entry<String, String> param : paramsMap.entrySet()) {  
	                NameValuePair pair = new BasicNameValuePair(param.getKey(), param.getValue());  
	                paramList.add(pair);  
	            }  
	            method.setEntity(new UrlEncodedFormEntity(paramList, ENCODING));  
	        }  
	        response = client.execute(method);  
	        HttpEntity entity = response.getEntity();  
	        if (entity != null) {  
	            responseText = EntityUtils.toString(entity);  
	        }  
	    } catch (Exception e) {  
	        e.printStackTrace();  
	    } finally {  
	        try {  
	            response.close();  
	        } catch (Exception e) {  
	            e.printStackTrace();  
	        }  
	    }                                                                                                                                                                                                                                                                                                                       System.out.println(responseText);//此处打印在console后，会给出一个IP地址  
	        return responseText;  
	    }  

}
