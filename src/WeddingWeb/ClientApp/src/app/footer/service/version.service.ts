import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Version } from './version';

@Injectable()
export class VersionService {
  private AppVersionUrl = '/api/version'
  
  constructor(private http: HttpClient) { }

  public getAppVersion(): Observable<Version> {
    return this.http.get<Version>(this.AppVersionUrl);
  }
}
