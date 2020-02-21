import { Component, OnInit } from '@angular/core';
import { AuthService} from '../service/auth.service';
import { ToastController  } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService,
              private router: Router,
              public toastController: ToastController) { }

  ngOnInit() {
  }

  login(form) {
    this.auth.login(form.value).subscribe(async res => {
      if (res) {
          this.router.navigateByUrl('/members');
        }
      },
        async error => { this.presentToast(); });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Incorrect Email/Password Combination',
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
  }
}
