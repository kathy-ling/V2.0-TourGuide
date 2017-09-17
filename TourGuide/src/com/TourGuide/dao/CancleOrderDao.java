package com.TourGuide.dao;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.TourGuide.common.DateConvert;
import com.TourGuide.common.MyDateFormat;

@Repository
public class CancleOrderDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	/**
	 * 游客取消预约订单，预约单和发布预约单
	 * @param orderId
	 * @return 1--取消成功,-1--已经开始参观，不能取消,2--扣费1%,3--扣费5%
	 */
	public int cancleBookOrder(String orderId){
		
		int ret = 0;
		int hadPay = 0;
		int guideFee = 0;
		String guidePhone = null;
		String visitTime = null;
		
		List<Map<String , Object>> list = new ArrayList<>();
		String cancleTime = MyDateFormat.form(new Date());
		
		String sqlString = "select visitTime,guidePhone,hadPay,guideFee "
				+ "from t_bookorder where bookOrderID='"+orderId+"'";
		list = jdbcTemplate.queryForList(sqlString);
		
		if(list.size() != 0){
			hadPay = (int) list.get(0).get("hadPay");
			guideFee = (int) list.get(0).get("guideFee");
			guidePhone = (String) list.get(0).get("guidePhone");
			Timestamp timestamp = (Timestamp) list.get(0).get("visitTime");
			visitTime = MyDateFormat.form(timestamp);
		}				
		
		if(guidePhone == null){
			//导游未接单，直接取消。（增加取消记录，修改订单状态）
			String sqlInsert = "insert into t_cancleRecord (orderId,orderType,cancleTime,"
					+ "cancleReason,cancleFee) values (?,?,?,?,?)";
			int i = jdbcTemplate.update(sqlInsert, new Object[]{orderId,"预约单",cancleTime,"reason",0});
			
			String sqlUpdate = "update t_bookorder set orderState='已取消' where bookOrderID='"+orderId+"'";
			int j = jdbcTemplate.update(sqlUpdate);
			
			if(i!=0 && j!=0){
				ret = 1;
			}			
		}
		if(guidePhone != null && hadPay == 1){
			//导游已经接单，游客已经付款。（增加取消记录，修改订单状态，删除导游预约信息）
//			1)	取消订单时间 >= 参观时间，不能取消
//			2)	取消时间 < 参观时间-30min，扣费1%
//			3)	参观时间-30min  < 取消时间 < 参观时间，扣费5%
			int i = 0;
			String sqlInsert = "insert into t_cancleRecord (orderId,orderType,cancleTime,"
					+ "cancleReason,cancleFee) values (?,?,?,?,?)";
						
			if(DateConvert.DateCompare(visitTime, cancleTime)){
				return -1;
			}
			if(DateConvert.DateCompare(cancleTime,DateConvert.addMinuteToTime(visitTime, -30))){
				
				i = jdbcTemplate.update(sqlInsert, new Object[]{orderId,"预约单",cancleTime,"reason",guideFee*0.01});
				
				String sqlUpdate = "update t_bookorder set orderState='已取消',cancleFee="+guideFee*0.01+" where bookOrderID='"+orderId+"'";
				int j = jdbcTemplate.update(sqlUpdate);
				
				String sqlDelete = "delete from t_guidebeordered where orderId='"+orderId+"'";
				int k = jdbcTemplate.update(sqlDelete);
				
				if(i!=0 && j!=0 && k!=0){
					ret = 2;
				}
			}
			if(DateConvert.DateCompare(cancleTime,visitTime) && 
					DateConvert.DateCompare(DateConvert.addMinuteToTime(visitTime, -30),cancleTime)){
				i = jdbcTemplate.update(sqlInsert, new Object[]{orderId,"预约单",cancleTime,"reason",guideFee*0.05});
				
				String sqlUpdate = "update t_bookorder set orderState='已取消',cancleFee="+guideFee*0.05+" where bookOrderID='"+orderId+"'";
				int j = jdbcTemplate.update(sqlUpdate);
				
				String sqlDelete = "delete from t_guidebeordered where orderId='"+orderId+"'";
				int k = jdbcTemplate.update(sqlDelete);
				
				if(i!=0 && j!=0 && k!=0){
					ret = 3;
				}
			}						
		}
		return ret;
	}
	
	
	/**
	 * 游客取消拼团订单
	 * @param orderId
	 * @return
	 * -1--已经开始参观，不能取消, 1--取消成功,2--扣费1%,3--扣费5%,4--扣费2%
	 */
	public int cancleConsistOrder(String orderId){
		
		int ret = 0;

		int guideFee = 0;
		int num = 0;
		int beScanned = 0;
		String guidePhone = null;
		String visitTime = null;
		String orderID = null;
		String startTime = null;
		
		
		List<Map<String , Object>> list = new ArrayList<>();
		String cancleTime = MyDateFormat.form(new Date());
		
		String sqlString = "select visitTime,guidePhone,guideFee,orderId,visitNum,startTime,beScanned "
				+ "from t_consistorder where consistOrderID='"+orderId+"'";
		list = jdbcTemplate.queryForList(sqlString);
		
		if(list.size() != 0){
			beScanned = (int) list.get(0).get("beScanned");
			guideFee = (int) list.get(0).get("guideFee");
			guidePhone = (String) list.get(0).get("guidePhone");
			Timestamp timestamp = (Timestamp) list.get(0).get("visitTime");
			if(timestamp != null)
				visitTime = MyDateFormat.form(timestamp);
			num = (int) list.get(0).get("visitNum");
			orderID = (String) list.get(0).get("orderId");
			Timestamp timestamp1 = (Timestamp) list.get(0).get("startTime");
			if(timestamp1 != null)
				startTime = MyDateFormat.form(timestamp1);
		}				
		
		String sqlInsert = "insert into t_cancleRecord (orderId,orderType,cancleTime,"
				+ "cancleReason,cancleFee) values (?,?,?,?,?)";
		if(guidePhone == null){
			//导游未接单，直接取消。（增加取消记录，修改订单状态）			
			int i = jdbcTemplate.update(sqlInsert, new Object[]{orderId,"拼团单",cancleTime,"reason",0});
			
			String sqlUpdate = "update t_consistorder set orderState='已取消' where consistOrderID='"+orderId+"'";
			int j = jdbcTemplate.update(sqlUpdate);
			
			int k = 0;
			if(orderID != null){
				String update = "update t_consistresult set visitNum=visitNum-"+num+" where orderID='"+orderID+"'";
				k = jdbcTemplate.update(update);
			}			
			
			if(i!=0 && j!=0){
				ret = 1;
			}			
		}
		if(guidePhone != null){
			//导游已经接单
			if(beScanned == 1 && visitTime == null){
				//快捷拼单，已被扫码
				if(startTime == null){
					//扫码后，还没开始参观，取消，扣费2%					
					int i = jdbcTemplate.update(sqlInsert, new Object[]{orderId,"拼团单",cancleTime,"reason",guideFee*num*0.02});
					
					String sqlUpdate = "update t_consistorder set orderState='已取消',"
							+ "cancleFee="+guideFee*num*0.02+" where consistOrderID='"+orderId+"'";
					int j = jdbcTemplate.update(sqlUpdate);
					
					String update = "update t_consistresult set visitNum=visitNum-"+num+","
							+ "cancleFee=cancleFee+"+guideFee*num*0.02+" where orderID='"+orderID+"'";
					int k = jdbcTemplate.update(update);
					
					if(i!=0 && j!=0 && k!=0){
						ret = 4;
					}
				}else{
					//扫码后，已经开始参观，不能取消
					return -1;
				}
			}
			if(visitTime != null){
				int i = 0;
				
				if(DateConvert.DateCompare(visitTime, cancleTime)){
					return -1;
				}
				if(DateConvert.DateCompare(cancleTime,DateConvert.addMinuteToTime(visitTime, -30))){
					
					i = jdbcTemplate.update(sqlInsert, new Object[]{orderId,"拼团单",cancleTime,"reason",guideFee*num*0.01});
					
					String sqlUpdate = "update t_consistorder set orderState='已取消',"
							+ "cancleFee="+guideFee*num*0.01+" where consistOrderID='"+orderId+"'";
					int j = jdbcTemplate.update(sqlUpdate);
					
					String update = "update t_consistresult set visitNum=visitNum-"+num+","
							+ "cancleFee=cancleFee+"+guideFee*num*0.01+" where orderID='"+orderID+"'";
					int k = jdbcTemplate.update(update);
					
					if(i!=0 && j!=0 && k!=0){
						ret = 2;
					}
				}
				if(DateConvert.DateCompare(cancleTime,visitTime) && 
						DateConvert.DateCompare(DateConvert.addMinuteToTime(visitTime, -30),cancleTime)){
					
					i = jdbcTemplate.update(sqlInsert, new Object[]{orderId,"预约单",cancleTime,"reason",guideFee*num*0.05});
					
					String sqlUpdate = "update t_consistorder set orderState='已取消',"
							+ "cancleFee="+guideFee*num*0.05+" where consistOrderID='"+orderId+"'";
					int j = jdbcTemplate.update(sqlUpdate);
					
					String update = "update t_consistresult set visitNum=visitNum-"+num+","
							+ "cancleFee=cancleFee+"+guideFee*num*0.01+" where orderID='"+orderID+"'";
					int k = jdbcTemplate.update(update);
					
					if(i!=0 && j!=0 && k!=0){
						ret = 3;
					}
				}	
			}
		}
		
		return ret;
	}
}
