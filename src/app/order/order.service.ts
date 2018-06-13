import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

@Injectable()
export class OrderService {

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
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
