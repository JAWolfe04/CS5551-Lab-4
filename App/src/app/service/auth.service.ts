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
