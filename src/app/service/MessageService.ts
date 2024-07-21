import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private messages: Array<any> = [];
    private name: string | null = null;


    setMessage = (messages: Array<any>) => {
        this.messages = messages
    }

    setName = (name: string | null) => {
        this.name = name;
    }

    getName = () => {
        return this.name;
    }

    getMessages = () =>{
        return this.messages;
    }
}