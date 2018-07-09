import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

@Injectable()
export class OrderService {

  private handleError: HandleError;

  currentYear: number = (new Date()).getFullYear();

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  getOrders(
    year: number = this.currentYear,
    camping: boolean = false
    ): Observable<any> {

      let params = new HttpParams();
      params = params.append('year', year.toString());
      (camping)?params = params.append('camping', 'true'):'';
      //params = params.append('var2', val2);

      let url = environment.api+'/order';
      return this.http.get<any>(url, {params: params}).pipe(catchError(this.handleError('orders')));
  }
  
  getOrder(friendlyOrderId): Observable<any> {
    let url = environment.api+'/order/'+friendlyOrderId;
    return this.http.get<any>(url).pipe(catchError(this.handleError('order', friendlyOrderId)));
  }

  sendOrder(order, token): Observable<any> {
    let url = environment.api+'/order';
    return this.http.post<any>(url, { order: order, token: token })
      .pipe(
          catchError(this.handleError('order', order))
      );
  }
}
