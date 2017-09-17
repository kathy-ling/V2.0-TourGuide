package com.example.test;

import javax.servlet.http.HttpServletRequest;

import com.TourGuide.web.model.PromotionInfo;

import java.util.List;
import java.util.ArrayList;
import java.util.Date;
import java.net.URL;
import java.net.URLConnection;
import java.io.*;

public class JspToHtml {

	/**
	 * 根据本地模板生成静态页面
	 * 
	 * @param JspFile
	 *            jsp路经
	 * @param HtmlFile
	 *            html路经
	 * @return
	 */
	public static boolean JspToHtmlFile(String filePath, String HtmlFile,
			PromotionInfo list) {
		String str = "";
		long beginDate = (new Date()).getTime();
		try {
			String tempStr = "";
			FileInputStream is = new FileInputStream(filePath);// 读取模块文件
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			while ((tempStr = br.readLine()) != null)
				str = str + tempStr;
			is.close();
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		try {

			str = str.replaceAll("query_headimg123", list.getProImage());
			str = str.replaceAll("scenicNo", list.getScenicNo());
			str = str.replaceAll("scenicName", list.getScenicName());
			str = str.replaceAll("proTitle", list.getProTitle());
			str = str.replaceAll("proRealse", list.getProProduceTime());
			str = str.replaceAll("proStart", list.getProStartTime());
			str = str.replaceAll("proEnd", list.getProEndTime());
			str = str.replaceAll("proText", list.getProContext());

			File f = new File(HtmlFile);
			BufferedWriter o = new BufferedWriter(new FileWriter(f));
			o.write(str);
			o.close();
			System.out.println("共用时：" + ((new Date()).getTime() - beginDate)
					+ "ms");
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	
	
}
