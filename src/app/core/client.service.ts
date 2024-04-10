import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


apiUrl ="http://localhost:3000" ; 

  constructor(private http : HttpClient) { }

  getClients(){
    return this.http.get(this.apiUrl+'/client/all');
  }

  getClientById(ClientId:any){
    return this.http.get(this.apiUrl+'/client/'+ClientId);
  }

  createClient(Client: any){
    return this.http.post(this.apiUrl+'/client/add', Client);
  }

  updateClient(id: any , Client : any){
    return this.http.put(this.apiUrl+'/client/'+id, Client);
  }

  deleteClient(ClientId:any){
    return this.http.delete(this.apiUrl+'/client/'+ClientId);
  }


}
