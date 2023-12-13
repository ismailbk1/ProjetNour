package com.example.demo.services;

import com.example.demo.model.Club;
import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentService {

private final StudentRepo studentRepo;
    public Student registerStudent(Student student) {
        return studentRepo.save(student);
    }
    public Student authenticateStudent(String clubname, String password) {
        Student student = studentRepo.findByEmail(clubname);
        return (student != null && student.getPassword().equals(password)) ? student : null;
    }
}
