// src/app/service/SocketService.ts
import { Injectable } from "@angular/core";
import { io, Socket } from 'socket.io-client';
import { Observable } from "rxjs";
import { base_url_socket } from "../constants/URL";
import { CallService } from "./CallService";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor(private callService: CallService) {
    this.socket = io(base_url_socket);

    this.socket.on('connect', () => {
      console.log('Conectado al servidor de sockets');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Error de conexión al servidor de sockets:', error);
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor de sockets');
    });
  }

  joinChat(chatId: string): void {
    this.socket.emit('joinChat', chatId);
  }

  sendMessage = async ({description, multimedia = null, chatId, userId}: {description: string, multimedia: {file: Blob | null, type: string} | null, chatId: string, userId: string}) => {
    try {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('chatId', chatId);
      formData.append('userId', userId);
      if (multimedia && multimedia.file) {
        formData.append('multimedia', multimedia.file);
      }

      const result = await this.callService.callToFormData({
        method: 'post',
        endPoint: 'sendMessage',
        formData: formData
      });
      if (!result) return false;

      return true;
    } catch (error: any) {
      throw new Error(`Error al enviar mensaje ${error.message}`);
    }
  }

  onMessage(event: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(event, (data: any) => {
        console.log(`Evento ${event} recibido:`, data);
        observer.next(data);
      });
    });
  }
}
