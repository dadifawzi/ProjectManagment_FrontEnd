import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientComponent } from '../client.component';
import { ClientService } from '../../../core/client.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

clients: any;

  constructor(private clientservice: ClientService) {}

  ngOnInit(): void {
    this.getclients();
  }



  getclients() {
    this.clientservice.getClients().subscribe({
      next: (res) => {
        console.log(res);
        
        this.clients = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

deleteclient(id:any) {
console.log("user to delet id : "+id);

Swal.fire({
  position:"center" , 
  title: "Do you want to delete this User",
  showDenyButton: true,
  confirmButtonText: "Yes",
}).then((result) => {
  if (result.isConfirmed) {


    this.clientservice.deleteClient(id).subscribe({
      next:(res)=>{
        console.log(res);
        Swal.fire("Deleted!");
       this.ngOnInit() ; 
      },error:(err)=>{
        console.log(err);
        
      }
    });

    
  } 
});




  }



}
