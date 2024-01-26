import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent {
  panCard!: string;
  mobile!: string;
  otp!: string;
  showOtpComponent = true;
  hasAllowed = false;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  show!: boolean;
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  gstnNum !: string;

  constructor(private router: Router) { }

  change() {
    this.show = true
  }
  gotoOnboarding(num: any) {
    this.router.navigate(["onboarding/" + num]);
  }
  onOtpChange(otp: any) {
    this.otp = otp;
  }
}
