import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs/Observable";
import { Category } from './category';

@Injectable()
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  public getCategories(): Observable <Category[]> {
    let url = environment.api + '/categories';
    return this.http.get<Category[]>(url)
      .catch((error: Response | any) => {
        return Observable.throw('User not logged in');
    });
  }

}
