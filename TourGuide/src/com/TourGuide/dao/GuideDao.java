package com.TourGuide.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import com.TourGuide.common.DateConvert;
import com.TourGuide.common.MyDateFormat;
import com.TourGuide.model.GuideInfo;
import com.TourGuide.model.GuideOtherInfo;
@Repository
public class GuideDao {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ScenicSpotDao scenicSpotDao;
	
	/**
	 * 讲解员提交相应的信息，申请认证
	 * @param phone  手机号
	 * @param name  姓名
	 * @param sex  性别
	 * @param language  讲解语言
	 * @param selfIntro   自我介绍
	 * @param image  头像
	 * @param age    年龄
	 * @return 0-失败  1-成功  -1-账号已存在
	 * @throws SQLException 
	 */
	public int getGuideAuthentication(String phone, String name,String sex, 
			String language, String selfIntro, String image, 
			int age, String workAge, String scenic) throws SQLException{
		
		int retValue = 0;
		String scenicId = null;
		String dayNow = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
		final GuideInfo guideInfo = new GuideInfo();
		List<Map<String, Object>> list = scenicSpotDao.getScenicByName(scenic);
		if(list.size() != 0){
			scenicId = (String) list.get(0).get("scenicNo");
		}
		
		//查询该账号是否被注册了
		String sqlSearch = "select phone from t_guideinfo where phone='"+phone+"'";	
		jdbcTemplate.query(sqlSearch,  new RowCallbackHandler() {
			
			@Override
			public void processRow(ResultSet res) throws SQLException {
				guideInfo.setPhone(res.getString(1));
			}
		});
		String phoneExist = guideInfo.getPhone();			
		
		DataSource dataSource = jdbcTemplate.getDataSource();
		Connection  conn = null;
		try{
			conn = dataSource.getConnection();
			conn.setAutoCommit(false);
			
			int i=0,j=0,k=0,p=0,m=0,n=0;
			
			//首次申请成为导游
			if(phoneExist == null){	
				//向t_guideinfo表中插入导游的基本信息
				String sqlString = "insert into t_guideinfo (phone,name,sex,language,selfIntro,image,age) "
						+ "values (?,?,?,?,?,?,?)";
				i = jdbcTemplate.update(sqlString, new Object[]{phone, name, sex,
						language, selfIntro, image, age});		
				
				//向t_guideotherinfo插入其他的信息
				String sqlString2 = "insert into t_guideotherinfo (phone,workAge,scenicBelong,authorized,disabled) "
						+ "values (?,?,?,?,?)";
				j = jdbcTemplate.update(sqlString2, new Object[]{phone, workAge, scenicId, 0, 0});
				
				//向t_guideworkday中插入信息
				String sqlString3 = "insert into t_guideworkday (guidePhone) values (?)";
				k = jdbcTemplate.update(sqlString3, new Object[]{phone});
				
				String sqlApply = "insert into t_affiliation (guidePhone,scenicID,applyDate,state) "
						+ "values (?,?,?,?)";
				p = jdbcTemplate.update(sqlApply, new Object[]{phone,scenicId,dayNow,1});
				
			}else{//取消景区挂靠后，再次申请
				String sqlApply = "insert into t_affiliation (guidePhone,scenicID,applyDate,state) "
						+ "values (?,?,?,?)";
				m = jdbcTemplate.update(sqlApply, new Object[]{phone,scenicId,dayNow,1});
				
				String update = "update t_guideotherinfo set workAge='"+workAge+"',"
						+ "scenicBelong='"+scenicId+"',authorized=0,disabled=0 where phone='"+phone+"'";
				n = jdbcTemplate.update(update);
			}
			
			
			conn.commit();//提交JDBC事务 
			conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
			conn.close();
			
			if ((i!=0 && j!=0 && k!=0 && p != 0) || (m!=0 && n!=0)) {
				retValue = 1;
			}
			
		} catch (SQLException e) {
			conn.rollback();
			e.printStackTrace();
		}	
	
		return retValue;
	}
	
	
	/**
	 * 查询最受欢迎的讲解员,暂定显示10个
	 * @return  讲解员的基本信息及级别
	 * phone,image,name,sex,age,language,selfIntro,guideLevel
	 */
	public List<Map<String, Object>> getPopularGuides(){
		
		int popularNum = 10;
		
		List<Map<String , Object>> list = new ArrayList<>(); 		
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getPopularGuides(?)");
			cst.setInt(1, popularNum);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("phone", rst.getString(2));
				map.put("image", rst.getString(3));
				map.put("name", rst.getString(4));
				map.put("sex", rst.getString(5));
				map.put("age", rst.getInt(6));
				map.put("language", rst.getString(7));
				map.put("selfIntro", rst.getString(8));
				map.put("guideLevel", rst.getString(9));
				map.put("historyTimes", rst.getInt(10));
				list.add(map);
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		
		return list;
	}
	
	
	
