import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoKycComponent } from './video-kyc.component';

describe('VideoKycComponent', () => {
  let component: VideoKycComponent;
  let fixture: ComponentFixture<VideoKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoKycComponent]
    });
    fixture = TestBed.createComponent(VideoKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
