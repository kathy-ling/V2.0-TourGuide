package com.TourGuide.web.Dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import com.TourGuide.model.Operateper;

@Repository
public class OperateperDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	/*
	 *通过页数与页数容量来获取运营人员信息 
	 * time：2016-12-30 14:40:08
	 * */
	public List<Operateper> GetOperateUseInfoByPage(int currentPage,int rows)
	{
		int j=(currentPage-1)*rows;
		String sql="SELECT * FROM t_operateper LIMIT "+j+" ,"+rows+"";
		
		List<Map<String , Object>> list=jdbcTemplate.queryForList(sql);
		List<Operateper> listres=new ArrayList<>();
		for (int k = 0; k < list.size(); k++) {
			Operateper operateper=new Operateper();
			operateper.setOperateper_account((String) list.get(k).get("account"));
			operateper.setOperateper_name((String) list.get(k).get("name"));
			operateper.setOperateper_role((String) list.get(k).get("role"));
			operateper.setOperateper_phone((String) list.get(k).get("phone"));
			operateper.setOperateper_bool((int) list.get(k).get("bool"));
			operateper.setOperateper_scenic((String)list.get(k).get("scenicSpot"));
			listres.add(operateper);
		}
		
		return listres;
	}
	
	public  int  GetOperateCount() {
		String sql="SELECT * FROM t_operateper";
		return jdbcTemplate.queryForList(sql).size();
	}
	
	
	/*
	 * 通过sql查询语句进行查询运营人员的详细信息
	 * 参数：SQL语句
	 * 2016-12-31 14:49:28
	 * */
	public List<Operateper> SearchOperateInfoByAccount_Dao(String a) {
		final List<Operateper> list = new ArrayList<Operateper>();
		String sql=" select * from t_operateper where account = '" + a +"'";
		jdbcTemplate.query(sql, new RowCallbackHandler() {
			

			@Override
			public void processRow(java.sql.ResultSet rSet) throws SQLException {
				
				Operateper operateper = new Operateper();
				operateper.setOperateper_name(rSet.getString(1));
				operateper.setOperateper_account(rSet.getString(2));
				operateper.setOperateper_role(rSet.getString(3));
				operateper.setOperateper_phone(rSet.getString(4));
				operateper.setOperateper_bool(rSet.getInt(5));
				operateper.setOperateper_scenic(rSet.getString(6));
				list.add(operateper);
			}
		});
		return list;
	}
	/*
	 * 增加运营人员
	 * 参数：运营人员信息类
	 * 2016-12-31 16:33:22
	 * */
	public boolean AddOperateperInfo_Dao(Operateper operateper, String password) {
		String sql = " select count(*) from t_operateper where account = '"
					+operateper.getOperateper_account()+"'";
		String sql1="select count(*) from t_admin where username="+operateper.getOperateper_account();  
		
		if ((jdbcTemplate.queryForObject(sql, Integer.class) == 0)&&(jdbcTemplate.queryForObject(sql1, Integer.class) == 0)) {
			
			DataSource dataSource=jdbcTemplate.getDataSource();
			Connection  conn;
			try {
				  conn=dataSource.getConnection();
				  conn.setAutoCommit(false);
				  sql =  " insert into t_operateper (name,account,role,phone,scenicSpot) values (?,?,?,?,?) ";
					jdbcTemplate.update(sql, new Object[]{
						operateper.getOperateper_name(),
						operateper.getOperateper_account(),
						operateper.getOperateper_role(),
						operateper.getOperateper_phone(),
						operateper.getOperateper_scenic()
					});
					sql1="insert into t_admin(role,username,password)  values(?,?,?)";
					jdbcTemplate.update(sql1, new Object[]{"运营人员",operateper.getOperateper_account(),password});
					conn.commit();//提交JDBC事务 
					conn.setAutoCommit(true);// 恢复JDBC事务的默认提交方式
					return true;
			} catch (SQLException e) {
				
				e.printStackTrace();
				return false;
			}	
		}
		return false;
	}
	/*
	 * 	删除运营人员
	 * 	参数：运营人员账号
	 * 2016-12-31 20:47:13
	 * */
	public boolean DeleteOperateperInfo(String s) {
		String sql = "delete from t_operateper where account='"+s+"'";
		if (jdbcTemplate.update(sql)>0) {
			return true;
		} else {
			return false;
		}
		
		
	}
	
	/*
	 * 更新运营人员信息
	 * 参数：运营人员信息类
	 * 2016-12-31 20:48:22
	 * */
	public boolean UpdateOperateperInfo(Operateper operateper) {
		String sql = "update   t_operateper set name=?,role=?,phone=?,scenicSpot=?   where account=?";
		int i=jdbcTemplate.update(sql, new Object[]{operateper.getOperateper_name()
				,operateper.getOperateper_role(),
				operateper.getOperateper_phone(),operateper.getOperateper_scenic(),
				operateper.getOperateper_account()});
		if (i>0) {
			return true;
		} else {
			return false;
		}
		
	}
	/*
	 * 禁用运营人员
	 * */
	public boolean ForbidOperate_Dao(String account) {
		String sql = " update t_operateper set bool=1 where account='"+account+"'";
		int i = jdbcTemplate.update(sql);
		
		if (i > 0) return true;
		return false;
	}
	/*
	 * 解禁运营人员
	 * */
	public boolean RelieveOperate_Dao(String account) {
		String sql = " update t_operateper set bool=0 where account='"+account+"'";
		int i = jdbcTemplate.update(sql);
		
		if (i > 0) return true;
		return false;
	}
	
	
	public int ResetPassword(String account,String phone) {
		
		int i=phone.length();
		String password=phone.substring(i-6, i);
		
		String sql="UPDATE t_admin set `password`="+password+
				" WHERE username='"+account+"'";
		i=jdbcTemplate.update(sql);
		return i;
	}
	
	/**
	 * 通过后台账号来获取所属景区的运营人员
	 * @param account
	 * @param i
	 * @param j
	 * @return
	 */
	public List<Operateper> getOperateperByAccount(String account,int i,int j)
	{
		int k=(i-1)*j;
		List<Operateper> list=new ArrayList<>();
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getOperateByAccount(?,?,?)");
			cst.setInt(1, k);
			cst.setInt(2, j);
			cst.setString(3, account);
			ResultSet rst=cst.executeQuery();
			while (rst.next()) {
				
				Operateper operateper=new Operateper();
				operateper.setOperateper_name(rst.getString(1));
				operateper.setOperateper_account(rst.getString(2));
				operateper.setOperateper_role(rst.getString(3));
				operateper.setOperateper_phone(rst.getString(4));
				operateper.setOperateper_bool(rst.getInt(5));
				operateper.setOperateper_scenic(rst.getString(6));
				list.add(operateper);
			}
			conn.close();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		return list;
		
	}
	
	public int getOperateByAcount(String account) {
		
		int i=0;
		DataSource dataSource=jdbcTemplate.getDataSource();
		try {
			Connection conn=dataSource.getConnection();
			CallableStatement cst=conn.prepareCall("call getOperbyAcount(?,?)");
			cst.registerOutParameter(1, java.sql.Types.INTEGER);
			cst.setString(2, account);
			cst.execute();
			i=cst.getInt(1);
			conn.close();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		return i;
		
		
	}
	
}
