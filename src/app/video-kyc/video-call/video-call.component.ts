import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements OnInit {
  WIDTH = 500;
  HEIGHT = 400;

  @ViewChild("video")
  public video!: ElementRef;

  @ViewChild("canvas")
  public canvas!: ElementRef;

  captures: string[] = [];
  error: any;
  isCaptured!: boolean;

  constructor(public dialogRef: MatDialogRef<VideoCallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.setupDevices();
  }

  // async ngAfterViewInit() {

  // }
  stream: any;
  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (this.stream) {
          this.video.nativeElement.srcObject = this.stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture(flag: boolean) {
    this.drawImageToCanvas(this.video.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    this.isCaptured = true;
    this.submitImg();
    if (!flag) {
      this.router.navigate(["success/done"]);
    }

  }

  removeCurrent() {
    this.isCaptured = false;
  }
  image: any;
  setPhoto(idx: number) {
    this.isCaptured = true;
    this.image = new Image();
    this.image.src = this.captures[idx];
    this.drawImageToCanvas(this.image);
  }
  submitImg() {
    if (!this.image?.src) {
      this.image = new Image();
      this.image.src = this.captures[0];
    }
    this.dialogRef.close(this.image?.src);
  }
  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }
  closeDialog() {
    this.dialogRef.close();
  }
  vidOff() {
    this.video?.nativeElement?.pause();
    this.video.nativeElement.src = "";
    this.stream?.getTracks()[0]?.stop();
  }
  ngOnDestroy() {
    this.vidOff();
  }
}