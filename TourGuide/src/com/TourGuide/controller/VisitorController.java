package com.TourGuide.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.TourGuide.common.CommonResp;
import com.TourGuide.model.VisitorInfo;
import com.TourGuide.service.VisitorService;
import com.google.gson.Gson;

@Controller
public class VisitorController {
	
	@Autowired
	VisitorService visitorService;
	
	private String imgPath;
	
	
	/**
	 * 游客注册,没有自己选择头像，直接使用微信服务器的数据
	 * @param resp
	 * @param nickName  昵称
	 * @param sex  性别
	 * @param name   姓名
	 * @param phone   手机号 
	 * @param passwd   用户密码
	 * @throws IOException
	 * @throws SQLException 
	 */
	@RequestMapping(value = "/visitorRegisterWithImg.do")
	public void visitorRegisterWithImg(HttpServletResponse resp,
			@RequestParam("nickName") String nickName, 
			@RequestParam("sex") String sex, 
			@RequestParam("name") String name,
			@RequestParam("phone") String phone,
			@RequestParam("passwd") String passwd,
			@RequestParam("image") String image,
			@RequestParam("openID") String openID) throws IOException, SQLException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = visitorService.visitorRegister(nickName, sex, name, phone, passwd, image, openID);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(bool));
		writer.flush();
	}
	
	
	/**
	 * 游客注册,自己选择头像
	 * @param resp
	 * @param nickName  昵称
	 * @param sex  性别
	 * @param name   姓名
	 * @param phone   手机号 
	 * @param passwd   用户密码
	 * @throws IOException
	 * @throws SQLException 
	 */
	@RequestMapping(value = "/visitorRegister.do")
	public void visitorRegister(HttpServletResponse resp,
			@RequestParam("nickName") String nickName, 
			@RequestParam("sex") String sex, 
			@RequestParam("name") String name,
			@RequestParam("phone") String phone,
			@RequestParam("passwd") String passwd,
			@RequestParam("openID") String openID) throws IOException, SQLException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = visitorService.visitorRegister(nickName, sex, name, phone, passwd, imgPath, openID);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(bool));
		writer.flush();
	}
	
	

	/**
	 * 根据游客的手机号，查询个人详细信息
	 * @param resp
	 * @param phone  手机号
	 * @throws IOException
	 * @return 手机号、姓名、性别、昵称、头像
	 */
	@RequestMapping(value = "/getVisitorInfoWithPhone.do")
	public void getVisitorInfoWithPhone(HttpServletResponse resp,
			@RequestParam("phone") String phone) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		VisitorInfo visitorInfo = visitorService.getVisitorInfoWithPhone(phone);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(visitorInfo));
		writer.flush();
	}
	
	
	/**
	 * 通过用户的openID，查看用户的信息
	 * @param resp
	 * @param openId  
	 * @throws IOException
	 */
	@RequestMapping(value = "/getInfobyOpenID.do")
	public void getInfobyOpenID(HttpServletResponse resp,
			@RequestParam("openId") String openId) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		VisitorInfo visitorInfo = visitorService.getInfobyOpenID(openId);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(visitorInfo));
		writer.flush();
	}
	
	
	/**
	 * 用户根据openId修改自己的头像
	 * @param resp
	 * @param openId
	 * @param imgPath  头像路径
	 * @throws IOException
	 */
	@RequestMapping(value = "/changeImg.do")
	public void changeImg(HttpServletResponse resp,
			@RequestParam("openId") String openId
			) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = visitorService.changeImg(openId, imgPath);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(bool));
		writer.flush();
	}
	
	
	@RequestMapping(value="/putImg.do")
	public void UploadImage(HttpServletResponse resp,
			HttpServletRequest request,
			@RequestParam MultipartFile btn_file) throws IOException {
		
		CommonResp.SetUtf(resp);
		boolean ret = false;
		
		String realPath=request.getSession().getServletContext().getRealPath("image/visitor");
		File pathFile = new File(realPath);
		
		if (!pathFile.exists()) {
			//文件夹不存 创建文件
			System.out.println("目录不存在，创建目录");
			pathFile.mkdirs();
		}
		
		System.out.println("文件类型："+btn_file.getContentType());
		System.out.println("文件名称："+btn_file.getOriginalFilename());
		System.out.println("文件大小:"+btn_file.getSize());
		System.out.println(".................................................");
		
		String imgString = btn_file.getOriginalFilename();
		String[] tmp = imgString.split("\\.");
		String fileName = tmp[0] + new Date().getTime() + "."+tmp[1];
		imgPath = "/image/visitor/" + fileName;
		
		//将文件copy上传到服务器
		try {
			System.out.println(realPath + "/" + fileName);
			File fileImageFile=new File(realPath + "/" + fileName);
			btn_file.transferTo(fileImageFile);
			System.out.println("图片上传成功");
//			boolean bool = visitorService.changeImg(openId, fileName);
			ret = true;
		} catch (IllegalStateException | IOException e) {
				
			e.printStackTrace();
		}	
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(ret));
		writer.flush();
	}  	
	
	
	/**
	 * 用户根据openId修改自己的信息
	 * @param openId
	 * @param name  姓名
	 * @param nickName  昵称
	 * @param sex  性别
	 * @return
	 */
	@RequestMapping(value = "/changeInfo.do")
	public void changeInfo(HttpServletResponse resp,
			@RequestParam("openId") String openId,
			@RequestParam("name") String name,
			@RequestParam("nickName") String nickName,
			@RequestParam("sex") String sex) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = visitorService.changeInfo(openId, name, nickName, sex);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(bool));
		writer.flush();
	}
	
	
	/**
	 * 判断游客是否被拉黑
	 * @param resp false --没有拉黑，true---拉黑
	 * @param phone
	 * @throws IOException
	 */
	@RequestMapping(value = "/isBlackened.do")
	public void isBlackened(HttpServletResponse resp,
			@RequestParam("phone") String phone) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = visitorService.isBlackened(phone);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(bool));
		writer.flush();
	}
}
