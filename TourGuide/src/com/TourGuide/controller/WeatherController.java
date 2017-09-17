package com.TourGuide.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.TourGuide.common.CommonResp;
import com.TourGuide.model.Weather;
import com.TourGuide.service.WeatherService;
import com.google.gson.Gson;

@Controller
public class WeatherController {
	
	@Autowired
	public WeatherService weatherService;
	
	/**
	 * 根据城市名， 查看天气情况
	 * @param resp
	 * @param city   城市名
	 * @throws IOException
	 */
	@RequestMapping(value = "/getWeatherByCity.do")
	public void getWeatherByCity(HttpServletResponse resp,
			@RequestParam("city") String city) throws IOException{
		
		CommonResp.SetUtf(resp);
		
		Weather todayWeather = weatherService.getWeather(city);
		
		PrintWriter writer = resp.getWriter();
		writer.write(new Gson().toJson(todayWeather));
		writer.flush();
		
	}
}
