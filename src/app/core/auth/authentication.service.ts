import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isLoggedIn(){
    let token = localStorage.getItem('myToken');
    if(token){
      return true;
    }else{
      return false;
    }
  }

  getDataFromToken(){
    let token = localStorage.getItem('myToken');
    if(token){
      let role = JSON.parse( window.atob( token.split('.')[1] ) ) ; 
      //console.log('Role is : '+user);
      return role ; 
    }
  }



}
