import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class RegisterService{
    private user: any;

    setUser(user: any) {
        this.user = user;
    }

    getUser(){
        return this.user;
    }

}