import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<Array<any>>([]);
  messages$ = this.messagesSubject.asObservable();

  private chatIdSubject = new BehaviorSubject<string | null>(null);
    chatId$ = this.chatIdSubject.asObservable();

  private messages: Array<any> = [];

  setMessages(messages: Array<any>) {
    this.messages = messages;
    this.messagesSubject.next(this.messages);
  }

  addMessage(newMessage: any) {
    this.messages.push(newMessage);
    this.messagesSubject.next(this.messages);
  }

    setChatId = (chatId: string) => {
        this.chatIdSubject.next(chatId);
    }

    getChatId = () => {
        return this.chatIdSubject.getValue();
    }

}
