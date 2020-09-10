import { Component, OnInit } from '@angular/core';
import { AuthService } from '../-services/auth.service';
import { AlertifyService } from '../-services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};


  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {

  }
  // tslint:disable-next-line: typedef
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('logged in successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  // tslint:disable-next-line: typedef
  loggedIn() {
    return this.authService.loggedIn();

  }
  // tslint:disable-next-line: typedef
  logout(){
    localStorage.removeItem('token');
    this.alertify.error('logged out');
  }

}
