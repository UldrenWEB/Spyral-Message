import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { StorageService } from "src/app/service/StorageService";

@Component({
    selector: 'app-message-item',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.scss'],
    imports: [IonicModule, CommonModule],
    standalone: true
})
export class MessageItemComponent implements OnInit{
    user: {id: string, username: string, email: string, image: string} = {
        id: '',
        username: '',
        email:'',
        image: ''
    }

    constructor(
        private storageService: StorageService
    ){}

    async ngOnInit(): Promise<void> {
        const result = await this.storageService.get('user');
        const { user } = JSON.parse(result);
        this.user = user;
    }

    @Input() id: string = '';
    @Input() userEmitter: {id: string, name: string} = {id:'', name: ''};
    @Input() multimedia: {url: string, type: 'audio' | 'video' | 'image'} | null = null;
    @Input() description: string = '';
    @Input() timestamp: string = '2023-07-21T14:48:00.000Z';

    isCurrentUser(): boolean {
        return this.user.id === this.userEmitter.id;
    }

    formatTimestamp(timestamp: string): string {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
        return strTime;
    }
}