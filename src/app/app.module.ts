import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationOnboardingComponent } from './application-onboarding/application-onboarding.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdentityComponent } from './identity/identity.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { VideoKycComponent } from './video-kyc/video-kyc.component';
import { VideoCallComponent } from './video-kyc/video-call/video-call.component';
import { ClosingComponent } from './closing/closing.component';
import { TimeslotComponent } from './timeslot/timeslot.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationOnboardingComponent,
    IdentityComponent,
    VideoKycComponent,
    VideoCallComponent,
    ClosingComponent,
    TimeslotComponent,
    ChatBotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgOtpInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
