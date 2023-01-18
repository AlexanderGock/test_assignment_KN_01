package com.alexandergock.citylist.api;

import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${apiV1Prefix}/user")
public class AuthenticatedUserInfoController {

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public UserDetails getCurrentUser() throws IllegalAccessException {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails) {
      return (UserDetails)principal;
    }
    throw new IllegalAccessException("User not found");
  }

}
