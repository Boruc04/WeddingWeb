import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Email, CustomResponse } from './email';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    observe: 'response' as const
};

@Injectable()
export class EmailService {
    private EmailUrl = API_URL + '/api/email';
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('EmailService');
    }

    public sendEmail(email: Email): Observable<CustomResponse> {
        return this.http.post<Email>(this.EmailUrl, email, httpOptions)
            .pipe(
                catchError(this.handleError<HttpResponse<Email>>('sendEmail')),
                map((response) => {
                    let myResponse: CustomResponse = {
                        ok: false,
                        status: 404,
                        message: 'Error'
                    };
                    if (response != null) {
                        myResponse = {
                            ok: response.ok,
                            status: response.status,
                            message: response.statusText
                        };
                    }
                    return myResponse;
                })
            );
    }

    public getEmail(): Observable<Email> {
        return this.http.get<Email>(this.EmailUrl).pipe(
            catchError(this.handleError<Email>('getEmail'))
        );
    }

}

