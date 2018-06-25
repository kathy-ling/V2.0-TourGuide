package com.TourGuide.common;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.util.Iterator;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.net.ssl.SSLContext;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContexts;
import org.apache.http.util.EntityUtils;


//import com.TourGuide.utils.MD5Util;
import com.TourGuide.dao.*;
import com.TourGuide.weixin.util.MD5Util;


public class refund {

	
	public static void main(String[] args) {
		
	System.out.println(refundOrder("28110d027e7e4ecc842ea03f02202973",1));
	}
	// 微信公众号Appid
		private static String appid = "wx6e58a089f2d129f4";
		// 微信支付商户号
		private static String partner = "1482391452";
		
		private static String parterkey="97c82f3f6361f239362c34ed096f9c1d";
		
	public static String  refundOrder(String orderNo,int guidefee)  {
		SortedMap<Object, Object> parameters = new TreeMap<Object, Object>();
		parameters.put("appid", appid);// 公众号id
		parameters.put("mch_id", partner);// 商户号
		parameters.put("nonce_str", CreateNoncestr());
		String RefundString="";
		String orderRefund=OrederProduce.getOrderNo();
		
		// 在notify_url中解析微信返回的信息获取到 transaction_id，此项不是必填，详细请看上图文档
		// parameters.put("transaction_id",
		// "微信支付订单中调用统一接口后微信返回的 transaction_id");//交易单号(微信产生的)，与out_trade_no二者选其一即可
		parameters.put("out_trade_no", orderNo);// 要退款的订单号(商户侧)

		parameters.put("out_refund_no", orderRefund); // 我们自己设定的退款申请号，约束为UK
												// 新生成的退款订单号
		
		int gfee = guidefee;
	
		parameters.put("total_fee", "1"); // 订单总金额,单位为分
		parameters.put("refund_fee", "1"); // 退款金额，单位为分
		//parameters.put("op_user_id", "xxxxx");// 操作员id，默认商户id
		String sign = createSign("utf-8", parameters,parterkey);
		System.out.println(sign);
		parameters.put("sign", sign);

		String reuqestXml = getRequestXml(parameters);
		SSLConnectionSocketFactory sslsf = null;
		try {
			KeyStore keyStore = KeyStore.getInstance("PKCS12");
			FileInputStream instream = new FileInputStream(new File(
					"F://apiclient_cert.p12"));// 放退款证书的路径
			try {
				keyStore.load(instream, "1482391452".toCharArray());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				try {
					instream.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

			SSLContext sslcontext = SSLContexts.custom()
					.loadKeyMaterial(keyStore, "1482391452".toCharArray()).build();
			sslsf = new SSLConnectionSocketFactory(
					sslcontext,
					new String[] { "TLSv1" },
					null,
					SSLConnectionSocketFactory.BROWSER_COMPATIBLE_HOSTNAME_VERIFIER);
		} catch (KeyManagementException e) {
			
			e.printStackTrace();
		} catch (UnrecoverableKeyException e) {
			
			e.printStackTrace();
		} catch (KeyStoreException e) {
			
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			
			e.printStackTrace();
		} catch (CertificateException e) {
			
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		CloseableHttpClient httpclient = HttpClients.custom()
				.setSSLSocketFactory(sslsf).build();
		try {

			HttpPost httpPost = new HttpPost(
					"https://api.mch.weixin.qq.com/secapi/pay/refund");// 退款接口

			System.out.println("executing request" + httpPost.getRequestLine());
			StringEntity reqEntity = new StringEntity(reuqestXml);
			// 设置类型
			reqEntity.setContentType("application/x-www-form-urlencoded");
			httpPost.setEntity(reqEntity);
			CloseableHttpResponse response = httpclient.execute(httpPost);
			try {
				HttpEntity entity = response.getEntity();
				if (entity != null) {
					BufferedReader bufferedReader = new BufferedReader(
							new InputStreamReader(entity.getContent(), "UTF-8"));
					
					String text;
					while ((text = bufferedReader.readLine()) != null) {
						RefundString=RefundString+text;
					}
					
					

				}
				EntityUtils.consume(entity);
				
			} finally {
				response.close();
			}
		} catch (UnsupportedEncodingException e) {
			
			e.printStackTrace();
			return "退款出错";
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "退款出错";
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				httpclient.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		
		
		if (RefundString.indexOf("订单不存在")!=-1) {
			return "订单不存在";
		} else if(RefundString.indexOf("订单已全额退款")!=-1){
			return "订单已全额退款";
		}
		return "退款成功";
	}
	
	public static String CreateNoncestr() {
		String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		String res = "";
		for (int i = 0; i < 16; i++) {
			Random rd = new Random();
			res += chars.charAt(rd.nextInt(chars.length() - 1));
		}
		return res;
	}

	public static String createSign(String charSet,
			SortedMap<Object, Object> parameters,String parterkey) {
		StringBuffer sb = new StringBuffer();
        Set es = parameters.entrySet();
        Iterator it = es.iterator();
        while(it.hasNext()) {
            Map.Entry entry = (Map.Entry)it.next();
            String k = (String)entry.getKey();
            Object v = entry.getValue();
            if(null != v && !"".equals(v) 
                    && !"sign".equals(k) && !"key".equals(k)) {
                sb.append(k + "=" + v + "&");
            }
        }
        sb.append("key=" + parterkey);
        String sign = MD5Util.MD5Encode(sb.toString(), charSet).toUpperCase();
        return sign;
	}

	public static String getRequestXml(SortedMap<Object, Object> parameters) {
		StringBuffer sb = new StringBuffer();
		sb.append("<xml>");
		Set es = parameters.entrySet();
		Iterator it = es.iterator();
		while (it.hasNext()) {
			Map.Entry entry = (Map.Entry) it.next();
			String k = (String) entry.getKey();
			String v = (String) entry.getValue();
			if ("attach".equalsIgnoreCase(k) || "body".equalsIgnoreCase(k)
					|| "sign".equalsIgnoreCase(k)) {
				sb.append("<" + k + ">" +v+"</" + k + ">");
			} else {
				sb.append("<" + k + ">" + v + "</" + k + ">");
			}
		}
		sb.append("</xml>");
		return sb.toString();
	}

	public final static String MD5(String s) {
		char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
				'A', 'B', 'C', 'D', 'E', 'F' };
		try {
			byte[] btInput = s.getBytes();
			// 获得MD5摘要算法的 MessageDigest 对象
			MessageDigest mdInst = MessageDigest.getInstance("MD5");
			// 使用指定的字节更新摘要
			mdInst.update(btInput);
			// 获得密文
			byte[] md = mdInst.digest();
			// 把密文转换成十六进制的字符串形式
			int j = md.length;
			char str[] = new char[j * 2];
			int k = 0;
			for (int i = 0; i < j; i++) {
				byte byte0 = md[i];
				str[k++] = hexDigits[byte0 >>> 4 & 0xf];
				str[k++] = hexDigits[byte0 & 0xf];
			}
			return new String(str);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
