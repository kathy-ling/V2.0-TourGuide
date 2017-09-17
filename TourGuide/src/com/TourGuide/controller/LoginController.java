package com.TourGuide.controller;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.TourGuide.common.CommonResp;
import com.TourGuide.model.VisitorLoginInfo;
import com.TourGuide.service.VisitorloginService;


@Controller
@SessionAttributes("visitorSession")
public class LoginController {

	@Autowired
	private VisitorloginService visitorloginService;
	
	
	/**
	 * 游客的登录验证
	 * @param response
	 * @param username  用户名：手机号
	 * @param password  登录密码
	 * @param session
	 * @param model
	 * @return  0：登录失败，1：游客被禁用，2：登录成功
	 */
	@RequestMapping(value="login.do")
	@ResponseBody
	public Object Login(HttpServletResponse response,
			@RequestParam(value="username")String username,
			@RequestParam(value="password")String password,
			HttpSession session, ModelMap model){
		
		CommonResp.SetUtf(response);
		
		int i=visitorloginService.Valid_Service(username, password);
		
		VisitorLoginInfo visitorLoginInfo=new VisitorLoginInfo();
		visitorLoginInfo.setPhone(username);
		visitorLoginInfo.setPassword(password);
		
		if (i==2) {
			model.addAttribute("visitorSession", visitorLoginInfo);	
		}
		
		return i;
	}
	
}
