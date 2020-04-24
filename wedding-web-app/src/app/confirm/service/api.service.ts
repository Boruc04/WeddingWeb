import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Email } from './email';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }

    private sendEmailUrl = API_URL + '/sendEmail';
    public sendEmail(email: Email): Observable<Email> {
        console.log('send ');
        console.log(email);
        return this.http.post<Email>(this.sendEmailUrl, email).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}

