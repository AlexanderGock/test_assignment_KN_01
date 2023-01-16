package com.alexandergock.citylist.data.repository;

import com.alexandergock.citylist.data.model.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ICityRepository extends PagingAndSortingRepository<City, Long>, CrudRepository<City, Long> {
  Page<City> findAllByNameStartsWithIgnoreCase(String name, Pageable pageable);
}
