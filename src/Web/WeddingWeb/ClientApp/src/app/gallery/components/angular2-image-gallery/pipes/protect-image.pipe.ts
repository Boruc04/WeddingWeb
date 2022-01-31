import {
    Pipe,
    PipeTransform,
    OnDestroy
} from '@angular/core';

import { Subscription, Observable, BehaviorSubject } from 'rxjs';


import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

// Using similarity from AsyncPipe to avoid having to pipe |secure|async in HTML.
@Pipe({
    name: 'protectImage',
    pure: false
})
export class ProtectImagePipe implements PipeTransform, OnDestroy {
    private previousUrl: string;
    private _result: BehaviorSubject<any> = new BehaviorSubject(null);
    private result: Observable<any> = this._result.asObservable();
    private _internalSubscription: Subscription = null;

    constructor(
        private http: HttpClient,
        private _sanitizer: DomSanitizer
    ) { }

    ngOnDestroy(): void {
        if (this._internalSubscription){
            this._internalSubscription.unsubscribe();
            this._internalSubscription = null;
        }
    }

    transform(url: string, type: string): any {
        return this.internalTransform(url, type);
    }

    private internalTransform(url: string, type: string): Observable<any> {
        if (!url) {
            return this.result;
        }

        if (this.previousUrl !== url) {
            this.previousUrl = url;
            this._internalSubscription = this.http.get(url, { responseType: 'blob' }).subscribe(m => {
                let sanitized = this.sanitize(URL.createObjectURL(m), type);
                this._result.next(sanitized);
            });
        }

        return this.result;
    }

    private sanitize(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'html':
                return this._sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this._sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this._sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this._sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this._sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error(`Not supported type: ${type}`)
        }
    }
}