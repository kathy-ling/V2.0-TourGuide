package com.TourGuide.web.Dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.TourGuide.web.model.PromotionInfo;

@Repository
public class PromotionInfoDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	/**
	 * 分页得到所有的景区活动信息
	 * 
	 * @return 所有景区的活动信息 2017-3-22 21:37:17
	 */
	public List<PromotionInfo> getPromotionInfoBypage(int i, int j) {

		int k = (i - 1) * j;
		List<PromotionInfo> list = new ArrayList<>();
		DataSource dataSource = jdbcTemplate.getDataSource();
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst = conn.prepareCall("call getPromotion(?,?)");
			cst.setInt(1, k);
			cst.setInt(2, j);
			ResultSet rst = cst.executeQuery();
			while (rst.next()) {
				PromotionInfo promotionInfo = new PromotionInfo();
				promotionInfo.setScenicNo(rst.getString(1));
				promotionInfo.setScenicName(rst.getString(2));
				promotionInfo.setProTitle(rst.getString(3));
				promotionInfo.setProImage(rst.getString(4));
				promotionInfo.setProLink(rst.getString(5));
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
				promotionInfo.setProStartTime(df.format(rst.getDate(6)));
				promotionInfo.setProEndTime(df.format(rst.getDate(7)));
				promotionInfo.setProProduceTime(df.format(rst.getDate(8)));
				if (rst.getInt(9) == 1) {
					promotionInfo.setIsMainShow("是");
				} else {
					promotionInfo.setIsMainShow("否");
				}
				promotionInfo.setProContext(rst.getString(10));
				if (rst.getInt(11) == 1) {
					promotionInfo.setIsAdmin("是");
				} else {
					promotionInfo.setIsAdmin("否");
				}
				promotionInfo.setProID(rst.getString(12));
				promotionInfo.setHtmlPath(rst.getString(13));
				list.add(promotionInfo);
			}
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return list;
	}

	/**
	 * 得到景区活动信息的活动数量
	 * 
	 * @return 2017-3-28 18:49:40
	 */
	public int getProCount() {
		DataSource dataSource = jdbcTemplate.getDataSource();
		int i = 0;
		try {
			Connection connection = dataSource.getConnection();
			CallableStatement cst = connection
					.prepareCall("call getPromotionCount(?)");
			cst.registerOutParameter(1, java.sql.Types.BIGINT);
			cst.execute();
			i = cst.getInt(1);
			connection.close();
		} catch (SQLException e) {

			e.printStackTrace();
		}
		return i;
	}

	/**
	 * 通过景区编号分页得到所属景区的活动信息
	 * 
	 * @param i
	 * @param j
	 * @param scenicNo
	 * @return 2017-3-29 08:44:04
	 */
	public List<PromotionInfo> getPromotionInfoByscenicNo(int i, int j,
			String scenicNo) {

		int k = (i - 1) * j;
		List<PromotionInfo> list = new ArrayList<>();
		DataSource dataSource = jdbcTemplate.getDataSource();
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst = conn
					.prepareCall("call getPromotionByscenicNo(?,?,?)");
			cst.setInt(1, k);
			cst.setInt(2, j);
			cst.setString(3, scenicNo);
			ResultSet rst = cst.executeQuery();
			while (rst.next()) {
				PromotionInfo promotionInfo = new PromotionInfo();
				promotionInfo.setScenicNo(rst.getString(1));
				promotionInfo.setScenicName(rst.getString(2));
				promotionInfo.setProTitle(rst.getString(3));
				promotionInfo.setProImage(rst.getString(4));
				promotionInfo.setProLink(rst.getString(5));
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
				promotionInfo.setProStartTime(df.format(rst.getDate(6)));
				promotionInfo.setProEndTime(df.format(rst.getDate(7)));
				promotionInfo.setProProduceTime(df.format(rst.getDate(8)));
				if (rst.getInt(9) == 1) {
					promotionInfo.setIsMainShow("是");
				} else {
					promotionInfo.setIsMainShow("否");
				}
				promotionInfo.setProContext(rst.getString(10));
				if (rst.getInt(11) == 1) {
					promotionInfo.setIsAdmin("是");
				} else {
					promotionInfo.setIsAdmin("否");
				}
				promotionInfo.setProID(rst.getString(12));
				promotionInfo.setHtmlPath(rst.getString(13));
				list.add(promotionInfo);
			}
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return list;
	}

	/**
	 * 通过景区编号得到专属景区活动信息的活动数量
	 * 
	 * @return 2017-3-29 08:44:25
	 */
	public int getProByscenicNoCount(String scenicNo) {
		DataSource dataSource = jdbcTemplate.getDataSource();
		int i = 0;
		try {
			Connection connection = dataSource.getConnection();
			CallableStatement cst = connection
					.prepareCall("call getPromotionByscenicNoCount(?,?)");
			cst.setString(1, scenicNo);
			cst.registerOutParameter(2, java.sql.Types.BIGINT);
			cst.execute();
			i = cst.getInt(2);
			connection.close();
		} catch (SQLException e) {

			e.printStackTrace();
		}
		return i;
	}

	/**
	 * 设置是否首页展示
	 * 
	 * @param proID
	 * @param main
	 * @return 2017-3-29 19:07:22
	 */
	public int UpdateMainShow(String proID, String main) {
		String sql;
		if (main.equals("是")) {
			sql = "update t_promotion set mainPageShow='0' WHERE promotionNo=?";
		} else {
			sql = "update t_promotion set mainPageShow='1' WHERE promotionNo=?";
		}

		int i = jdbcTemplate.update(sql, new Object[] { proID });

		return i;
	}

	/**
	 * 生成特定文件的名字
	 * 
	 * @return
	 */
	public String getBookOrderID() {

		String phone = "qwertyuiopasdfghjklzxcvbnm1234567890";
		char[] c = phone.toCharArray();
		Random random = new Random();
		String string = "";
		for (int i = 0; i < 8; i++) {

			int j = random.nextInt(c.length);
			string = string + c[j];
		}
		return string;
	}

	public String getPromotionID() {
		String phone = "1234567890";
		char[] c = phone.toCharArray();
		Random random = new Random();
		String string = "";
		for (int i = 0; i < 5; i++) {

			int j = random.nextInt(c.length);
			string = string + c[j];
		}
		return string;
	}

	/**
	 * 增加景区活动信息
	 * @param promotionInfo
	 * @return
	 * 2017-3-30 20:42:45
	 */
	public int InsetProInfo(PromotionInfo promotionInfo) {

		String sql="INSERT INTO t_promotion VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
		
		int i=0;
		
		i=jdbcTemplate.update(sql, new Object[]{promotionInfo.getProID(),promotionInfo.getProTitle(),
				promotionInfo.getProImage(),promotionInfo.getProLink(),promotionInfo.getProStartTime(),
				promotionInfo.getProEndTime(),promotionInfo.getProProduceTime(),promotionInfo.getScenicNo(),
				promotionInfo.getIsMainShow(),promotionInfo.getIsAdmin(),promotionInfo.getProContext(),
				promotionInfo.getHtmlPath()});
		
		return i;
	}
	
	/**
	 * 模板页面
	 * @param filePath
	 * @param HtmlFile
	 * @param list
	 * @return
	 */
	public  boolean JspToHtmlFile(String url,String filePath, String HtmlFile,
			PromotionInfo list) {
		String str = "";
		try {
			String tempStr = "";
			FileInputStream is = new FileInputStream(filePath);// 读取模块文件
			BufferedReader br = new BufferedReader(new InputStreamReader(is,"UTF-8"));
			while ((tempStr = br.readLine()) != null)
				str = str + tempStr;
			is.close();
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		try {

			str = str.replaceAll("query_headimg123", url+list.getProImage());
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
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
