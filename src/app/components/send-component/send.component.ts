import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, EventEmitter, Output } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: 'app-send',
    templateUrl: 'send.component.html',
    styleUrls: ['send.component.scss'],
    imports: [IonicModule, CommonModule],
    standalone: true
})
export class SendComponent {
    message: string = '';
    selectedImage: SafeResourceUrl | null = null;
    selectedImageBlob: Blob | null = null;
    isSelectImage: boolean = false;


    constructor(
        private cdr : ChangeDetectorRef
    ){}


    @Output() sendMessage = new EventEmitter<{ message: string, image: Blob | null }>();

    onMessageInput(event: Event): void {
        this.message = (event.target as HTMLInputElement).value;
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
        this.selectedImage = 'PRDDDDD';
        this.selectedImageBlob = null;
        this.isSelectImage = false;
    }
    
    onImageSelected(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.selectedImageBlob = file;
            const reader = new FileReader();
            reader.onload = () => {
                this.selectedImage = reader.result;
                this.isSelectImage = true;
            };
            reader.readAsDataURL(file);
        }
    }
}
