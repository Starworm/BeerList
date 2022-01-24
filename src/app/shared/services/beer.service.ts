import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlsDictionaries} from "../dictionaries/urls.dictionaries";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * gets beers from API
   * @param name - beer name for searching
   * @param page - page, which should be shown
   * @param per_page - amount of results by each page
   */
  getBeers(page: number, per_page: number, name?: unknown): Observable<any> {
    if (name) {
      return this.http.get(`${UrlsDictionaries.BEER}/?beer_name=${name}`);
    } else {
      return this.http.get<any>(`${UrlsDictionaries.BEER}/?page=${page}&per_page=${per_page}`);
    }
  }

}
