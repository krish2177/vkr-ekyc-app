import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-closing',
  templateUrl: './closing.component.html',
  styleUrls: ['./closing.component.scss']
})
export class ClosingComponent {
  showThank = true;
  comingFrom!: string | null;
  day = "20";
  time = "03:00";
  ratingMsg = "Thank You!";
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.comingFrom = this.route.snapshot.paramMap.get('id');
    const dateTime = window.location.href.split('?time=')[1];
    if (dateTime) {
      let date = dateTime.split("%26");
      this.day = date[0];
      this.time = date[1];
    }
    // this.route.params.subscribe(routeParams => {
    //   if (routeParams) {
    //     const dateTime = routeParams?.['time']?.split("&");
    //     if (dateTime?.length > 0) {
    //       this.day = dateTime[0];
    //       this.time = dateTime[1];
    //     }
    //   }
    // });
    if (this.comingFrom == "done") {
      this.showThank = false;
    } else if (this.comingFrom == "schedule") {
      this.showThank = true;
    } else {
      this.gotoHome();
    }
  }
  gotoHome() {
    this.router.navigate(["identity"]);
  }
  takeNow() {
    this.router.navigate(["onboarding/null"], { queryParams: { "stepIndex": 4 } });
  }
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  
  countStar(star: number) {
      this.selectedValue = star;
    }
  
  addClass(star: number) {
     let ab = "";
     for (let i = 0; i < star; i++) {
       ab = "starId" + i;
       document.getElementById(ab)!.classList.add("selected");
     }
  }
  removeClass(star: number) {
     let ab = "";
     for (let i = star-1; i >= this.selectedValue; i--) {
       ab = "starId" + i;
       document.getElementById(ab)!.classList.remove("selected");
     }
  }
  submitRating() {
    this.ratingMsg = "Thank you for your feedback."
  }
  noRating() {
    this.ratingMsg = "Thank You!";
  }
}
