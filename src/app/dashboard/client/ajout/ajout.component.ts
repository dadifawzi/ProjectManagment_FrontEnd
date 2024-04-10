import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2' ;
import { Router } from '@angular/router';
import { ClientService } from '../../../core/client.service';


@Component({
  selector: 'app-ajout',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './ajout.component.html',
  styleUrl: './ajout.component.css'
})
export class AjoutComponent {

clientForm: FormGroup;
  image: any;

  constructor( private fb: FormBuilder, private _client: ClientService, private _router: Router ){

    let controls = {
      fullname: new FormControl('', [ Validators.required ]),
      email: new FormControl('', [ Validators.required ]),
      tel: new FormControl('', [ Validators.required ]),
      adress : new FormControl('',[Validators.required])
    }

    this.clientForm = fb.group(controls);
  }


   selectImage(e: any){
    this.image = e.target.files[0];
  }

  create(){

    let fd = new FormData();
    fd.append('fullname', this.clientForm.value.fullname);
    fd.append('email', this.clientForm.value.email);
    fd.append('tel', this.clientForm.value.tel);
    fd.append('adress',this.clientForm.value.adress)
    fd.append('image', this.image);

    this._client.createClient(fd).subscribe({
      next: (res)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Client has been saved",
          showConfirmButton: false,
          timer: 2500
        });
//add wait function for 2s 
setTimeout(() => {
  this._router.navigate(['/home/client/list']);
}, 1000);
      }
    })

  }





}
