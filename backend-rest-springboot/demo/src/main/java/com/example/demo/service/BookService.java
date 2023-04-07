package com.example.demo.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.api.model.Book;

@Service
public class BookService {

    private List<Book> bookList;

    public BookService() {
        bookList = new ArrayList<>();

        Book book1 = new Book("The Awakening", "Kate Chopin");
        Book book2 = new Book("City of Glass", "Paul Auster");

        bookList.addAll(Arrays.asList(book1, book2));
    }

    public List<Book> getBooks() {
        return bookList;
    }

}
