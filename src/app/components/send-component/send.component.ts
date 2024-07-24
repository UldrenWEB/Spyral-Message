import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { IonicModule, Platform } from "@ionic/angular";
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import {Media, MediaObject} from '@awesome-cordova-plugins/media/ngx';
import {Filesystem, Directory, Encoding} from '@capacitor/filesystem'


@Component({
    selector: 'app-send',
    templateUrl: 'send.component.html',
    styleUrls: ['send.component.scss'],
    imports: [IonicModule, CommonModule],
    providers:[Media, AndroidPermissions],
    standalone: true
})
export class SendComponent {
    message: string = '';
    selectedImage: SafeResourceUrl | null = null;
    selectedImageBlob: Blob | null = null;
    isSelectImage: boolean = false;
    private mediaRecorder: MediaRecorder | null = null;
    private audioChunks: BlobPart[] = [];

    private filePath: string | null = null;
    private file: MediaObject | null = null;

    constructor(
        private sanitizer: DomSanitizer,
        private platform: Platform,
        private media: Media,
        private androidPermissions: AndroidPermissions
    ){}


    @Output() sendMessage = new EventEmitter<{ message: string, image: Blob | null }>();

    onMessageInput(event: Event): void {
        this.message = (event.target as HTMLInputElement).value;
    }

    

    async onRecording() {
        try {
          await this.requestPermission();
          await this.startRecording();
          console.log('Pudo empezar a grabar');
    
          setTimeout(async () => {
            const blob = await this.stopRecording();
            const src = URL.createObjectURL(blob);
            const audio = new Audio();
            audio.src = src;
            audio.play();
          }, 3000);
        } catch (error : any) {
          console.error('Error al grabar audio: ', error.message);
        }
      }


    async requestPermission(): Promise<void> {
        const permission = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO);
        const readPerm = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
    
        if (!permission.hasPermission || !readPerm.hasPermission) {
          const result = await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO);
          const result2 = await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
          if (!result.hasPermission || result2.hasPermission) {
            throw new Error('Permission to access microphone is required or external storage.');
          }
        }
      }

      async startRecording(): Promise<void> {
        const fileName = `recording_${new Date().getTime()}.mp3`;
    
        this.filePath = `${Directory.Documents}/${fileName}`;
    
        // Create an empty file to ensure the path exists
        await Filesystem.writeFile({
          path: fileName,
          directory: Directory.Documents,
          data: '',
          encoding: Encoding.UTF8
        });
    
        this.file = this.media.create(this.filePath);
        this.file.startRecord();
      }
    
      async stopRecording(): Promise<Blob> {
        return new Promise((resolve, reject) => {
          if (!this.file) {
            reject('No media recorder available');
            return;
          }
    
          this.file.stopRecord();
          this.file.release();
    
          if (this.filePath) {
            const fileName = this.filePath.split('/').pop();
    
            Filesystem.readFile({
              path: fileName as string,
              directory: Directory.Documents
            }).then(result => {
              const blob = this.base64ToBlob(result.data as string, 'audio/mp3');
              resolve(blob);
            }).catch(reject);
          } else {
            reject('File path is null');
          }
        });
      }


      base64ToBlob(base64: string, contentType: string): Blob {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
      }


    onSend(): void {
        if (this.message.trim() || this.selectedImageBlob) {
            this.sendMessage.emit({ message: this.message.trim(), image: this.selectedImageBlob });
            this.message = '';
            this.selectedImage = null;
            this.selectedImageBlob = null;
            this.isSelectImage = false;
        }
    }

    close(){
        this.message = '';
        this.selectedImage = '';
        this.selectedImageBlob = null;
        this.isSelectImage = false;
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

    
    async onSelectImage(){
        try {
            const image: Photo = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.Uri,
              source: CameraSource.Photos
            });
      
            if (image && image.webPath) {
              this.selectedImage = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
              this.selectedImageBlob = await this.convertBlobUrlToBlob(image.webPath);
              this.isSelectImage = true;
            } else {
              console.log('El resultado de las fotos es vacío');
            }
          } catch (error) {
            console.error('Error seleccionando la imagen: ', error);
          }
      }
}
