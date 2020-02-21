import { AuthService} from '../service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isloggedIn) {
          return true;
      } else {
          this.alertCtrl.create({
              header: 'Unauthorized',
              message: 'You are not allowed to access that page.',
              buttons: ['OK']
          }).then(alert => alert.present());

          this.router.navigateByUrl('/');
          return false;
      }
  }
}