	/**
	 * 查询可被预约的讲解员,查看推荐.若景区为空，则筛选所有景区的空闲讲解员
	 * 查询条件：级别、所属景区、讲解员是否请假、单次最大带团人数、去除时间冲突的讲解员信息
	 * scenicID可不选，不为空；visitTime一定存在；visitNum可不选，不选置为0；
	 * @param visitTime  游客的参观日期
	 * @param visitNum  参观的人数
	 * @param scenicID  景区编号
	 * @return 可被预约的讲解员的基本信息（按星级排序）
	 * phone,image,name,sex,age,language,selfIntro,guideLevel
	 */
	public List<Map<String, Object>> getAvailableGuides(String visitTime, 
			int visitNum, String scenicID){
		
		String selectDay = null;
    	String dayNow = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
    	String timeNow = MyDateFormat.form(new Date());
    	
    	if (visitTime.equals("null")) {
    		visitTime = DateConvert.addHourToTime(timeNow, 1);
		}    	
		
    	//计算参观日期与今日之间相隔的天数
    	String[] visitDate = visitTime.split(" ");
    	int day = DateConvert.getDaysBetweenDate(visitDate[0], dayNow);   		
		switch (day) {
		
		case 0:
			selectDay = "one";
			break;
		case 1:
			selectDay = "two";			
			break;
		case 2:
			selectDay = "three";
			break;
		case 3:
			selectDay = "four";
			break;
		default:
			break;
		}   	
		
		List<Map<String , Object>> listResult = new ArrayList<>(); 
		List<Map<String , Object>> list = null;		
		
		//若景区为空，则筛选visitTime时所有景区的空闲讲解员；否则，筛选特定景区的visitTime时的空闲讲解员
		if(scenicID.equals("null")){
			String sqlString = "select t_guideinfo.phone,image,`name`,sex,age,`language`,selfIntro,"
					+ "t_guideotherinfo.guideLevel,t_guideotherinfo.historyTimes,t_scenicspotinfo.scenicName from t_guideinfo,"
					+ "t_guideotherinfo,t_scenicspotinfo where t_guideinfo.phone = t_guideotherinfo.phone "
					+ "and guideLevel >= 2 AND t_guideotherinfo.scenicBelong=t_scenicspotinfo.scenicNo and t_guideotherinfo.phone in "
					+ "(select guidePhone from t_guideworkday where "+selectDay+"=1)"
					+ "ORDER BY guideLevel desc,historyTimes desc";
			list = jdbcTemplate.queryForList(sqlString);
		}else {
			String sqlSelect = "select t_guideinfo.phone,image,`name`,sex,age,`language`,selfIntro,"
					+ "t_guideotherinfo.guideLevel,t_guideotherinfo.historyTimes,t_scenicspotinfo.scenicName from t_guideinfo,t_guideotherinfo,t_scenicspotinfo "
					+ "where t_guideinfo.phone = t_guideotherinfo.phone and scenicBelong = '"+scenicID+"' "
					+ "and guideLevel >= 2 AND t_guideotherinfo.scenicBelong=t_scenicspotinfo.scenicNo and t_guideotherinfo.phone in "
					+ "(select guidePhone from t_guideworkday where "+selectDay+"=1)"
					+ "ORDER BY guideLevel desc,historyTimes desc";
			list = jdbcTemplate.queryForList(sqlSelect);
		}
		
		/*if(!visitTime.equals("null") && visitNum != 0){
			String sqlString = "select t_guideinfo.phone,image,`name`,sex,age,`language`,selfIntro,"
					+ "t_guideotherinfo.guideLevel,t_guideotherinfo.historyTimes from t_guideinfo,t_guideotherinfo "
					+ "where t_guideinfo.phone = t_guideotherinfo.phone and singleMax > '"+visitNum+"' "
					+ "and scenicBelong = '"+scenicID+"' and guideLevel >= 5 and t_guideotherinfo.phone in "
					+ "(select guidePhone from t_guideworkday where "+selectDay+"=1)"
					+ "ORDER BY guideLevel desc,historyTimes desc";
			list = jdbcTemplate.queryForList(sqlString);
		}else{
			//当用户只输入景区名称，进行的筛选
			String sqlSelect = "select t_guideinfo.phone,image,`name`,sex,age,`language`,selfIntro,"
					+ "t_guideotherinfo.guideLevel,t_guideotherinfo.historyTimes from t_guideinfo,t_guideotherinfo "
					+ "where t_guideinfo.phone = t_guideotherinfo.phone and scenicBelong = '"+scenicID+"' "
					+ "and guideLevel >= 5 ORDER BY guideLevel desc,historyTimes desc";
			listResult = jdbcTemplate.queryForList(sqlSelect);
			return listResult;
		}*/

		for(int i=0; i<list.size(); i++){
			listResult.add(list.get(i));
		}
		
		//去除时间冲突的讲解员信息
		for(int i=0; i<list.size(); i++){
			String phone = (String)list.get(i).get("phone");
			boolean bool = isTimeConflict(phone, visitTime);
			if(bool == true){
				listResult.remove(list.get(i));
			}
		}

		return listResult;
	}


