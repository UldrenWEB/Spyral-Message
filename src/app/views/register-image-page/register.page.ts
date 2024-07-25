import { Component, OnInit } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { CallService } from "src/app/service/CallService";
import { RegisterService } from "src/app/service/RegisterService";


@Component({
    selector: 'app-register-image',
    templateUrl: 'register.page.html',
    styleUrls: ['register.page.scss']
})
export class RegisterImagePage implements OnInit {
    imageBlob: Blob | null = null;
    selectImage: boolean = false;
    srcImage: SafeResourceUrl | undefined;
    user: {username: string, password: string, email: string} = {username: '', password:'', email: ''};

    alertCode: number = 0;
    alertMessage: string = '';
    showAlert: boolean = false;
    private isShow: boolean = false;


    constructor(
        private router: Router,
        private registerService: RegisterService,
        private callService: CallService
    ){}

    ngOnInit(): void {
      this.user = this.registerService.getUser();
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

    backView = () => {
      this.router.navigate(['/register'])
    }

    //Aqui se subira ese estado
    onClick = async () => {
        try{
          const formdata = new FormData();
          formdata.append('username', this.user.username);
          formdata.append('email', this.user.email);
          formdata.append('password', this.user.password);
          formdata.append('profile_picture', this.imageBlob || '');

          const result = await this.callService.callToFormData({
            formData: formdata,
            endPoint:'register',
            method: 'post'
          })

          this.#showMessageBar(result.message['description'], result.message['code'])
          if(result.message['code'] == 1 || result.message['code'] == 3 ){
            return; 
          }

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 600);
        }catch(error: any){
          return this.#showMessageBar('An error occurred while registering user', 1);
        }
            
    }
    
    async openImagePicker() {
      try {
        const image: Photo = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Photos
        });
  
        if (image && image.webPath) {
          this.selectImage = true;
          const imagePath = image.webPath;
  
          this.imageBlob = await this.convertBlobUrlToBlob(imagePath);
          this.srcImage = URL.createObjectURL(this.imageBlob as Blob);
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