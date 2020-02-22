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
// Adapted from https://devdactic.com/ionic-4-jwt-login/
//-----------------------------------------------------------------------------------------------------------------
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
