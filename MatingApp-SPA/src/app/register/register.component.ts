import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../-services/auth.service';
import { error } from '@angular/compiler/src/util';
import { AlertifyService } from '../-services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService,  private alertify: AlertifyService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  // tslint:disable-next-line: typedef
  register(){
      this.authService.register(this.model).subscribe(() => {
        this.alertify.success('registartion succesfull');
      // tslint:disable-next-line: no-shadowed-variable
      }, error => {
        this.alertify.error('error');
      });
  }
  // tslint:disable-next-line: typedef
  cancel(){
    this.cancelRegister.emit(false);
    this.alertify.warning('cancelled');

  }

}
