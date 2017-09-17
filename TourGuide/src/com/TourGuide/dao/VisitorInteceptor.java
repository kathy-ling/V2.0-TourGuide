package com.TourGuide.dao;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

@Repository
public class VisitorInteceptor  implements HandlerInterceptor {

	@Override
	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2, ModelAndView arg3) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object arg2) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		String[] Filter = new String[] {" "};  //getVisitorInfoWithPhone.do
		
		// 请求的URI
		String uri = request.getRequestURI();
		
		// 是否过滤
		Boolean doFilter = false;
		for (String s : Filter) {
			String tmpString = s;
			int i = uri.indexOf(s);
			if (-1 != uri.indexOf(s)) {
				doFilter = true;
				break;
			}
		}
		
		if (doFilter) {
			
			// 从session中获取登录者的实体
			Object  objAdmin = request.getSession().getAttribute("visitorSession");
			 
			if (null == objAdmin) {

				// 未登录
				response.setCharacterEncoding("UTF-8");
				response.setContentType("text/html;charset=UTF-8");
				
				PrintWriter out = response.getWriter();	
				int ret = -1;
				out.write(new Gson().toJson(ret));
				out.flush();
				out.close();
			}
			else {
				return true;
			}						
		} else {
			return true;
		}
		
		return true;
	}

}
