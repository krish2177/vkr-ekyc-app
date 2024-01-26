import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationOnboardingComponent } from './application-onboarding.component';

describe('ApplicationOnboardingComponent', () => {
  let component: ApplicationOnboardingComponent;
  let fixture: ComponentFixture<ApplicationOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationOnboardingComponent]
    });
    fixture = TestBed.createComponent(ApplicationOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
