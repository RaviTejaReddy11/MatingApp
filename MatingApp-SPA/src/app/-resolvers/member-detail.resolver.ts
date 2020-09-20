import { Injectable} from '@angular/core';
import {User} from '../_models/user';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import { AlertifyService } from '../-services/alertify.service';
import { UserService } from '../-services/user.service';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';


@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private alertify: AlertifyService,
                private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('problem retreving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }

}
