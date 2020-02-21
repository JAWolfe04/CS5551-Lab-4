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
