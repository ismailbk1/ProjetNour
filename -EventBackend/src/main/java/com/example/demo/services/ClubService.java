package com.example.demo.services;

import com.example.demo.model.Club;
import com.example.demo.repository.ClubRepo;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ClubService {

    private final ClubRepo clubRepo;


    public Club registerClub(Club club) {

        return clubRepo.save(club);
    }

    public Club authenticateClub(String clubname, String password) {
        Club club = clubRepo.findByName(clubname);
        return (club != null && club.getPassword().equals(password)) ? club : null;
    }
}
