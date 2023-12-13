import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { EventsService } from '../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
})
export class UpdateEventComponent implements OnInit {

  updateFormGroup: FormGroup;
id:any;
  constructor(private fb: FormBuilder ,private eventService:EventsService,private router:Router,private route:ActivatedRoute) {
    this.updateFormGroup = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      url: ['', Validators.required],
    });
  }
  ngOnInit(): void {
this.id=this.route.snapshot.params['id'];
  }
  onSubmit() {
    console.log(this.updateFormGroup.value);
    
    this.eventService.updateEvent(this.updateFormGroup.value,this.id).subscribe(
      response => {
        this.updateFormGroup.reset();
        Swal.fire({
          icon: 'success',
          title: 'Event Updated successfully!',
          showConfirmButton: false,
          timer: 1500
        });
this.router.navigate(['/events']);
        console.log('Event added successfully!', response);
        // Optionally, you can navigate to another page or show a success message
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
        this.updateFormGroup.reset();
        console.error('Error adding event:', error);
        // Handle the error as needed
      }
    );
 
    } 
  

 
  

  


}
