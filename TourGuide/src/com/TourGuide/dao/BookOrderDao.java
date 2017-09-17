package com.TourGuide.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import com.TourGuide.common.DateConvert;
import com.TourGuide.common.MyDateFormat;

@Repository
public class BookOrderDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private GuideDao guideDao;
	
	@Autowired
	private OrderDao orderDao;
	
	/**
	 * 将游客自己发布的预约订单存入数据库
	 * @param bookOrderID  订单编号，使用JDK的UUID产生
	 * @param scenicID  游客所预约的景区对应的景区编号
	 * @param produceTime  该订单的生成时间
	 * @param visitTime  游客参观的时间
	 * @param visitNum   参观的人数
	 * @param language  讲解员的讲解语言
	 * @param guideSex   讲解员的性别
	 * @param visitorPhone   游客的手机号
	 * @param visitorName   游客的姓名
	 * @param priceRange   游客可接受的价位区间
	 * @param purchaseTicket  是否代购门票
	 * @param otherCommand    其他需求
	 * @param releaseByVisitor  标志该订单是由游客自己发布的
	 * @param orderState 订单的状态
	 * @param totalTicket 门票费总额
	 * @param halfPrice  若代购门票，购买半价票的人数
	 * @param discoutPrice 若代购门票，购买折扣票的人数
	 * @param fullPrice  若代购门票，购买全价票的人数
	 * @param contact  该订单发布时游客填写的联系人
	 * @return 发布订单是否成功，成功：1  失败：0
	 */
	public boolean ReleaseBookOrder(String bookOrderID, String scenicID, String produceTime,String visitTime, 
			int visitNum, String language, String guideSex, String visitorPhone,String visitorName, 
			int priceRange, int purchaseTicket, String otherCommand, int releaseByVisitor, String orderState,
			int totalTicket, int fullPriceNum, int discoutPriceNum, int halfPriceNum,
			int fullPrice, int discoutPrice, int halfPrice, String contact){
		
		boolean bool = false;
		//购买门票的总数
		int totalTicketNum = fullPriceNum + discoutPriceNum + halfPriceNum;
		//订单对游客是否可见（删除订单只是设置订单的可见性）
		int visitorVisible = 1;
		int guideVisible = 1;
		
		String sqlString = "insert into t_bookorder (bookOrderID,scenicID,produceTime,"
				+ "visitTime,visitNum,language,guideSex,visitorPhone,visitorName,"
				+ "priceRange,purchaseTicket,otherCommand,releaseByVisitor,orderState,"
				+ "totalTicket,totalTicketNum,fullPriceNum,discoutPriceNum,halfPriceNum,fullPrice,"
				+ "discoutPrice,halfPrice,visitorVisible,guideVisible,contact,guideFee,hadPay) values "
				+ "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		int i = jdbcTemplate.update(sqlString, new Object[]{bookOrderID, scenicID, 
				produceTime, visitTime,visitNum, language, guideSex, visitorPhone, 
				visitorName, priceRange, purchaseTicket, otherCommand, releaseByVisitor, orderState,
				totalTicket,totalTicketNum, fullPriceNum,discoutPriceNum,halfPriceNum,
				fullPrice, discoutPrice, halfPrice,visitorVisible,guideVisible,contact,priceRange,1});
		
		if(i == 1){
			bool = true;
		}
		return bool;
	}
	

	
	/**
	 * 选定导游后，进行预约
	 * @param orderID  订单编号
	 * @param produceTime  订单生成时间
	 * @param guidePhone   导游手机号
	 * @param visitorPhone  游客手机号
	 * @param visitTime  参观时间
	 * @param scenicID   景区编号
	 * @param visitNum  参观人数
	 * @param purchaseTicket  是否代购门票
	 * @param halfPrice  若代购门票，购买半价票的人数
	 * @param discoutPrice 若代购门票，购买折扣票的人数
	 * @param fullPrice  若代购门票，购买全价票的人数
	 * @param totalTicket  门票总额
	 * @param guideFee   讲解费
	 * @param totalGuideFee  讲解费总额
	 * @param totalMoney  门票总额 + 讲解费总额
	 * @return
	 * @throws SQLException 
	 */
	public int BookOrderWithGuide(String orderID, String produceTime, String guidePhone, 
			String visitorPhone, String visitTime, String scenicID, 
			int visitNum, int guideFee, String contactPhone, String language, String visitorName) throws SQLException{
		
		int ret = 0;	
		String orderState = "待付款";
		
		DataSource dataSource = jdbcTemplate.getDataSource();
		Connection conn = null;
		try{
				conn = dataSource.getConnection();
				conn.setAutoCommit(false);
				
				List<Map<String, Object>> guideInfoList = guideDao.GetGuiderinfoByPhone(guidePhone);
				String sex = (String) guideInfoList.get(0).get("sex");
				
				String sqlString = "insert into t_bookorder (bookOrderID,produceTime,visitTime,"
						+ "visitorPhone,visitNum,scenicID,guideFee,totalGuideFee,guidePhone,"
						+ "orderState,contact,language,guideSex,visitorName) "
						+ "values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				int i = jdbcTemplate.update(sqlString, new Object[]{orderID,produceTime,visitTime,
						visitorPhone,visitNum, scenicID, guideFee, guideFee, guidePhone, 
						orderState, contactPhone, language,sex,visitorName});
				
				String payTime = MyDateFormat.form(new Date());
				String sqlUpdate = "update t_bookorder set orderState='待游览',hadPay=1,payTime='"+payTime+"' "
						+ "where bookOrderID='"+orderID+"'";
				int j = jdbcTemplate.update(sqlUpdate);
				
				/*int hour = 0;
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
						timeFrom, timeTo});*/
				guideDao.guideBeOrdered(scenicID, orderID, guidePhone, visitTime);
	
				conn.commit();//提交JDBC事务 
				conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
				conn.close();
				
				if(i != 0 && j!=0){
					ret = 1;
				}
			} catch (SQLException e) {
				conn.rollback();
				e.printStackTrace();
			}	
				
		return ret;
	}
	
	
	
	/**
	 * 讲解员查看游客发布的预约订单的简要信息，过滤掉导游不可接单的订单
	 * 筛选条件：游客的参观时间、是否是游客发布的
	 * @param timeNow  当前的时间
	 * @return 订单号、景区名称、参观时间、人数、讲解员性别、讲解语言、可接受价位
	 * 
	 */
	public List<Map<String , Object>> getReleasedOrders(String guidePhone){
		
		String now = MyDateFormat.form(new Date());
		String scenicNo = null;
		List<Map<String , Object>> list = new ArrayList<>();
		List<Map<String , Object>> listTime = new ArrayList<>();
		List<Map<String , Object>> listOrder = new ArrayList<>();
		
		//查询该讲解员所属的景区(该讲解员必须审核且等级大于等于5)
		String sqlscenicNo = "select t_guideotherinfo.scenicBelong "
				+ "from t_guideotherinfo,t_guideinfo WHERE t_guideinfo.phone = '"+guidePhone+"' "
				+ "and t_guideotherinfo.phone = t_guideinfo.phone and t_guideotherinfo.guideLevel >=3 "
				+ "and t_guideotherinfo.authorized=1";
		list = jdbcTemplate.queryForList(sqlscenicNo);
		
		if(list.size() != 0){
			scenicNo = (String) list.get(0).get("scenicBelong");
		}
		
		//查询该讲解员已经被预约了的时间,查询结果可能为空
		String sqlTime = "SELECT timeFrom,timeTo FROM t_guidebeordered WHERE guidePhone = '"+guidePhone+"'"
				+ "and visitTime>'"+now+"'";
		
		//查询t_bookorder中，景区编号为scenicNo，游客发布的，且参观时间大于当前时间的订单
		String sqlOrder = "SELECT t_bookorder.visitTime,t_bookorder.visitNum,t_bookorder.guideSex,"
				+ "t_bookorder.`language`,t_bookorder.bookOrderID,t_bookorder.priceRange,"
				+ "t_bookorder.scenicID,t_scenicspotinfo.scenicName from t_bookorder,t_scenicspotinfo"
				+ " WHERE visitTime>'"+now+"' and t_bookorder.releaseByVisitor=1 and "
				+ "t_bookorder.scenicID='"+scenicNo+"' and t_bookorder.scenicID=t_scenicspotinfo.scenicNo";

		//若没有查到景区编号，则讲解员等级不够
		if(scenicNo != null){
			listTime = jdbcTemplate.queryForList(sqlTime);			
			listOrder = jdbcTemplate.queryForList(sqlOrder);
			
			//若listTime为空，即该讲解员没有被预约，则直接返回listOrder，不用进行筛选
			if(listTime.size() != 0){
				for(int i=0; i<listTime.size(); i++){
					Timestamp timestamp = (Timestamp) listTime.get(i).get("timeFrom");
					String timeFrom = MyDateFormat.form(timestamp);
					Timestamp timestamp1 = (Timestamp)listTime.get(i).get("timeTo");
					String timeTo = MyDateFormat.form(timestamp1); 
					
					for(int j=0; j<listOrder.size(); j++){
						Timestamp timestamp2 = (Timestamp) listOrder.get(j).get("visitTime");
						String visitTime = MyDateFormat.form(timestamp2); 
						
						if(DateConvert.DateCompare(timeFrom, visitTime) && 
								DateConvert.DateCompare(visitTime, timeTo)){
							//讲解员忙碌，不可再接单
							listOrder.remove(j);
						}
					}
				}
			}
		}
		
		return listOrder;
	}
