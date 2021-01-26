import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Version } from './version';

const API_URL = environment.apiUrl;

@Injectable()
export class VersionService {
  private AppVersionUrl = API_URL + '/version'
  
  constructor(private http: HttpClient) { }

  public getAppVersion(): Observable<Version> {
    return this.http.get<Version>(this.AppVersionUrl);
  }
}
