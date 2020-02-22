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
