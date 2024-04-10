import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {

   user: any;

  constructor( private _auth: AuthenticationService , private router : Router){}

  ngOnInit(): void {
    this.user = this._auth.getDataFromToken();
  }

  logout(){
   // localStorage.removeItem('myToken');
   // window.location.reload();
  //  this.router.navigate(['/login']);
  }



}





