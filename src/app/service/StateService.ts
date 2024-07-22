import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StateService {
    private arrayImages: Array<{image: string, description: string}> = [];

    setArrayImages(images: Array<{image: string, description: string}>){
        this.arrayImages = images;
    }

    getArrayImage(){
        return this.arrayImages;
    }
}