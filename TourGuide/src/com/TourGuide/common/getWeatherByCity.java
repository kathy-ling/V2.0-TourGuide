package com.TourGuide.common;

import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;


import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import com.TourGuide.model.Weather;


/**
 * 根据城市名，获取天气
 * @author Tian
 * 参考：http://www.lai18.com/content/9908350.html
 */
public class getWeatherByCity {
	
	/** 
     * 获取SOAP的请求头，并替换其中的标志符号为用户输入的城市 
     *  
     * @param city 用户输入的城市名称 
     * @return 客户将要发送给服务器的SOAP请求 
     */  
    private static String getSoapRequest(String city) {  
        StringBuilder sb = new StringBuilder();  
        sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>"  
                    + "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" "  
                    + "xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" "  
                    + "xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"  
                    + "<soap:Body>    <getWeather xmlns=\"http://WebXml.com.cn/\">"  
                    + "<theCityCode>" + city  
                    + "</theCityCode>    </getWeather>"  
                    + "</soap:Body></soap:Envelope>");  
        return sb.toString();  
    } 
    
  
    /** 
     * 用户把SOAP请求发送给服务器端，并返回服务器点返回的输入流 
     *  
     * @param city 用户输入的城市名称 
     * @return 服务器端返回的输入流，供客户端读取 
     * @throws Exception 
     */  
    private static InputStream getSoapInputStream(String city) throws Exception {  
       
    	try {  
            String soap = getSoapRequest(city);  
            if (soap == null) {  
                return null;  
            }  
            URL url = new URL(  
                    "http://www.webxml.com.cn/WebServices/WeatherWS.asmx");  
            URLConnection conn = url.openConnection();  
            conn.setUseCaches(false);  
            conn.setDoInput(true);  
            conn.setDoOutput(true);  
  
            conn.setRequestProperty("Content-Length", Integer.toString(soap  
                    .length()));  
            conn.setRequestProperty("Content-Type", "text/xml; charset=utf-8");  
            conn.setRequestProperty("SOAPAction",  
                    "http://WebXml.com.cn/getWeather");  
  
            OutputStream os = conn.getOutputStream();  
            OutputStreamWriter osw = new OutputStreamWriter(os, "utf-8");  
            osw.write(soap);  
            osw.flush();  
            osw.close();  
  
            InputStream is = conn.getInputStream();  
            return is;  
        } catch (Exception e) {  
            e.printStackTrace();  
            return null;  
        }  
    }  
    
    
    /** 
     * 对服务器端返回的XML进行解析 
     * @param city  用户输入的城市名称 
     * @return  天气：天气状况、气温、风力风向、气象图标1、气象图标2
     */  
    public static Weather getCityWeather(String city) {  
        
    	Weather weather = new Weather();
    	
    	try {  
            Document doc;  
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();  
            dbf.setNamespaceAware(true);  
            DocumentBuilder db = dbf.newDocumentBuilder();  
            InputStream inputStream = getSoapInputStream(city);  
            doc = db.parse(inputStream);  
            NodeList nodeList = doc.getElementsByTagName("string");           
                       
            String[] tmpStrings = nodeList.item(7).getFirstChild().getNodeValue().split(" ");
            weather.setWeather(tmpStrings[1]);          
            weather.setTemprature(nodeList.item(8).getFirstChild().getNodeValue());
            weather.setWind(nodeList.item(9).getFirstChild().getNodeValue());
            
            String imageString1 = nodeList.item(10).getFirstChild().getNodeValue();          
            String imageString2 = nodeList.item(11).getFirstChild().getNodeValue();
            weather.setImage1(getImageString(imageString1));
            weather.setImage2(getImageString(imageString2));
                 
	        inputStream.close();  
            return weather;  
        } catch (Exception e) {  
            e.printStackTrace();  
            return null;  
        }  
    }
    
    /**
     * 将天气状况与天气图标对应
     * @param image  天气图标
     * @return
     */
    public static String getImageString(String image){
    	
    	String imagePath = "http://cps.xaut.edu.cn/TourGuide/image/weather/";
    	
    	switch (image) {
		case "0.gif":
			imagePath = imagePath + "0.gif";
			break;
		case "1.gif":
			imagePath = imagePath + "1.gif";
			break;
		case "2.gif":
			imagePath = imagePath + "2.gif";
			break;
		case "3.gif":
			imagePath = imagePath + "3.gif";
			break;
		case "4.gif":
			imagePath = imagePath + "4.gif";
			break;
		case "5.gif":
			imagePath = imagePath + "5.gif";
			break;
		case "6.gif":
			imagePath = imagePath + "6.gif";
			break;
		case "7.gif":
			imagePath = imagePath + "7.gif";
			break;
		case "8.gif":
			imagePath = imagePath + "8.gif";
			break;
		case "9.gif":
			imagePath = imagePath + "9.gif";
			break;
		case "10.gif":
			imagePath = imagePath + "10.gif";
			break;
		case "11.gif":
			imagePath = imagePath + "11.gif";
			break;
		case "12.gif":
			imagePath = imagePath + "12.gif";
			break;
		case "13.gif":
			imagePath = imagePath + "13.gif";
			break;
		case "14.gif":
			imagePath = imagePath + "14.gif";
			break;
		case "15.gif":
			imagePath = imagePath + "15.gif";
			break;
		case "16.gif":
			imagePath = imagePath + "16.gif";
			break;
		case "17.gif":
			imagePath = imagePath + "17.gif";
			break;
		case "18.gif":
			imagePath = imagePath + "18.gif";
			break;
		case "19.gif":
			imagePath = imagePath + "19.gif";
			break;
		case "20.gif":
			imagePath = imagePath + "20.gif";
			break;
		case "21.gif":
			imagePath = imagePath + "21.gif";
			break;
		case "22.gif":
			imagePath = imagePath + "22.gif";
			break;
		case "23.gif":
			imagePath = imagePath + "23.gif";
			break;
		case "24.gif":
			imagePath = imagePath + "24.gif";
			break;
		case "25.gif":
			imagePath = imagePath + "25.gif";
			break;
		case "26.gif":
			imagePath = imagePath + "26.gif";
			break;
		case "27.gif":
			imagePath = imagePath + "27.gif";
			break;
		case "28.gif":
			imagePath = imagePath + "28.gif";
			break;
		case "29.gif":
			imagePath = imagePath + "29.gif";
			break;
		case "30.gif":
			imagePath = imagePath + "30.gif";
			break;
		case "31.gif":
			imagePath = imagePath + "31.gif";
			break;
		default:
			break;
		}
    	
    	return imagePath;
    }


}
