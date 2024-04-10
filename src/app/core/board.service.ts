import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  getBoardBuId(project: string) {
    throw new Error('Method not implemented.');
  }

 apiUrl ="http://localhost:3000" ; 

  constructor(private http : HttpClient) { }
 

getboards(){
  return this.http.get(this.apiUrl+'/board') ;
}

gethistoiry(){
  return this.http.get(this.apiUrl+'/board/history') ;
}


  getBoardById(id: any){
    return this.http.get(this.apiUrl + '/board/byid/' + id);
  }

  update(id: any, data: any){
    return this.http.put(this.apiUrl + '/board/update/' + id, data);
  }






}
