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
// Adapted from https://ionicacademy.com/ionic-4-app-api-calls/
//-----------------------------------------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  information;

  constructor(private activatedRoute: ActivatedRoute,
              private movieService: MovieService,
              private auth: AuthService) { }

  ngOnInit() {
    // Get the ID that was passed with the URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    // Get the information from the API
    this.movieService.getDetails(id).subscribe(result => {
      this.information = result;
    });
  }

  openWebsite() {
    window.open(this.information.Website, '_blank');
  }

  logout() {
    this.auth.logout();
  }
}
