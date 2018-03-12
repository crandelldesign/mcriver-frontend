import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

    user = new User();

    // Create a stream of logged in status to communicate throughout app
    loggedIn: boolean;
    loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

    constructor(
    private http: HttpClient
    ) { }

    login() {
        let url = environment.api+'/auth/login';
        console.log('hit');
        console.log(this.user);
        this.http.post<any>(url, { email: this.user.email, password: this.user.password }).subscribe(data => {

            // Store Access Token
            let access_expiration = new Date().getTime() + (parseInt(data['expires_in']) * 1000);
            let user_access = JSON.stringify({ 
                access_token: data['access_token'], 
                access_expiration: access_expiration.toString() 
            });
            localStorage.setItem('user_access', user_access);

            // Just to secure, let's remove passwords from the User class
            this.user.password = null;
            this.user.confirmPassword = null;

            // Send to isLogged in to fetch and set all other user info
            this.checkLoggedIn();
        });
            
    }

    setLoggedIn(value: boolean) {
        // Update login status subject
        this.loggedIn$.next(value);
        this.loggedIn = value;
    }

    checkLoggedIn() {
        if (localStorage.getItem('user_access') != null) {
            // If the Access Token Exists, we need to check if it expired
            let user_access = JSON.parse(localStorage.getItem('user_access'));

            if (new Date().getTime() < parseInt(user_access.access_expiration)) {
                return this.getLoggedInUser()
                    .subscribe(
                        user => {
                            this.user = user;
                            this.user.loggedIn = true;
                            // Set Login Status
                            this.setLoggedIn(true);
                    },
                    err => {
                        //console.log(err);
                        // User is not logged in
                    });
            } else {
                // Lets refresh
                this.getRefreshToken();
            }
      
        } else {
            // Perform logout functionality without the reroute
            localStorage.clear();
            //this.emitUserStatusChange(false);
            //this.activationStatusCheck = false;
            this.user = new User();
            // Set Login Status
            this.setLoggedIn(false);
            return new User();
        
      
        }
    }

    getLoggedInUser():Observable<User> {
        let url = environment.api+'/auth/user';
        
        return this.http.get(url)
            .catch((error: Response | any) => {
                return Observable.throw('User not logged in');
            });
    }

    getRefreshToken() {
        let url = environment.api+'/auth/refresh';
        
        return this.http.post(url, {})
            .subscribe(data => {
                console.log(data);
                // Store Access Token
                let access_expiration = new Date().getTime() + (parseInt(data['expires_in']) * 1000);
                let user_access = JSON.stringify({ 
                    access_token: data['access_token'], 
                    access_expiration: access_expiration.toString() 
                });
                localStorage.setItem('user_access', user_access);

                // Just to secure, let's remove passwords from the User class
                this.user.password = null;
                this.user.confirmPassword = null;

                // Send to isLogged in to fetch and set all other user info
                this.checkLoggedIn();
            });
    }

}
