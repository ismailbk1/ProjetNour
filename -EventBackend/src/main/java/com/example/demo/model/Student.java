package com.example.demo.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String fullname;
    private String email;
    private String newUsername;
    private String password;

    private String birthdate;
    private String gender;
    private String phone;
    private String studentID;
    private String niveau;
    private String domaine;
    private int year;

    // Getters and setters
}
