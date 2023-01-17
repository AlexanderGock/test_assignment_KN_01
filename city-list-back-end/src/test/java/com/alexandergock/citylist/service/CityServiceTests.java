package com.alexandergock.citylist.service;

import com.alexandergock.citylist.data.model.City;
import com.alexandergock.citylist.data.repository.ICityRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.Optional;

import static org.mockito.Mockito.*;

public class CityServiceTests {

  private static CityService cityService;
  private static ICityRepository cityRepository;

  @BeforeAll
  public static void setUp() {
    cityRepository = mock(ICityRepository.class);
    cityService = new CityService(cityRepository);
  }

  @Test
  public void testEditCity_happy() {
    Long id = 123l;
    City oldCity = City.builder()
        .id(id)
        .name("old_city_name")
        .photo("old_city_photo")
        .build();
    City newCity = City.builder()
        .name("new_city_name")
        .photo("new_city_photo")
        .build();
    City finalCity = City.builder()
        .id(id)
        .name("new_city_name")
        .photo("new_city_photo")
        .build();

    when(cityRepository.findById(eq(id))).thenReturn(Optional.of(oldCity));
    ArgumentCaptor<City> cityCaptor = ArgumentCaptor.forClass(City.class);

    cityService.editCity(id, newCity);

    verify(cityRepository).save(cityCaptor.capture());

    Assertions.assertEquals(finalCity, cityCaptor.getValue());
  }

  @Test
  public void testEditCity_unhappy() {
    Long id = 123l;
    City newCity = City.builder()
        .name("new_city_name")
        .photo("new_city_photo")
        .build();

    when(cityRepository.findById(eq(id))).thenReturn(Optional.empty());

    Assertions.assertThrows(IllegalArgumentException.class, () -> cityService.editCity(id, newCity));
  }

  @Test
  public void testGetCity_happy() {
    Long id = 123l;
    City existingCity = City.builder()
        .id(id)
        .name("existing_city_name")
        .photo("existing_city_photo")
        .build();

    when(cityRepository.findById(eq(id))).thenReturn(Optional.of(existingCity));

    City result = cityService.getCity(id);

    verify(cityRepository);

    Assertions.assertEquals(existingCity, result);
  }

  @Test
  public void testGetCity_unhappy() {
    Long id = 123l;

    when(cityRepository.findById(eq(id))).thenReturn(Optional.empty());

    Assertions.assertThrows(IllegalArgumentException.class, () -> cityService.getCity(id));
  }

}
