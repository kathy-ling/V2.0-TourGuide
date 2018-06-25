package com.TourGuide.Timer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
@Component 
public class ChangeOrderState {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Scheduled(cron = "0 54 21 * * ?")//每两个小时执行一次
	public void Update() {
		String bookOrderPay="";
	}
}
