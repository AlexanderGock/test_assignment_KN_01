package com.alexandergock.citylist.api;

import com.alexandergock.citylist.data.model.City;
import com.alexandergock.citylist.service.ICityService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${apiV1Prefix}/cities")
@RequiredArgsConstructor
public class CityController {

  private final ICityService cityService;

  @GetMapping(value = "")
  public Page<City> getCities(
      @RequestParam(required = false, defaultValue = "") String name,
      @RequestParam(required = false, defaultValue = "0") int page
  ) {
    return cityService.getCities(name, page);
  }

  @PutMapping("/{id}")
  public void editCity(@PathVariable Long id, @RequestBody City city) {
    cityService.editCity(id, city);
  }

  @GetMapping("/{id}")
  public City getCity(@PathVariable Long id) {
    return cityService.getCity(id);
  }

}
