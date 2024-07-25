import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Chat {
  id: string;
  name: string;
  users: string[];
  messages: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chats = new BehaviorSubject<Map<string, Chat>>(new Map());
  chats$ = this.chats.asObservable();

  getChats(): Map<string, Chat> {
    return this.chats.getValue();
  }

  setChats(newChats: Map<string, Chat>): void {
    this.chats.next(newChats);
  }

  addChat(chat: Chat): void {
    const currentChats = this.getChats();
    if (currentChats instanceof Map) {
      currentChats.set(chat.id, chat);
      this.setChats(currentChats);
    } else {
      console.error('currentChats is not an instance of Map');
    }
  }

  getChatById(chatId: string): Chat | undefined {
    return this.getChats().get(chatId);
  }

  addMessageToChat(chatId: string, message: any): void {
    const currentChats = this.getChats();
    const chat = currentChats.get(chatId);
    if (chat) {
      chat.messages.push(message);
      currentChats.set(chatId, chat);
      this.setChats(currentChats);
    } else {
      console.error(`Chat with id ${chatId} not found`);
    }
  }

  removeChat(chatId: string): void {
    const currentChats = this.getChats();
    currentChats.delete(chatId);
    this.setChats(currentChats);
  }

  removeMessageFromChat(chatId: string, index: number): void {
    const currentChats = this.getChats();
    const chat = currentChats.get(chatId);
    if (chat) {
      chat.messages = chat.messages.filter((_, i) => i !== index);
      currentChats.set(chatId, chat);
      this.setChats(currentChats);
    } else {
      console.error(`Chat with id ${chatId} not found`);
    }
  }
}
