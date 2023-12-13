import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthClubComponent } from './auth-club.component';

describe('AuthClubComponent', () => {
  let component: AuthClubComponent;
  let fixture: ComponentFixture<AuthClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
