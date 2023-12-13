package com.example.demo.controller;

import com.example.demo.dto.ClubDto;
import com.example.demo.dto.StudentDto;
import com.example.demo.model.Club;
import com.example.demo.model.ClubLoginRequest;
import com.example.demo.model.Student;
import com.example.demo.model.StudentLoginRequest;
import com.example.demo.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    private final StudentService studentService;
    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody Student student) {
        try {
            Student savedStudent = studentService.registerStudent(student);
            return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody StudentLoginRequest loginRequest) {
        System.out.println(loginRequest.getEmail());
        System.out.println(loginRequest.getPassword());
        Student authenticatedStudent = studentService.authenticateStudent(loginRequest.getEmail(), loginRequest.getPassword());

        if (authenticatedStudent != null) {
            StudentDto studentDto=new StudentDto();
            studentDto.setEmail(authenticatedStudent.getEmail());
            studentDto.setName(authenticatedStudent.getFullname());
            studentDto.setStudentID(authenticatedStudent.getStudentID());
            studentDto.setRole("student");

            return ResponseEntity.ok(studentDto);
        } else {
            // Invalid credentials
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }
}
