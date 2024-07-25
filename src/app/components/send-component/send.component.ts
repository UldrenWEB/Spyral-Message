import { CommonModule } from "@angular/common";
import { Component,  EventEmitter, Output } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { AlertController, IonicModule, Platform } from "@ionic/angular";

@Component({
    selector: 'app-send',
    templateUrl: 'send.component.html',
    styleUrls: ['send.component.scss'],
    imports: [IonicModule, CommonModule],
    providers: [],
    standalone: true
})
export class SendComponent{
    message: string = '';
    selectedImage: SafeResourceUrl | null = null;
    selectedImageBlob: Blob | null = null;
    isSelectImage: boolean = false;

    // Audio
    private mediaRecorder: MediaRecorder | null = null;
    private audioChunks: BlobPart[] = [];
    duration: number = 0;
    durationDisplay: string = '';
    recording: boolean = false;
    private pressTimeout: any;
    private isLongPress: boolean = false;
    private audioBlob: Blob | null = null;

    constructor(
        private sanitizer: DomSanitizer,
        private platform: Platform,
        private alertController: AlertController
    ) {}

    @Output() sendMessage = new EventEmitter<{ message: string, image: Blob | null, audio: Blob | null }>();
    calculateDuration = () => {
        if (!this.recording) {
            this.duration = 0;
            this.durationDisplay = '';
            return;
        }
        this.duration += 1;
        const minutes = Math.floor(this.duration / 60);
        const seconds = (this.duration % 60).toString().padStart(2, '0');
        this.durationDisplay = `${minutes}:${seconds}`;
        setTimeout(this.calculateDuration, 1000);
    }

    onMessageInput(event: Event): void {
        this.message = (event.target as HTMLInputElement).value;
    }

    async startRecording(): Promise<void> {
        if (this.recording) {
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            };

            this.mediaRecorder.onstop = () => {
                this.recording = false;
            };

            this.mediaRecorder.start();
            this.recording = true;
        } catch (error) {
            console.error('Error al iniciar la grabación:', error);
            this.recording = false;
        }
    }

    stopRecording(): Promise<Blob> {
        return new Promise((resolve, reject) => {
            if (!this.mediaRecorder) {
                return;
            }

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                this.audioChunks = [];
                resolve(audioBlob);
                
            };

            this.mediaRecorder.stop();
            this.recording = false;
        });
    }

    onMicPress() {
        this.isLongPress = false;
        this.pressTimeout = setTimeout(async () => {
            this.isLongPress = true;
            Haptics.impact({ style: ImpactStyle.Light });
            try {
                await this.startRecording();
                this.calculateDuration();
            } catch (error: any) {
                console.error(`Hubo un error: ${error.message}`);
            }
        }, 1000);
    }

    async onMicRelease() {
        clearTimeout(this.pressTimeout);
        if (!this.isLongPress) {
            return;
        }

        Haptics.impact({ style: ImpactStyle.Light });
        try {
            const blob = await this.stopRecording();
            this.audioBlob = blob;

            await this.presentAlert();
        } catch (error) {
            console.error(`Error stopping recording: ${error}`);
        }
    }

    onMicCancel() {
        clearTimeout(this.pressTimeout);
        console.log('Mic press cancelled');
    }

    onSend(): void {
      if (this.message.trim() || this.selectedImageBlob || this.audioBlob) {
          this.sendMessage.emit({ message: this.message.trim(), image: this.selectedImageBlob, audio: this.audioBlob  });
          this.message = '';
          this.selectedImage = null;
          this.selectedImageBlob = null;
          this.audioBlob = null;
          this.isSelectImage = false;
      }
    }

    close() {
        this.message = '';
        this.selectedImage = null;
        this.selectedImageBlob = null;
        this.isSelectImage = false;
        this.audioBlob = null;
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

    async onSelectImage() {
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

    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Do you want to send this note?',
        cssClass: 'custom-alert',
        buttons: this.alertButtons
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }


    public alertButtons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Se retorno, no envia audio')
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.onSend();
        },
      },
    ];
  
    setResult(ev: any) {
      console.log(`Dismissed with role: ${ev.detail.role}`);
    }
}
