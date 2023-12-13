import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-club',
  templateUrl: './profile-club.component.html',
  styleUrls: ['./profile-club.component.css']
})
export class ProfileClubComponent implements OnInit {

  constructor() { 
   
// Vérifie si la clé "firstVisit" existe dans le localStorage
const isFirstVisit = !localStorage.getItem('firstVisit');

// Si c'est la première visite, recharge la page et défini la clé "firstVisit" dans le localStorage
if (isFirstVisit) {
  localStorage.setItem('firstVisit', 'true');
  window.location.reload();
}
}  

  ngOnInit(): void {
    
  }

}
