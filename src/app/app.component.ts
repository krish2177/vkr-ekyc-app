import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Axis Bank';
  constructor(private dialog: MatDialog) { }
  openChatbot() {
    this.dialog.open(ChatBotComponent,
      {
        width: '400px',
        height: '500px',
        position: { right: '8px', bottom: '8px' },
        hasBackdrop: false        
      });
  }
}
