import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from '../input-component/input.component';
import { ContactComponent } from '../contact-component/contact.component';
import { CallService } from 'src/app/service/CallService';
import { ChatService } from 'src/app/service/ChatService';
import { MessageBarComponent } from '../message-bar/message-bar.component';
import { StorageService } from 'src/app/service/StorageService';

@Component({
  selector: 'app-screen2',
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.scss'],
  imports: [IonicModule, CommonModule, InputComponent, ContactComponent, MessageBarComponent],
  standalone: true
})
export class GroupScreenComponent implements OnInit {

  constructor(
    private callService: CallService,
    private cdr: ChangeDetectorRef,
    private chatService: ChatService,
    private storageService: StorageService
  ){}


  @Output() navigate = new EventEmitter<number>();

  regexGroupName: string = '.{5,}';
  groupName: string = '';
  isValidGroupName: boolean = false;
  searchTxt:string = '';
  selectedContacts: string[] = [];
  contacts: Array<{id: string, name: string, image: string}> = [];
  filteredContacts: Array<{id: string, name: string, image: string}> = [];
  userId: string = '';


  //Prop alert
  showAlert: boolean = false;
  alertMessage: string = '';
  alertCode: number = 0;
  private isShow: Boolean = false;
  
  async ngOnInit(): Promise<void> {
    const response = await this.storageService.get('user');
    const {user} = JSON.parse(response);
    this.userId = user.id;
    const result = await this.callService.call({
      method: 'get',
      endPoint: 'allFriends',
      body: {},
      isToken: true
    })
    if(result['message'].code == 1 || result['message'].code == 3){
      return;
    }
    const data = result['data'];

    const contacts = (data ?? []).map((friend: any) => {
      return {
        id: friend.id,
        name: friend.username,
        image: friend['profile'].profile_picture
      }
    });

    this.contacts = contacts;
    this.filteredContacts = [...this.contacts];
    this.cdr.detectChanges();
  }

  #showMessageBar = (message: string, code : 0 | 1 | 3 = 0) => {
    if(this.isShow) return;
    
    this.isShow = true;
    this.alertCode = code;
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.isShow = false;
    }, 3000)
  }


  onValueChangeGroupName(newValue: string) {
    this.groupName = newValue;
    this.isValidGroupName = new RegExp(this.regexGroupName).test(newValue);
  }

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTxt = value;
    this.filteredContacts = this.contacts.filter(contact =>
        contact.name.toLowerCase().startsWith(this.searchTxt)
    );
  }

  onContactSelected(contactId: string) {
    const index = this.selectedContacts.indexOf(contactId);
    if (index >= 0) {
        this.selectedContacts.splice(index, 1);
    } else {
        this.selectedContacts.push(contactId);
    }
  }

  async onClick(){
    if(!this.isValidGroupName) return;

    try{
      const result = await this.callService.call({
        method: 'post',
        body:{
          name: this.groupName,
          status: true,
          idUser: [...this.selectedContacts, this.userId]
        },
        isToken: true,
        endPoint: 'createChat'
      })
      if(!result['chatId']){
        return this.#showMessageBar('Hubo un error', 1);
      }


      this.chatService.addChat({
        id: result['chatId'],
        users: (result['users'][0].id ?? []).map((e: any) =>  e.username),
        name: this.groupName,
        messages: []
      })
      this.groupName = '';
      return this.#showMessageBar('Group successfully created', 0);
    }catch(error){
      console.error(`QUe error es ${error}`)
      return this.#showMessageBar('An error occurred and the group could not be created.', 1);;
    }

  }


  previousScreen() {
    this.navigate.emit(1);
  }
}
