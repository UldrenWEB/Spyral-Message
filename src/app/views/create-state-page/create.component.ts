import { Component, OnInit } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { CallService } from "src/app/service/CallService";
import { StorageService } from "src/app/service/StorageService";

@Component({
    selector: 'app-create-state',
    templateUrl: 'create.component.html',
    styleUrls: ['create.component.scss'],
})
export class CreateStatePage implements OnInit{
    imageBlob: Blob | null = null;
    selectImage: boolean = false;
    srcImage: SafeResourceUrl | undefined;
    userId: string = '';

    //Input
    regexDescription: string = '.{1,}';
    descriptionValue: string = '';
    isValidDescription: boolean = false;

    showAlert: boolean = false;
    alertMessage: string = '';
    alertCode: number = 0;
    private isShow: Boolean = false;

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
  
    onValueChangeDescription(newValue: string) {
      this.descriptionValue = newValue;
      this.isValidDescription = new RegExp(this.regexDescription).test(newValue);
    }


    async ngOnInit(): Promise<void> {
      try{
        const response = await this.storageService.get('user');
        const {user} = JSON.parse(response);  
        this.userId = user.id;
      }catch(error){
        return;
      }
    }

    constructor(
        private router: Router,
        private callService: CallService,
        private storageService: StorageService
    ){}


    backView = () => {
        this.router.navigate(['/tabs/states'])
    }

    //Aqui se subira ese estado
    onClick = async () => {
      if(!this.selectImage){
        return this.#showMessageBar('You must at least upload some fields', 3);
      }

      try {
        const formData = new FormData();
        formData.append('description', this.descriptionValue);
        formData.append('multimedia', this.imageBlob || '');

        const result = await this.callService.callToFormData({
          method: 'post',
          formData,
          endPoint: 'uploadState'
        })
        this.#showMessageBar(result['message'].description, result['message'].code);
        if(result['message'].code == 1 || result['message'].code == 3){
          return;
        }
        this.resetProps();
      } catch (error) {
        return this.#showMessageBar('There was an error uploading a status', 1);
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

  resetProps = () => {
    this.imageBlob = null;
    this.selectImage = false;
    this.descriptionValue = '';
  }
  
}