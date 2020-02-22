//-----------------------------------------------------------------------------------------------------------------
// CS 5551
// Lab 4
// Jonathan Wolfe
// Bill Yerkes
// Create a simple ionic application using any of the ionic templates [tabs, sidemenu]
//     Make changes to the template to display
//     1. Login and Registration Activities
//     The application must have a sign up and login activities.
//
//     2. A Main page
//     The Page should be Mashup of at least Two Web Services (refer to the web services
//     from the spreadsheet). One of them should be from the list of knowledge/Machine
//     learning/AI services and that you haven’t used in your previous work.
//
//     3. Testing
//     Write at least 3-unit test cases related to your application.
//
//     Deploy the application to android device/ web/ ionic lab
//
// Adapted from https://www.techiediaries.com/ionic/ionic-5-jwt-authentication-node-expressjs/
//-----------------------------------------------------------------------------------------------------------------
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { tap, catchError  } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { User } from '../user';
import { AuthResponse } from './auth-response';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_SERVER_ADDRESS: string  =  'http://localhost:3000';
  private userData = new BehaviorSubject(false);
  private LoggedIn = false;

  constructor(private storage: Storage,
              private http: HttpClient,
              private plt: Platform,
              private router: Router,
              private alertController: AlertController) {  }

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
        tap(async (res: AuthResponse ) => {

          if (res.user) {
            await this.storage.set('ACCESS_TOKEN', res.user.access_token);
            await this.storage.set('EXPIRES_IN', res.user.expires_in);
            this.userData.next(true);
          }
        })
    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.http.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
        tap(async (res: AuthResponse) => {

          if (res.user) {
            await this.storage.set('"ACCESS_TOKEN', res.user.access_token);
            await this.storage.set('EXPIRES_IN', res.user.expires_in);
            this.userData.next(true);
            this.LoggedIn = true;
          }
        })
    );
  }

  getUser() {
    return this.userData.getValue();
  }

  isloggedIn() {
    return this.LoggedIn;
  }

  async logout() {
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    this.userData.next(false);
    this.LoggedIn = false;
    this.router.navigateByUrl('/');
  }

  async showAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    await alert.present();
  }
}
