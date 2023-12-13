package com.example.demo.controller;

import com.example.demo.dto.ClubDto;
import com.example.demo.model.Club;
import com.example.demo.model.ClubLoginRequest;
import com.example.demo.services.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/club")
@CrossOrigin(origins = "http://localhost:4200") // Replace with the origin of your Angular app
public class ClubController {
private final ClubService clubService;
    @PostMapping("/register")
    public ResponseEntity<?> registerClub(@RequestBody Club club) {
        try {
            Club savedClub = clubService.registerClub(club);
            return new ResponseEntity<>(savedClub, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginClub(@RequestBody ClubLoginRequest loginRequest) {
        System.out.println(loginRequest.getClubname());
        System.out.println(loginRequest.getPassword());
        Club authenticatedClub = clubService.authenticateClub(loginRequest.getClubname(), loginRequest.getPassword());

        if (authenticatedClub != null) {
            ClubDto clubDto=new ClubDto();
            clubDto.setClubName(authenticatedClub.getName());
            clubDto.setRole("club");
            clubDto.setClubID(authenticatedClub.getId().toString());
            clubDto.setCategory(authenticatedClub.getCategory());
            // Successful login, return the authenticated club
            return ResponseEntity.ok(clubDto);
        } else {
            // Invalid credentials
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }
}
