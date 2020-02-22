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
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { MovieService, SearchType } from '../service/movie.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'Movies.page.html',
  styleUrls: ['Movies.page.scss']
})
export class MoviesPage {
  results: Observable<any>;
  searchTerm: string;
  type: SearchType = SearchType.all;

  constructor(private http: HttpClient, private movieService: MovieService, private auth: AuthService) {}

  searchChanged() {
    this.results = this.movieService.searchData(this.searchTerm, this.type);
  }

  logout() {
    this.auth.logout();
  }
}
