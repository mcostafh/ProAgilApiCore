import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public authService: AuthService
    ,public router: Router
    , private toastr: ToastrService) {}

  ngOnInit() {
  }

  loggedIn(){
      return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.toastr.show('Sesão encerrada!');
    this.router.navigate(['/user/login']);
  }

  userName(){
    return this.authService.userName;
}

  entrar(){
    this.router.navigate(['/user/login']);  
  }


}
