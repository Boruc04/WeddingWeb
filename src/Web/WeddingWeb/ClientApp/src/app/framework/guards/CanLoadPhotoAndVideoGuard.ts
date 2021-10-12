import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

@Injectable()
export class CanLoadPhotoAndVideoGuard implements CanLoad, CanActivate {

  constructor() {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

  canActivate() {
    console.log("Can Load Photo.")
    return true; // this.authService.isLoggedIn();
  }
}