import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAtudiantComponent } from './auth-atudiant.component';

describe('AuthAtudiantComponent', () => {
  let component: AuthAtudiantComponent;
  let fixture: ComponentFixture<AuthAtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthAtudiantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthAtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
