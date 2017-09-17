package com.TourGuide.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import com.TourGuide.common.DateConvert;
import com.TourGuide.model.Guideworkday;

@Repository
public class GuideWorkdayDao {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	/**
	 * 设置导游的工作时间，
	 * @param days 不工作的日期，如2017-1-12
	 * @param phone  手机号
	 * 1：工作          0：请假
	 * @return 
	 */
	public boolean setGuideWorkday(List<String> days, String phone){
		
		boolean bool = false;
		
		int one = 1, two = 1, three = 1, four = 1;
		
		Date date1=new Date();
    	String dayNow=new SimpleDateFormat("yyyy-MM-dd").format(date1);
		
		for(int i=0; i<days.size(); i++){
			int day = DateConvert.getDaysBetweenDate(days.get(i), dayNow);
			switch (day) {
			case 0:
				one = 0;
				break;
			case 1:
				two = 0;			
				break;
			case 2:
				three = 0;
				break;
			case 3:
				four = 0;
				break;

			default:
				break;
			}
		}
		
		String sqlString = "update t_guideworkday set one=?,two=?,three=?,four=? where phone=? ";
		int i = jdbcTemplate.update(sqlString, new Object[]{one, two, three, four, phone});
		
		if(i != 0){
			bool = true;
		}
		
		return bool;
	}
	
	
	/**
	 * 导游签到，若已经签到，则显示当日的日期
	 * @param phone  手机号
	 * @return
	 */
	public boolean guideCheckIn(String phone){
		
		boolean bool = false;
		
		Date date1=new Date();
    	String dayNow=new SimpleDateFormat("yyyy-MM-dd").format(date1);
    	
    	String sql = "update t_guideworkday set checkin=? where phone=?";
    	int i = jdbcTemplate.update(sql, new Object[]{dayNow, phone});
    	
    	if(i != 0){
			bool = true;
		}
    	return bool;
	}
	
	
	
	/**
	 * 判断讲解员当天是否签到了
	 * @param phone  手机号
	 * @return
	 */
	public boolean whetherCheckIn(String phone){
	
		boolean bool = false;
		
		final Guideworkday guideworkday = new Guideworkday();
		
		Date date1=new Date();
    	String dayNow=new SimpleDateFormat("yyyy-MM-dd").format(date1);
    	
    	String sqlString = "select checkin from t_guideworkday where phone='"+phone+"'";
    	jdbcTemplate.query(sqlString,  new RowCallbackHandler() {
			
			@Override
			public void processRow(ResultSet res) throws SQLException {
				guideworkday.setDate(res.getString(1));
			}
		});
    	
    	String chekDay = guideworkday.getDate();
    	if(dayNow.equals(chekDay)){
    		bool = true;
    	}
    	
    	return bool;
	}

	
	
	/**
	 * 
	 * @param currentPage(当前页)
	 * @param rows(每页的显示数目)
	 * @return 讲解员工作安排信息
	 * 2017-1-8 18:57:58
	 */
	public List<Map<String , Object>> GetGuideworkday(int currentPage,int rows)
	{
		int k=(currentPage-1)*rows;
		int j=currentPage*rows;
		String sql="SELECT t_guideworkday.*,t_guideinfo.name,t_guideinfo.phone FROM t_guideworkday, t_guideinfo where"
				+ " t_guideinfo.id=t_guideworkday.id "
				+ "AND t_guideworkday.id in "
				+ "(select id from t_guideotherinfo where disabled=0 and authorized=1)  "
				+ "LIMIT "+k+" ,"+j+"";
		List<Map<String , Object>> list= jdbcTemplate.queryForList(sql);
		
		return list;
	}
	
	/**
	 * 得到未禁用已审核的讲解员信息数目
	 * @return int
	 * 2017-1-8 18:58:43
	 */
	public int getguideWorkdayCount()
	{
		String sql="SELECT count(*)  FROM t_guideotherinfo where t_guideotherinfo.disabled=0 and "
				+ "t_guideotherinfo.authorized=1";
		int i =jdbcTemplate.queryForObject(sql, Integer.class);
		return i;
	}
	
	/**
	 * 编辑讲解员日程安排信息
	 * @param guideworkday
	 * @return	
	 * 2017-1-8 19:04:19
	 */
	public int UpdateGuideWorkday(Guideworkday guideworkday)
	{
		String sql="update t_guideworkday set one=?,two=?,three=?,four=? where "
				+ "phone=?";
		int i=jdbcTemplate.update(sql, new Object[]{guideworkday.getDay1(),guideworkday.getDay2(),
				guideworkday.getDay3(),guideworkday.getDay4(),guideworkday.getPhone()});
		return i;
	}
	
	/**
	 * 通过手机号查询讲解员日程安排信息
	 * @param phone
	 * @return
	 * 2017-1-8 20:10:47
	 */
	public List<Map<String, Object>> QueryGuideworkdayByPhone(String phone)
	{
		
		String sql="select t_guideworkday.*,t_guideinfo.name from t_guideworkday,t_guideinfo "
				+ "where t_guideworkday.phone='"+phone+"'";
		return jdbcTemplate.queryForList(sql);
		
	}
}
