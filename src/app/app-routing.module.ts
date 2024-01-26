import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationOnboardingComponent } from './application-onboarding/application-onboarding.component';
import { IdentityComponent } from './identity/identity.component';
import { VideoKycComponent } from './video-kyc/video-kyc.component';
import { ClosingComponent } from './closing/closing.component';
import { VideoCallComponent } from './video-kyc/video-call/video-call.component';
import { TimeslotComponent } from './timeslot/timeslot.component';

const routes: Routes = [
  { path: '', redirectTo: '/identity', pathMatch: 'full' },
  { path: 'identity', component: IdentityComponent },
  // { path: "", redirectTo: "/onboarding", pathMatch: 'full' },
  { path: "onboarding/:id", component: ApplicationOnboardingComponent },
  { path: "vkyc", component: VideoKycComponent },
  { path: "success/:id", component: ClosingComponent },
  { path: "video", component: VideoCallComponent },
  { path:'timeslot', component:TimeslotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
