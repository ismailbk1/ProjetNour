import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClubComponent } from './form-club.component';

describe('FormClubComponent', () => {
  let component: FormClubComponent;
  let fixture: ComponentFixture<FormClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
