import { Component } from '@angular/core';
import { VideoCallComponent } from './video-call/video-call.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-video-kyc',
  templateUrl: './video-kyc.component.html',
  styleUrls: ['./video-kyc.component.scss']
})
export class VideoKycComponent {
  constructor(public dialog: MatDialog){}
  gotoCall() {
    const dialogRef = this.dialog.open(VideoCallComponent, {
      width: '760px',
      height: '600px',
      disableClose: true
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     let file = this.dataURItoBlobFile(result, "profile.jpeg");
    //     console.log(file);
    //     const documentData = new FormData();
    //     documentData.append('prefixFolder', "MERCHANT_APPLICATION");
    //     documentData.append('filename', "profile.jpeg");
    //     documentData.append('title', 'Image');
    //     documentData.append('file', file);
    //     documentData.append('modelKey', this.obj.id);
    //     this.postService.postFile(documentData, this.uploadUrlPath)
    //       .subscribe((reponse: { object: TUpload; }) => {
    //         if (reponse.object) {
    //           this.obj.firstOwnerList.faceOfOwner = reponse.object;
    //           console.log("uploading success...");
    //         }
    //       });
    //     this.livelyness(result);
    //   }
    // });
  }
}
