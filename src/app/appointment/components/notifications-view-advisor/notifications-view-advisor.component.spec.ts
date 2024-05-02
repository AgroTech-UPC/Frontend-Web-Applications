import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsViewAdvisorComponent } from './notifications-view-advisor.component';

describe('NotificationsComponent', () => {
  let component: NotificationsViewAdvisorComponent;
  let fixture: ComponentFixture<NotificationsViewAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsViewAdvisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsViewAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
