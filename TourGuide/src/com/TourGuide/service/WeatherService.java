package com.TourGuide.service;

import org.springframework.stereotype.Service;

import com.TourGuide.common.getWeatherByCity;
import com.TourGuide.model.Weather;

@Service
public class WeatherService {
	
	private getWeatherByCity getWeatherByCity;
	
	/** 
     * 获取对应城市的天气
     * @param city  用户输入的城市名称 
     * @return  天气：天气状况、气温、风力风向、气象图标1、气象图标2
     */ 
	public Weather getWeather(String city){
		return getWeatherByCity.getCityWeather(city);
	}

}
