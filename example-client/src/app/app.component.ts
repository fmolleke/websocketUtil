import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  messages: string[] = [];
  
  constructor(private _websocketService: WebsocketService) {
    this.subscribeMessages();
  }

  subscribeMessages() {
    this._websocketService.getMessages().subscribe(res => {
      this.messages.push(res);
    });
  }
}
