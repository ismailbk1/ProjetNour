import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Router } from '@angular/router';
import { Event } from '../event';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public events: Event[] = [];
  isAuthinticatedClub=false;
  isAuthinticatedStudent=false;
  isAuthinticated=false;

  constructor(private eventService: EventsService, private router: Router) {
  
    const isFirstVisit = !localStorage.getItem('firstVisit');
    
// Si c'est la première visite, recharge la page et défini la clé "firstVisit" dans le localStorage
if (isFirstVisit) {
  localStorage.setItem('firstVisit', 'true');
  window.location.reload();
}
  }
  clubId:any
  ngOnInit(): void {
     this.getEvents();
     const storedUser = localStorage.getItem('user');
     const parsedUser = storedUser ? JSON.parse(storedUser) : null;
     console.log(parsedUser);
     console.log(parsedUser.role);
     console.log(parsedUser);
     if (parsedUser!=null) {
       this.isAuthinticated=true;
     if(parsedUser.role=='club'){
      
       this.isAuthinticatedClub=true;
     }if(parsedUser.role=='student'){
       this.isAuthinticatedStudent=true;
     }
    }
  }
   getEvents() {
    this.eventService.getEventsList().subscribe(
      (data: Event[]) => {
        console.log(data);
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
 

  updateEvent(id: number) {
    this.router.navigate(['update-event', id]);
  }
  joinEvent(id:any){
    if(this.isAuthinticatedClub){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You Need To Be a Student To Join The event!',
      });
      return;
  }
  if(!this.isAuthinticatedStudent )
  this.router.navigate(['loginEtudiant']);

    if(this.isAuthinticatedStudent )
    this.router.navigate(['join-event', id]);


}
}
