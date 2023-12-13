import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-join-event',
  templateUrl: './join-event.component.html',
  styleUrls: ['./join-event.component.css']
})
export class JoinEventComponent implements OnInit {

  eventForm!: FormGroup;
  studentId:any;
  eventId:any;
  constructor(private fb: FormBuilder, private eventService: EventsService,private route:ActivatedRoute
    ,private router:Router) {}

  ngOnInit(): void {
this.eventId=this.route.snapshot.params['id'];
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    if (parsedUser!=null){
this.studentId=parsedUser.studentID;

    }
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      message: ['', Validators.required],
      studentId: ['', ],
      eventId: ['', ],
    });
  }

  onSubmit(): void {
    console.log(this.eventForm.value);
    
    if (this.eventForm.valid) {
      this.eventForm.patchValue({
        studentId: this.studentId,
        eventId: this.eventId
      });
      console.log(this.eventForm.value);
      
      const formData = this.eventForm.value;
      this.eventService.joinEvent(formData).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: 'Formulaire soumis avec succès ! Join Successfully',
          });
          this.router.navigate(['/home'])
          console.log('Formulaire soumis avec succès !', response);
          // Réinitialisez le formulaire si nécessaire
          this.eventForm.reset();
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Somthing want wrong please try again',
          });
          console.error('Erreur lors de la soumission du formulaire', error);
        }
      );
    }
  }

}