//	public List<Map<String , Object>> getReleasedOrders(String guidePhone){		
//		
//		List<Map<String , Object>> list = new ArrayList<>(); 		
// 		DataSource dataSource =jdbcTemplate.getDataSource();
//		 
//		try {
//			Connection conn = dataSource.getConnection();
//			CallableStatement cst=conn.prepareCall("call getReleasedOrders(?)");
//			cst.setString(1, guidePhone);
//			ResultSet rst=cst.executeQuery();
//			
//			while (rst.next()) {
//				Map<String , Object> map = new HashMap<String, Object>();
//				String visitTime = rst.getString(1);
//				int visitHour = rst.getInt(8);
//				map.put("visitTime", visitTime);
//				map.put("visitNum", rst.getInt(2));
//				map.put("guideSex", rst.getString(3));
//				map.put("language", rst.getString(4));
//				map.put("bookOrderID", rst.getString(5));
//				map.put("priceRange", rst.getInt(6));
//				map.put("scenicName", rst.getString(7));
//				map.put("maxVisitHour", visitHour);
//				
//				list.add(map);
//				}							
//			conn.close();
//		} catch (SQLException e) {
//			e.printStackTrace();
//		} 		
// 		return list;
//	}
	
	
	
	/**
	 * 讲解员根据订单编号查看游客发布的预约订单（详细信息）
	 * @param orderID   订单编号
	 * @return  订单编号、参观时间、人数、讲解语言、讲解员性别、游客手机号、
	 * 游客姓名、是否代购门票、全价票、半价票、折扣票、门票总额、其他需求、景区名称、讲解费
	 */
	public List<Map<String , Object>> getDetailedReleasedOrders(String orderID){
		
		List<Map<String , Object>> list = new ArrayList<>(); 		
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getDetailedReleasedOrders(?)");
			cst.setString(1, orderID);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("visitorPhone", rst.getString(1));
				map.put("otherCommand", rst.getString(2));
				map.put("purchaseTicket", rst.getInt(3));
				map.put("fullPrice", rst.getInt(4));
				map.put("discoutPrice", rst.getInt(5));
				map.put("halfPrice", rst.getInt(6));
				map.put("fullPriceNum", rst.getInt(7));
				map.put("discoutPriceNum", rst.getInt(8));
				map.put("halfPriceNum", rst.getInt(9));
				map.put("visitTime", rst.getString(10));
				map.put("visitNum", rst.getInt(11));
				map.put("guideSex", rst.getString(12));
				map.put("totalTicket", rst.getInt(13));
				map.put("visitorName", rst.getString(14));
				map.put("language", rst.getString(15));
				map.put("bookOrderID", rst.getString(16));
				map.put("priceRange", rst.getInt(17));
				map.put("scenicName", rst.getString(18));
				
				list.add(map);
			}			
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
 		return list;
	}
	
	
	/**
	 * 讲解员接单
	 * 在列表中显示的均是导游可接单的。接单后，将订单的信息存入guideBeOrdered表中。
	 * @param orderID  订单编号
	 * @param guidePhone   讲解员手机号
	 * @return
	 */
	public boolean takeReleasedOrderByGuide(String orderID, String guidePhone){
		
		boolean bool = false;
		String orderState = "待游览";				
 		String visitTime = null;
 		int price = 0;
 		int totalTicket = 0;
 		int totalMony = 0;
 		int maxVisitHour = 0;
 		String time = MyDateFormat.form(new Date());
 		
 		DataSource dataSource =jdbcTemplate.getDataSource();	
 		Connection conn = null;
		try {
			conn = dataSource.getConnection();
			conn.setAutoCommit(false);
			CallableStatement cst=conn.prepareCall("call takeReleasedOrderByGuide(?)");
			cst.setString(1, orderID);
			ResultSet rst=cst.executeQuery();
			while (rst.next()){
				visitTime = rst.getString(1);
				price = rst.getInt(2);
				totalTicket = rst.getInt(3);
				totalMony = totalTicket + price;
				maxVisitHour = rst.getInt(4);
			}
			
			//更新该订单的相关信息：订单状态、讲解费、订单总额、讲解员手机号、releaseByVisitor
			String sqlUpdate = "update t_bookorder set orderState='"+orderState+"',guideFee="+price+","
					+ "totalGuideFee="+price+",totalMoney="+totalMony+",releaseByVisitor=0,"
					+ "guidePhone='"+guidePhone+"',takeOrderTime='"+time+"' where bookOrderID='"+orderID+"'";
			int i = jdbcTemplate.update(sqlUpdate);
			
			String sqlInsert = "insert into t_guideBeOrdered "
					+ "(orderId,guidePhone,visitTime,timeFrom,timeTo) "
					+ "values (?,?,?,?,?)";
			String timeFrom = DateConvert.addHourToTime(visitTime, -maxVisitHour);
			String timeTo = DateConvert.addHourToTime(visitTime, maxVisitHour);
			int j = jdbcTemplate.update(sqlInsert, new Object[]{orderID, guidePhone, visitTime,
					timeFrom, timeTo});			
			
			conn.commit();//提交JDBC事务 
			conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
			conn.close();
			if(i !=0 && j!= 0){
				bool = true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
		
		return bool ;
	}
	
	
	
	/**
	 * 讲解员查看被预约的还未讲解的订单
	 * @param guidePhone
	 * 查询条件：guidePhone、visitTime
	 * @return 订单编号、景区名称、参观时间、人数、讲解费、订单状态
	 */
	public List<Map<String , Object>> getMyBookedOrder(String guidePhone){
		
//		String timeNow = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
//		String sqlSelect = "select t_bookorder.bookOrderID,t_bookorder.visitTime,t_bookorder.orderState,"
//		 		+ "t_bookorder.visitNum,t_bookorder.guideFee,t_scenicspotinfo.scenicName "
//		 		+ "from t_bookorder,t_scenicspotinfo where t_bookorder.guidePhone='"+guidePhone+"' "
//		 		+ "and t_bookorder.visitTime > '"+timeNow+"' and t_bookorder.scenicID=t_scenicspotinfo.scenicNo";
//		
//		 List<Map<String , Object>> list = jdbcTemplate.queryForList(sqlSelect);
//				
//		return list;
		List<Map<String , Object>> list = new ArrayList<>(); 		
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getMyBookedOrder(?)");
			cst.setString(1, guidePhone);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("orderID", rst.getString(1));
				map.put("visitTime", rst.getString(2));
				map.put("orderState", rst.getString(3));
				map.put("visitNum", rst.getInt(4));
				map.put("guideFee", rst.getInt(5));
				map.put("scenicName", rst.getString(6));
				map.put("cancleFee", rst.getInt(7));
				
				list.add(map);
			}			
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
 		return list;
	}

	
	
	/**
	 * 讲解员查看被预约的已经完成的订单
	 * @param guidePhone  讲解员手机号
	 * @return
	 */
	public List<Map<String , Object>> getFinishedBookedOrder(String guidePhone){
		
		List<Map<String , Object>> list = new ArrayList<>(); 		
 		DataSource dataSource =jdbcTemplate.getDataSource();
		 
		try {
			Connection conn = dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getFinishedBookedOrder(?)");
			cst.setString(1, guidePhone);
			ResultSet rst=cst.executeQuery();
			
			while (rst.next()) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("orderID", rst.getString(1));
				map.put("visitTime", rst.getString(2));
				map.put("orderState", rst.getString(3));
				map.put("visitNum", rst.getInt(4));
				map.put("guideFee", rst.getInt(5));
				map.put("scenicName", rst.getString(6));
				
				list.add(map);
			}			
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 		
 		return list;
		
//		String state = "待评价";
//		String timeNow = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
//		String sqlSelect = "select t_bookorder.bookOrderID,t_bookorder.visitTime,t_bookorder.orderState,"
//		 		+ "t_bookorder.visitNum,t_bookorder.guideFee,t_scenicspotinfo.scenicName "
//		 		+ "from t_bookorder,t_scenicspotinfo where t_bookorder.guidePhone='"+guidePhone+"' "
//		 		+ "and t_bookorder.visitTime < '"+timeNow+"' and t_bookorder.scenicID=t_scenicspotinfo.scenicNo "
//		 		+ "and t_bookorder.orderState='"+state+"'";
//		
//		 List<Map<String , Object>> list = jdbcTemplate.queryForList(sqlSelect);
//				
//		return list;
	}


	/**
	 * 导游指定集合地点
	 * @param orderId 预约订单的订单号
	 * @param longitude  经度
	 * @param latitude  纬度
	 * @return
	 */
	public int uploadBookLocation(String orderId, String longitude, String latitude){
		
		int ret = 0;
		
		String update = "UPDATE t_bookorder SET longitude='"+longitude+"',"
				+ "latitude='"+latitude+"' WHERE bookOrderID='"+orderId+"'";
		int i = jdbcTemplate.update(update);
		
		if(i != 0){
			ret = 1;
		}
		
		return ret;
	}
	
	
	/**
	 * 讲解员完成预约订单的讲解
	 * @param orderId
	 * @return
	 * @throws SQLException 
	 */
	public int finishOrderByGuide(String orderId) throws SQLException{
		
		int ret = 0;
		int num = 0;
		String phone = null;
		
		List<Map<String, Object>> orderInfoList = orderDao.getDetailOrderInfo(orderId);
		if(orderInfoList.size() != 0){
			num = (int) orderInfoList.get(0).get("visitNum");
			phone = (String) orderInfoList.get(0).get("guidePhone");
		}
		
		DataSource dataSource = jdbcTemplate.getDataSource();
		Connection conn = null;
		try{
			conn = dataSource.getConnection();
			conn.setAutoCommit(false);
	
			String update = "UPDATE t_bookorder SET endTime=NOW(),orderState='待评价' WHERE bookOrderID='"+orderId+"'";
			int i = jdbcTemplate.update(update);
			
			String addNum = "update t_guideotherinfo set historyTimes=historyTimes+1,"
					+ "historyNum=historyNum+"+num+" where phone='"+phone+"'";
			int j = jdbcTemplate.update(addNum);
			
			String delete = "delete from t_guidebeordered where orderId='"+orderId+"'";
			int k  = jdbcTemplate.update(delete);
						
			conn.commit();//提交JDBC事务 
			conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
			conn.close();
			
			if(i != 0 && j!=0 && k!=0){
				ret = 1;
			}
		} catch (SQLException e) {
			conn.rollback();
			e.printStackTrace();
		}	
		
		return ret;
	}
	
	/**
	 * 讲解员和游客之间进行扫码确认信息
	 * @param orderId
	 * @return 1--信息确认成功，0--失败
	 */
	public int doConfirm(String orderId){
		
		int ret = 0;
		
		String update = "update t_bookorder set confirm=1 where bookOrderID='"+orderId+"'";
		int i = jdbcTemplate.update(update);
		
		if(i != 0){
			ret = 1;
		}
		return ret;
	}
	
	
	/**
	 * 填写游客未确认的原因
	 * @param orderId
	 * @return
	 */
	public int writeBookOrderReason(String orderId, String reason){
		
		int ret = 0;
		
		String update = "update t_bookorder set reason='"+reason+"' where bookOrderID='"+orderId+"'";
		int i = jdbcTemplate.update(update);
		
		if(i != 0){
			ret = 1;
		}
		return ret;
	}
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 得到订单信息并进行分页获取
	 * @param currentPage
	 * @param pageRows
	 * @return
	 * 2017-1-14 19:49:47
	 */
	public List<Map<String , Object>> GetBookorderBypage(int currentPage,int pageRows) 
	{
		int k=(currentPage-1)*pageRows;
		String sql="select t_guideinfo.phone,t_bookorder.*,t_visitor.name,t_visitor.phone,"
				+ "t_scenicspotinfo.scenicName "
				+ "from t_visitor,t_bookorder,t_scenicspotinfo,t_guideinfo "
				+ " where t_bookorder.visitorPhone=t_visitor.phone and"
				+ " t_bookorder.scenicID = t_scenicspotinfo.scenicNo and  "
				+ "t_guideinfo.id=t_bookorder.guideID"
				+ " LIMIT "+k+" ,"+pageRows+"";
		return jdbcTemplate.queryForList(sql);	
	}
	
	/**
	 * 得到订单信息表的数目
	 * @return
	 * 2017-1-14 20:20:03
	 */
	public int GetBookorderCount() {
		String sql="select t_bookorder.*,t_visitor.name,t_visitor.phone,"
				+ "t_scenicspotinfo.scenicName "
				+ "from t_visitor,t_bookorder,t_scenicspotinfo,t_guideinfo "
				+ " where t_bookorder.visitorPhone=t_visitor.phone "
				+ "and t_bookorder.scenicID = t_scenicspotinfo.scenicNo and "
				+ "t_guideinfo.id=t_bookorder.guideID";
		 
		 return jdbcTemplate.queryForList(sql).size();
	}
	
	/**
	 * 通过关键字来搜索订单信息（日期，景区编号等）
	 * @param currentPage
	 * @param pageRows
	 * @param word
	 * @param value
	 * @return
	 * 2017-2-19 15:00:34
	 */
	public List<Map<String , Object>> GetBookorderBySearch(int currentPage,int pageRows,String word,String value )
	{
		
		int k=(currentPage-1)*pageRows;
		String a="t_bookorder."+word+"='"+value+"'";
		if (word.equals("visitTime")) {
			a="t_bookorder."+word+"='"+value+"'";
		}
		String sql="select t_bookorder.*,t_visitor.name,t_visitor.phone,"
				+ "t_scenicspotinfo.scenicName "
				+ "from t_visitor,t_bookorder,t_scenicspotinfo"
				+ " where t_bookorder.visitorPhone=t_visitor.phone "
				+ "and t_bookorder.scenicID = t_scenicspotinfo.scenicNo and "+a
				+" LIMIT "+k+" ,"+pageRows+"";
		
		return jdbcTemplate.queryForList(sql);
	}
	
	public int GetBookorderBySearchCount(String word,String value) 
	{
		String a="t_bookorder."+word+"='"+value+"'";
		String sql="select t_bookorder.*,t_visitor.name,t_visitor.phone,"
				+ "t_scenicspotinfo.scenicName "
				+ "from t_visitor,t_bookorder,t_scenicspotinfo"
				+ " where t_bookorder.visitorPhone=t_visitor.phone "
				+ "and t_bookorder.scenicID = t_scenicspotinfo.scenicNo and "+a;
		
		return jdbcTemplate.queryForList(sql).size();
	}
}
