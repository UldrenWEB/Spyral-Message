import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { Keyboard } from "@capacitor/keyboard";
import { Platform } from "@ionic/angular";
import { CallService } from "src/app/service/CallService";
import { StorageService } from "src/app/service/StorageService";


@Component({
    selector: 'app-profile',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit{
    constructor(
      private router: Router,
      private platform: Platform, 
      private storageService: StorageService,
      private sanitizer: DomSanitizer,
      private callService: CallService
    ){}

    public alertButtons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: async () => {
          const result = await this.callService.call({
            method:'delete',
            isToken: true,
            body: {},
            endPoint: 'deleteAccount'
          })
          this.#showMessageBar(result.message['description'], result.message['code']);
          if(result.message['code'] == 1 || result.message['code'] == 3){
            return;
          }

          this.router.navigate(['/login'])
        },
      },
    ];

    
    
    async ngOnInit() {
      this.setupKeyboardListener();
      const userString = await this.storageService.get('user');
      const user = JSON.parse(userString);
      this.user = user;

      this.username = user['user'].username;
      this.email = user['user'].email;
      this.image = user['user'].image;

      this.usernameValue = this.username;
      this.emailValue = this.email;
    }
    
    user : any = {};
    username: string = '';
    email: string = '';
    image: SafeResourceUrl = '';
    imageBlob: Blob | null = null;
    

    usernameValue: string = '';
    passwordValue: string = '';
    emailValue: string = '';
    
    //MessageBar
    alertCode: number = 0;
    alertMessage: string = '';
    showAlert: boolean = false;
    private isShow: boolean = false;


    //Checkers
    isValidEmail: boolean = false;
    isValidPassword: boolean = false;
    isValidUsername: boolean = false;
    selectImage: boolean = false;
    
    //Regex
    regexUsername: string = '.{5,}';
    regexEmail: string = '[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}';
    regexPassword: string = '.{8,}'


  setupKeyboardListener() {
    if (this.platform.is('capacitor')) {
      Keyboard.addListener('keyboardWillShow', (info) => {
        const containerInput = document.querySelector('.container-input');
        if (containerInput instanceof HTMLElement) {
          containerInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
          containerInput.style.paddingBottom = `${info.keyboardHeight}px`;
        }
      });
  
      Keyboard.addListener('keyboardWillHide', () => {
        const containerInput = document.querySelector('.container-input');
        if (containerInput instanceof HTMLElement) {
          containerInput.style.paddingBottom = '0';
        }
      });
    }
  }

    //Inicio de Funciones OnChange
    onValueChangeUsername(newValue: string){
        this.usernameValue = newValue;
        this.isValidUsername = new RegExp(this.regexUsername).test(newValue);
    }

    onValueChangeEmail(newValue: string) {
        this.emailValue = newValue;
        this.isValidEmail = new RegExp(this.regexEmail).test(newValue);
    }
    
    onValueChangePassword(newValue: string) {
        this.passwordValue = newValue;
        this.isValidPassword = new RegExp(this.regexPassword).test(newValue)
    }
    //Fin de Funciones OnChange

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


    onSaveUser = async () => {
      if(this.usernameValue === this.username && this.email === this.emailValue){
        this.#showMessageBar('You must edit something', 3);
        return;
      }

      this.storageService.set('user', JSON.stringify({
        user : {
          username: this.usernameValue,
          email: this.emailValue,
          image: this.image
        },
      }))

      const formData = new FormData();
      formData.append('username', this.usernameValue);
      formData.append('email', this.emailValue);
      if(this.passwordValue.length >= 1){
        formData.append('password', this.passwordValue);
      }
      
      const result = await this.callService.callToFormData({
        method: 'put',
        endPoint: 'editProfile',
        formData: formData
      })

      this.#showMessageBar(result.message['description'], result.message['code']);
      if(result.message['code'] == 1 || result.message['code'] == 3){
        return;
      }
      return;
    }

    onSaveImage = async () => {
      if(!this.selectImage){
        this.#showMessageBar('You must select a different photo', 3);
        return;
      }

      try{
        const formData = new FormData();
        formData.append('profile_picture', this.imageBlob || '');

        const result = await this.callService.callToFormData({
          endPoint: 'editProfile',
          formData: formData,
          method: 'put'
        })

        this.#showMessageBar(result['message'].description, result['message'].code);
        if(result['message'].code == 1 || result['message'].code == 3){
          return;
        }

        this.storageService.set('user', JSON.stringify({
          user: {
            username: this.username,
            email: this.email,
            image: ''
          }
        }))
      }catch(error){
        this.#showMessageBar('An error occurred while saving the image', 1);
      }
    }

  async onDelete(){
    // const result = await this.callService.call({
    //   method: 'delete',
    //   body: null,
    //   isToken: true,
    //   endPoint: 'deleteAccount'
    // })

    // this.#showMessageBar(result.message['description'], result.message['code']);
    // if(result.message['code'] == 1 || result.message['code'] == 3){
    //   return;
    // }

    // setTimeout(() => {
    //   this.router.navigate(['/login'])
    // }, 600)
  }

  async onSelectImage(){
    try {
        const image: Photo = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Photos
        });
  
        if (image && image.webPath) {
          this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
          this.imageBlob = await this.convertBlobUrlToBlob(image.webPath);
          this.selectImage = true;
        } else {
          console.log('El resultado de las fotos es vacío');
        }
      } catch (error) {
        console.error('Error seleccionando la imagen: ', error);
      }
  }

  async convertBlobUrlToBlob(blobUrl: string): Promise<Blob | null> {
    try {
      const response = await fetch(blobUrl);
      if (!response.ok) throw new Error('Network response was not ok.');
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error fetching blob:', error);
      return null;
    }
  }


}