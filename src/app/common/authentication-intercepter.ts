import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
@Injectable()
export class AuthenticationHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const header: HttpHeaders = this.getHeaders();
    if (header) {
      request = request.clone({ headers: header });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders(
      Object.assign(
        {},
        {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      )
    );
  }
}
