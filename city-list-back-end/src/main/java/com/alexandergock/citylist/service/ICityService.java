package com.alexandergock.citylist.service;

import com.alexandergock.citylist.data.model.City;
import org.springframework.data.domain.Page;

public interface ICityService {
  Page<City> getCities(String name, int page);
  void editCity(Long id, City city);
}
