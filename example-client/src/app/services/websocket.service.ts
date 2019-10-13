import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/websocket';


const SERVER_URL = 'ws://localhost:6001';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket$: WebSocketSubject<any>;
  messages$: EventEmitter<string>;

  constructor() {
    this.messages$ = new EventEmitter<string>();
    this.initWebsockets();
  }

  initWebsockets() {
    this.socket$ = webSocket(SERVER_URL);

    this.socket$.subscribe(
      (message) => this.messages$.emit(message),
      (err) => console.error(err),
      () => console.warn('Completed!')
    );
  }

  getMessages(): Observable<string> {
    return this.messages$;
  }
}
