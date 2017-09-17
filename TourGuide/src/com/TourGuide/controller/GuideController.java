package com.TourGuide.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.omg.CORBA.PUBLIC_MEMBER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.TourGuide.common.CommonResp;
import com.TourGuide.model.ScenicsSpotInfo;
import com.TourGuide.service.GuideService;
import com.TourGuide.service.ScenicSpotService;
import com.google.gson.Gson;

@Controller
public class GuideController {
	
	@Autowired
	private GuideService guideService;
	
	@Autowired
	private ScenicSpotService scenicSpotService;
	
	private String imgPath;
	
	/**
	 * 讲解员提交相应的信息，申请认证
	 * @param resp
	 * @param phone  手机号
	 * @param name  姓名
	 * @param sex  性别
	 * @param language  讲解语言
	 * @param selfIntro   自我介绍
	 * @param image  头像
	 * @param age    年龄
	 * @param scenic 申请的景区
	 * @throws IOException
	 * @throws SQLException 
	 * @throws NumberFormatException 
	 */
	@RequestMapping(value = "/getGuideAuthentication.do")
	public void getGuideAuthentication(HttpServletResponse resp,
			@RequestParam("phone") String phone, 
			@RequestParam("name") String name, 
			@RequestParam("sex") String sex,
			@RequestParam("language") String language, 
			@RequestParam("selfIntro") String selfIntro, 
			@RequestParam("age") String age,
			@RequestParam("workAge") String workAge,
			@RequestParam("scenic") String scenic) 
			throws IOException, NumberFormatException, SQLException{
		
		CommonResp.SetUtf(resp);
		
		int ret = guideService.getGuideAuthentication(phone, name, sex, 
				language, selfIntro, imgPath, Integer.parseInt(age), workAge, scenic);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(ret));
		writer.flush();
	}
	
	
	@RequestMapping(value="/upLoadImg.do")
	@ResponseBody
	public Object UploadImage(HttpServletResponse resp,
			HttpServletRequest request,
			@RequestParam MultipartFile btn_file) throws IOException {
		
		CommonResp.SetUtf(resp);
		boolean ret = false;
		
		String realPath=request.getSession().getServletContext().getRealPath("image/visitor");
		File pathFile = new File(realPath);
		String fileName = null;
		
		if (!pathFile.exists()) {
			//文件夹不存 创建文件
			System.out.println("目录不存在，创建目录");
			pathFile.mkdirs();
		}
		
		System.out.println("文件类型："+btn_file.getContentType());
		System.out.println("文件名称："+btn_file.getOriginalFilename());
		System.out.println("文件大小:"+btn_file.getSize());
		System.out.println(".................................................");
			//将文件copy上传到服务器
		
		String imgString = btn_file.getOriginalFilename();
		String[] tmp = imgString.split("\\.");
		fileName = tmp[0] + new Date().getTime() + "."+tmp[1];
		imgPath = "/image/visitor/" + fileName;
		
		try {
			System.out.println(realPath + "/" + fileName);
			File fileImageFile=new File(realPath + "/" + fileName);
			btn_file.transferTo(fileImageFile);
			System.out.println("图片上传成功");
			ret = true;
		} catch (IllegalStateException | IOException e) {
				
			e.printStackTrace();
		}	
		
		System.out.println(ret);
		return ret;
		/*PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson("ret"));
		writer.close();
		writer.flush();*/
	}  	
	
	/**
	 * 查询最受欢迎的讲解员
	 * @param resp
	 * @throws IOException
	 */
	@RequestMapping(value = "/getPopularGuides.do")
	public void getPopularGuides(HttpServletResponse resp) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> listResult = guideService.getPopularGuides();
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(listResult));
		writer.flush();
	}
	
	
	
	/**
	 * 查询可被预约的讲解员（时间冲突的讲解员已被过滤）
	 * @param resp
	 * @param scenicName   景区名称（景区名称必须存在于数据库中）
	 * @param visitTime 游客的参观时间
	 * @param visitNum 参观的人数
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getAvailableGuides.do")
	@ResponseBody
	public Object getAvailableGuides(HttpServletResponse resp,
			@RequestParam("scenicName") String scenicName, 
			@RequestParam("visitTime") String visitTime,
			@RequestParam("visitNum") String visitNum) throws IOException{
		//scenicName=秦始皇兵马俑&visitTime=2017-1-13 8:30&visitNum=5
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> listResult = new ArrayList<>();
		
		//根据scenicName，查找相应的景区信息
		ScenicsSpotInfo scenicsSpotInfo = scenicSpotService.SearchScenicInfoByName_Service(scenicName);
		String scenicID = scenicsSpotInfo.getScenicNo();

		if(scenicID == null){
			scenicID = "null";
		}
		listResult = guideService.getAvailableGuides(visitTime, Integer.parseInt(visitNum), scenicID);
		
		return listResult;  //若返回值为空，则景区名称有误或者没有符合条件的讲解员
	}
	
	
	
	/**
	 * 按用户的筛选条件，查询相应的讲解员信息
	 * @param resp
	 * @param scenicName  景区名称
	 * @param visitTime  参观时间
	 * @param visitNum   参观人数
	 * @param sex   筛选讲解员的性别  （男，女）
	 * @param age   年龄  （20-30，30-40，40-50）
	 * @param language  讲解语言 （0，1）
	 * @param level  级别   （1，2，3，4，5，6，7）
	 * @return 符合条件的讲解员的信息
	 * phone,image,name,sex,age,language,selfIntro,guideLevel
	 * @throws IOException
	 */
	@RequestMapping(value = "/getAvailableGuidesWithSelector.do")
	@ResponseBody
	public Object getAvailableGuidesWithSelector(HttpServletResponse resp,
			@RequestParam("scenicName") String scenicName, 
			@RequestParam("visitTime") String visitTime,
			@RequestParam("visitNum") String visitNum,
			@RequestParam("sex") String sex,
			@RequestParam("age") String age,
			@RequestParam("language") String language,
			@RequestParam("level") String level) throws IOException{
		//scenicName=秦始皇兵马俑&visitTime=2017-3-23 16:00&visitNum=15&sex=null&age=null&language=null&level=null
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> listResult = new ArrayList<>();
		
		//根据scenicName，查找相应的景区信息
		ScenicsSpotInfo scenicsSpotInfo = scenicSpotService.SearchScenicInfoByName_Service(scenicName);
		String scenicID = scenicsSpotInfo.getScenicNo();
		
		if(scenicID == null){
			scenicID = "null";
		}
		listResult = guideService.getAvailableGuidesWithSelector(visitTime, Integer.parseInt(visitNum),
				scenicID, sex, age, language, level);
		
		return listResult;
	}
	
	
	/**
	 * 用户不输入参观信息，只对讲解员进行筛选查看
	 * @param resp
	 * @param sex
	 * @param age
	 * @param language
	 * @param level
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getGuidesWithSelector.do")
	@ResponseBody
	public Object getGuidesWithSelector(HttpServletResponse resp,			
			@RequestParam("sex") String sex,
			@RequestParam("age") String age,
			@RequestParam("language") String language,
			@RequestParam("level") String level) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> listResult = guideService.getGuidesWithSelector(
				sex, age, language, level);
		
		return listResult;
	}
	
	
	/**
	 * 根据手机号，查询导游的详细信息
	 * @param resp
	 * @param guidePhone  手机号
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getDetailGuideInfoByPhone.do")
	@ResponseBody
	public Object getDetailGuideInfoByPhone(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> listResult = new ArrayList<>();
		
		listResult = guideService.getDetailGuideInfoByPhone(guidePhone);
		
		return listResult;
	}
	
	
	/**
	 * 判断该讲解员已经被预约了的时间(被预约了的时间要大于当前时间)与time是否冲突
	 * 若有冲突，则返回数据；否则，查询结果为空
	 * @param guidePhone  讲解员的手机号
	 * @param visitTime  游客的预约参观时间
	 * @return
	 */
	@RequestMapping(value = "/isTimeConflict.do")
	@ResponseBody
	public Object isTimeConflict(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone,
			@RequestParam("visitTime") String visitTime) throws IOException{
		
		CommonResp.SetUtf(resp);		
		
		boolean bool = guideService.isTimeConflict(guidePhone, visitTime);
		
		return bool;
	}
	
	/**
	 * 判断该讲解员是否通过审核
	 * @param guidePhone
	 * @return
	 */
	@RequestMapping(value = "/isAuthorized.do")
	@ResponseBody
	public Object isAuthorized(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone)throws IOException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = guideService.isAuthorized(guidePhone);
		
		return bool;
	}
	
	
	/**
	 * 讲解员签到
	 * @param resp
	 * @param orderId
	 * @return
	 * @throws IOException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/guideSignIn.do")
	@ResponseBody
	public Object guideSignIn(HttpServletResponse resp,
			@RequestParam("orderId") String orderId)throws IOException, SQLException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = guideService.guideSignIn(orderId);
		
		return bool;
	}
	
	
	/**
	 * 判断讲解员的订单是否签到
	 * @param resp
	 * @param orderId
	 * @return
	 * @throws IOException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/isSignIn.do")
	@ResponseBody
	public Object isSignIn(HttpServletResponse resp,
			@RequestParam("orderId") String orderId)throws IOException, SQLException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = guideService.isSignIn(orderId);
		
		return bool;
	}
	
	
	/**
	 *  查看导游是否已经申请成为导游了
	 * @param resp
	 * @param phone
	 * @return  true--已经申请， false--未申请
	 * @throws IOException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/hasApplied.do")
	@ResponseBody
	public Object hasApplied(HttpServletResponse resp,
			@RequestParam("phone") String phone)throws IOException, SQLException{
		
		CommonResp.SetUtf(resp);
		
		boolean bool = guideService.hasApplied(phone);
		
		return bool;
	}
	
	
	/**
	 * 根据手机号，查询导游的申请信息
	 * @param phone 手机号
	 * @return  
	 * 姓名、性别、年龄、从业时间、联系电话、讲解语言、景区名称、自我介绍、个人照片、申请日期、通过日期
	 */
	@RequestMapping(value = "/getGuideApplyInfoByPhone.do")
	@ResponseBody
	public Object getGuideApplyInfoByPhone(HttpServletResponse resp,
			@RequestParam("guidePhone") String guidePhone) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		List<Map<String , Object>> listResult = new ArrayList<>();
		
		listResult = guideService.getGuideApplyInfoByPhone(guidePhone);
		
		return listResult;
	}
	
}



/**
 * 该导游在该天，是否被预约了
 * @param resp
 * @param guidePhone   导游的手机号
 * @param visitTime  游览时间
 * @return   1-被预约了    0-未被预约
 * @throws IOException
 */
//@RequestMapping(value = "/WhetherBooked.do")
//@ResponseBody
//public Object WhetherBooked(HttpServletResponse resp,
//		@RequestParam("guidePhone") String guidePhone, 
//		@RequestParam("visitTime") String visitTime) throws IOException{
//	
//	CommonResp.SetUtf(resp);
//	
//	int booked = 0;
//	
//	String[] date = visitTime.toString().split(" ");
//	String visitDate = date[0];
//	
//	booked = guideService.WhetherBooked(guidePhone, visitDate);
//	
//	return booked;
//}
