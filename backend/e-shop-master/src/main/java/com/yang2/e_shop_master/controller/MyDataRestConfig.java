package com.yang2.e_shop_master.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    //MyDataRestConfig is a configuration class in Spring Data REST. (BookRepository...)
    //Allow us to make requests to our Front end
    private String theAllowedOrigins = "http://localhost:3000";

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                     CorsRegistry cors){
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT};

        // exposeIdsFor() is telling Spring Data REST to include the ID field for the Book entity in the JSON response
//        config.exposeIdsFor(Book.class);
//        config.exposeIdsFor(Review.class);
//        config.exposeIdsFor(History.class);
//        config.exposeIdsFor(Message.class);

        /**
         * When you disable certain HTTP methods for an entity, like POST, PUT, DELETE, and PATCH, you're effectively turning off the automatic handling of these operations by Spring Data REST.
         * However, you can still create custom controllers or services to handle these operations manually. You force the application to use custom controllers or services
         *
         * If you don't disable the POST method, Spring Data REST generates the default POST endpoint that clients can use to directly add a new message to the database.
         *
         * Default POST - http://localhost:8080/api/messages
         *
         * JSON
         * {
         *   "userEmail": "fakeuser@example.com",
         *   "content": "This is a message."
         * }
         */
//        disableHttpMethods(Book.class, config, theUnsupportedActions);
//        disableHttpMethods(Review.class, config, theUnsupportedActions);
//        disableHttpMethods(History.class, config, theUnsupportedActions);
//        disableHttpMethods(Message.class, config, theUnsupportedActions);

        // Configures CORS Mapping
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins);
    }

    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions){
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
}
