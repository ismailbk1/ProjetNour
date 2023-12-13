import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthClubComponent } from './auth-club/auth-club.component';
import { AuthAtudiantComponent } from './auth-etudiant/auth-atudiant.component';
import { LoginClubComponent } from './login-club/login-club.component';
import { LoginEtudiantComponent } from './login-etudiant/login-etudiant.component';
import { HomeComponent } from './home/home.component';
import { JoinEventComponent } from './join-event/join-event.component';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    NavbarComponent,
    FooterComponent,
    CreateEventComponent,
    UpdateEventComponent,
    AuthClubComponent,
    AuthAtudiantComponent,
    LoginClubComponent,
    LoginEtudiantComponent,
    HomeComponent,
    JoinEventComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
