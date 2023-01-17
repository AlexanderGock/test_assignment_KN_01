package com.alexandergock.citylist.api;

import com.alexandergock.citylist.data.model.City;
import com.alexandergock.citylist.data.repository.ICityRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@ActiveProfiles({"test"})
public class CityControllerIntegrationTests {

  @Autowired
  private MockMvc mvc;

  @Autowired
  private ICityRepository cityRepository;

  @Value("${apiV1Prefix:/api}")
  private String apiV1Prefix;

  @BeforeEach
  public void initData() {
    createTestCity(1l, "Tokyo", "Tokyo picture");
    createTestCity(2l, "Mumbai", "Mumbai picture");
    createTestCity(3l, "Manila", "Manila picture");
    createTestCity(4l, "Seoul", "Seoul picture");
    createTestCity(5l, "Bangkok", "Bangkok picture");
    createTestCity(6l, "Istanbul", "Istanbul picture");
    createTestCity(7l, "Lima", "Lima picture");
  }

  private void createTestCity(Long id, String name, String photo) {
    cityRepository.save(new City(id, name, photo));
  }

  @Test
  public void testGetFirstPage_noFilter() throws Exception {
    mvc.perform(get(apiV1Prefix + "/cities").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("numberOfElements", CoreMatchers.is(5)))
        .andExpect(jsonPath("totalElements", CoreMatchers.is(7)))
        .andExpect(jsonPath("totalPages", CoreMatchers.is(2)))
        .andExpect(jsonPath("last", CoreMatchers.is(false)))
        .andExpect(jsonPath("first", CoreMatchers.is(true)))
        .andExpect(jsonPath("pageable.pageNumber", CoreMatchers.is(0)))
        .andExpect(jsonPath("pageable.pageSize", CoreMatchers.is(5)))
        .andExpect(jsonPath("content", CoreMatchers.notNullValue()));
  }

  @Test
  public void testGetFirstPage_filter1() throws Exception {
    mvc.perform(get(apiV1Prefix + "/cities").param("name", "m").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("numberOfElements", CoreMatchers.is(2)))
        .andExpect(jsonPath("totalElements", CoreMatchers.is(2)))
        .andExpect(jsonPath("totalPages", CoreMatchers.is(1)))
        .andExpect(jsonPath("last", CoreMatchers.is(true)))
        .andExpect(jsonPath("first", CoreMatchers.is(true)))
        .andExpect(jsonPath("pageable.pageNumber", CoreMatchers.is(0)))
        .andExpect(jsonPath("pageable.pageSize", CoreMatchers.is(5)))
        .andExpect(jsonPath("content", CoreMatchers.notNullValue()));
  }

  @Test
  public void testGetFirstPage_filter2() throws Exception {
    mvc.perform(get(apiV1Prefix + "/cities").param("name", "a").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("numberOfElements", CoreMatchers.is(0)))
        .andExpect(jsonPath("totalElements", CoreMatchers.is(0)))
        .andExpect(jsonPath("totalPages", CoreMatchers.is(0)))
        .andExpect(jsonPath("last", CoreMatchers.is(true)))
        .andExpect(jsonPath("first", CoreMatchers.is(true)))
        .andExpect(jsonPath("pageable.pageNumber", CoreMatchers.is(0)))
        .andExpect(jsonPath("pageable.pageSize", CoreMatchers.is(5)))
        .andExpect(jsonPath("content", CoreMatchers.notNullValue()));
  }

  @Test
  public void testGetCity_happy() throws Exception {
    mvc.perform(get(apiV1Prefix + "/cities/{0}", 4).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("id", CoreMatchers.is(4)))
        .andExpect(jsonPath("name", CoreMatchers.is("Seoul")))
        .andExpect(jsonPath("photo", CoreMatchers.is("Seoul picture")));
  }

  @Test
  public void testGetCity_unhappy() throws Exception {
    mvc.perform(get(apiV1Prefix + "/cities/{0}", 8).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
  }

  @Test
  public void testEditCity_happy() throws Exception {
    City city = new City(7l, "M Lima", "Lima picture");
    mvc.perform(put(apiV1Prefix + "/cities/{0}", 7).content(asJsonString(city)).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

    mvc.perform(get(apiV1Prefix + "/cities").param("name", "m").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("numberOfElements", CoreMatchers.is(3)))
        .andExpect(jsonPath("totalElements", CoreMatchers.is(3)));
  }

  @Test
  public void testEditCity_happy_nullifyPhoto() throws Exception {
    City city = new City(7l, "Lima", null);
    mvc.perform(put(apiV1Prefix + "/cities/{0}", 7).content(asJsonString(city)).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

    mvc.perform(get(apiV1Prefix + "/cities/{0}", 7).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("id", CoreMatchers.is(7)))
        .andExpect(jsonPath("photo", CoreMatchers.nullValue()));
  }

  @Test
  public void testEditCity_unhappy_recordDoesNotExist() throws Exception {
    City city = new City(8l, "Ganzhou", "Ganzhou picture");
    mvc.perform(put(apiV1Prefix + "/cities/{0}", 8).content(asJsonString(city)).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound());
  }

  @Test
  public void testEditCity_unhappy_nullifyName() throws Exception {
    City city = new City(7l, null, "Lima picture");
    mvc.perform(put(apiV1Prefix + "/cities/{0}", 7).content(asJsonString(city)).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest());
  }

  public static String asJsonString(final Object obj) {
    try {
      return new ObjectMapper().writeValueAsString(obj);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

}
