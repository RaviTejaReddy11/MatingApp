import { Component, OnInit } from '@angular/core';
import { AuthService } from '../-services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};


  constructor(private authService: AuthService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {

  }
  // tslint:disable-next-line: typedef
  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('logged in successfully');
    }, error => {
      console.log('Failed to login');
    });
  }

  // tslint:disable-next-line: typedef
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;

  }
  // tslint:disable-next-line: typedef
  logout(){
    localStorage.removeItem('token');
    console.log('logged out');
  }

}