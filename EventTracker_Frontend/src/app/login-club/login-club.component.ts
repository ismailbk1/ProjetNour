import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClubServiceService } from '../services/club-service.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-login-club',
  templateUrl: './login-club.component.html',
  styleUrls: ['./login-club.component.css']
})
export class LoginClubComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private clubService: ClubServiceService,private router:Router) {
    this.loginForm = this.fb.group({
      clubname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    
    if (this.loginForm.valid) {
      const { clubname, password } = this.loginForm.value;
      console.log(clubname);
      
      this.clubService.loginClub(clubname, password).subscribe(
        response => {
          console.log(response);
    const responseJson = JSON.stringify(response);

    // Store the string in localStorage
    localStorage.setItem('user', responseJson);
          console.log('Club logged in successfully!', response);
          this.loginForm.reset();
          this.router.navigate(['/']);

          window.location.reload();

       
          // Handle success (e.g., navigate to another page)
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error logging in club check Your credentials!',
          });
          this.loginForm.reset();
          console.error('Error logging in club:', error);
          // Handle error (e.g., display an error message)
        }
      );
    } else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez remplir tous les champs !',  
      });
      
    }
  }
  ngOnInit(): void {
  }

}
