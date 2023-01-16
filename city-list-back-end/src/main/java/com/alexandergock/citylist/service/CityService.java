package com.alexandergock.citylist.service;

import com.alexandergock.citylist.data.model.City;
import com.alexandergock.citylist.data.repository.ICityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CityService implements ICityService {

  private final ICityRepository cityRepository;

  @Value(value = "${app.city.page.size:10}")
  public Integer pageSize;

  @Override
  public Page<City> getCities(final String name, final int page) {
    log.info("Get cities with name \"{}*\", page: {}", name, page);
    return cityRepository.findAllByNameStartsWithIgnoreCase(name, PageRequest.of(page, pageSize, Sort.by(Sort.Direction.ASC, "name")));
  }

  @Override
  public void editCity(final Long id, final City city) {
    Optional<City> oldCityOptional = cityRepository.findById(id);
    if (!oldCityOptional.isPresent()) {
      throw new IllegalArgumentException("Entity with specified ID does not exist");
    }
    log.info("Update city {}: {}", id, city);

    // Here we can also check if city.id == id (just for consistency). But in common case they are equal.
    // If someone would like to hack it (via Postman, for example) they will notice that city.id does not take any effect (it can be empty even).

    city.setId(id);
    cityRepository.save(city);
  }

  @Override
  public City getCity(Long id) {
    log.info("Get city {}", id);
    Optional<City> cityOptional = cityRepository.findById(id);
    if (!cityOptional.isPresent()) {
      throw new IllegalArgumentException("Entity with specified ID does not exist");
    }
    return cityOptional.get();
  }

}
