import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventsService } from '../services/events.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  eventForm!: FormGroup;
  selectedImage: File | null = null;
  selectedImageName: string = '';
  changeimage="true";
  isConditionMet :boolean = false;
  selectedFile: File | null  = null;
clubId: string = "";
  constructor(private fb: FormBuilder, private eventService: EventsService,private router:Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    if (parsedUser!=null){
this.clubId=parsedUser.clubID;

    }
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      price: [0, Validators.required],
      url: ['', Validators.required]
    });
  }

  addEvent() {
   console.log(this.eventForm.value);
    if (this.selectedFile) {
      console.log(this.eventForm.value);
      
      const formData = new FormData();
      formData.append('eventName', this.eventForm.get('eventName')?.value);
      formData.append('date', this.eventForm.get('date')?.value);
      formData.append('location', this.eventForm.get('location')?.value);
      formData.append('description', this.eventForm.get('description')?.value);
      formData.append('price', this.eventForm.get('price')?.value);
      formData.append('url', this.eventForm.get('url')?.value);
      formData.append('file', this.selectedFile);
      formData.append('clubId', this.clubId);

    this.eventService.addEvent(formData).subscribe(
        response => {
          this.eventForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Event added successfully!',
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
          this.eventForm.reset();
          console.error('Error adding event:', error);
          // Handle the error as needed
        }
      );
   
      
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez remplir tous les champs !',  
      });
      
    }
  }

  handleImageUpload(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.eventForm.patchValue({ image: fileList[0] });
      this.selectedImage = fileList[0];
    } else {
      this.selectedImage = null;
    }
  }
  onFileSelected(event: any): void {
    const file: File | null = event.target.files[0];
    if(file !=null) this.isConditionMet=true;
    this.selectedFile = file;
  }
}
