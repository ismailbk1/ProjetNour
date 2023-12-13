import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { AuthAtudiantComponent } from './auth-etudiant/auth-atudiant.component';
import { LoginEtudiantComponent } from './login-etudiant/login-etudiant.component';
import { AuthClubComponent } from './auth-club/auth-club.component';
import { LoginClubComponent } from './login-club/login-club.component';
import { ProfileClubComponent } from './profile-club/profile-club.component';
import { HomeComponent } from './home/home.component';
import { JoinEventComponent } from './join-event/join-event.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  { path: 'events', component: EventListComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'registerClub',canActivate:[AuthguardService],  component: AuthClubComponent },
  { path: 'loginClub',canActivate:[AuthguardService], component: LoginClubComponent },
  { path: 'profilClub', component: ProfileClubComponent },
  { path: 'registerEtudiant', canActivate:[AuthguardService],component: AuthAtudiantComponent },
  { path: 'loginEtudiant',canActivate:[AuthguardService], component: LoginEtudiantComponent },
  { path: 'update-event/:id', component: UpdateEventComponent },
  { path: 'join-event/:id', component:JoinEventComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
