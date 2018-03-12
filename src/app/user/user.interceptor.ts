import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
//import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

    constructor(public userService: UserService) {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        //const idToken = localStorage.getItem("id_token");
        const user_access = JSON.parse(localStorage.getItem('user_access'));

        if (user_access) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + user_access.access_token)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}
