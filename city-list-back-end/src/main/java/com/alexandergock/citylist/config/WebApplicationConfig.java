package com.alexandergock.citylist.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebApplicationConfig implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/", "/**")
        .setCachePeriod(0)
        .addResourceLocations("classpath:/static/public/index.html")
        .resourceChain(true)
        .addResolver(new PathResourceResolver() {
          @Override
          protected Resource getResource(String resourcePath, Resource location) {
            System.out.println("resourcePath: " + resourcePath);
            if (resourcePath.startsWith("api")) {
              return null;
            }
            if (location.exists() && location.isReadable()) {
              return location;
            }
            return null;
          }
        });
  }

}
