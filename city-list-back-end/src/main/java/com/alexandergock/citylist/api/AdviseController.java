package com.alexandergock.citylist.api;

import org.hibernate.PropertyValueException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class AdviseController {

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Object> illegalArgumentException(IllegalArgumentException exception) {
    Map<String, Object> body = new HashMap<>();
    body.put("timestamp", LocalDateTime.now());
    body.put("error", exception.getMessage());
    body.put("status", HttpStatus.NOT_FOUND.value());
    return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
  }

  // attempt to set non-nullable property as null
  @ExceptionHandler(PropertyValueException.class)
  public ResponseEntity<Object> propertyValueException(PropertyValueException exception) {
    Map<String, Object> body = new HashMap<>();
    body.put("timestamp", LocalDateTime.now());
    body.put("error", exception.getMessage());
    body.put("status", HttpStatus.BAD_REQUEST.value());
    return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(IllegalAccessException.class)
  public ResponseEntity<Object> illegalAccessException(IllegalAccessException exception) {
    Map<String, Object> body = new HashMap<>();
    body.put("timestamp", LocalDateTime.now());
    body.put("error", exception.getMessage());
    body.put("status", HttpStatus.UNAUTHORIZED.value());
    return new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED);
  }

}
