import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-atudiant',
  templateUrl: './auth-atudiant.component.html',
  styleUrls: ['./auth-atudiant.component.css']
})
export class AuthAtudiantComponent implements OnInit {


  studentForm!: FormGroup;

  constructor(private fb: FormBuilder ,private studentService:StudentService ,private router:Router) {
    this.studentForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newUsername: ['', Validators.required],
     password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['male'],
      phone: [''],
      studentID: ['', Validators.required],
      niveau: ['', Validators.required],
      domaine: ['', Validators.required],
      year: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.studentForm.value);
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      
      this.studentService.registerStudent(this.studentForm.value).subscribe(
        response => {
          this.studentForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Student added successfully!',
            showConfirmButton: false,
            timer: 1500
          });
this.router.navigate(['/loginEtudiant']);
          console.log('Student added successfully!', response);
          // Handle success (e.g., show a success message)
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
          this.studentForm.reset();
          console.error('Error adding student:', error);
          // Handle error (e.g., show an error message)
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
