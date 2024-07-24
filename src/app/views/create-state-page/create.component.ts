import { Component } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";

@Component({
    selector: 'app-create-state',
    templateUrl: 'create.component.html',
    styleUrls: ['create.component.scss'],
})
export class CreateStatePage{
    imageBlob: Blob | null = null;
    selectImage: boolean = false;
    srcImage: SafeResourceUrl | undefined;

    //Input
    regexDescription: string = '.{1,}';
    descriptionValue: string = '';
    isValidDescription: boolean = false;
  
    onValueChangeDescription(newValue: string) {
      this.descriptionValue = newValue;
      this.isValidDescription = new RegExp(this.regexDescription).test(newValue);
    }

    constructor(
        private router: Router
    ){}


    backView = () => {
        this.router.navigate(['/tabs/states'])
    }

    //Aqui se subira ese estado
    onClick = () => {
        console.log('Se subio el estado')
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