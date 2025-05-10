// web-socket-service.service.ts
import { Injectable } from '@angular/core';
import { Client, Message, StompSubscription } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  private messageSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws-logs',
      reconnectDelay: 5000,
      debug: (str) => console.log(str)
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Conectado ao WebSocket:', frame);
      this.stompClient.subscribe('/topic/logs', (message: Message) => {
        this.messageSubject.next(message.body);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Erro no STOMP:', frame);
    };
  }

  connect() {
    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient.connected) {
      this.stompClient.deactivate();
    }
  }

  sendMessage(message: any) {
    if (this.stompClient.connected) {
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
    this.stompClient.deactivate();
  }
}
