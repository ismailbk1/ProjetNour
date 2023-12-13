package com.example.demo.services;

import com.example.demo.constant.Constant;
import com.example.demo.model.Club;
import com.example.demo.model.Event;
import com.example.demo.repository.ClubRepo;
import com.example.demo.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class EventService {

    private final EventRepository eventRepository;
private final ClubRepo clubRepo;
    public void addEvent(String eventName, String date, String location, String description, Double price, String url, MultipartFile file, String clubId) throws IOException {

        if (file.isEmpty() || eventName.isEmpty() || location.isEmpty() || description.isEmpty() ) {
            // Handle validation errors, e.g., throw an exception

            throw new IllegalArgumentException("All fields are required");
        }
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(Constant.LOCATION + fileName);
        Files.write(filePath, file.getBytes());
        Event event=new Event();

        event.setEventName(eventName);
        event.setPrice(price);
        event.setDescription(description);
        event.setDate(date);
        event.setClub(clubId);
        event.setLocation(location);
        event.setImage(fileName);
event.setUrl(url);
eventRepository.save(event);
        //Optional<Club> optionalClub = clubRepo.findById(Integer.parseInt(clubId));



    }
}
