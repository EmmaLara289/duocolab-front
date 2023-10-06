import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckUser {
	//Admin: boolean =true;
	//Admin: boolean =false;
	//Admin: boolean = undefined;
    //public key_role: number;
  	userData: any=[];
	login = false;
  	static key_role: number;
	  clearData() {
        this.userData = [];
		this.login = false;
    }
}
