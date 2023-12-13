import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-etudiant',
  templateUrl: './login-etudiant.component.html',
  styleUrls: ['./login-etudiant.component.css']
})
export class LoginEtudiantComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentService,private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
console.log(this.loginForm.value);
if (this.loginForm.valid) {
    this.studentService.loginUser(email, password).subscribe(
      response => {
        console.log(response);
        const responseJson = JSON.stringify(response);
    
        // Store the string in localStorage
        localStorage.setItem('user', responseJson);
              console.log('Student logged in successfully!', response);
              this.loginForm.reset();
             this.router.navigate(['/home']);
             window.location.reload();
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error logging check Your credentials!',
              });
              this.loginForm.reset();
              console.error('Error logging in Student:', error);
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
}
