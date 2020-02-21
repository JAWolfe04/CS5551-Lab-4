import { Component } from '@angular/core';
import {AuthService} from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'UClassify.page.html',
  styleUrls: ['UClassify.page.scss']
})
export class UClassifyPage {
  results: Observable<any>;
  information = null;
  searchTerm: string;
  item;
  proxy = 'https://cors-anywhere.herokuapp.com/';
  url = 'https://api.uclassify.com/v1/';
  apiKey = 'YSjbCbwvtWod'; // <-- Enter your own key here!
  classifierName = 'uClassify/Sentiment/classify';

  constructor(private auth: AuthService,
              private http: HttpClient) {}

  btnClick() {
    this.http.get(`${this.proxy + this.url + this.classifierName}?readKey=${this.apiKey}&text=${this.searchTerm}` )
        .subscribe((data: any) => this.item = {
          positive: data.positive,
          negative: data.negative
        });
  }

  logout() {
    this.auth.logout();
  }
}
