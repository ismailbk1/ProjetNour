package com.example.demo.repository;

import com.example.demo.model.Club;
import com.example.demo.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepo extends JpaRepository<Club,Integer> {
    Club findByName(String clubname);


}
