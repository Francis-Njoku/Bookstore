package com.example.Bookstore.config;

import javax.persistence.metamodel.Type;
import com.example.Bookstore.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import javax.persistence.EntityManager;

// Expose ids in json response
@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer {

    @Autowired
    private EntityManager entityManager;

    // Expose a single id in an entity
    /**
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config)
    {
        config.exposeIdsFor(Book.class);
    }**/

    // Expose all ids in entity
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config)
    {
        //config.exposeIdsFor(Book.class);
        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream()
        .map(Type::getJavaType)
        .toArray(Class[]::new));
    }
}
