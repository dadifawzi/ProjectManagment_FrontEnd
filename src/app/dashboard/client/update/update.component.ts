import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClientService } from '../../../core/client.service';


@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})


export class UpdateComponent {


   
 _id : any ; 
 client: any ; 
 clientForm: FormGroup;
  image: any;




constructor(
  private clientservice:ClientService,
  private route:ActivatedRoute,
  private fb: FormBuilder,
  private _route:Router
){
  let controls = {
      fullname: new FormControl('', [ Validators.required ]),
      email: new FormControl('', [ Validators.required ]),
      tel: new FormControl('', [ Validators.required ]),
      adress: new FormControl('', [ Validators.required ])
    }

    this.clientForm = fb.group(controls);
}


    ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('id');
    console.log('Value of "id" parameter:', this._id);
    this.client = this.getclient(this._id) ;
  }




  selectImage(e: any){
    this.image = e.target.files[0];
  }

  update(){
    let fd = new FormData();
    fd.append('fullname', this.clientForm.value.fullname);
    fd.append('email', this.clientForm.value.email);
    fd.append('tel', this.clientForm.value.tel);
    fd.append('adress', this.clientForm.value.adress);
    if(this.image){
      fd.append('image', this.image);
    }
 

    console.log("id is : "+this._id+" and the eclient to be updated is : "+fd);
    
    this.clientservice.updateClient(this._id, fd).subscribe({
      next: (res)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your client has been saved",
          showConfirmButton: false,
          timer: 1000
        });
setTimeout(() => {
  this._route.navigate(['/home/client/list']);
}, 1000);
      }
    })

  }
  


  getclient(id:any){
    this.clientservice.getClientById(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.clientForm.reset(res);
      
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
