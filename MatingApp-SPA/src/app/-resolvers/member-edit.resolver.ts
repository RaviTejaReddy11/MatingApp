import { Injectable} from '@angular/core';
import {User} from '../_models/user';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import { AlertifyService } from '../-services/alertify.service';
import { UserService } from '../-services/user.service';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';
import {AuthService} from '../-services/auth.service';


@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private alertify: AlertifyService,
                private router: Router, private authService: AuthService) {}

                
    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('problem retreving your data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }

}
