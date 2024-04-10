import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../core/user.service';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';
@Component({
  selector: 'app-listemployee',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './listemployee.component.html',
  styleUrl: './listemployee.component.css',
})
export class ListemployeeComponent implements OnInit {
  
  users: any;

  constructor(private userservice: UserService) {}

  ngOnInit(): void {
    this.getusers();
  }



  getusers() {
    this.userservice.getUsers().subscribe({
      next: (res) => {
        console.log(res);
        
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

deleteuser(id:any) {
console.log("user to delet id : "+id);

Swal.fire({
  position:"center" , 
  title: "Do you want to delete this User",
  showDenyButton: true,
  confirmButtonText: "Yes",
}).then((result) => {
  if (result.isConfirmed) {


    this.userservice.deleteUser(id).subscribe({
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
