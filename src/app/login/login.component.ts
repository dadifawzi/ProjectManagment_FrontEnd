import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule ,FormGroup , FormBuilder , Validator, Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor( private fb: FormBuilder, private _user: UserService, private _router: Router ){

    let controls = {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }

    this.loginForm = fb.group(controls);

  }

  login(){

    this._user.signin( this.loginForm.value ).subscribe({
      next: (res: any)=>{
       
        localStorage.setItem('myToken',res.myToken);
        this._router.navigate(['/home']);

      },
      error: ()=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! please try again",
        });
        
      }
    })

  }

}
