import { Component } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";


@Component({
    selector: 'app-register-image',
    templateUrl: 'register.page.html',
    styleUrls: ['register.page.scss']
})
export class RegisterImagePage {
    imageBlob: Blob | null = null;
    selectImage: boolean = false;
    srcImage: SafeResourceUrl | undefined;

    constructor(
        private router: Router
    ){}


    backView = () => {
        this.router.navigate(['/register'])
    }

    //Aqui se subira ese estado
    onClick = () => {
        console.log('Se subio la imagen y se creo todo')

        //Si todo fue bien
        this.router.navigate(['/login']);
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