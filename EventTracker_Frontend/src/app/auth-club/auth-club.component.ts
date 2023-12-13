import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClubServiceService } from '../services/club-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-auth-club',
  templateUrl: './auth-club.component.html',
  styleUrls: ['./auth-club.component.css']
})
export class AuthClubComponent implements OnInit {


  clubForm!: FormGroup



  constructor(private fb: FormBuilder,private clubService:ClubServiceService ,private router:Router) { }

  ngOnInit(): void {
    this.clubForm = this.fb.group({
      name: ['', Validators.required],
      clubEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      description: ['', Validators.required],
      webUrl: [''],
      address: [''],
      number: [''],
      category: ['', Validators.required],
      dateCreation: ['']
    });
  }
 
  onSubmit() {
    if (this.clubForm.valid) {

      console.log(this.clubForm.value);
      
      // Assuming your backend API endpoint is "/api/clubs/register"
      this.clubService.registerClub(this.clubForm.value).subscribe(
        (response) => {
          console.log('Club registered successfully!', response);
          this.clubForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Club registered successfully!',
            showConfirmButton: false,
            timer: 1500
          });
this.router.navigate(['/loginClub']);
          // Optionally, you can navigate to another page or show a success message
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
          this.clubForm.reset();

          console.error('Error registering club:', error);
          
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
 

}
