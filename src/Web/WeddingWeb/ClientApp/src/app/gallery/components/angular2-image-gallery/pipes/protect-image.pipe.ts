import {
    Pipe,
    PipeTransform,
    OnDestroy,
    WrappedValue,
    ChangeDetectorRef
} from '@angular/core';

import { Subscription, Observable, BehaviorSubject } from 'rxjs';


import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

// Using similarity from AsyncPipe to avoid having to pipe |secure|async in HTML.
@Pipe({
    name: 'protectImage',
    pure: false
})
export class ProtectImagePipe implements PipeTransform, OnDestroy {
    private _subscription: Subscription = null;

    private previousUrl: string;
    private _result: BehaviorSubject<any> = new BehaviorSubject(null);
    private result: Observable<any> = this._result.asObservable();
    private _internalSubscription: Subscription = null;

    constructor(
        private http: HttpClient,
        private sanitizer: DomSanitizer
    ) { }

    ngOnDestroy(): void {
        if (this._subscription) {
            this._dispose();
        }
    }

    transform(url: string): any {
        return this.internalTransform(url);
    }

    private internalTransform(url: string): Observable<any> {
        if (!url) {
            return this.result;
        }

        if (this.previousUrl !== url) {
            this.previousUrl = url;
            this._internalSubscription = this.http.get(url, { responseType: 'blob' }).subscribe(m => {
                let sanitized = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(m));
                this._result.next(sanitized);
            });
        }

        return this.result;
    }

    private _dispose() {
        this._subscription.unsubscribe();
        this._internalSubscription.unsubscribe();
        this._internalSubscription = null;
        this._subscription = null;
    }
}