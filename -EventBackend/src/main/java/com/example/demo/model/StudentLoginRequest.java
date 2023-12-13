package com.example.demo.model;

import lombok.Data;

@Data
public class StudentLoginRequest {
    private String email;
    private String password;
}
