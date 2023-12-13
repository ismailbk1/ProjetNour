package com.example.demo.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.example.demo.model.JoinEvent;
import com.example.demo.repository.JoinEventRepo;
import com.example.demo.services.EventService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Event; // Assuming Event is a model class
import com.example.demo.repository.EventRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200") // Replace with the origin of your Angular app
@RequestMapping("/api/v1/events") // Changed the request mapping
public class EventController {

	private final EventService eventService;

	private final EventRepository eventRepository; //

	private final JoinEventRepo joinEventRepo;
	// Constructor injection for EventRepository


    @CrossOrigin("http://localhost:4200")
	@GetMapping("all")
	public List<Event> getAllEvents() { 
		return eventRepository.findAll();
	}

	@PostMapping("/add")
	public ResponseEntity<String> addEvent(@RequestParam Map<String, String> eventDetails,
										   @RequestParam("file") MultipartFile file) throws IOException {
		// Extract other form parameters
		String eventName = eventDetails.get("eventName");
		String date = eventDetails.get("date");
		String location = eventDetails.get("location");
		String description = eventDetails.get("description");
		Double price = Double.parseDouble(eventDetails.get("price"));
		String url = eventDetails.get("url");
		String clubId=eventDetails.get("clubId");

		// Use eventService to save the event and handle the file
		eventService.addEvent(eventName, date, location, description, price, url, file,clubId);

		return new ResponseEntity<>("Event added successfully!", HttpStatus.OK);
	}
	// get event by id r
    @CrossOrigin("http://localhost:4200")
	@GetMapping("/event/{id}")
	public ResponseEntity<Event> getEventById(@PathVariable Long id) {
    	Event event = eventRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Event not exist with id :" + id));
		return ResponseEntity.ok(event);
	}


	@CrossOrigin("http://localhost:4200")
	@PostMapping("/event")
	public ResponseEntity<List<Event>> getEventByClub(@RequestBody String club) {
		List<Event> event = eventRepository.findByClub(club);
		return ResponseEntity.ok(event);
	}
	@CrossOrigin("http://localhost:4200")
	@PostMapping("/updateEvent/{id}")
	public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails){
		Event event = eventRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("event not exist with id :" + id));
		
		event.setEventName(eventDetails.getEventName());
		event.setDescription(eventDetails.getDescription());
		event.setLocation(eventDetails.getLocation());
		event.setDate(eventDetails.getDate());
		event.setPrice(eventDetails.getPrice());
		event.setUrl(eventDetails.getUrl());
		
		Event updateEvent = eventRepository.save(event);
		return ResponseEntity.ok(updateEvent);
	}
    
    
    
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin("http://localhost:4200") 
	public ResponseEntity<Map<String, Boolean>> deleteEvent(@PathVariable Long id){
		Event event = eventRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Event not exist with id :" + id));
		
		eventRepository.delete(event);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	@CrossOrigin("http://localhost:4200")
	@PostMapping("/join")
	public ResponseEntity<?> joinEvent(@RequestBody JoinEvent joinEvent) {

		 joinEventRepo.save(joinEvent);
		return ResponseEntity.ok("Join Successfully");
	}
}