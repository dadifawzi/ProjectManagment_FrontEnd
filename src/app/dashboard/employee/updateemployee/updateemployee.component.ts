import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateemployee',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './updateemployee.component.html',
  styleUrl: './updateemployee.component.css'
})
export class UpdateemployeeComponent implements OnInit {
 
 _id : any ; 
 user: any ; 
 userForm: FormGroup;
  image: any;
  tags : any = [];
  singleTag = '';



constructor(
  private userservice:UserService,
  private route:ActivatedRoute,
  private fb: FormBuilder,
  private _route:Router
){
  let controls = {
      fullname: new FormControl('', [ Validators.required ]),
      email: new FormControl('', [ Validators.required ]),
      tel: new FormControl('', [ Validators.required ]),
      password: new FormControl('', [ Validators.required ])
    }

    this.userForm = fb.group(controls);
}


    ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('id');
    console.log('Value of "id" parameter:', this._id);
    this.user = this.getUser(this._id) ;
  }


  createTag(){
    this.tags.push(this.singleTag);
    this.singleTag = '';
  }

  deleteTag(index: number){
    this.tags.splice(index, 1)
  }

  selectImage(e: any){
    this.image = e.target.files[0];
  }

  update(){
    let fd = new FormData();
    fd.append('fullname', this.userForm.value.fullname);
    fd.append('email', this.userForm.value.email);
    fd.append('tel', this.userForm.value.tel);
    fd.append('tags', JSON.stringify(this.tags));
    if(this.image){
      fd.append('image', this.image);
    }
    if(this.userForm.value.password.length > 0){
      fd.append('password', this.userForm.value.password);
    }

    console.log("id is : "+this._id+" and the euser to be updated is : "+fd);
    
    this.userservice.updateUser(this._id, fd).subscribe({
      next: (res)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your user has been saved",
          showConfirmButton: false,
          timer: 1000
        });
setTimeout(() => {
  this._route.navigate(['/home/employee/list']);
}, 1000);
      }
    })

  }
  


  getUser(id:any){
    this.userservice.getUserById(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.userForm.reset(res);
        this.tags = res.tags;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }





}
