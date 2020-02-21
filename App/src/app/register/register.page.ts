import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from "../service/auth.service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private  authService: AuthService,
              private  router: Router,
              public toastController: ToastController) { }

  ngOnInit() {
  }

  register(form) {
    this.authService.register(form.value).subscribe((res) => {
      this.router.navigateByUrl('/');
    },
        async error => { this.presentToast(); });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Account using this email already exists',
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
  }
}
