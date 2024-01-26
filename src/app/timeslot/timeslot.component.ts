import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.scss']
})
export class TimeslotComponent {
  constructor(
    private router: Router, private location: Location) { }

  selectedDate = new Date();

  onSelect(event: any) {
    this.selectedDate = event;
  }
  backToMain() {
    this.location.back();
  }
  gotoClose(time: string) {
    let date = this.selectedDate.getDate();
    this.router.navigate(["success/schedule"], { queryParams: { "time": date + "&" + time } });
  }
}
