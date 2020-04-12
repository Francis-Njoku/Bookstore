package com.example.Bookstore.repository;

import com.example.Bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

/***
 * for all host
 * @CrossOrigin("*")
 *
 * for specific host
 * @CrossOrigin("http://localhost:4200", "http://localhost:4202")
 */
@CrossOrigin("http://localhost:4200")
public interface BookRepository extends JpaRepository<Book, Long> {

}
