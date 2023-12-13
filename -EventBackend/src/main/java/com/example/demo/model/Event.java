package com.example.demo.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name ="events")
public class Event {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private Long eventId;
	
	@Column(name="event_name")
    private String eventName;
	
	@Column(name="event_date")
    private String date;
    
	@Column(name="event_location")
	private String location;
	
	@Column(name="event_description")
    private String description;
	  
	
    @Column(name="event_image")
    private String image;

    @Column(name="event_price")
    private Double price;

    @Column(name="event_url")
    private String url;

	private String club;
	



	public Event() {
	}

	
	
	


	
}