	/**
	 * 判断该讲解员已经被预约了的时间(被预约了的时间要大于当前时间)与time是否冲突
	 * 若有冲突，则返回数据；否则，查询结果为空
	 * @param guidePhone  讲解员的手机号
	 * @param visitTime  游客的预约参观时间
	 * @return
	 */
	public boolean isTimeConflict(String guidePhone, String visitTime){
		
		boolean bool = false;
		
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call isTimeConflict(?,?)");
			cst.setString(1, guidePhone);
			cst.setString(2, visitTime);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				bool = true;
			}
			
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 	
		return bool;
	}
	
	
	/**
	 * 获取可带拼团的讲解员的手机号，从所有符合条件的讲解员中选择一个
	 * @param visitTime 
	 * @param visitNum
	 * @param scenicID
	 * 			三个参数都不为空
	 * @return
	 */
	public String getPhoneOfPinGuide(String visitTime, String scenicID){
		
		String phone = null;
		String selectDay = null;
    	String dayNow = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
    	
    	//计算参观日期与今日之间相隔的天数
    	String[] visitDate = visitTime.split(" ");
    	int day = DateConvert.getDaysBetweenDate(visitDate[0], dayNow);   		
		switch (day) {
		
		case 0:
			selectDay = "one";
			break;
		case 1:
			selectDay = "two";			
			break;
		case 2:
			selectDay = "three";
			break;
		case 3:
			selectDay = "four";
			break;
		default:
			break;
		}   	
		
		List<Map<String , Object>> listResult = new ArrayList<>(); 
		List<Map<String , Object>> list = null;
		
		String sqlString = "select t_guideotherinfo.phone from t_guideotherinfo,t_scenicspotinfo,systemscore "
				+ "where systemscore.scenicName=t_scenicspotinfo.scenicName and scenicBelong='"+scenicID+"'"
				+ "AND t_guideotherinfo.scenicBelong=t_scenicspotinfo.scenicNo "
				+ "and t_guideotherinfo.guideLevel<=systemscore.guideLevel and  t_guideotherinfo.phone in"
				+ " (select guidePhone from t_guideworkday where "+selectDay+"=1) "
				+ "ORDER BY historyTimes,historyNum";
		list = jdbcTemplate.queryForList(sqlString);
		
		for(int i=0; i<list.size(); i++){
			listResult.add(list.get(i));
		}
		
		//去除时间冲突的讲解员信息
		for(int i=0; i<list.size(); i++){
			String p = (String)list.get(i).get("phone");
			boolean bool = isTimeConflict(p, visitTime);
			if(bool == true){
				listResult.remove(list.get(i));
			}
		}
		
		if(listResult.size() != 0){
			phone = (String)listResult.get(0).get("phone");
		}
					
		return phone;
	}
	
	
	/**
	 * 按用户的筛选条件，查询相应的讲解员信息
	 * @param visitDate  参观日期
	 * @param visitNum  参观人数
	 * @param scenicID  景区编号
	 * @param sex  筛选讲解员的性别   （男，女）
	 * @param age   年龄 （20-30，30-40，40-50）
	 * @param languange   讲解语言 （0-中文、1-英文）
	 * @param level  级别   （1，2，3，4，5，6，7）
	 * @return  符合条件的讲解员的信息
	 * phone,image,name,sex,age,language,selfIntro,guideLevel
	 */
	public List<Map<String, Object>> getAvailableGuidesWithSelector(String visitDate, 
			int visitNum, String scenicID, 
			String sex, String age, String languange, String level){
				
		List<Map<String , Object>> listResult = new ArrayList<>(); 
		
		List<Map<String , Object>> list = getAvailableGuides(visitDate, visitNum, scenicID);
		
		for(int i=0; i<list.size(); i++){
			listResult.add(list.get(i));
		}
		
		for(int i=0; i<list.size(); i++){
			
			String sexString = (String)list.get(i).get("sex");
			int guideAge = (int)list.get(i).get("age");
			String languageString = (String)list.get(i).get("language");
			String levelString = (String)list.get(i).get("guideLevel");
			
			if(!sex.equals("null") && !sex.equals(sexString)){
				listResult.remove(list.get(i));
			}
			
			if(!age.equals("null")){
				
				String[] ages = age.split("-");
				int age1 = Integer.parseInt(ages[0]);
				int age2 = Integer.parseInt(ages[1]);
				
				if(guideAge < age1 || guideAge > age2){
					listResult.remove(list.get(i));
				}
			}			
			
			if(!languange.equals("null") && !languange.equals(languageString)){				
				listResult.remove(list.get(i));
			}
			
			if(!level.equals("null") && !level.equals(levelString)){
				listResult.remove(list.get(i));
			}
		}
		
		return listResult;
	}
	
	
	/**
	 * 用户不输入参观信息，只对讲解员进行筛选查看
	 * @param sex
	 * @param age
	 * @param languange
	 * @param level
	 * @return
	 */
	public List<Map<String, Object>> getGuidesWithSelector(String sex, 
			String age, String language, String level){
		
		List<Map<String , Object>> listResult = new ArrayList<>(); 
		//查询所有的讲解员
		String sqlSelectAll = "select t_guideinfo.phone,image,`name`,sex,age,`language`,selfIntro,"
				+ "t_guideotherinfo.guideLevel,t_guideotherinfo.historyTimes from t_guideinfo,t_guideotherinfo "
				+ "where t_guideinfo.phone = t_guideotherinfo.phone ORDER BY guideLevel desc,historyTimes desc";	
		List<Map<String , Object>> list = jdbcTemplate.queryForList(sqlSelectAll);
		
		for(int i=0; i<list.size(); i++){
			listResult.add(list.get(i));
		}
		
		for(int i=0; i<list.size(); i++){
			
			String sexString = (String)list.get(i).get("sex");
			int guideAge = (int)list.get(i).get("age");
			String languageString = (String)list.get(i).get("language");
			String levelString = (String)list.get(i).get("guideLevel");
			
			if(!sex.equals("null") && !sex.equals(sexString)){
				listResult.remove(list.get(i));
			}
			
			if(!age.equals("null")){
				
				String[] ages = age.split("-");
				int age1 = Integer.parseInt(ages[0]);
				int age2 = Integer.parseInt(ages[1]);
				
				if(guideAge < age1 || guideAge > age2){
					listResult.remove(list.get(i));
				}
			}			
			
			if(!language.equals("null") && !language.equals(languageString)){				
				listResult.remove(list.get(i));
			}
			
			if(!level.equals("null") && !level.equals(levelString)){
				listResult.remove(list.get(i));
			}
		}
		
		return listResult;
	}
	
	/**
	 * 根据手机号，查询导游的详细信息
	 * @param phone 手机号
	 * @return  导游的详细信息
	 * phone,image,name,sex,age,language,selfIntro,historyNum,historyTimes,guideFee,guideLevel
	 */
	public List<Map<String, Object>> getDetailGuideInfoByPhone(String phone){
		
		List<Map<String , Object>> list = new ArrayList<>(); 		
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getDetailGuideInfoByPhone(?)");
			cst.setString(1, phone);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("phone", rst.getString(2));
				map.put("image", rst.getString(3));
				map.put("name", rst.getString(4));
				map.put("sex", rst.getString(5));
				map.put("age", rst.getInt(6));
				map.put("language", rst.getString(7));
				map.put("selfIntro", rst.getString(8));
				map.put("guideLevel", rst.getString(9));
				map.put("historyNum", rst.getString(10));
				map.put("historyTimes", rst.getString(11));
				map.put("guideFee", rst.getInt(12));
				map.put("scenicBelong", rst.getString(13));
				map.put("singleMax", rst.getInt(14));
				map.put("scenicName", rst.getString(15));
				map.put("workAge", rst.getString(16));
				map.put("authorized", rst.getInt(17));				
				list.add(map);
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		
		return list;
	}
	
	
	/**
	 * 判断该讲解员是否通过审核
	 * @param guidePhone
	 * @return true--通过审核，false--未审核
	 */
	public boolean isAuthorized(String guidePhone){
		
		boolean bool = false;		
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call isAuthorized(?)");
			cst.setString(1, guidePhone);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				int authorized = rst.getInt(1);
				if(authorized != 0){
					bool = true;
				}				
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		
		return bool;
	}
	
	
	/**
	 * 讲解员签到
	 * @param orderId
	 * @return
	 * @throws SQLException
	 */
	public boolean guideSignIn(String orderId) throws SQLException{
		
		boolean bool = false;
		
		DataSource dataSource = jdbcTemplate.getDataSource();
		Connection  conn = null;
		try{
			conn = dataSource.getConnection();
			conn.setAutoCommit(false);
			
			String sqlBook = "update t_bookorder set signIn=1,signInTime=NOW() where bookOrderID='"+orderId+"'";
			int i = jdbcTemplate.update(sqlBook);
			
			String sqlConsist = "update t_consistorder set signIn=1,signInTime=NOW() where orderID='"+orderId+"'";
			int j = jdbcTemplate.update(sqlConsist);
			
			conn.commit();//提交JDBC事务 
			conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
			conn.close();
			
			if(i!=0 || j!=0){
				bool = true;
			}
			
		} catch (SQLException e) {
			conn.rollback();
			e.printStackTrace();
		}
		
		return bool;
	}
	
	
	/**
	 * 判断讲解员的订单是否签到
	 * @param orderId
	 * @return
	 */
	public boolean isSignIn(String orderId){
		
		boolean bool = false;
		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst = conn.prepareCall("call isSignIn(?)");
			cst.setString(1, orderId);
			ResultSet rst = cst.executeQuery();
			
			while (rst.next()) {
				int signIn = rst.getInt(1);
				if(signIn == 1){
					bool = true;
				}				
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return bool;
	}
	
	
	/**
	 * 查看导游是否已经申请成为导游了
	 * @param phone
	 * @return  true--已经申请， false--未申请
	 */
	public boolean hasApplied(String phone){
		
		boolean bool = false;		
		final GuideInfo guideInfo = new GuideInfo();		
		
		String sqlSearch = "select phone from t_guideinfo where phone='"+phone+"'";	
		jdbcTemplate.query(sqlSearch,  new RowCallbackHandler() {
			
			@Override
			public void processRow(ResultSet res) throws SQLException {
				guideInfo.setPhone(res.getString(1));
			}
		});
		String phoneExist = guideInfo.getPhone();				
		
		//账号已存在
		if(phoneExist != null){
			bool = true;
		}
		return bool;
	}
	
	/**
	 * 根据手机号，查询导游的申请信息
	 * @param phone 手机号
	 * @return  
	 * 姓名、性别、年龄、从业时间、联系电话、讲解语言、景区名称、自我介绍、个人照片、申请日期、通过日期
	 */
	public List<Map<String, Object>> getGuideApplyInfoByPhone(String phone){
		
		List<Map<String , Object>> list = new ArrayList<>(); 		
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getGuideApplyInfoByPhone(?)");
			cst.setString(1, phone);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("phone", rst.getString(2));
				map.put("image", rst.getString(3));
				map.put("name", rst.getString(4));
				map.put("sex", rst.getString(5));
				map.put("age", rst.getInt(6));
				map.put("language", rst.getString(7));
				map.put("selfIntro", rst.getString(8));
				map.put("workAge", rst.getString(9));
				map.put("authorized", rst.getInt(10));
				map.put("scenicName", rst.getString(11));								
				map.put("applyDate", rst.getString(12));
				map.put("passDate", rst.getString(13));
				list.add(map);
			}							
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		
		return list;
	}
	
	
	//在t_guidebeordered表中插入导游的被预约信息
	public void guideBeOrdered(String scenicID, String orderID, String guidePhone, String visitTime){
		
		DataSource dataSource = jdbcTemplate.getDataSource();
		Connection conn = null;
		try {
			conn = dataSource.getConnection();
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		int hour = 0;
		try {			
			CallableStatement cst = conn.prepareCall("call getMaxHourbyScenicID(?)");
			cst.setString(1, scenicID);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				hour = Integer.parseInt(rst.getString(1));
			}							
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		String sqlInsert = "insert into t_guideBeOrdered "
				+ "(orderId,guidePhone,visitTime,timeFrom,timeTo) "
				+ "values (?,?,?,?,?)";
		String timeFrom = DateConvert.addHourToTime(visitTime+":00", -hour);
		String timeTo = DateConvert.addHourToTime(visitTime+":00", hour);
		int k = jdbcTemplate.update(sqlInsert, new Object[]{orderID, guidePhone, visitTime,
				timeFrom, timeTo});
	}
	
	/**
	 * 该导游在visitDate这天，是否被预约了
	 * @param guidePhone  导游的手机号
	 * @param visitDate  日期
	 * @return 1-被预约了    0-未被预约
	 */
//	public int WhetherBooked(String guidePhone, String visitDate){
//		
//		int booked = 0;
//		Date date1=new Date();
//    	String dayNow=new SimpleDateFormat("yyyy-MM-dd").format(date1);
//    	//计算参观日期与今日之间相隔的天数
//    	int day = DateConvert.getDaysBetweenDate(visitDate, dayNow);
//    	
//		String selectDay = null;
//		
//		switch (day) {
//		
//		case 0:
//			selectDay = "one";
//			break;
//		case 1:
//			selectDay = "two";			
//			break;
//		case 2:
//			selectDay = "three";
//			break;
//		case 3:
//			selectDay = "four";
//			break;
//		default:
//			break;
//		}
//		
//		//查看该讲解员改天是否被预约了，2-被预约
//		String sqlString = "select * from t_guideworkday where phone='"+guidePhone+"' and "+selectDay+"=2";
//		List<Map<String , Object>> list = jdbcTemplate.queryForList(sqlString);
//		
//		//被预约了
//		if(list.size() != 0){
//			booked = 1;
//		}
//		
//		return booked;
//	}
	
	
	/**
	 * 如果 "参观时间-参观时长 < time < 参观时间+参观时长",则time讲解员忙碌，不可再接单
	 * @param timeNow 当前时间
	 * @param visitTime  游客的参观时间
	 * @param visitHour  该景区的参观时长
	 * @return true-可接单，false-不可接单
	 */
//	public boolean canTakeOrders(String timeNow, String visitTime, int visitHour){
//		
//		boolean bool = true;
//		
//		//参观时间-参观时长
//		String timeFrom = DateConvert.addHourToTime(visitTime, -visitHour);
//		//参观时间+参观时长
//		String timeTo = DateConvert.addHourToTime(visitTime, visitHour);
//		
//		if(DateConvert.DateCompare(timeFrom, timeNow) || 
//				DateConvert.DateCompare(timeNow, timeTo)){
//			//讲解员忙碌，不可再接单
//			bool = false;
//		}
//		return bool;
//	}
//	
//	/**
//	 * 讲解员当前时间是否忙碌
//	 * 如果 "参观时间-参观时长 < time < 参观时间+参观时长",则time讲解员忙碌，不可再接单
//	 * @param guidePhone  导游手机号
//	 * @param visitHour 景区的参观时长
//	 * @return
//	 */
//	public int isBusyTime(String guidePhone, int visitHour){
//		
//		int ret = 0;
//		String timeNow = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
//		
//		List<String> list = new ArrayList<>(); 		
// 		DataSource dataSource =jdbcTemplate.getDataSource();
//		 
//		try {
//			Connection conn = dataSource.getConnection();
//			CallableStatement cst=conn.prepareCall("call getReleasedOrders(?,?)");
//			cst.setString(1, guidePhone);
//			cst.setString(2, timeNow);
//			ResultSet rst=cst.executeQuery();
//			
//			while (rst.next()) {
//				list.add(rst.getString(1));
//			}			
//			conn.close();
//		} catch (SQLException e) {
//			e.printStackTrace();
//		}
//		
//		//如果 "参观时间-参观时长 < time < 参观时间+参观时长",则time讲解员忙碌，不可再接单
//		for(int i=0; i<list.size(); i++){
//			//参观时间-参观时长
//			String timeFrom = DateConvert.addHourToTime(list.get(i), -visitHour);
//			//参观时间+参观时长
//			String timeTo = DateConvert.addHourToTime(list.get(i), visitHour);
//			
//			if(DateConvert.DateCompare(timeFrom, timeNow) || 
//					DateConvert.DateCompare(timeNow, timeTo)){
//				//讲解员忙碌，不可再接单
//				ret = 1;
//			}
//		}
//		
//		return ret;
//	} 
	

	
	/*
	 * 获得已审核讲解员人数
	 * */
	public int GetGuideCount() {
		String sql="SELECT * FROM t_guideotherinfo where authorized=1";
		return jdbcTemplate.queryForList(sql).size();
	}
	/*
	 * 按证号查找讲解员的基本信息
	 * */
	public List<Map<String , Object>> GetGuiderinfoBystring(String phone)
	{
		
		String sql="SELECT t_guideotherinfo.*,t_guideinfo.*,t_scenicspotinfo.scenicName "
				+ "FROM t_guideotherinfo, t_guideinfo,t_scenicspotinfo "
				+ "where t_guideinfo.phone=t_guideotherinfo.phone"
				+ " AND t_guideinfo.phone in"
				+ "(select phone from t_guideotherinfo "
				+ "where authorized=1) AND 	t_scenicspotinfo.scenicNo=t_guideotherinfo.scenicBelong "
				+ "and t_guideotherinfo.phone='"+phone+"'";
		return jdbcTemplate.queryForList(sql);
	}
	/*
	 * 添加讲解员基本信息
	 * */
	public boolean isAdd(GuideInfo guideInfo)
	{
		String sql1 = "select count(*) from t_guideinfo where certificateID = '"  + "'";
		String sql2 = "insert into t_guideinfo values(?,?,?,?,?,?,?,?)";
		if(jdbcTemplate.queryForObject(sql1, Integer.class) != 0)
			return false;
		else {
			jdbcTemplate.update(sql2,new Object[]{guideInfo.getPhone(), guideInfo.getName(), guideInfo.getSex(),
					guideInfo.getAge(),  guideInfo.getLanguage(), 
					guideInfo.getSelfIntro()});
			return true;
		}
	}
	/*
	 * 通过手机号删除讲解员
	 * */
	public int DeleteGuideInfoById_Dao(String phone) {
		String sql = " delete from t_guideinfo where phone = '"+phone+"'";
		int i;
		try {
			i= jdbcTemplate.update(sql);
		} catch (DataAccessException e) {
			// TODO Auto-generated catch block
			i=0;
		}
		return i;
	}
	/*
	 * 编辑讲解员
	 * */
	public boolean EditGuideInfo_Dao(String level,String historyNum,
			String guideNum,String fee,String phone) {
		String sql = " update t_guideotherinfo set guideLevel=?,historyNum=?,"
				+ "singleMax=?,guideFee=? "
				+"  where phone=?";
		int i=jdbcTemplate.update(sql, new Object[]{
				level,historyNum,guideNum,fee,phone
		});
		if (i>0) return true;
		else return false;
	}
	/*
	 * 获得讲解员的其他详细信息
	 * */
	public List<GuideOtherInfo> LookGuideInfo_Dao(String phone) {
		String sql = "select * from t_guideotherinfo where phone='"+phone+"'";
		final List<GuideOtherInfo> list = new ArrayList<>();
		jdbcTemplate.query(sql, new RowCallbackHandler() {
			@Override
			public void processRow(ResultSet rSet) throws SQLException {
				GuideOtherInfo guideOtherInfo = new GuideOtherInfo();
				guideOtherInfo.setPhone(rSet.getString(1));
				guideOtherInfo.setHistoryNum(rSet.getInt(2));
				guideOtherInfo.setSingleMax(rSet.getInt(3));
				guideOtherInfo.setGuideFee(rSet.getInt(4));
				guideOtherInfo.setGuideLevel(rSet.getString(5));
				guideOtherInfo.setAuthorized(rSet.getInt(6));
				guideOtherInfo.setScenicBelong(rSet.getString(7));
				guideOtherInfo.setDisabled(rSet.getInt(8));
				list.add(guideOtherInfo);
			}
		});
		return list;
	}
	/*
	 * 修改讲解员的审核状态
	 * */
	public boolean CheckGuideInfo_Dao(String phone,int historyNum,
				int singleMax,int guideFee,String guideLevel,String scenicBelong,
				int workAge,String certificateID)
	{
		String sql1="select scenicNo from t_scenicspotinfo where scenicName='"+scenicBelong+"'";
		String scenicNo=jdbcTemplate.queryForObject(sql1, String.class);
		String sql = " update t_guideotherinfo set authorized=1, "
				+ " historyNum=?,singleMax=?,guideFee=?,"
				+ "guideLevel=?,scenicBelong=?,workAge=?,"
				+ "certificateID=? where phone='"+phone+"'";
		int i = jdbcTemplate.update(sql,new Object[]{historyNum,singleMax,
				guideFee,guideLevel,scenicNo,workAge,certificateID});
		
		if (i > 0) return true;
		return false;
	}
	/*
	 * 禁用讲解员
	 * */
	public boolean ForbidGuideInfo_Dao(String phone) {
		String sql = " update t_guideotherinfo set disabled=1 where phone='"+phone+"'";
		int i = jdbcTemplate.update(sql);
		
		if (i > 0) return true;
		return false;
	}
	/*
	 * 解禁讲解员
	 * */
	public boolean RelieveGuideInfo_Dao(String phone) {
		String sql = " update t_guideotherinfo set disabled=0 where phone='"+phone+"'";
		int i = jdbcTemplate.update(sql);
		
		if (i > 0) return true;
		return false;
	}
	
	
	/**
	 * 根据导游的手机号，查询导游的信息：姓名、性别、讲解语言
	 * @param phone 手机号
	 * @return 姓名、性别、讲解语言
	 */
	public Map<String, String> getSomeGuideInfoByPhone(String phone){
		
		final Map<String, String> map = new HashMap<String, String>();
		String sqlString = "select name,sex,language from t_guideinfo "
				+ "where phone='"+phone+"'";
		
		jdbcTemplate.query(sqlString,  new RowCallbackHandler() {
					
					@Override
					public void processRow(ResultSet res) throws SQLException {
						map.put("name", res.getString(1));
						map.put("sex", res.getString(2));
						map.put("language", res.getString(3));
					}
		});
		return map;
	}
	
	/**
	 * 分页得到已审核的讲解员
	 * @param currentPage
	 * @param rows
	 * @return
	 */
	public List<Map<String, Object>> GetGuideofYes(int currentPage,int rows)
	{
		int k=(currentPage-1)*rows;
		String sql="SELECT t_guideotherinfo.*,t_guideinfo.*,t_scenicspotinfo.scenicName "
				+ "FROM t_guideotherinfo, t_guideinfo,t_scenicspotinfo "
				+ "where t_guideinfo.id=t_guideotherinfo.id"
				+ " AND t_guideinfo.id in"
				+ "(select id from t_guideotherinfo "
				+ "where authorized=1)  and t_scenicspotinfo.scenicNo=t_guideotherinfo.scenicBelong "
				+ " LIMIT "+k+" ,"+rows+"";
		List<Map<String, Object>> list=jdbcTemplate.queryForList(sql);
		k=list.size();		
		return list;
	}
	
	/**
	 * 分页得到未审核讲解员的信息
	 * @param currentPage
	 * @param rows
	 * @return
	 */
	public List<Map<String, Object>> GetGuideofNo(int currentPage,int rows)
	{
		int k=(currentPage-1)*rows;
		String sql="select * from t_guideinfo where t_guideinfo.id in"
				+ "(select id from t_guideotherinfo "
				+ "where authorized=0) LIMIT "+k+" ,"+rows+"";
		List<Map<String, Object>> list=jdbcTemplate.queryForList(sql);	
		return list;
	}
	
	/**
	 * 得到已审核讲解员的信息数目
	 * @return int
	 * 2017-1-12 08:25:58
	 */
	public int  GetGuideofYesCount()
	{
		String sql="SELECT * FROM t_guideotherinfo where authorized=1";
		return jdbcTemplate.queryForList(sql).size();
	}
	
	/**
	 * 得到未审核讲解员的信息数目
	 * @return int
	 * 2017-1-12 08:25:58
	 */
	public int  GetGuideofNoCount()
	{
		String sql="SELECT * FROM t_guideotherinfo where authorized=0";
		return jdbcTemplate.queryForList(sql).size();
	}
	
	/**
	 * 通过手机号得到未审核讲解员的基本信息
	 * @param phone
	 * @return
	 * 2017-1-12 08:27:11
	 */
	public List<Map<String, Object>> GetGuiderinfoByPhone(String phone) {
		
		String sql="SELECT * FROM t_guideinfo where   phone='"+phone+"'";
		return jdbcTemplate.queryForList(sql);
	}
	
	
}
