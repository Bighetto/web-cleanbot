import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client | undefined;
  private messageSubject: Subject<string> = new Subject<string>();

  constructor() {}

  connect(email: string) {
    const brokerURL = `ws://localhost:8080/ws-logs?email=${encodeURIComponent(email)}`;

    this.stompClient = new Client({
      brokerURL,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Conectado ao WebSocket:', frame);

      this.stompClient?.subscribe('/user/queue/logs', (message: Message) => {
        this.messageSubject.next(message.body);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Erro no STOMP:', frame);
    };

    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
    }
  }

  sendMessage(message: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/send',
        body: JSON.stringify(message)
      });
    }
  }

  get messages$() {
    return this.messageSubject.asObservable();
  }

  close() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
