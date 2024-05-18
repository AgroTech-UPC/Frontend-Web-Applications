import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAvailabilityScheduleComponent } from './edit-availability-schedule.component';

describe('EditAvailabilityScheduleComponent', () => {
  let component: EditAvailabilityScheduleComponent;
  let fixture: ComponentFixture<EditAvailabilityScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAvailabilityScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAvailabilityScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
