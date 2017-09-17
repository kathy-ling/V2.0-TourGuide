package com.TourGuide.common;

import java.sql.DriverManager;
import java.sql.SQLException;

import org.apache.commons.dbcp.BasicDataSource;

public class XBasicDataSource extends BasicDataSource {

	@Override
	public synchronized void close() throws SQLException {
		// TODO Auto-generated method stub
		
		DriverManager.deregisterDriver(DriverManager.getDriver(url));
		super.close();
	}
}
