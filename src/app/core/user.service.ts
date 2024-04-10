import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {



 apiUrl ="http://localhost:3000" ; 

  constructor(private http : HttpClient) { }

  
  signin(user : any) {
    return this.http.post(this.apiUrl+'/user/signin',user);
  }

  getUsers(){
    return this.http.get(this.apiUrl+'/user/users');
  }

  getUserById(userId: any){
    return this.http.get(this.apiUrl+'/user/users/'+userId);
  }

  createUser(user: any){
    return this.http.post(this.apiUrl+'/user/create', user);
  }

  updateUser(id: any , user : any){
    return this.http.put(this.apiUrl+'/user/users/'+id, user);
  }

  deleteUser(userId:any){
    return this.http.delete(this.apiUrl+'/user/users/'+userId);
  }




}
