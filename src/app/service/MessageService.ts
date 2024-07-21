import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private messages: Array<any> = [];


    setMessage = (messages: Array<any>) => {
        this.messages = messages
    }

    getMessages = () =>{
        return this.messages;
    }
}