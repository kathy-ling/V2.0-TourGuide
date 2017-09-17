package com.example.test;

import java.util.Random;

public class ProduceTest {
	
	
	public static String  getBookOrderID (String phone) {
		
		char[] c=phone.toCharArray();
		Random random=new Random();
		String string="";
		for (int i = 0; i < 10; i++) {
			
			int j=random.nextInt(c.length);
			string=string+c[j];
		}
		return string;
	}
	
	
	public static void main(String[] args) {
		
		
			System.out.println(getBookOrderID("15029319152"));
		
		
	}

}
