package com.alexandergock.citylist.data.repository;

import com.alexandergock.citylist.data.model.City;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ICityRepository extends PagingAndSortingRepository<City, Long> {
  List<City> findByName(String name);
}
