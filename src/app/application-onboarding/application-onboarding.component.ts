import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { VideoCallComponent } from '../video-kyc/video-call/video-call.component';

@Component({
  selector: 'app-application-onboarding',
  templateUrl: './application-onboarding.component.html',
  styleUrls: ['./application-onboarding.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class ApplicationOnboardingComponent {
  @Input()
  disableRipple!: boolean
  @ViewChild('stepper', { static: true }) stepper!: MatStepper;
  selectedIndex = 0;
  isLinear = true;
  gstn!: string;
  legalName!: string;
  businessEntity!: string;
  tradingBusinessName!: string;
  businessTurnover!: string;
  businessDescType!: string;
  occupationCode!: string;
  district!: string;
  state!: string;
  city!: string;
  pincode!: string;
  haskyc = false;
  hasGstn = false;
  hasSameAddr = true;
  disableMode = false;
  gstnDetails!: GstnDetailsObj;
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }
  id!: string | null;
  showOwnerDetails = false;
  ownerDetails!: OwnerDetails;
  isIFSCSelected = true;
  bankName: string = "Axis Bank";

  states: any = [

    {
      name: "MH",
      value: "Maharashtra"
    },
    {
      name: "TS",
      value: "Telangana"
    },
    {
      name: "AP",
      value: "Andhrapradesh"
    }
  ];
  cities: any = [
    {
      name: "MUM",
      value: "Mumbai"
    },
    {
      name: "PUN",
      value: "Pune"
    }
  ];
  branches: any = [
    {
      name: "AND",
      value: "S.V. Road, Andheri (West)"
    },
    {
      name: "BAN",
      value: "Bandra-Kurla Complex"
    }
  ];
  selectedState: string = "MH";
  selectedCity: string = "MUM";
  selectedBranch: string = "BAN";

  ifscCodes: any = [
    {
      name: "AND",
      value: "UTIB0000740"
    },
    {
      name: "BAN",
      value: "UTIB0000230"
    },
    {
      name: "HAD",
      value: "UTIB0000404"
    },
    {
      name: "WAG",
      value: "UTIB0003191"
    },
    {
      name: "FIN",
      value: "UTIB0003063"
    },
    {
      name: "JUB",
      value: "UTIB0001463"
    },
    {
      name: "WAR",
      value: "UTIB0000292"
    },
    {
      name: "HAN",
      value: "UTIB0001235"
    },
    {
      name: "ELR",
      value: "UTIB0001413"
    },
    {
      name: "MOG",
      value: "UTIB0003984"
    },
    {
      name: "MAN",
      value: "UTIB0002907"
    },
    {
      name: "LAK",
      value: "UTIB0001158"
    }
  ];

  ifscCode: string = "UTIB0000230";

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
  otp!: string;
  hasUploaded = false;
  intervalId = 30;
  illustrationHight = 900;
  seconds = 30;
  isReadytoCall = true;
  @ViewChild('myModalClose') modalClose: any;
  @ViewChild('vkyc') vkycbtn: any;
  // public pageHeight = (window.screen.height) - 324;

  // @HostListener('window:resize', ['$event'])
  // onResize(event: { target: { innerHeight: number; }; }) {
  //   this.pageHeight = event.target.innerHeight - 224;
  // }

  ngOnInit() {
    window.scrollTo(0, 0);
    const stepIndex = window.location.href.split('?stepIndex=')[1];
    if (stepIndex) {
      this.selectedIndex = +stepIndex;
      let stepEvent = new StepperSelectionEvent();
      stepEvent.selectedIndex = 4;
      stepEvent.previouslySelectedIndex = 3;
      this.onStepChange(stepEvent);
      this.vkycbtn?.nativeElement?.click();
    }
    //   }
    // });
    this.showOwnerDetails = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.gstnDetails = new GstnDetailsObj();
    this.ownerDetails = new OwnerDetails();
    if (!this.id || this.id == "null") {
      this.disableMode = false;
    } else {
      this.disableMode = true;
      if (this.id == "XXXXXXXXXXX6699") {
        this.gstnDetails.gstn = this.id;
        this.gstnDetails.legalName = "Toucan Payments India Pvt Ltd";
        this.gstnDetails.businessEntity = "PUBLIC";
        this.gstnDetails.tradingBusinessName = "TOUCAN";
        this.gstnDetails.businessDescType = "Banking Domain Company";
        this.gstnDetails.businessTurnover = "50";
        this.gstnDetails.occupationCode = "5678";
        this.gstnDetails.state = "Telangana";
        this.gstnDetails.district = "Hyderabad";
        this.gstnDetails.city = "Hyderabad";
        this.gstnDetails.pincode = "500033";
      } else {
        this.gstnDetails.gstn = this.id;
        this.gstnDetails.legalName = "SureIT Solutions India Pvt Ltd";
        this.gstnDetails.businessEntity = "PRIVATE";
        this.gstnDetails.tradingBusinessName = "SUREIT";
        this.gstnDetails.businessDescType = "Product Based Company";
        this.gstnDetails.businessTurnover = "20";
        this.gstnDetails.occupationCode = "1234";
        this.gstnDetails.state = "Andhra Pradesh";
        this.gstnDetails.district = "Prakasam";
        this.gstnDetails.city = "Darsi";
        this.gstnDetails.pincode = "523252";
      }
    }
    if (this.isIFSCSelected) {
      this.selectedState = "";
      this.selectedCity = "";
      this.branches = [];
      this.selectedBranch = "";
      this.ifscCode = "";
    }
  }
  hideProceedBtn = true;
  onStepChange(stepEvent: any) {
    window.scrollTo(0, 0);
    if (stepEvent.selectedIndex == 1 && stepEvent.previouslySelectedIndex == 0) {
      this.hideProceedBtn = false;
      this.showOwnerDetails = true;
    } else {
      this.hideProceedBtn = true;
    }
    this.selectedIndex = stepEvent.selectedIndex;
  }
  onStateChange(selectedState: any) {
    this.selectedCity = "";
    this.branches = [];
    this.selectedBranch = "";
    this.ifscCode = "";
    if (selectedState.value == "MH" || selectedState == "MH") {
      this.cities = [
        {
          name: "MUM",
          value: "Mumbai"
        },
        {
          name: "PUN",
          value: "Pune"
        }
      ];
    } else if (selectedState.value == "TS" || selectedState == "TS") {
      this.cities = [
        {
          name: "HYD",
          value: "Hyderabad"
        },
        {
          name: "WAR",
          value: "Warangal"
        }
      ];

    } else {
      this.cities = [
        {
          name: "VIJ",
          value: "Vijayawada"
        },
        {
          name: "GNT",
          value: "Guntur"
        }
      ];
    }
  }

  onCityChange(selectedCity: any) {
    this.selectedBranch = "";
    this.ifscCode = "";
    if (selectedCity.value == "MUM" || selectedCity == "MUM") {
      this.branches = [
        {
          name: "AND",
          value: "S.V. Road, Andheri (West)"
        },
        {
          name: "BAN",
          value: "Bandra-Kurla Complex"
        }
      ];
    } else if (selectedCity.value == "PUN" || selectedCity == "PUN") {
      this.branches = [
        {
          name: "HAD",
          value: "Hadapsar"
        },
        {
          name: "WAG",
          value: "Wagholi"
        }
      ];
    } else if (selectedCity.value == "HYD" || selectedCity == "HYD") {
      this.branches = [
        {
          name: "FIN",
          value: "Financial District Branch"
        },
        {
          name: "JUB",
          value: "Road No.36 Jubilee Hills"
        }
      ];
    } else if (selectedCity.value == "WAR" || selectedCity == "WAR") {
      this.branches = [
        {
          name: "WAR",
          value: "Warangal"
        },
        {
          name: "HAN",
          value: "Hanumakonda"
        }
      ];
    } else if (selectedCity.value == "VIJ" || selectedCity == "VIJ") {
      this.branches = [
        {
          name: "ELR",
          value: "Eluru Road"
        },
        {
          name: "MOG",
          value: "Moghalrajapuram"
        }
      ];
    } else if (selectedCity.value == "GNT" || selectedCity == "GNT") {
      this.branches = [
        {
          name: "MAN",
          value: "Mangalagiri"
        },
        {
          name: "LAK",
          value: "Lakshmipuram, Guntur"
        }
      ];
    }
  }

  onBranchChange(selectedBranch: any) {
    this.ifscCode = "";
    for (var i = 0; i < this.ifscCodes.length; i++) {
      let ifscCodeObj = this.ifscCodes[i]
      if (ifscCodeObj && ifscCodeObj.name === selectedBranch.value) {
        this.ifscCode = ifscCodeObj.value;
      }
    }
    //this.ifscCode = this.getIfscCodeValue(selectedBranch.value);

  }
  getIfscCodeValue(selectedBranchName: string) {
    for (var i = 0; i < this.ifscCodes.length; i++) {
      let ifscCodeObj = this.ifscCodes[i]
      if (ifscCodeObj) {
        this.ifscCode = ifscCodeObj.value;
      }
    }
    //var ifscCodeObj = this.ifscCodes.filter((code:any) => code.name === selectedBranchName);
    //return ifscCodeObj.value;
  }

  onIFSCCodeChange(ifscCode: any) {
    var ifscCode = ifscCode.target.value;
    if (ifscCode == 'UTIB0000740') {
      this.selectedState = "MH";
      this.onStateChange("MH");
      this.selectedCity = "MUM";
      this.onCityChange("MUM");
      this.ifscCode = "UTIB0000740";
      this.selectedBranch = "AND";
    } else if (ifscCode == 'UTIB0000230') {
      this.selectedState = "MH";
      this.onStateChange("MH");
      this.selectedCity = "MUM";
      this.onCityChange("MUM");
      this.ifscCode = "UTIB0000230";
      this.selectedBranch = "BAN";
    } else if (ifscCode == 'UTIB0000404') {
      this.selectedState = "MH";
      this.onStateChange("MH");
      this.selectedCity = "PUN";
      this.onCityChange("PUN");
      this.ifscCode = "UTIB0000404";
      this.selectedBranch = "HAD";
    } else if (ifscCode == 'UTIB0003191') {
      this.selectedState = "MH";
      this.onStateChange("MH");
      this.selectedCity = "PUN";
      this.onCityChange("PUN");
      this.ifscCode = "UTIB0003191";
      this.selectedBranch = "WAG";
    } else if (ifscCode == 'UTIB0003063') {
      this.selectedState = "TS";
      this.onStateChange("TS");
      this.selectedCity = "HYD";
      this.onCityChange("HYD");
      this.ifscCode = "UTIB0003063";
      this.selectedBranch = "FIN";
    } else if (ifscCode == 'UTIB0001463') {
      this.selectedState = "TS";
      this.onStateChange("TS");
      this.selectedCity = "HYD";
      this.onCityChange("HYD");
      this.ifscCode = "UTIB0001463";
      this.selectedBranch = "JUB";
    }
  }

  getOwnerDetails() {
    // this.showVerifyDetails = true;
    this.showOwnerDetails = false;
    this.hideProceedBtn = true;
  }
  onOtpChange(otp: any) {
    this.otp = otp;
  }

  radioButtonChange(event: MatRadioChange) {
    if (event.value == "2")
      this.isIFSCSelected = false;
    else
      this.isIFSCSelected = true;

  }
  profilePicName!: string;
  uploadDocImageURL!: any;
  profilePicUrl!: any;
  hasProfileUploaded = false;

  uploadProfilePic(event: any) {
    let file = event.target.files[0];
    // this.profilePicName = file?.name;
    this.readUploadFile(file);
  }
  uploadConfirm(val: boolean) {
    this.hasUploaded = false;
    if (val) {
      this.hasUploaded = true;
    }
  }
  profilePicAdded(val: boolean) {
    this.hasProfileUploaded = false;
    if (val) {
      this.hasProfileUploaded = true;
    }
  }

  uploadFile(event: any) {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file); // toBase64
    reader.onload = () => {
      this.uploadDocImageURL = reader.result as string; // base64 Image src
    };
    this.uploadConfirm(true);
  }
  deleteUploadedDoc(type: string) {
    if (type == "SIGN") {
      this.uploadDocImageURL = null;
      this.uploadConfirm(false);
    } else {
      this.profilePicUrl = null;
      this.profilePicAdded(false);
    }

  }
  openCamera() {
    const dialogRef = this.dialog.open(VideoCallComponent, {
      width: '760px',
      height: '600px',
      disableClose: true,
      hasBackdrop: true,
      data: { isTakePic: true }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        let file = this.dataURItoBlobFile(result, "profile.jpeg");
        this.readUploadFile(file);
      }
    });
  }
  dataURItoBlobFile(dataURI: any, fileName: string): File {
    let byteString: any;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = window.atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ia], fileName, { type: mimeString });
  }
  readUploadFile(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file); // toBase64
    reader.onload = () => {
      this.profilePicUrl = reader.result as string; // base64 Image src
    };
    this.profilePicAdded(true);
  }
  clearTimer() { clearInterval(this.intervalId); }
  start() { this.countDown(); }
  stop() {
    this.clearTimer();
  }

  public countDown() {
    this.clearTimer();
    window.setTimeout(() => {
      if (this.isReadytoCall) {
        // this.router.navigate(['video']);
        this.modalClose.nativeElement.click();
        let bg: string = 'bottomSheetBG'
        const dialogRef = this.dialog.open(VideoCallComponent, {
          width: '760px',
          height: '600px',
          disableClose: true,
          hasBackdrop: true,
          backdropClass: bg,
          data: { isTakePic: false }
        });
      }
    }, 30000);
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.stop();
      }
    }, 1000);

  }
  gotoSchedule() {
    this.isReadytoCall = false;
    this.router.navigate(["timeslot"])
  }
  verifyDocument() {
    this.ownerDetails.dob = new Date("12-10-2000");
    this.ownerDetails.gender = "Male";
    this.ownerDetails.name = "Sri Ram";
  }
  goBack(stepper: MatStepper) {
    if (this.selectedIndex == 0) {
      this.router.navigate(["identity"]);
    } else {
      stepper.previous();
    }
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }
}

export class GstnDetailsObj {
  gstn!: string;
  legalName!: string;
  businessEntity!: string;
  tradingBusinessName!: string;
  businessTurnover!: string;
  businessDescType!: string;
  occupationCode!: string;
  district!: string;
  state!: string;
  city!: string;
  pincode!: string;
}
export class OwnerDetails {
  aadhar!: string;
  dob!: Date;
  gender!: string;
  name!: string;
}