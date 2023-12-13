import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthinticatedClub=false;
  isAuthinticatedStudent=false;
  isAuthinticated=false;
  clubName='';

  user:any;
  

  constructor(private router:Router) { 
    // Vérifie si la clé "firstVisit" existe dans le localStorage

  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;
console.log(parsedUser);
console.log(parsedUser.role);
console.log(parsedUser);
if (parsedUser!=null) {
  this.isAuthinticated=true;
if(parsedUser.role=='club'){
  this.clubName=parsedUser.clubName
  this.isAuthinticatedClub=true;
}if(parsedUser.role=='student'){
  this.isAuthinticatedStudent=true;
}

}
  }
  logOut() {
      // Clear user data from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('firstVisit');
  
      // Redirect to the login page or any other desired page
      this.router.navigate(['/home']);
      window.location.reload();
    
  }
}
