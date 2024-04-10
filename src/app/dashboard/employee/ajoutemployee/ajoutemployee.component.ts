import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { UserService } from '../../../core/user.service';
import Swal from 'sweetalert2' ;
import { Router } from '@angular/router';


@Component({
  selector: 'app-ajoutemployee',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './ajoutemployee.component.html',
  styleUrl: './ajoutemployee.component.css'
})
export class AjoutemployeeComponent {


 
  userForm: FormGroup;
  image: any;
  tags : any = [];
  singleTag = '';

  constructor( private fb: FormBuilder, private _user: UserService, private _router: Router ){

    let controls = {
      fullname: new FormControl('', [ Validators.required ]),
      email: new FormControl('', [ Validators.required ]),
      tel: new FormControl('', [ Validators.required ]),
      password: new FormControl('', [ Validators.required ])
    }

    this.userForm = fb.group(controls);
  }

  createTag(){
    this.tags.push(this.singleTag);
    this.singleTag = '';
  }

  selectImage(e: any){
    this.image = e.target.files[0];
  }

  create(){

    let fd = new FormData();
    fd.append('fullname', this.userForm.value.fullname);
    fd.append('email', this.userForm.value.email);
    fd.append('tel', this.userForm.value.tel);
    fd.append('password', this.userForm.value.password);
    fd.append('tags', JSON.stringify(this.tags));
    fd.append('image', this.image);

    this._user.createUser(fd).subscribe({
      next: (res)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your user has been saved",
          showConfirmButton: false,
          timer: 2500
        });
//add wait function for 2s 
setTimeout(() => {
  this._router.navigate(['/home/employee/list']);
}, 1000);
      }
    })

  }


}
