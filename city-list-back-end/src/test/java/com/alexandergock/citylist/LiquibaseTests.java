package com.alexandergock.citylist;

import com.alexandergock.citylist.data.model.City;
import com.alexandergock.citylist.service.ICityService;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles({"liquibasetest"})
public class LiquibaseTests {

  @Autowired
  private ICityService cityService;

  @Test
  public void testRecordsPopulatedByLiquibase() {
    Page<City> cities = cityService.getCities(StringUtils.EMPTY, 0);

    Assertions.assertNotNull(cities);
    Assertions.assertNotNull(cities.getContent());
    Assertions.assertEquals(19l, cities.getTotalElements());
  }
}
